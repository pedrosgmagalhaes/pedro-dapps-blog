import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // ID do vídeo do YouTube (embed opcional no topo do post)
    youtubeId: z.string().optional(),
    // Imagem de capa (caminho em /public, ex.: '/posters/ia.jpg')
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
