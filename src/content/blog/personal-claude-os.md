---
title: "Personal Claude OS: How I Turned ~/.claude/ Into a Portable Productivity System"
description: "A complete guide to building your own Claude Code configuration — slash commands, agent personas, SOUL.md philosophy, and lifecycle hooks — as a deployable package."
pubDate: 2024-11-15
author: "Rachid"
tags: ["claude-code", "tutorial", "products"]
featured: false
---

Claude Code gives you a `~/.claude/` directory. Most people put a `CLAUDE.md` in there and call it done. I spent three months turning it into a full operating system for how I work — and then packaged it as a product.

This post is the complete architecture guide.

## The Core Philosophy

A Claude Code configuration should do three things:

1. **Express identity** — who is this agent, what does it care about, what are its non-negotiables
2. **Define workflows** — how does it approach specific task types
3. **Encode memory patterns** — what should persist across sessions

The mistake most people make is treating `CLAUDE.md` as a prompt. It's not a prompt — it's a constitution.

## Directory Structure

```
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

The full Personal Claude OS is available as a Gumroad product with a 50-page PDF guide covering every design decision in detail. Or just steal the ideas here — that's fine too.
