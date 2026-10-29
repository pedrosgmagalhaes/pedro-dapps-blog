import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// GET /api/posts.json — feed dos posts, mais recentes primeiro.
// Lido pelo cron da newsletter (repo pedro-dapps-website, pasta newsletter/) para criar
// a campanha de cada post novo no Listmonk, como no blog da Vai.
export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const items = posts.slice(0, 50).map((p) => ({
    slug: p.id,
    title: p.data.title,
    summary: p.data.description,
    tags: p.data.tags,
    cover: p.data.cover ? new URL(p.data.cover, site).toString() : '',
    url: new URL(`/posts/${p.id}/`, site).toString(),
    published_at: p.data.pubDate.toISOString(),
  }));
  return new Response(JSON.stringify({ version: 1, generated_at: new Date().toISOString(), count: items.length, items }, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
