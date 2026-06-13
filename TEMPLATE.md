---
title: 'Post Title Here — Max ~70 chars'
description: 'One sentence summary — 120–160 chars recommended. Used in previews, search, and social cards.'
pubDate: YYYY-MM-DD
author: 'Rachid Houmayni'
authorImage: 'https://avatars.githubusercontent.com/u/146502229?v=4'
image: 'https://images.unsplash.com/photo-XXXXXXXXXXXXX?w=1200'
category: 'Tutorials'
subCategory: 'Claude Code'
readTime: 'N min read'
tags: ['tag-one', 'tag-two', 'tag-three']
---

<!--
  ═══════════════════════════════════════════════════════════════════
  DEVDIARY — POST TEMPLATE
  ═══════════════════════════════════════════════════════════════════

  Derived from the 5 original starter template posts in /posts/

  INSTRUCTIONS:
    - Copy this file → rename to YYYY-MM-DD-your-slug.md
    - Fill frontmatter following the rules below
    - Write body using the components documented here
    - Delete ALL comment blocks before publishing

  ═══════════════════════════════════════════════════════════════════
  1. FRONTMATTER — Exact Field Order (from originals)
  ═══════════════════════════════════════════════════════════════════

  Order:  title → description → pubDate → author → authorImage
          → image → category → subCategory → readTime → tags

  Every field:
    title        — Single quotes ' '  |  Keep under 70 chars
    description  — Single quotes ' '  |  120–160 chars  |  No colon inside
    pubDate      — YYYY-MM-DD         |  Real dates, not future
    author       — 'Rachid Houmayni'  |  Always single quotes
    authorImage  — GitHub avatar URL  |  Present in ALL 5 originals
                  (e.g. 'https://avatars.githubusercontent.com/u/146502229?v=4')
    image        — URL (see §2 below)
    category     — One of the existing set (see §3)
    subCategory  — One of the existing set (see §3)
    readTime     — Format: 'N min read'  |  Single quotes
    tags         — Array with SINGLE quotes  |  ['tag1', 'tag2']
                   NOT ["tag1", "tag2"]

  Optional (exact position):
    featured: true   — Placed BEFORE 'tags'  |  Default: false
                       Only 1/5 originals uses this (zero-trust)

  ═══════════════════════════════════════════════════════════════════
  2. IMAGE
  ═══════════════════════════════════════════════════════════════════

  Originals use long AIDA-generated image URLs.
  For new posts, use Unsplash with ?w=1200 suffix:

    https://images.unsplash.com/photo-XXXXXXXXXXXXX?w=1200

  ❌ Avoid local paths (/og-*.png) — requires file in /public/

  ═══════════════════════════════════════════════════════════════════
  3. CATEGORY & SUBCATEGORY VALUES
  ═══════════════════════════════════════════════════════════════════

  Originals set:
    Category        | SubCategory
    ─────────────────────────────────
    DevOps          | Orchestration
    DataScience     | DataEngineering
    Programming     | WebPerformance
    AI&ML           | NeuralNetworks
    Cybersecurity   | CloudInfrastructure

  Our project uses:
    Tutorials       | Claude Code
    Projects        | AI Agents
    Blog            | LLM Agents
                    | Announcement

  ═══════════════════════════════════════════════════════════════════
  4. BODY STRUCTURE — THE ORIGINAL PATTERN
  ═══════════════════════════════════════════════════════════════════

  A) INTRO PARAGRAPH (required — 5/5 originals start this way)
       One lead paragraph before the first heading.
       Sets context, hooks the reader.

  B) HEADINGS
       NO H1 (#) in body — title comes from frontmatter.
       Start body headings at H2 (##).
       Max depth in originals: H3 (###).
       No heading IDs {#id} in originals (but valid markdown).

  C) BOLD
       **text** — used sparingly for key terms (1/5 originals).

  D) BLOCKQUOTE — Standard markdown
       > "Quote text here."

  E) CUSTOM HTML CALLOUT BOX (from zero-trust-architecture.md)
       The theme renders this inline HTML component natively:

  <div class="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
  <div class="absolute top-0 left-0 h-full w-1 bg-primary"></div>
  <div class="flex items-start gap-4">
  <div class="rounded-full bg-primary/20 p-2 text-primary shrink-0 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
  </div>
  <div>
  <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase font-display">Best Practice: Title</h4>
  <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
  Description text here.
  </p>
  </div>
  </div>
  </div>

  F) CUSTOM HTML CODE BLOCK WRAPPER (from zero-trust-architecture.md)
       Wraps a standard markdown code fence with filename + copy button:

  <div class="code-block-wrapper group">
  <div class="code-header">
  <span class="code-filename">filename.ext</span>
  <button class="copy-button">
  <span class="icon-container inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
  </span>
  <span>Copy</span>
  </button>
  </div>

  ```python
  # Always include a language tag
  print("code goes here")
  ```

  </div>

  G) CODE BLOCKS
       Standard markdown ```language
       Language tags used in originals: python
       Our project also uses: bash, typescript, markdown, json, text
       ❌ Never use bare ``` without a language tag

  H) WHAT ORIGINALS DO NOT USE (0/5 posts):
       ❌ Tables (markdown pipe tables)
       ❌ Horizontal rules (---) in body
       ❌ TOC sections
       ❌ FAQ sections
       ❌ Numbered lists
       ❌ Bullet lists
       ❌ Inline images (![alt](url))
       ❌ Footer CTAs
       ❌ H1 (#) in body
       ❌ Heading anchors {#id}

  ═══════════════════════════════════════════════════════════════════
  5. TAG FORMAT & VALUES
  ═══════════════════════════════════════════════════════════════════

  Use SINGLE quotes inside the array: ['etl', 'elt', 'dbt']
  NOT double quotes: ["etl", "elt", "dbt"]

  Existing pool (from originals + custom posts):
    claude-code, ai-agents, ai-coding, mcp, tutorial,
    quick-start, python, ml, sqlite, products,
    announcement, welcome, devdiary

  ═══════════════════════════════════════════════════════════════════
  6. THE COMPLETE BODY SKELETON (from original pattern)
  ═══════════════════════════════════════════════════════════════════

  1. [optional in HTML: custom callout box or code wrapper]
  2. ## Heading 2
       Body paragraph(s). Can contain **bold** for emphasis.
  3. ## Heading 2
       More body text.
       ### Optional H3 subsection
       More text.
  4. ## Heading 2
       > Optional blockquote for key insight.
  [repeat 3-5 H2 sections typical]
-->

Start with one intro paragraph. This is how every original post begins — a lead that sets context before the first heading. No fluff, just the hook.

## The First Real Section

Body text starts at H2. Write directly, in first person. Every paragraph should earn its place.

> Blockquotes work for pull quotes or external citations. Used in 1/5 originals.

### Optional H3 Subsection

If you need deeper hierarchy, H3 is the max depth used in originals.

[If using a callout box, paste the HTML component from §4E above here.]

[If showing code with a filename, wrap in the HTML component from §4F above here.]

```python
# Standard code block with language tag
def greet(name):
    return f"Hello, {name}!"

# Standalone blocks work fine outside the wrapper too
```

**Bold** sparingly for key terms only. The originals use it once across all 5 posts.

---

*This template is derived from the 5 original starter posts in `/posts/`. For real examples of all these patterns in action, reference `zero-trust-architecture.md` (richest in components) and any of the other 4 for the basic skeleton.*
