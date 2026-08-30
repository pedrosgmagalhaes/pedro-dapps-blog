# Pedro dApps — Blog

Blog oficial do canal **Pedro dApps** (Inteligência Artificial + Blockchain), construído com
[Astro](https://astro.build/). Mantém a identidade visual do site principal: tema escuro,
fontes **Anton + Manrope + Playfair Display** e o grão cinematográfico.

## Estrutura

```
blog/
├── astro.config.mjs      → site URL, integrações (MDX, sitemap)
├── railway.json          → config de deploy no Railway (Nixpacks)
├── server.js             → servidor estático (usa $PORT do Railway)
├── public/
│   ├── fonts/            → Anton, Manrope, Playfair (hospedadas localmente)
│   ├── grain.png         → textura de grão (mesma do site principal)
│   └── og-thumbnail.png  → imagem padrão de compartilhamento
└── src/
    ├── content.config.ts → schema dos posts (title, description, pubDate, tags, youtubeId)
    ├── content/blog/     → ⭐ SEUS POSTS ficam aqui (.md ou .mdx)
    ├── layouts/Layout.astro
    ├── components/       → Header, Footer
    ├── pages/            → index (lista), posts/[...slug], rss.xml
    └── styles/global.css → identidade visual completa
```

## Como escrever um post

1. Crie um arquivo em `src/content/blog/`, ex.: `meu-novo-post.md`
2. Use o frontmatter:

```md
---
title: "Título do post"
description: "Resumo usado no SEO, no RSS e nos compartilhamentos."
pubDate: 2026-09-01
tags: ["IA", "blockchain"]
# youtubeId: "ID_DO_VIDEO"   ← opcional: embed do YouTube no topo do post
---
```

3. Escreva o conteúdo em Markdown (aceita MDX, se precisar de componentes).
4. Commit na `main` → o Railway deploya automaticamente.

O slug (URL) é derivado do nome do arquivo: `meu-novo-post.md` → `/posts/meu-novo-post/`.

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/ estático
npm start          # serve dist/ (mesmo comportamento do Railway)
```

## Deploy no Railway

O repositório já traz `railway.json` (Nixpacks + `npm start` servindo `dist/`).

1. No Railway: **New Project → Deploy from GitHub repo** → selecione este repositório.
2. Autorize o Railway com sua conta do GitHub (se ainda não tiver).
3. O **auto-deploy está ativo por padrão**: todo push na branch `main` gera um novo deploy.
4. Quando tiver um domínio definitivo (ex.: `blog.pedrodapps.com`), atualize o campo
   `site` em `astro.config.mjs` e adicione o domínio no Railway.

## SEO incluído

- Sitemap automático (`/sitemap-index.xml`) via `@astrojs/sitemap`
- RSS em `/rss.xml`
- Tags canônicas, Open Graph e Twitter Card em todas as páginas
- HTML 100% estático, sem JavaScript desnecessário

## Créditos

Design derivado do site principal do canal (`../Website/`) — fontes e textura de grão reutilizadas.
