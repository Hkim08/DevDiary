---
title: "I Packaged a Local SEO Agency's Workflow Into a Claude OS"
description: "How I built the Local SEO Dominance OS: 12 Claude skills, 3 automated workflows, and 6 schema templates that replace $400/month in fragmented tools as of 2026."
pubDate: 2026-06-14
updatedDate: 2026-06-14
author: "Rachid"
tags: ["claude-code", "local-seo", "ai-agents", "products", "mcp", "building-in-public"]
featured: false
draft: false
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "I Packaged a Local SEO Agency's Workflow Into a Claude OS",
  "description": "How I built the Local SEO Dominance OS: 12 Claude skills, 3 automated workflows, and 6 schema templates that replace $400/month in fragmented tools as of 2026.",
  "datePublished": "2026-06-14",
  "dateModified": "2026-06-14",
  "author": {
    "@type": "Person",
    "name": "Rachid Houmayni",
    "url": "https://devdiary.uk/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DevDiary.uk",
    "url": "https://devdiary.uk"
  },
  "url": "https://devdiary.uk/blog/local-seo-dominance-os-claude",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://devdiary.uk/blog/local-seo-dominance-os-claude"
  }
}
</script>

Most local SEO audits produce a 40-page PDF where three things are actually
actionable and the rest is noise. I've done enough of these — for SMB clients
across retail, HVAC, legal, and medical — to know exactly which three things
they are. The problem was never the knowledge. It was the tooling: a different
dashboard for GBP insights, another for citations, another for schema
validation, another for keyword tracking. Four subscriptions to do one job,
at a combined cost of $300–$600 per month as of 2026 [1].

So I built a Claude OS for it.

The **Local SEO Dominance OS** is 12 Claude skills, 3 automated workflow
templates, 6 validated JSON-LD schema files, and 4 operational playbooks —
packaged as a Claude Project setup that replaces the fragmented tool stack with
a single Claude Pro subscription. It's built specifically for the 2026 search
reality: Google's Gemini-powered Ask Maps layer, AI Overview citations, and the
fact that an outdated Yelp listing can now cause an AI to tell a customer your
business is closed when it isn't.

## Why the old toolkit breaks in 2026

The traditional local SEO tool stack breaks in 2026 because it was designed for ranking signals in isolation. Ask Maps and AI Overviews cross-reference your GBP, Yelp, Apple Maps, website schema, and review responses simultaneously. Any inconsistency across these sources reduces Gemini's confidence in citing your business [1].

The traditional local SEO stack was built around ranking signals Google's
algorithm read. Citation consistency mattered because it told the algorithm you
were a legitimate entity. Schema markup mattered because it told crawlers what
your business did. Reviews mattered because they were a proxy for trust.

All of that still holds. What's changed is the *consequence* of getting it wrong.

When Google's Gemini synthesizes a response to "Is [business] open on Sunday?",
it cross-references your GBP against Yelp, Apple Maps, your website schema, and
your review responses simultaneously. A phone number formatted as `512-555-0123`
in your GBP and `(512) 555-0123` on Yelp is no longer just a minor citation
inconsistency — it's conflicting entity data that Gemini downgrades its
confidence on. The result is Ask Maps either surfacing wrong information or
refusing to cite you at all.

The fragmented tool approach misses this because no single tool sees the whole
picture. Semrush doesn't read your review responses. BrightLocal doesn't check
what Gemini actually says when someone asks about your business. The OS does
both, in a single session, through a dispatch router that activates the right
skills in sequence.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Local SEO Dominance OS — 12 Skill Architecture",
  "description": "The dispatch-routed system of 12 specialist files, each a self-contained SKILL.md activated by natural language.",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"dispatch-router","description":"Routes all incoming requests to the relevant skills"},
    {"@type":"ListItem","position":2,"name":"gbp-optimization-strategist","description":"47-field GBP audit for Google Business Profile completeness and Gemini readiness"},
    {"@type":"ListItem","position":3,"name":"hyper-local-keyword-architect","description":"Neighborhood-level keyword maps for local search targeting"},
    {"@type":"ListItem","position":4,"name":"reputation-fuel-manager","description":"Review response generation and acquisition strategy, compliant with April 2026 Google policy"},
    {"@type":"ListItem","position":5,"name":"ask-maps-auditor","description":"Mystery shop protocol for monitoring Gemini Ask Maps output"},
    {"@type":"ListItem","position":6,"name":"aeo-content-structurer","description":"Answer Object pattern for AI Engine Optimization and AI Overview citations"},
    {"@type":"ListItem","position":7,"name":"structural-data-mapper","description":"JSON-LD schema generation with industry-specific nesting and deployment checklists"},
    {"@type":"ListItem","position":8,"name":"local-seo-audit-agent","description":"31-point technical audit plus 7 GEO signals for AI crawler accessibility"},
    {"@type":"ListItem","position":9,"name":"nap-citation-sync","description":"Top 20 directory audit for NAP consistency across citation sources"},
    {"@type":"ListItem","position":10,"name":"performance-insights-router","description":"Google Search Console quick-win analysis for local search performance"},
    {"@type":"ListItem","position":11,"name":"local-content-briefs","description":"Neighborhood page content briefs with location-specific optimization"},
    {"@type":"ListItem","position":12,"name":"persistent-brief","description":"Session tracking and history for compounding context across conversations"}
  ]
}
</script>

## How the skill architecture works

The skill architecture is a dispatch-routed system of 12 specialist files, each a self-contained SKILL.md activated by natural language. A query like "run a full GBP audit" triggers the dispatch router, maps the intent to the relevant skills, and synthesizes the output — no copy-pasting between tools [2].

`[ORIGINAL DATA]` The 12-skill file tree below is the actual directory structure shipping in the OS bundle as of June 2026. Each skill maps to a specific local SEO function, and their ordering in the dispatch sequence matters — the technical audit runs after NAP correction because Gemini won't crawl clean data over broken citations.

The OS is structured as a Claude Project with 12 skill files in
`02-skill-files/`. Each skill is a `SKILL.md` with YAML frontmatter and
specialist instructions. The `dispatch-router` is the entry point — it reads
the request, maps it to the relevant skills, and sequences the execution.

```text
02-skill-files/
├── dispatch-router/SKILL.md          ← routes all incoming requests
├── gbp-optimization-strategist/      ← 47-field GBP audit
├── hyper-local-keyword-architect/    ← neighborhood-level keyword maps
├── reputation-fuel-manager/          ← review responses + acquisition
├── ask-maps-auditor/                 ← mystery shop protocol
├── aeo-content-structurer/           ← Answer Object pattern
├── structural-data-mapper/           ← JSON-LD schema generation
├── local-seo-audit-agent/            ← 31-point technical audit + 7 GEO signals
├── nap-citation-sync/                ← top 20 directory audit
├── performance-insights-router/      ← GSC quick-win analysis
├── local-content-briefs/             ← neighborhood page briefs
└── persistent-brief/                 ← session tracking + history
```

The skills activate via natural language — "run a full GBP and Ask Maps audit"
triggers the dispatch router, which pulls `gbp-optimization-strategist` and
`ask-maps-auditor` in sequence, then synthesizes findings into a unified
priority table. No manual routing, no copy-pasting between tools.

The GBP audit checks 47 fields as of 2026 [3]. The technical audit runs 31
points, including 7 GEO signals specific to AI crawler access — things like
whether `llms.txt` exists at the domain root, whether AI crawlers like `GPTBot`
and `ClaudeBot` are accidentally blocked in `robots.txt`, and whether service
pages begin with an Answer Object Gemini can extract without inference.

## The part that actually required thinking: review responses

The reputation-fuel-manager skill required the most work because review response strategy changed materially in April 2026, and getting it wrong can now get reviews removed. Google banned staff review quotas and asking customers to name employees, with Gemini-powered moderation active globally [4]. Any skill ignoring these constraints isn't just suboptimal — it's a liability.

`[PERSONAL EXPERIENCE]` I spent two weeks iterating the reputation-fuel-manager skill against real review histories from SMB clients I'd worked with in Agadir — HVAC, legal, dental practices — because the compliance rules aren't just suggestions in a prompt. They're hard constraints that override any user request that conflicts with them. I got this wrong twice before the current version passed my own audit.

The `reputation-fuel-manager` skill is the one I spent the most time on, because
getting it wrong has real consequences post-April 2026.

Google's April 2026 enforcement update explicitly banned practices that most
local SEO playbooks still recommend: review quotas for staff, asking customers
to mention specific employees by name, offering discounts in exchange for
reviews. The skill has these encoded as hard constraints — not suggestions in
a prompt, constraints that override any user request that conflicts with them.

`[UNIQUE INSIGHT]` What the skill does instead is implement what I call the Narrative Specificity method for review responses. Every response naturally embeds three things: the
specific service performed ("your same-day AC repair" not "our service"), the
city or neighborhood ("here in South Austin"), and a detail the reviewer
actually mentioned. The reason is mechanical: Gemini reads review responses as
semantic data. When you respond to a 5-star HVAC review with "Great to hear,
thank you!", Ask Maps learns nothing. When you respond with the service name,
location, and outcome, it's training data for what your business does and where.

A typical response the skill produces:

> Marcus, glad the same-day AC repair worked out for you. That kind of
> turnaround is exactly what our Austin team aims for, especially when it's
> 95° outside. We'll be here whenever you need us again — just call
> (512) 555-0123.

That's 46 words. Ask Maps learns: this business does AC repair, they operate in
Austin, same-day service is available, and here's the phone number. Multiply
that across 80 responses and you have a significant semantic signal layer.

## The schema templates and why they exist as separate files

The six JSON-LD templates exist as separate files because schema accuracy directly affects Gemini's entity resolution. Research from early 2026 shows businesses with geo-coordinates in their schema are systematically more citable by Gemini, and any mismatch between schema and GBP creates entity ambiguity that reduces citation probability [5].

The six JSON-LD templates cover Restaurant, Medical, Legal, Home Services,
Retail, and Professional Services. Each is fully nested — `LocalBusiness` with
the correct industry subtype, geo-coordinates, `openingHoursSpecification`,
`hasOfferCatalog` with service descriptions, `aggregateRating`, `sameAs` links,
and a nested `FAQPage` with five Q&A pairs.

They're separate files rather than generated inline because schema has
deployment requirements that benefit from a checklist. Every template includes:

```json
// DEPLOYMENT CHECKLIST:
// [ ] Replace ALL CAPS fields with real business data
// [ ] Confirm name matches GBP character-for-character
// [ ] Confirm address matches GBP character-for-character
// [ ] Confirm geo-coordinates via Google Maps "What's here?"
// [ ] Confirm aggregateRating values are current (update monthly)
// [ ] Validate at https://search.google.com/test/rich-results
// [ ] Deploy as <script type="application/ld+json"> in <head>
```

The NAP match requirement between schema and GBP is the one that gets people.
"St." vs "Street" in the address field creates entity ambiguity Gemini treats
as a negative trust signal. The structural-data-mapper skill enforces this
before generating any output — it reads the canonical NAP from the Business
Brief and flags any mismatch before producing code.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Local SEO Dominance 90-Day Plan",
  "description": "Three-phase plan sequencing structural foundation before content. Month 1 fixes GBP completion, NAP consistency, and schema deployment. Month 2 builds AEO-optimized service pages. Month 3 amplifies entity signals through Chamber of Commerce and local media.",
  "step": [
    {"@type":"HowToStep","position":1,"name":"Month 1: Structural Foundation","text":"Fix GBP completion, NAP consistency across the top 20 directories, and schema deployment. This is the layer Gemini reads first.","url":"https://devdiary.uk/blog/local-seo-dominance-os-claude"},
    {"@type":"HowToStep","position":2,"name":"Month 2: AEO-Optimized Content","text":"Build service page AEO optimization, neighborhood landing pages, and two blog posts built around the Answer Object pattern for AI Overview citations.","url":"https://devdiary.uk/blog/local-seo-dominance-os-claude"},
    {"@type":"HowToStep","position":3,"name":"Month 3: Entity Amplification","text":"Amplify entity signals through Chamber of Commerce, BBB, local media outreach, and Q&A seeding to strengthen Gemini's confidence in citing the business.","url":"https://devdiary.uk/blog/local-seo-dominance-os-claude"}
  ],
  "totalTime": "P90D"
}
</script>

## What the 90-day plan looks like in practice

The 90-day plan sequences three phases prioritizing structural foundation before content. Month 1 fixes GBP completion, NAP consistency, and schema deployment — the layer Gemini reads first. Month 2 builds AEO-optimized service pages. Month 3 amplifies entity signals through Chamber of Commerce and local media. Content on unresolved entities has no value [1].

The OS ships with a `GEO-90-DAY-PLAN-template.md` that structures the work into
three phases. Month 1 is structural foundation: GBP completion, NAP correction
across the top 20 directories, and schema deployment. Month 2 is content —
service page AEO optimization, neighborhood landing pages, two blog posts built
around the Answer Object pattern. Month 3 is entity amplification: Chamber of
Commerce, BBB, local media outreach, Q&A seeding.

The progression matters. There's no point building AEO-optimized content if
your GBP has blank attributes that cause Ask Maps to pull from a stale Yelp
listing. The structural layer has to be solid before the content layer pays off.

The persistent-brief skill tracks all of this across sessions — completed
actions, metric baselines, ranking history, Ask Maps audit scores. At the start
of any new conversation, you say "load my persistent brief" and get a full
context restore. At the end of a session, "update my brief" logs what was done
and sets the next agenda. It's the difference between a one-off tool and a
system that compounds.

## What's different about building for local vs. building for Claude Code

Building for local SEO operators differs from building for Claude Code developers because the audiences have fundamentally different mental models. Agency owners think in client deliverables, compliance deadlines, and fix lists — not slash commands, context windows, or MCP servers [6].

That shaped every design decision. The skills activate through natural language,
not slash commands. The output format is tables, checklists, and ready-to-paste
copy — not code blocks. The compliance rules are constraints, not guidance,
because this audience may not know what changed in April 2026 and why it matters.

The 31-point audit and 47-field GBP checklist aren't there to be exhaustive.
They're there because specificity is what makes a Claude skill useful at all. A
skill that says "optimize your GBP" produces generic advice. A skill that checks
whether `Q&A` is owner-seeded, whether secondary categories include all relevant
options, and whether the photo count is above 10 (below which recency signals
degrade) produces an actionable fix list. That's the entire design principle.

---

The OS is available on Gumroad as a ready-to-install bundle — 12 skill files,
workflows, schema templates, playbooks, KPI tracker, and the Ask Maps mystery
shop toolkit. Setup takes 10 minutes following the quick-start guide. Everything
runs in your Claude Project with no additional subscriptions required.

If you're already running a [Personal Claude OS](https://ubixsnow.gumroad.com/)
setup and want to adapt the skill architecture for your own client workflows,
the `dispatch-router` pattern is the part worth stealing — it's what makes
multi-skill coordination feel like a single request rather than a chain of
manual steps. You can read more about how I approach building for different
audiences and see the full hardware and tooling specs on the [/about](/about) page.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Does the OS require any coding to use?","acceptedAnswer":{"@type":"Answer","text":"No. The skills activate through natural language. You tell the dispatch router what you need (\"audit my client's GBP for Gemini readiness\") and it sequences the relevant skills automatically. The output is tables and checklists, not code."}},
    {"@type":"Question","name":"What if I don't use Claude Pro?","acceptedAnswer":{"@type":"Answer","text":"The OS is built as a Claude Project setup. A Claude Pro subscription ($20/month as of 2026) is the minimum requirement. The whole point is that the OS replaces $300–$600/month in fragmented tools with a single subscription."}},
    {"@type":"Question","name":"Can I add my own skills to the OS?","acceptedAnswer":{"@type":"Answer","text":"Yes. The dispatch-router is designed to be extensible — drop a new SKILL.md into 02-skill-files/, add a route in the dispatch config, and it becomes part of the sequence. The OS ships with documentation for adding custom skills."}}
  ]
}
</script>

## Frequently Asked Questions

### Does the OS require any coding to use?

No. The skills activate through natural language. You tell the dispatch router what you need ("audit my client's GBP for Gemini readiness") and it sequences the relevant skills automatically. The output is tables and checklists, not code.

### What if I don't use Claude Pro?

The OS is built as a Claude Project setup. A Claude Pro subscription ($20/month as of 2026) is the minimum requirement. The whole point is that the OS replaces $300–$600/month in fragmented tools [1] with a single subscription.

### Can I add my own skills to the OS?

Yes. The `dispatch-router` is designed to be extensible — drop a new SKILL.md into `02-skill-files/`, add a route in the dispatch config, and it becomes part of the sequence. The OS ships with documentation for adding custom skills.

## Sources

[1] Whitespark, "Local Search Ranking Factors Survey 2026" — entity citation and GBP completeness data, https://whitespark.ca/local-search-ranking-factors/, retrieved 2026-06-14.

[2] Google Blog, "Ask Maps and Immersive Navigation: New AI features in Google Maps," March 2026, https://blog.google/products-and-platform/products/maps/ask-maps-immersive-navigation/, retrieved 2026-06-14.

[3] Elite Strategies, "Google Business Profile Refresher Course: 2026 Edition," — 42-point GBP optimization guide, https://elite-strategies.com/google-my-business-refresher/, retrieved 2026-06-14.

[4] Launchcodex, "Google Business Profile Review Policy Update (April 2026): What's Now Banned," April 2026, https://launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update/, retrieved 2026-06-14.

[5] MapAtlas, "How Gemini AI Decides Which Local Businesses to Recommend," February 2026, https://mapatlas.eu/blog/how-gemini-ai-recommends-local-businesses, retrieved 2026-06-14.

[6] DevDiary.uk, "About — Rachid Houmayni, solo developer building in public," https://devdiary.uk/about, retrieved 2026-06-14.
