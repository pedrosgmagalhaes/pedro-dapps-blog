# Pedro dApps — Blog

Blog oficial do canal **Pedro dApps** (Inteligência Artificial + Blockchain), construído com
[Astro](https://astro.build/). Mantém a identidade visual completa do site principal:
tema escuro, fontes **Anton + Manrope + Playfair Display**, grão cinematográfico,
preloader VU-meter, Ken Burns, cursor customizado, logo, favicons e botão de inscrição.

## 🌐 Rotas (duas URLs servindo o mesmo blog)

O blog é acessível em **dois endereços**:

| URL | Como funciona |
| --- | --- |
| `https://blog.pedrodapps.com` | Subdomínio → CNAME para o serviço do blog no Railway (custom domain) |
| `https://pedrodapps.com/blog` | Worker do Cloudflare (`cf-worker/subpath.js`) faz proxy + rewrite de path |

O Worker (rota `pedrodapps.com/blog*`) remove o prefixo `/blog`, busca na origem e
reescreve os caminhos absolutos no HTML/CSS/JS (assets, links, canonical, og:*, sitemap)
para a sub-rota. SEO aponta o canonical para `pedrodapps.com/blog/*` (evita conteúdo
duplicado entre as duas URLs).

### Para ativar (quando o deploy no Railway existir)

1. Deploy do repo no Railway → copie a URL `*.up.railway.app` do serviço.
2. **blog.pedrodapps.com**: no Railway adicione o custom domain `blog.pedrodapps.com`;
   crie no Cloudflare o CNAME `blog` → `*.up.railway.app` (+ TXT `_railway-verify` se pedir).
3. **pedrodapps.com/blog**: edite `cf-worker/subpath.js` → `ORIGIN = 'https://blog.pedrodapps.com'`
   (ou a URL `.up.railway.app`), suba o script como Worker no Cloudflare e adicione a
   rota `pedrodapps.com/blog*` na zona.
4. Atualize `site` no `astro.config.mjs` se mudar o domínio canônico.

## 📁 Estrutura

```
blog/
├── astro.config.mjs      → site URL, integrações (MDX, sitemap)
├── railway.json          → config de deploy no Railway (Nixpacks)
├── server.js             → servidor estático (usa $PORT do Railway)
├── cf-worker/subpath.js  → Worker do Cloudflare p/ pedrodapps.com/blog
├── public/
│   ├── fonts/            → Anton, Manrope, Playfair (locais)
│   ├── posters/          → fotos de fundo (intro, blockchain, ia)
│   ├── images/           → logo, avatar, favicons, apple-touch-icons
│   ├── vendor/gsap.min.js→ GSAP 3.12.5 (local, como no site oficial)
│   └── grain.png         → textura de grão
└── src/
    ├── content.config.ts → schema dos posts
    ├── content/blog/     → ⭐ SEUS POSTS ficam aqui (.md ou .mdx)
    ├── layouts/Layout.astro
    ├── components/       → Header, Footer, Preloader, SubscribeSection
    ├── pages/            → index (hero+posts+vídeos+inscrição), posts/[...slug], rss.xml
    ├── scripts/blog.js   → preloader, cursor, tagline, reveals
    └── styles/global.css → identidade visual completa
```

## ✍️ Como escrever um post

Crie um arquivo em `src/content/blog/`, ex.: `meu-novo-post.md`:

```md
---
title: "Título do post"
description: "Resumo usado no SEO, no RSS e nos compartilhamentos."
pubDate: 2026-09-01
tags: ["IA", "blockchain"]
# youtubeId: "ID_DO_VIDEO"       ← opcional: embed do YouTube no topo do post
# cover: "/posters/ia.jpg"       ← opcional: imagem de capa do post
---
```

O slug (URL) é derivado do nome do arquivo: `meu-novo-post.md` → `/posts/meu-novo-post/`.

### Vídeos do canal (home)

Edite `src/consts.ts`:
- `FEATURED_YOUTUBE_ID` — ID do vídeo em destaque.
- `VIDEOS` — lista de cards com thumbnail real (`i.ytimg.com/vi/{id}/hqdefault.jpg`).

## 🚀 Rodando localmente

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/ estático
npm start          # serve dist/ (mesmo comportamento do Railway)
```

## 🛤️ Deploy no Railway (auto-deploy)

O repositório traz `railway.json` (Nixpacks + `npm start` servindo `dist/`).

1. Railway → **New Project → Deploy from GitHub repo** → autorize com sua conta do GitHub.
2. Selecione `pedro-dapps-blog`. O `railway.json` é lido automaticamente.
3. **Auto-deploy ativo por padrão**: todo commit na `main` gera deploy.

## SEO incluído

- Sitemap (`/sitemap-index.xml`) via `@astrojs/sitemap`
- RSS em `/rss.xml`
- Canonical, Open Graph e Twitter Card em todas as páginas
- HTML 100% estático, sem JavaScript desnecessário (GSAP local, sem CDN)

## Créditos

Design derivado do site oficial do canal (`../Website/`) — fontes, grão, logo, favicons e
linguagem de animação reutilizadas.
