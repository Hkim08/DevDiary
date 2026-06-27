import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Rachid Houmayni'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('General'),
    featured: z.boolean().default(false),
    readingTime: z.string().default('5 min read'),
    coverType: z.enum(['neural', 'radar', 'code', 'product', 'doc']).default('code'),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
