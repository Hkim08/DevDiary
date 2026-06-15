---
title: 'Claude Code Personal OS: 10-Minute Quick Start Setup'
description: 'Get a minimal Personal OS running with Claude Code in 10 minutes — CLAUDE.md, MCP servers, and one custom skill.'
pubDate: 2026-06-08
author: 'Rachid Houmayni'
tags: ['claude-code', 'quick-start', 'tutorial']
image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200'
imageAlt: 'Minimal desk with notebook and pen representing personal operating system setup'
---

Stop prompting. Start operating.

A Personal OS is the minimum viable structure that turns Claude Code from a chatbot into an agentic workspace. This guide gets you there in ten minutes.

For the full deep-dive — architecture, auto-dreaming, security hardening, parallel sessions — see [Build Your AI Chief of Staff: A Complete Claude Code Personal OS Guide](/posts/build-ai-chief-of-staff-claude-code-guide/).

---

## Minute 1–2: Your CLAUDE.md

Create `~/.claude/CLAUDE.md` with exactly three things:

```markdown
# My Operating Principles

## Identity
You are my engineering partner. You work on my machine, with my stack,
under my constraints. Think out loud before acting.

## Non-Negotiables
- Never edit .env files without explicit confirmation
- Never delete files without asking first
- Never push to main without review
- Prefer simple over clever

## Stack Defaults
- Runtime: Node.js 18+, Python 3.10+
- Database: SQLite before PostgreSQL
- Format: Prettier with single quotes
- Tests: Run before marking anything done
```

That's it. 27 lines. Claude reads this every session. The specificity — "SQLite before PostgreSQL" instead of "choose the right tool" — is what changes actual output.

![Minimal developer workspace setup with laptop and notebook](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800)

## Minute 3–4: Install MCP Servers

MCP servers are how Claude talks to the real world. Start with two that require zero configuration:

```bash
claude mcp add fetch
claude mcp add brave-search
```

- **fetch** — reads any web page. No API key needed.
- **brave-search** — real web search from within sessions. Free tier available.

Verify they're active with `/mcp` inside a Claude session.

## Minute 5–6: Write One Skill

Skills are reusable workflows. Pick something you do every day. I started with `/review`:

Create `~/.claude/skills/review.md`:

```markdown
---
name: review
description: Pre-commit code review checklist
---

## Review Protocol
Before I commit, check:

1. **Security** — hardcoded credentials, SQL injection, missing validation
2. **Types** — `tsc --noEmit` passes
3. **Tests** — `npm test` passes
4. **Error handling** — every non-trivial operation has try/catch or error return
5. **Edge cases** — empty states, null inputs, rate limits

Report what passes and what fails. Do not proceed if any check fails.
```

Now type `/review` in any session. It takes 90 seconds and catches real bugs.

## Minute 7: Add Project Context

Every project gets its own `./CLAUDE.md` committed to git:

```markdown
# Project: [Name]

## Architecture
- Monorepo with apps/ and packages/ directories
- Express API in apps/api, React frontend in apps/web
- SQLite via better-sqlite3 for data

## Conventions
- Feature branches off main
- Conventional commits (feat:, fix:, chore:)
- Tests alongside source files (*.test.ts)
```

This file travels with the repo. Every team member and every CI pipeline gets the same context.

## Minute 8: The Self-Improvement Habit

    

<h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase font-display">The Self-Improvement Habit</h4>
<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
One habit that compounds everything. When Claude makes a mistake and you correct it, type <code># Update CLAUDE.md so you don't make this mistake again.</code> — Claude proposes a new rule, dates it, and appends it. Your OS improves every single session.
</p>

Claude proposes a new rule, adds it with a date stamp. Your OS learns from every correction. After a month, your `CLAUDE.md` is a remarkably accurate model of how you work.

## Minute 9–10: First Session

```bash
mkdir my-first-os && cd my-first-os
claude
```

Then run your first command:

> *Read my CLAUDE.md. Scan this directory. What do you understand about how I work?*

If Claude accurately describes your preferences and constraints — you're operational.

---

## What You Have After 10 Minutes

| Component | Status |
|---|---|
| Identity layer (CLAUDE.md) | ✅ Running |
| Web access (fetch + search MCP) | ✅ Connected |
| Custom workflow (review skill) | ✅ Usable |
| Project context per repo | ✅ Configured |
| Self-improvement habit | ✅ Started |

This is the minimum viable Personal OS. From here, every session adds capability.

The full system — auto-dreaming, agent personas, security sandboxing, parallel sessions — takes weeks to build and tune. Start here. Add one component per week. Let it compound.

**See the complete build guide:** [Build Your AI Chief of Staff](/posts/build-ai-chief-of-staff-claude-code-guide/) — covers architecture, 8 setup steps, 14 real-world use cases, and the 90-day fluency roadmap.
