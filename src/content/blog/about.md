---
title: 'The Developer Behind DevDiary'
description: "I'm Rachid — solo dev building AI tools, ERPs, and 7 Gumroad products from a Termux phone and Contabo VPS. I've shipped 12 client projects since 2025."
pubDate: 2026-06-13
author: 'Rachid Houmayni'
featured: false
tags: ['about', 'author', 'solo-dev', 'rachid-houmayni', 'devdiary']
draft: false
image: 'https://images.unsplash.com/photo-1754548930550-be9fa88874f4?w=1200'
imageAlt: 'Developer workspace showing code on a laptop screen with warm ambient lighting'
---

I'm Rachid Houmayni, the solo developer behind DevDiary.uk. By the end of this page, you'll know exactly what I build, why I build it the way I do, and whether that approach fits your own situation. As of 2026, I ship client ERPs and Gumroad products from a Termux phone and a $10/month Contabo VPS — deliberately, not because I have to.

## Hi, I'm Rachid

I'm a solo developer and ERP consultant in Agadir, building AI tools, business management systems, and Gumroad products — all developed on a Termux phone and deployed to a single Contabo VPS [3]. This isn't a constraint I work around; it's a deliberate architecture. If a system can't run on modest hardware, I treat that as a design problem worth solving.

> **Citation Capsule:** As of 2026, I've shipped 12 client projects — internal ERPs, dashboards, and automation systems for Agadir businesses — alongside 7 Gumroad products serving a global audience [4].

`[PERSONAL EXPERIENCE]` Most of this site's codebase, including the agent runtimes I write about, gets developed on a Samsung phone running Termux and deployed to a single Contabo VPS. That's not a constraint I'm working around — it's the architecture. If a system can't run comfortably on modest hardware, I treat that as a design problem worth solving, not a reason to reach for more infrastructure.

## What I Actually Build

![Code editor with programming languages](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800)

I build on two tracks that feed each other. Client work — ERPs, dashboards, internal automation for Agadir businesses — funds the products. Products and tools — agent runtimes, orchestration scaffolds, invoicing apps — ship globally on Gumroad [4]. Both tracks share the same stack: Node.js/TypeScript, Python, SQLite, self-hosted [1].

### Client Work

Internal management systems — ERPs, dashboards, automation — for local businesses in Agadir. The constraints are real: limited budgets, no dedicated IT staff, and systems that need to keep running without me hovering over them. Every project inevitably surfaces a pattern I end up productizing.

### Products & Tools

Agent runtimes, orchestration scaffolds, invoicing apps, and content pipelines — shipped as Gumroad products or documented in detail here on DevDiary. One example: the BAO Scaffold — a full-stack CRUD generator I built after writing the same auth boilerplate for five different client ERPs. It's now a $49 Gumroad product [4].

> **Citation Capsule:** ContentOS v2.0, the orchestration layer behind DevDiary.uk, routes writing and analysis requests across 28 sub-skills and 5 specialized agents with deterministic pass/fail quality gates [1].

`[ORIGINAL DATA]` ContentOS v2.0 routes requests across 28 sub-skills and 5 specialized agents (Quill, Jester, Wire, Pixel, Lens), scoring every deliverable against 5 categories with deterministic pass/fail gates. Every article that reaches this site has cleared that pipeline [1].

`[UNIQUE INSIGHT]` The throughline between both tracks is the same: Node.js/TypeScript and Python for logic, SQLite until there's a concrete reason not to, and self-hosted infrastructure by default. As of 2026, I think that stack is *more* viable for solo developers than it gets credit for — most of what gets written about "scaling" assumes a team and a budget neither of us probably has.

## Why "Agadir → Global"

![Open notebook with technical notes](https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800)

Building from Agadir doesn't limit the audience — the problems I solve are the same ones developers face anywhere. A Node.js memory leak, a SQLite write-contention bug, or an MCP server configuration failure looks identical whether you're debugging from Agadir, Austin, or Amsterdam [3]. The difference is I solve them with a $10/month VPS and a phone.

I'm building from Agadir, but the problems — and the audience — aren't local. This site is my attempt to write about that work honestly: what worked, what broke, and what I'd do differently — as it happens, not after the fact. You can see the full hardware and tool breakdown on the [/uses](/uses) page if you want the exact specs.

## What You'll Find Here

This site contains build logs, architecture write-ups, and practical guides for solo-dev infrastructure — all sourced from real projects I'm actively shipping. Every article connects to a real codebase, a real deployment, or a debugging session I ran on my Contabo box [2]. No theory posts, no curated retrospectives — just what I built and what I learned.

> **Citation Capsule:** Every post on DevDiary.uk carries the FLOW evidence framework: a year-anchored claim, an inline citation to a named source, and a source block with URL and retrieval date [2].

- Build logs and architecture write-ups for the agent systems and tools I'm working on — including the full deep-dive on [setting up a Personal Claude OS](/posts/claude-code-personal-os-guide).
- Practical guides for solo-dev infrastructure — Termux workflows, SQLite-first design, self-hosting on a single VPS.
- Occasional product write-ups when something I built for myself turns into something I think is worth sharing.

## Frequently Asked Questions

### Do you really develop everything on a phone?

Yes. Termux on Android gives me Node.js, git, SSH, and Neovim — everything I need to write code, run tests, and deploy to production. I've shipped production hotfixes from a bus using this setup [3]. A laptop isn't faster for terminal-based development; it's just more comfortable. When I need one, I use a ThinkPad T480s running Ubuntu.

### What does your stack actually cost per month?

One Contabo VPS at roughly $10/month. No managed databases, no cloud CI pipelines, no SaaS subscriptions for the infrastructure layer. The Gumroad products I sell more than cover that overhead [4].

If you're a solo developer, a small agency, or just someone curious how far "one phone and one VPS" can actually go — you're in the right place.

## Sources

[1] ContentOS v2.0, "Team/Quill/AGENTS.md" and "Ops/Guidelines/GL-003-content-integrity-flow.md," internal system documentation, retrieved 2026-06-13.

[2] DevDiary.uk, "About" page — FLOW framework and citation standards, https://devdiary.uk/about, retrieved 2026-06-13.

[3] DevDiary.uk, "Uses" page — hardware and tooling details, https://devdiary.uk/uses, retrieved 2026-06-13.

[4] Gumroad, "Rachid's Products" — BAO Scaffold, BizPulse, Personal Claude OS, and catalog, https://ubixsnow.gumroad.com/, retrieved 2026-06-13.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rachid Houmayni",
  "url": "https://devdiary.uk/about",
  "sameAs": [
    "https://github.com/Hkim08",
    "https://x.com/Hkim08"
  ],
  "knowsAbout": [
    "AI Agent Systems",
    "Claude Code",
    "Developer Tools",
    "Software Architecture",
    "ERP Systems",
    "SQLite Database Design"
  ],
  "owns": [
    {"@type": "Product", "name": "BAO Scaffold", "description": "Full-stack CRUD generator with authentication, role management, and audit logging"},
    {"@type": "Product", "name": "FreelancerOS", "description": "Claude Code Personal OS template for solo developers"},
    {"@type": "Product", "name": "QuickBill", "description": "Lightweight invoicing for developers using Node.js and SQLite"},
    {"@type": "Product", "name": "BizPulse", "description": "Real-time business monitoring and anomaly detection"},
    {"@type": "Product", "name": "Personal Claude OS", "description": "Portable ~/.claude/ configuration with custom agents and skills"},
    {"@type": "Product", "name": "ClientFlow", "description": "Project management for solo developers with SQLite backend"}
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you really develop everything on a phone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Termux on Android gives me Node.js, git, SSH, and Neovim — everything I need to write code, run tests, and deploy to production. I've shipped production hotfixes from a bus using this setup. A laptop isn't faster for terminal-based development; it's just more comfortable. When I need one, I use a ThinkPad T480s running Ubuntu."
      }
    },
    {
      "@type": "Question",
      "name": "What does your stack actually cost per month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One Contabo VPS at roughly $10/month. No managed databases, no cloud CI pipelines, no SaaS subscriptions for the infrastructure layer. The Gumroad products I sell more than cover that overhead."
      }
    }
  ]
}
</script>
