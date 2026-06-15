import rss from '@astrojs/rss';
import { getAllPosts } from '@/lib/blog';
import { SITE } from '@/lib/blog';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>en-gb</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
