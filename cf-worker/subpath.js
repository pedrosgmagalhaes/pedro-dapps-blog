/* ============================================================
   Cloudflare Worker — pedro-dapps-blog-subpath
   Serve o blog em https://pedrodapps.com/blog/*
   proxy → origem (blog.pedrodapps.com ou *.up.railway.app)

   Rota no Cloudflare: pedrodapps.com/blog*

   Como funciona:
   1. Remove o prefixo /blog da URL e busca na origem.
   2. Reescreve no HTML/CSS/JS os caminhos absolutos (href/src/url)
      adicionando o prefixo /blog (ex.: /assets/x → /blog/assets/x).
   3. Corrige canonical / og:url / og:image / sitemap para /blog.
   ============================================================ */

// ORIGEM do blog — URL de produção do Railway.
// Pode trocar para https://blog.pedrodapps.com após o custom domain ser validado.
const ORIGIN = 'https://pedro-dapps-blog-production.up.railway.app';

const PREFIX = '/blog';
const SITE_ROOT = 'https://pedrodapps.com';

// Tipos que precisam de reescrita de conteúdo (os demais passam direto)
const REWRITABLE = new Set([
  'text/html',
  'text/css',
  'application/javascript',
  'text/javascript',
  'application/xml',
  'text/xml',
  'application/json',
]);

function rewriteBody(body, contentType) {
  let out = body;

  // 1) Atributos de URL no HTML/JS: href="/x" src="/x" action="/x"
  out = out.replace(/((?:href|src|action)=["'])\/(?!\/|blog\/)/g, `$1${PREFIX}/`);

  // 2) url() no CSS: url(/x) url("/x") url('/x')
  out = out.replace(/(url\(["']?)\/(?!\/|blog\/)/g, `$1${PREFIX}/`);

  // 3) Canonical, og:url e og:image (URLs absolutas do site)
  out = out.replace(
    /(<link rel="canonical" href="|property="og:url" content="|property="og:image" content="|property="og:image:secure_url" content="|name="twitter:image" content=")https:\/\/pedrodapps\.com\//g,
    `$1${SITE_ROOT}${PREFIX}/`,
  );

  // 4) Sitemap XML: <loc>https://pedrodapps.com/ → /blog/
  if (contentType.includes('xml')) {
    out = out.replace(/<loc>https:\/\/pedrodapps\.com\//g, `<loc>${SITE_ROOT}${PREFIX}/`);
  }

  return out;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // /blog exato → redireciona para /blog/ (trailing slash do Astro)
    if (url.pathname === PREFIX) {
      return Response.redirect(`${SITE_ROOT}${PREFIX}/`, 308);
    }

    if (url.pathname === `${PREFIX}/`) {
      url.pathname = '/';
    } else if (url.pathname.startsWith(`${PREFIX}/`)) {
      url.pathname = url.pathname.slice(PREFIX.length);
    } else {
      // Rota fora do escopo (defesa extra) — não deve acontecer
      return new Response('Not Found', { status: 404 });
    }

    const originUrl = ORIGIN + url.pathname + url.search;
    let upstream;
    try {
      upstream = await fetch(originUrl, {
        headers: { 'User-Agent': request.headers.get('user-agent') || '' },
        redirect: 'follow',
      });
    } catch (err) {
      // Blog ainda não está no ar (aguardando deploy) — página elegante de "em breve"
      return new Response(
        `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pedro dApps — Blog</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#080808;color:#f4f4f1;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center}
  .wrap{padding:2rem}.k{color:#c89b52;font-size:.8rem;letter-spacing:.28em;text-transform:uppercase;margin-bottom:1rem}
  h1{font-family:Impact,'Arial Narrow',sans-serif;font-size:clamp(2.2rem,8vw,4rem);text-transform:uppercase;margin:0 0 1rem;line-height:.95}
  .gold{color:#c89b52}p{color:rgba(244,244,241,.66);max-width:32rem;margin:0 auto 1.6rem;line-height:1.7}
  a{color:#c89b52;text-decoration:none;border:1px solid rgba(200,155,82,.5);padding:.7rem 1.4rem;border-radius:999px;display:inline-block;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:.85rem}
</style></head><body><div class="wrap">
<p class="k">Pedro dApps · Tecnologia</p>
<h1>IA<span class="gold">.</span> Blockchain<span class="gold">.</span> Criação<span class="gold">.</span></h1>
<p>O blog está sendo publicado. Volte em instantes — os primeiros posts já estão a caminho.</p>
<a href="https://pedrodapps.com">Site oficial</a>
</div></body></html>`,
        { status: 503, headers: { 'content-type': 'text/html; charset=utf-8', 'retry-after': '300' } },
      );
    }

    const contentType = upstream.headers.get('content-type') || '';
    const base = contentType.split(';')[0].trim();

    // Reescrita apenas para tipos textuais; o resto (imagens, fontes) passa direto
    if (!REWRITABLE.has(base)) {
      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          'content-type': contentType,
          'cache-control': upstream.headers.get('cache-control') || 'public, max-age=300',
        },
      });
    }

    const body = await upstream.text();
    const rewritten = rewriteBody(body, contentType);

    return new Response(rewritten, {
      status: upstream.status,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=60',
      },
    });
  },
};
