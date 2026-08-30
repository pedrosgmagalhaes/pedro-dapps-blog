/* ============================================================
   Pedro dApps — Blog · API de Notificações (Cloudflare Worker)
   Rotas:
     POST /api/subscribe          { email, name? }        → newsletter
     POST /api/unsubscribe        { email }               → sai da newsletter
     POST /api/push/subscribe     { endpoint, keys }      → cadastra push
     POST /api/push/unsubscribe   { endpoint }            → remove push
     POST /api/push/notify        (Bearer NOTIFY_SECRET)  → dispara push
     POST /api/newsletter/send    (Bearer NOTIFY_SECRET)  → envia e-mail
     GET  /health
   Cron: a cada 20 min verifica o RSS; se mudou → push + e-mail.
   Bindings: DB (D1), secrets VAPID_PRIVATE_KEY/NOTIFY_SECRET,
   plain: VAPID_PUBLIC_KEY, BLOG_ORIGIN, NOTIFY_FROM.
   ============================================================ */

const ALLOWED_ORIGINS = new Set([
  'https://pedrodapps.com',
  'https://blog.pedrodapps.com',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
]);

const DEFAULT_BLOG_ORIGIN = 'https://blog.pedrodapps.com';
const DEFAULT_FROM = 'noticias@pedrodapps.com';
const MAILCHANNELS_API = 'https://api.mailchannels.net/tx/v1/send';

/* ---------- helpers ---------- */

function base64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToArrayBuffer(pem) {
  const cleaned = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  const bytes = new Uint8Array(digest);
  let hex = '';
  for (let i = 0; i < bytes.length; i += 1) hex += bytes[i].toString(16).padStart(2, '0');
  return hex;
}

/* Gera o header Authorization VAPID (ES256) para um endpoint de push */
async function vapidAuthHeader(endpoint, env) {
  const encoder = new TextEncoder();
  const header = base64url(encoder.encode(JSON.stringify({ alg: 'ES256', typ: 'JWT' })));
  const payload = base64url(
    encoder.encode(
      JSON.stringify({
        aud: new URL(endpoint).origin,
        exp: Math.floor(Date.now() / 1000) + 12 * 3600,
        sub: `mailto:${env.NOTIFY_FROM || DEFAULT_FROM}`,
      }),
    ),
  );
  const signingInput = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(env.VAPID_PRIVATE_KEY),
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    encoder.encode(signingInput),
  );
  return `vapid t=${header}.${payload}.${base64url(signature)},k=${env.VAPID_PUBLIC_KEY}`;
}

/* Push "vazio": dispara o evento push no SW (ele busca /novidades.json) */
async function broadcastPush(env) {
  const { results } = await env.DB.prepare('SELECT endpoint FROM push_subs').all();
  if (!results || results.length === 0) return { sent: 0 };
  let ok = 0;
  for (const row of results) {
    try {
      const auth = await vapidAuthHeader(row.endpoint, env);
      const res = await fetch(row.endpoint, {
        method: 'POST',
        headers: { TTL: '86400', Authorization: auth },
      });
      if (res.ok || res.status === 201 || res.status === 202) {
        ok += 1;
      } else if (res.status === 404 || res.status === 410) {
        // inscrição expirada — remove
        await env.DB.prepare('DELETE FROM push_subs WHERE endpoint = ?').bind(row.endpoint).run();
      }
    } catch (err) {
      /* tenta o próximo */
    }
  }
  return { sent: ok, total: results.length };
}

/* Envio de newsletter via MailChannels (domínio verificado com TXT) */
async function sendNewsletter(env, subject, text) {
  const { results } = await env.DB.prepare('SELECT email, name FROM emails').all();
  if (!results || results.length === 0) return { sent: 0 };
  const personalizations = results.map((row) => ({
    to: [{ email: row.email }],
  }));
  let sent = 0;
  for (let i = 0; i < personalizations.length; i += 100) {
    const batch = personalizations.slice(i, i + 100);
    try {
      const res = await fetch(MAILCHANNELS_API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          personalizations: batch,
          from: { email: env.NOTIFY_FROM || DEFAULT_FROM, name: 'Pedro dApps' },
          subject,
          content: [{ type: 'text/plain', value: text }],
        }),
      });
      if (res.ok) sent += batch.length;
    } catch (err) {
      /* continua com o próximo lote */
    }
  }
  return { sent, total: results.length };
}

/* Último post (título/descrição/link) para montar a notificação */
async function latestPost(env) {
  const origin = env.BLOG_ORIGIN || DEFAULT_BLOG_ORIGIN;
  try {
    const res = await fetch(`${origin}/novidades.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

function corsHeaders(request) {
  const origin = request.headers.get('origin') || '';
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://pedrodapps.com';
  return {
    'access-control-allow-origin': allow,
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-max-age': '86400',
  };
}

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extra },
  });
}

/* ---------- rotas ---------- */

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cors = corsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (path === '/health') {
    return json({ ok: true, ts: Date.now() }, 200, cors);
  }

  if (path === '/api/subscribe' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch (err) { return json({ error: 'JSON inválido' }, 400, cors); }
    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: 'E-mail inválido' }, 400, cors);
    const name = String(body.name || '').trim().slice(0, 120);
    try {
      await env.DB.prepare('INSERT OR IGNORE INTO emails (email, name) VALUES (?, ?)')
        .bind(email, name)
        .run();
      return json({ ok: true }, 200, cors);
    } catch (err) {
      return json({ error: 'Erro ao salvar' }, 500, cors);
    }
  }

  if (path === '/api/unsubscribe' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch (err) { return json({ error: 'JSON inválido' }, 400, cors); }
    const email = String(body.email || '').trim().toLowerCase();
    const res = await env.DB.prepare('DELETE FROM emails WHERE email = ?').bind(email).run();
    return json({ ok: res.meta.changes > 0 }, 200, cors);
  }

  if (path === '/api/push/subscribe' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch (err) { return json({ error: 'JSON inválido' }, 400, cors); }
    const { endpoint, keys } = body;
    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return json({ error: 'Inscrição push incompleta' }, 400, cors);
    }
    try {
      await env.DB.prepare(
        'INSERT OR REPLACE INTO push_subs (endpoint, p256dh, auth) VALUES (?, ?, ?)',
      )
        .bind(endpoint, keys.p256dh, keys.auth)
        .run();
      return json({ ok: true }, 200, cors);
    } catch (err) {
      return json({ error: 'Erro ao salvar' }, 500, cors);
    }
  }

  if (path === '/api/push/unsubscribe' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch (err) { return json({ error: 'JSON inválido' }, 400, cors); }
    const { endpoint } = body;
    if (!endpoint) return json({ error: 'Endpoint ausente' }, 400, cors);
    await env.DB.prepare('DELETE FROM push_subs WHERE endpoint = ?').bind(endpoint).run();
    return json({ ok: true }, 200, cors);
  }

  // Endpoints protegidos (disparo manual após publicar um post)
  if ((path === '/api/push/notify' || path === '/api/newsletter/send') && request.method === 'POST') {
    const auth = request.headers.get('authorization') || '';
    if (auth !== `Bearer ${env.NOTIFY_SECRET}`) {
      return json({ error: 'Não autorizado' }, 401, cors);
    }
  }

  if (path === '/api/push/notify' && request.method === 'POST') {
    const result = await broadcastPush(env);
    return json(result, 200, cors);
  }

  if (path === '/api/newsletter/send' && request.method === 'POST') {
    const post = await latestPost(env);
    const title = post ? post.title : 'Novo post no Pedro dApps';
    const description = post ? post.description : '';
    const url = post ? post.url : '/';
    const subject = `Novo post no Pedro dApps: ${title}`;
    const text =
      `Olá!\n\nPublicamos um novo post no blog do Pedro dApps:\n\n` +
      `📝 ${title}\n${description}\n\n` +
      `Leia agora: https://pedrodapps.com${url}\n\n` +
      `— Pedro dApps · Tecnologia\n\nSe não quiser mais receber, responda este e-mail.`;
    const result = await sendNewsletter(env, subject, text);
    return json(result, 200, cors);
  }

  return json({ error: 'Rota não encontrada' }, 404, cors);
}

/* ---------- cron: detecta post novo no RSS e notifica ---------- */

async function handleScheduled(env) {
  const origin = env.BLOG_ORIGIN || DEFAULT_BLOG_ORIGIN;
  let rss;
  try {
    const res = await fetch(`${origin}/rss.xml`, {
      headers: { 'user-agent': 'pedro-dapps-blog-cron/1.0' },
    });
    if (!res.ok) return;
    rss = await res.text();
  } catch (err) {
    return; // blog ainda não está no ar — aguarda o próximo ciclo
  }

  const hash = await sha256Hex(rss);
  const prev = await env.DB.prepare('SELECT value FROM kv WHERE key = ?')
    .bind('rss_hash')
    .first();

  if (!prev) {
    // primeira execução: apenas registra o hash atual
    await env.DB.prepare('INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)')
      .bind('rss_hash', hash)
      .run();
    return;
  }

  if (prev.value === hash) return; // nada mudou

  await env.DB.prepare('UPDATE kv SET value = ? WHERE key = ?').bind(hash, 'rss_hash').run();

  await broadcastPush(env);

  const post = await latestPost(env);
  if (post) {
    const subject = `Novo post no Pedro dApps: ${post.title}`;
    const text =
      `Olá!\n\nPublicamos um novo post no blog do Pedro dApps:\n\n` +
      `📝 ${post.title}\n${post.description || ''}\n\n` +
      `Leia agora: https://pedrodapps.com${post.url}\n\n` +
      `— Pedro dApps · Tecnologia`;
    await sendNewsletter(env, subject, text);
  }
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },
  async scheduled(event, env) {
    return handleScheduled(env);
  },
};
