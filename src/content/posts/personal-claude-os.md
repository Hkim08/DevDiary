---
title: 'Personal Claude OS: How I Turned ~/.claude/ Into a Portable Productivity System'
description: 'A complete guide to building your own Claude Code configuration — slash commands, agent personas, SOUL.md philosophy, and lifecycle hooks — as a deployable package.'
pubDate: 2024-11-15
author: 'Rachid Houmayni'
image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200'
category: 'Tutorials'
subCategory: 'Claude Code'
readTime: '7 min read'
tags: ['claude-code', 'tutorial', 'products']
---

Claude Code gives you a `~/.claude/` directory. Most people put a `CLAUDE.md` in there and call it done. I spent three months turning it into a full operating system for how I work — and then packaged it as a product.

This post is the complete architecture guide.

## The Core Philosophy

A Claude Code configuration should do three things:

1. **Express identity** — who is this agent, what does it care about, what are its non-negotiables
2. **Define workflows** — how does it approach specific task types
3. **Encode memory patterns** — what should persist across sessions

<div class="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
<div class="absolute top-0 left-0 h-full w-1 bg-primary"></div>
<div class="flex items-start gap-4">
<div class="rounded-full bg-primary/20 p-2 text-primary shrink-0 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
</div>
<div>
<h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase font-display">Key Insight: CLAUDE.md Is a Constitution</h4>
<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
The mistake most people make is treating <code>CLAUDE.md</code> as a prompt. It's not a prompt — it's a constitution. A prompt gives instructions. A constitution encodes identity, values, and boundaries. The difference determines whether your agent operates with consistency or drift.
</p>
</div>
</div>
</div>

![Terminal showing ~/.claude/ directory structure](https://images.unsplash.com/photo-1629654291663-86c1b36a28c7?w=800)

## Directory Structure

```text
~/.claude/
├── CLAUDE.md              # The constitution (identity + global rules)
├── commands/              # Slash command definitions
│   ├── audit.md          # /audit — runs a project health check
│   ├── ship.md           # /ship — pre-commit checklist
│   ├── review.md         # /review — code review mode
│   ├── plan.md           # /plan — structured planning session
│   └── debrief.md        # /debrief — session summary + KB update
├── personas/              # Switchable agent modes
│   ├── builder.md        # Fast, pragmatic, ships things
│   ├── architect.md      # Slow, thorough, documents everything
│   └── debugger.md       # Systematic, hypothesis-driven
└── hooks/                 # Lifecycle event handlers
    ├── on_session_start.md
    └── on_task_complete.md
```

## The CLAUDE.md Constitution

The top-level file is the most important. It shouldn't be a list of instructions — it should read like a values document:

<div class="code-block-wrapper group">
<div class="code-header">
<span class="code-filename">~/.claude/CLAUDE.md</span>
<button class="copy-button">
<span class="icon-container inline-flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    </svg>
</span>
<span>Copy</span>
</button>
</div>

```markdown
# CLAUDE.md — The Personal Claude OS

## Identity

You are a senior full-stack developer and systems architect working
as a solo consultant. Your client base is SMBs. Your stack is
Node.js/TypeScript, SQLite, Python, vanilla HTML/JS.

You run on Termux/Android and a Contabo VPS. This shapes
all architecture decisions: prefer lightweight, portable solutions
over cloud-managed services. No native dependencies unless
absolutely unavoidable.

## Non-Negotiables

1. Never suggest a solution that requires a managed cloud service
   when a self-hosted alternative exists and is reasonable.
2. Always write code that works on Node.js 18+ without native deps.
3. SQLite before PostgreSQL. PostgreSQL before MongoDB.
4. Ship something working over something perfect.

## Working Style

- Think out loud before coding. A paragraph of reasoning before
  the first code block.
- Write the simplest thing that could possibly work, then refine.
- When in doubt, ask. Don't assume requirements.
- Every session ends with a /debrief.
```

</div>

The key is specificity. "Be helpful and concise" tells Claude nothing. "SQLite before PostgreSQL" is a real architectural preference that changes actual output.

## Slash Commands

Claude Code's slash command system lets you define reusable workflows. My `/ship` command runs a pre-commit checklist:

```markdown
<!-- commands/ship.md -->
# /ship

Before committing, check:

1. **Tests** — run `npm test` or equivalent. If tests don't pass, stop.
2. **Types** — run `tsc --noEmit`. Fix all type errors.
3. **Lint** — run the linter. Fix all errors, review warnings.
4. **README** — is the README still accurate? Update if needed.
5. **Changelog** — add an entry if this is a significant change.
6. **Secrets** — scan for any hardcoded API keys, tokens, or passwords.

If all checks pass: commit with a conventional commit message.
If any check fails: report what failed and what's needed to fix it.
```

The `/debrief` command is the one I use most — it ends every session with a structured summary that becomes the start of the next one:

```markdown
<!-- commands/debrief.md -->
# /debrief

At the end of this session, produce:

## Session Summary
- What we built / changed
- What decisions were made and why
- What's working, what's broken

## Knowledge Base Updates
- New patterns or approaches discovered
- Anti-patterns to avoid
- Performance observations

## Next Session Starter
- The exact state of things right now
- The next task (specific, actionable)
- Any blocking questions or dependencies

Format as markdown. Save to `docs/sessions/YYYY-MM-DD.md`.
```

## Agent Personas

Different tasks need different modes. My three personas:

**Builder** — for feature work where shipping matters more than perfection:

> You are in Builder mode. Prioritise working code over beautiful code. Use the simplest approach that satisfies the requirements. Leave TODOs rather than rabbit-holing on edge cases. Ship the 80%.

**Architect** — for new systems or major refactors:

> You are in Architect mode. Take time to think about the full system before touching any code. Draw ASCII diagrams. Write the ADR (Architecture Decision Record) before the first file. Consider failure modes.

**Debugger** — for systematic bug investigation:

> You are in Debugger mode. State a hypothesis before running any commands. Test hypotheses with the minimum viable experiment. Document each finding. Don't fix anything until you understand the root cause.

Switching is a single command: `/persona builder`, `/persona architect`, `/persona debugger`.

## What This Changed

The two changes that made the biggest difference:

1. **The non-negotiables list** — stopped half the back-and-forth where Claude would suggest a Docker Compose setup when I needed something that runs in Termux.

2. **The `/debrief` command** — made multi-session work coherent. I now start every morning by reading the previous session's debrief. Two minutes of context instead of ten minutes of re-orienting.

The full Personal Claude OS template — all 19 files including hooks, skills, agents, and MCP config, plus a 50-page field guide — is available as a ready-to-install bundle on [Gumroad](https://gumroad.com/rachidhakim). Run one script and the whole thing installs to `~/.claude/` in under five minutes. Or just steal the ideas here — that's fine too.

For the comprehensive guide covering architecture, MCP, memory, security, and parallel sessions, see [Build Your AI Chief of Staff](/blog/build-ai-chief-of-staff-claude-code-guide/). For the fastest path from zero to operating, start with the [10-Minute Quick Start Setup](/blog/claude-code-personal-os-guide/).
