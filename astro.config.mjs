import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` é usado para gerar sitemap.xml, RSS e tags canônicas.
// Troque por https://blog.pedrodapps.com (ou o domínio final do blog)
// quando configurar o domínio customizado no Railway.
export default defineConfig({
  site: 'https://pedrodapps.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
