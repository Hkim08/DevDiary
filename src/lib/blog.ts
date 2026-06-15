import { getCollection } from 'astro:content';

/** Fetch all published posts, sorted newest first */
export async function getAllPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Estimate reading time from markdown body */
export function estimateReadingTime(body: string): number {
  const wpm = 220;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

/** Format a Date as "Dec 2024" or "12 Dec 2024" */
export function formatDate(date: Date, long = false): string {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: long ? 'long' : 'short',
    day: long ? 'numeric' : undefined,
  });
}

/** Normalise a tag string to a CSS class suffix */
export function tagClass(tag: string): string {
  const map: Record<string, string> = {
    'ai-agents':   'ai-agents',
    'ai agents':   'ai-agents',
    'python':      'python',
    'automation':  'python',
    'ml':          'ml',
    'machine learning': 'ml',
    'web dev':     'web-dev',
    'web-dev':     'web-dev',
    'javascript':  'web-dev',
    'typescript':  'web-dev',
    'claude code': 'claude-code',
    'claude-code': 'claude-code',
    'opencode':    'claude-code',
    'openclaw':    'claude-code',
    'products':    'products',
    'gumroad':     'products',
  };
  return map[tag.toLowerCase()] ?? 'default';
}

/** Return all unique tags across all published posts */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tagSet.add(tag);
  }
  return [...tagSet].sort();
}

/** Build a canonical URL string */
export function canonicalUrl(path: string): string {
  const base = 'https://devdiary.uk';
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Site-wide metadata defaults */
export const SITE = {
  name:        'DevDiary.uk',
  tagline:     'Real-world dev diaries, written while building',
  description: 'Deep-dives into AI agentic systems, Claude Code, Python automation, and web architecture — by Rachid, a solo ERP consultant shipping real products.',
  url:         'https://devdiary.uk',
  author:      'Rachid',
  twitter:     '@devdiary_uk',
  locale:      'en_GB',
  ogImage:     '/og-default.svg',
} as const;
