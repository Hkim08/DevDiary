# DevDiary.uk — Astro Project

Premium redesign of DevDiary.uk built with Astro.  
Dark, sophisticated, AI/dev-focused aesthetic with animated hero, bespoke SVG cover art, and a full design token system.

---

## Tech Stack

- **Framework**: [Astro](https://astro.build) v4
- **Styling**: Scoped component CSS + global design tokens
- **Fonts**: Space Grotesk · Inter · JetBrains Mono (Google Fonts)
- **Hero animation**: Canvas API (vanilla JS, no dependencies)
- **Cover art**: Inline SVG (no images, no CDN)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
devdiary-uk/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.astro          # Sticky nav with mobile hamburger
│   │   ├── Hero.astro         # Split hero + animated canvas
│   │   ├── StatsStrip.astro   # 4-cell stat bar
│   │   ├── PostsGrid.astro    # Featured + small card grid
│   │   ├── CoverArt.astro     # SVG cover illustrations per post type
│   │   ├── Expertise.astro    # 3-column expertise cards
│   │   ├── Newsletter.astro   # Email capture section
│   │   └── Footer.astro       # Footer with nav columns
│   ├── data/
│   │   └── posts.ts           # Post metadata (replace with content collections)
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML shell with SEO tags
│   ├── pages/
│   │   ├── index.astro        # Home page
│   │   └── blog/
│   │       ├── index.astro    # Blog listing with category filter
│   │       └── [slug].astro   # Dynamic article page
│   └── styles/
│       └── global.css         # Design tokens + reset + utilities
└── astro.config.mjs
```

---

## Adding Real Blog Posts

This project uses a simple `src/data/posts.ts` array as a placeholder.

**To use Astro Content Collections** (recommended for a real blog):

1. Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    readTime: z.string(),
    category: z.string(),
    categoryStyle: z.enum(['accent', 'teal', 'amber', 'default']),
    featured: z.boolean().default(false),
    coverType: z.enum(['neural', 'radar', 'doc', 'code', 'product']),
  }),
});

export const collections = { blog };
```

2. Create posts at `src/content/blog/my-post.mdx`

3. Update `src/pages/blog/[slug].astro` to use `getCollection('blog')`

---

## Design System

All design decisions live in `src/styles/global.css` as CSS custom properties:

| Token      | Value        | Usage                  |
|------------|--------------|------------------------|
| `--bg`     | `#08080C`    | Page background        |
| `--bg2`    | `#10101A`    | Card surfaces          |
| `--v`      | `#8B79FF`    | Primary accent (indigo)|
| `--teal`   | `#2DD4BF`    | Secondary accent       |
| `--amber`  | `#F59E0B`    | Tertiary accent        |
| `--ink`    | `#EEEAF4`    | Primary text           |
| `--ink2`   | `#9A96AA`    | Secondary text         |
| `--ink3`   | `#55526A`    | Muted / meta text      |

---

## Deployment

Works on any static host. Recommended:

- **Vercel**: `vercel deploy`
- **Netlify**: connect repo, build command `npm run build`, publish dir `dist`
- **Contabo VPS**: `npm run build` → serve `dist/` with Nginx or Caddy

### Nginx snippet

```nginx
server {
  listen 80;
  server_name devdiary.uk www.devdiary.uk;
  root /var/www/devdiary-uk/dist;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  gzip on;
  gzip_types text/plain text/css application/javascript;
}
```

---

## Newsletter Integration

The `Newsletter.astro` form currently posts to `#` (no-op).  
To wire it up, replace the `action` attribute with your provider's endpoint:

- **Mailchimp**: use their embed form action URL
- **ConvertKit**: use their API endpoint + a serverless function
- **Resend**: use an Astro API route at `src/pages/api/subscribe.ts`

---

## License

Private project — DevDiary.uk / Rachid · OpenClaw / DevDiary brands reserved.
