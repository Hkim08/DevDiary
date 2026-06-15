// Cloudflare Worker entry point for DevDiary static site
// Static assets are served from ./dist via wrangler.toml [assets]

export default {
  async fetch(request, env, ctx) {
    return env.ASSETS.fetch(request);
  },
};
