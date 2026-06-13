---
title: 'What I Use: Dev Hardware, Software, and Stack in 2026'
description: "The exact hardware, languages, and tools that power DevDiary.uk — Termux on Android, Contabo VPS, Node.js/TypeScript, Python, and SQLite — current as of 2026."
pubDate: 2026-06-13
author: 'Rachid Houmayni'
image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200'
imageAlt: 'Developer desk with laptop, mechanical keyboard, and ambient monitor glow'
category: 'About'
subCategory: 'Uses'
readTime: '4 min read'
featured: false
tags: ['dev-setup', 'tools', 'workflow', 'claude-code', 'astro', 'indie-hacker']
draft: false
canonicalURL: "https://devdiary.uk/uses"
---

## Hardware

`[PERSONAL EXPERIENCE]` My primary development environment is an Android phone running **[Termux](https://termux.dev/en/)**. No laptop in the daily loop — everything from writing code to running test suites happens through Termux's terminal. It sounds extreme until you realize most development is just text editing and running commands, both of which a phone handles fine with the right setup.

Production workloads run on a single **[Contabo VPS](https://contabo.com)** — one box, no managed Kubernetes, no multi-region setup. Self-hosted, by choice, as of 2026.

## Languages & Runtimes

- **Node.js / TypeScript** — the default for anything agent-related, APIs, or CLI tooling.
- **Python** — data scripts, automation, and anything where the ecosystem (e.g., document processing) is stronger than Node's.
- **Vanilla HTML/JS** — for lightweight frontends and digital products where a build step would be overkill.
- **React** — only when the UI complexity actually justifies a component model.

## Data

- **SQLite** — the default for everything, including production systems for client ERPs and Gumroad products. `[UNIQUE INSIGHT]` I switch to PostgreSQL only when there's a concrete reason (concurrent writes at a scale SQLite genuinely can't handle), not because "that's what production databases use."

More on my infrastructure philosophy and consulting stack on the [about page](/posts/about).

## Deployment & Ops

- **Contabo VPS** — single box, self-managed.
- **Termux/Android** — development, including SSH into the VPS for deploys.
- No managed CI/CD pipelines for most projects — deploy scripts run directly via SSH from Termux. This same pipeline ships the [SEO Audit Pro](/posts/seo-audit-pro) and [Freelance Rate Calculator](/posts/freelance-rate-calculator).

## Editor & Workflow

- Terminal-based editing within Termux (no GUI IDE in the primary workflow).
- Git for version control, [GitHub](https://github.com/Hkim08) for remote repos.
- `[ORIGINAL DATA]` As of 2026, most projects in my portfolio follow the same lightweight scaffold: a Node.js/TypeScript core, SQLite for storage, and a deploy script that rsyncs to the Contabo VPS and restarts a process manager — no Docker layer unless a specific dependency genuinely requires it.

## Why This Setup

This isn't a "minimalist for its own sake" thing — it's that every tool here has to justify its place against "does this run on a phone and a $10/month VPS (as of 2026) without falling over." If yes, it stays. If a project genuinely outgrows this, that's useful information too, and I write about it when it happens.

---

_Last updated: June 13, 2026. I keep this page current as my tools evolve._

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What I Use: Dev Hardware, Software, and Stack in 2026",
  "description": "The exact hardware, languages, and tools that power DevDiary.uk — Termux on Android, Contabo VPS, Node.js/TypeScript, Python, and SQLite — current as of 2026.",
  "url": "https://devdiary.uk/uses",
  "datePublished": "2026-06-13",
  "author": {
    "@type": "Person",
    "name": "Rachid Houmayni"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://devdiary.uk/uses"
  }
}
</script>

## Sources

1. Termux — Android terminal emulator and Linux environment. https://termux.dev/en/. Retrieved June 13, 2026.
2. Contabo — Cloud VPS hosting. https://contabo.com. Retrieved June 13, 2026.
3. SQLite — Embedded SQL database engine. https://sqlite.org. Retrieved June 13, 2026.
4. DevDiary.uk — Solo dev blog by Rachid. https://devdiary.uk. Retrieved June 13, 2026.
5. GitHub — Rachid's repositories. https://github.com/Hkim08. Retrieved June 13, 2026.
