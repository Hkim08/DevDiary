# Cloudflare Workers Deployment

## Architecture

This Astro blog deploys as a fully static site to Cloudflare Workers using **Workers + Assets** mode — no SSR, no `@astrojs/cloudflare` adapter.

```
Astro (static output) → dist/ → wrangler deploy (assets mode) → Cloudflare edge
```

The site has zero server-side rendering, zero API endpoints. Every page is pre-rendered HTML at build time. Workers + Assets serves these from Cloudflare's static cache with no Worker invocation on normal requests (instant, zero cold starts).

## Config files

### `wrangler.jsonc`

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "devdiary",
  "compatibility_date": "2026-06-27",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

Key points:
- **No `main` field** — omitting it means pure static hosting, no worker script runs
- `not_found_handling: "404-page"` — Cloudflare serves `404.html` from assets for unmatched paths (Astro's `src/pages/404.astro` builds precisely to `dist/404.html`)
- `compatibility_date` must be current or recent

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://devdiary.uk',
  integrations: [mdx(), sitemap()],
});
```

- `output: "static"` is the default (no adapter needed)
- `@astrojs/sitemap` auto-generates `sitemap-index.xml` + `sitemap-N.xml` covering all generated routes

### `package.json` scripts

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "deploy": "npm run build && wrangler deploy"
}
```

## Verified working patterns

| Concern | How it's handled |
|---------|-----------------|
| **RSS** | `src/pages/rss.xml.js` exports `GET` — Astro pre-renders it at build time to `dist/rss.xml` |
| **404** | `src/pages/404.astro` → `dist/404.html`; wrangler serves it via `not_found_handling: "404-page"` |
| **Sitemap** | `@astrojs/sitemap` generates from routes; manual `public/sitemap.xml` must be deleted (otherwise it conflicts) |
| **Trailing slashes** | Astro outputs directory-index pattern (`/blog/slug/index.html`), Cloudflare auto-rewrites `/blog/slug` → `/blog/slug/index.html` |
| **OG images** | Static files in `public/` get copied to `dist/` root |
| **Canonical URLs** | `Astro.site` is set to `https://devdiary.uk` — canonical URLs and sitemap reference the production domain, not the workers.dev preview URL |
| **Custom domain** | Workers preview URL is `https://devdiary.devdiary-hub.workers.dev`; point the production domain via Cloudflare dashboard → Workers → devdiary → Triggers → Routes |

## Deploy steps

```bash
# First time only (if not already set up)
npm install -g wrangler@4
wrangler whoami    # verify auth (uses CLOUDFLARE_API_TOKEN env var)

# Every deploy
npm run build      # builds to dist/
wrangler deploy    # uploads assets to Cloudflare
```

Or one-shot: `npm run deploy`

## Auth

Authentication is via `CLOUDFLARE_API_TOKEN` environment variable. The associated account is `Devdiary.hub@gmail.com's Account` (ID: `c7ffc25c58f2641a41c31816f0e98263`).

## Build output

```
dist/
  index.html
  blog/index.html + 15 blog slug/index.html
  products/index.html + 3 product slug/index.html
  projects/index.html
  about/index.html
  404.html
  rss.xml
  sitemap-index.xml + sitemap-0.xml
  favicon.svg + og-default.svg
  _astro/  (CSS + JS chunks)
```

## Gotchas

1. **`@astrojs/sitemap` must be wired in config** — just having it in `package.json` does nothing. Must add `import sitemap from '@astrojs/sitemap'` and include `sitemap()` in `integrations` array.
2. **Delete `public/sitemap.xml`** when using the integration — otherwise both files exist in dist and the manual one (missing routes) may be picked up.
3. **npm v11 semver bug** on Node 24.16.0 — `npm install wrangler` locally may fail. Workaround: install globally with `npm install -g wrangler@4`; the global binary is picked up by the deploy script. If you need it local, try a Node 22 environment or `--install-strategy=nested`.
4. **No `@astrojs/cloudflare` adapter needed** — that adapter is only for SSR (`output: 'server'`). For static sites, Workers + Assets is more performant.
5. **404 content is correct** — the `404.html` includes full nav, footer, and action buttons. Wrangler's `not_found_handling: "404-page"` preserves HTTP 404 status while serving the custom page.
6. **Preview URL uses workers.dev** — the sitemap and canonical URLs point at the production domain. They won't resolve from the preview URL, which is expected.
