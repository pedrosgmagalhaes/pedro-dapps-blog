import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` é usado para gerar sitemap.xml, RSS, canonical, og:url e og:image.
// O blog roda em https://blog.pedrodapps.com (CNAME direto para o Railway),
// então as URLs absolutas precisam deste domínio — caso contrário o og:image
// aponta para pedrodapps.com (404) e o thumbnail quebra no compartilhamento.
export default defineConfig({
  site: 'https://blog.pedrodapps.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
