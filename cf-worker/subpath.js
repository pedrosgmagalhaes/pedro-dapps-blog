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

// ORIGEM do blog — preencher com a URL real após o deploy no Railway.
// Pode ser o domínio https://blog.pedrodapps.com (após custom domain)
// ou a URL direta https://<servico>.up.railway.app.
const ORIGIN = 'https://BLOG.ORIGEM.AQUI';

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
    const upstream = await fetch(originUrl, {
      headers: { 'User-Agent': request.headers.get('user-agent') || '' },
      redirect: 'follow',
    });

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
