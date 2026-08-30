import { getCollection } from 'astro:content';

// JSON com o post mais recente — usado pelo Service Worker para montar a
// notificação de Web Push (gerado a cada build).
export async function GET() {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const latest = posts[0];

  return new Response(
    JSON.stringify({
      title: latest ? latest.data.title : 'Novo post no Pedro dApps',
      description: latest ? latest.data.description : 'Novo conteúdo publicado no blog.',
      url: latest ? `/posts/${latest.id}/` : '/',
      pubDate: latest ? latest.data.pubDate.toISOString() : null,
    }),
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300',
      },
    },
  );
}
