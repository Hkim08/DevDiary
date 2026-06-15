---
title: 'I Stopped Prompting Claude and Started Operating It'
description: 'The shift from chatbot user to agent operator — a Personal Claude OS built from config files, shell hooks, and Markdown.'
pubDate: 2026-06-10
author: 'Rachid Houmayni'
tags: ['claude-code', 'ai-agents', 'tutorial', 'products']
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'
imageAlt: 'Abstract digital network representing the shift from prompting to operating AI systems'
---

## The shift from chatbot user to agent operator — and the folder structure that made it real

---

Last November I spent forty-five minutes watching Claude refactor a database migration layer, only to realize it had been working confidently and wrongly for the last twenty of them. It had forgotten a constraint I'd mentioned at the start of the session. Not because it's a bad model. Because I'd given it no memory, no guardrails, and no way to verify its own work. I was using a powerful autonomous agent the same way I used Google in 2009 — typing things at it and hoping.

That was the last time I operated that way.

What I have now isn't a better prompt. It's a Personal Claude OS: a folder of configuration files, shell hooks, and Markdown documents that gives Claude persistent identity, security boundaries, and reusable skills. It took a weekend to build. It has since saved me more hours than I can count, and it improves every week without me touching it.

This article is about how it works, why it works, and how you can build your own.

---

## The Real Problem With How Most People Use Claude

Before I describe the solution, I want to be precise about the problem — because most people diagnose it wrong.

The common complaint is: "Claude keeps forgetting things." That's not quite right. The model isn't forgetting — you're just not giving it anything to remember. Every new session, every new chat window, is a blank slate. You are the only persistent layer in the system, which means you are the bottleneck.

The less-discussed problem is worse: **instruction decay**. Frontier models can reliably follow somewhere around 150 to 200 distinct instructions at once. Claude Code's internal system prompt already consumes roughly 50 of those. So when you dump a 300-line context document into chat, you're not giving Claude more to work with — you're overwhelming its attention budget. Rules start getting ignored. The model starts making the exact mistakes you wrote rules to prevent.

The third problem is what I call the **trust-then-verify gap**. You let Claude run autonomously for 20 minutes. You come back and review the output. You realize it solved the right problem in the wrong file, or passed all your tests by deleting them, or introduced a security regression because nothing stopped it. You were the only gate, and you weren't watching.

These are architecture problems, not model problems. And they have an architectural solution.

---

## What a Claude OS Actually Is

I want to be precise here because the term "AI operating system" gets used in marketing-y ways that don't mean anything.

A Personal Claude OS is not software you install. It's a folder structure — specifically, a `~/.claude/` directory containing a hierarchy of Markdown files and shell scripts that Claude Code reads at startup and during execution. That's it. The "operating system" is a metaphor, but it's a useful one: just as an OS provides a kernel, memory, device drivers, and process isolation for applications, your Claude OS provides identity, memory, tool connections, and security boundaries for your agents.

Here's the structure I run:

```text
~/.claude/
├── CLAUDE.md              ← Global identity: my rules, values, non-negotiables
├── claude.json            ← MCP servers + hook registration
├── rules/
│   ├── security.md        ← Credential and file access rules
│   ├── git.md             ← Branch strategy, commit format
│   └── testing.md         ← Coverage targets, structure
├── skills/
│   ├── review-pr.md       ← /review
│   ├── simplify.md        ← /simplify
│   └── debug.md           ← /debug
├── agents/
│   ├── chief-of-staff.md  ← /chloe — daily brief, inbox triage
│   └── research.md        ← /research — deep-dive with citations
└── hooks/
    ├── pre-tool-use.sh    ← Blocks dangerous file/command access
    ├── post-tool-use.sh   ← Auto-formats edited files
    └── stop-hook.sh       ← Tests must pass before task completes
```

Each project also gets its own `./CLAUDE.md` (committed to Git, shared with the team) and a `./CLAUDE.local.md` (gitignored, for personal machine-specific quirks).

The whole thing is portable plain text. If I switch from Claude Code to Cursor or any other tool that reads Markdown context files, I point it at this folder and everything comes with me. My "digital soul" — as the Agent OS literature calls it — travels with me.

![Claude OS folder structure shown as a file tree on a laptop workspace](https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800)

---

## The Identity Layer: The Most Important File You'll Write

Your `~/.claude/CLAUDE.md` is the global identity layer. It's the first thing Claude reads in every session. It defines who you are, how you work, and what Claude must never do.

Mine is 87 lines. I deliberately keep it under 100. Here's the structure:

**Communication style** (5 lines): How direct I want answers, whether I want step-by-step reasoning shown or just results, what I find annoying.

**Operational non-negotiables** (8 lines): The rules that get enforced in every context, no matter what. Mine include:

```text
- NEVER send an email or Slack message without showing me a draft first.
- NEVER delete files without explicit confirmation.
- NEVER push to main without my instruction.
- NEVER run DROP, TRUNCATE, or DELETE without WHERE without confirmation.
- Prefer reversible actions over irreversible ones.
```

**Technical stack defaults** (6 lines): My default runtime, database preference, package manager, formatter. These get overridden per-project — this is just the fallback.

**Planning protocol** (5 lines): For tasks over 30 minutes, stop and propose a plan. For tasks touching more than three files, list the affected files. Use Plan Mode for architecture decisions.

**Self-improvement loop** (4 lines): After every correction, update this file. Use `#` to trigger: "Update CLAUDE.md so you don't make this mistake again."

The last one is the most important. It's what makes the OS compound in value rather than decay into a stale document nobody reads.

### The Interview Method

Don't write your CLAUDE.md from scratch. Have Claude draft it.

Open Claude Code and type:

> *Interview me with 15 questions to help me write my CLAUDE.md. Ask about my tech stack, my coding preferences, what AI behaviors frustrate me, my non-negotiables, and what I want Claude to always and never do.*

The output will be rough. Trim it to under 100 lines, reorder by importance (most critical rules first), and you're done. You now have a foundation that's specifically yours.

---

## The Most Overlooked Distinction in Agentic AI

Here's something I didn't understand for months, and I think most people using Claude Code don't understand either:

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

The `pre-tool-use.sh` hook in my setup runs before every single tool call. It blocks edits to `.env` files, SSH keys, `*.pem` certificates, and `credentials.json`. It blocks shell commands containing `rm -rf /`, `DROP TABLE`, `TRUNCATE`, and `curl | bash`. These aren't suggestions. They're hard stops. Claude gets a non-zero exit code and cannot proceed.

The `stop-hook.sh` runs before Claude marks any task as complete. It runs `npm test`. If tests fail, the task cannot be marked done. The agent literally cannot finish unless the tests pass. This closes the trust-then-verify gap entirely — I don't need to come back and check the output, because the system already checked it.

Here's how to think about it:

- Use `CLAUDE.md` for preferences, philosophy, context, and conventions.
- Use hooks for anything that, if violated, would cause real damage.

If a rule matters enough to write down, ask yourself: should this be advisory or deterministic? Most rules that developers write in their `CLAUDE.md` should probably be hooks.

---

## MCP: Wiring Your Tools as Device Drivers

The Model Context Protocol is how Claude reaches the real world. Instead of you copying a stack trace from Sentry and pasting it into the terminal, Claude reads Sentry directly. Instead of you summarizing a GitHub issue for the agent, Claude fetches it. You stop being the integration layer.

I think of MCP servers as device drivers. Just like an OS needs a driver to talk to a printer or a network card, your Claude OS needs a driver to talk to GitHub, your database, your search engine.

My active stack:

- **fetch** — No API key. Reads any web page. Start here.
- **brave-search** — Free tier available. Enables real web search from within sessions.
- **filesystem** — Read access to my project directories.
- **github** — PRs, issues, repo browsing. Requires a personal access token.
- **postgres** — Direct database queries. Game-changing for debugging data issues.
- **sequential-thinking** — Externalizes step-by-step reasoning into revisable steps before implementation.

One important principle: **always start read-only**. When I add a new MCP server, I configure it with the minimum permissions needed. I don't grant write access until I've verified read access working correctly and I'm confident in what the agent will do with write privileges.

The configuration lives in `~/.claude.json`. Each server is a short JSON block pointing to an npm package and any required env vars. The whole thing takes about ten minutes to set up for a new server.

![Network of connected tools representing MCP server integrations](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800)

---

## Skills: Packaging Your Best Workflows

Skills are Markdown files that describe a workflow the agent can execute on command. They live in `~/.claude/skills/`. You trigger them with slash commands.

The three I use constantly:

**`/review`** — My full PR review protocol. When I type this before committing anything, Claude runs through architecture concerns, security scan (hardcoded credentials, SQL injection, missing input validation), test coverage, TypeScript strictness, and error handling patterns. It takes about 90 seconds and has caught real bugs. I've made it a hard personal rule: nothing gets committed without a `/review` pass.

**`/simplify`** — Takes selected code and reduces complexity without changing behavior. Useful for the inevitable moment three weeks into a project when a function has grown to 80 lines and you're not sure how it works anymore. The skill enforces a rule I like: don't change the public API, just make the internals readable.

**`/debug`** — A five-phase systematic debugging protocol: reproduce, isolate, hypothesize (list three candidates ranked by likelihood), verify, fix. The most useful part is Phase 3 — forcing three ranked hypotheses before writing any code. It's remarkable how often the first hypothesis is wrong and the second or third is right.

Writing a skill is simple: create a Markdown file with a YAML frontmatter block (name, description, trigger) and write the instructions as if you're briefing a very competent junior developer. The skill I'm most proud of is the debug one, because it changed how *I* debug, not just how Claude debugs.

---

## Agents: Specialized Personas That Inherit Your Foundation

Skills handle workflows within a session. Agents are specialized personas that run in their own context with specific tools and instructions.

The most useful one I've built is the Chief of Staff agent, which I trigger with `/chloe`.

Every morning, before I open any email or check any chat, I run `/chloe morning`. It pulls from my calendar (Google Calendar MCP), checks flagged emails (Gmail MCP), and produces:

- **Priority alerts**: things that need a decision from me today
- **Meeting pre-reads**: for each meeting, who's attending, what the goal is, what I should not agree to without more information
- **Commitment tracker**: things I promised to deliver that are overdue, and things others promised me that are overdue
- **Inbox triage**: unread email sorted into four buckets (reply today / can wait / FYI only / unsubscribe candidate)

The whole thing takes about 40 seconds to generate and replaces 20 minutes of inbox triage. The rule I'm most grateful for: it never sends anything without showing me a draft first. That's a non-negotiable baked into the agent's identity layer.

The research agent is the other one I rely on. When I need to understand something deeply — a new library, a security vulnerability, a competitor's architecture — I run `/research [topic]`. It runs in a forked context (so it doesn't pollute my main session's attention budget), uses Brave Search and Fetch to read primary sources, and returns a structured Markdown document with citations. The key rule: it never fills knowledge gaps with training data. If it can't find something in a source, it says so explicitly.

---

## The Self-Improvement Loop: Why This Compounds

The habit that makes everything else worth it is also the simplest.

Every time Claude makes a mistake and I correct it, I type:

```text
# Update CLAUDE.md so you don't make this mistake again.
```

Claude proposes a new rule, adds it to the right file (global vs. project), and prefixes it with a date stamp so I can audit the change. The OS becomes a living document that captures every lesson learned rather than requiring me to remember them across sessions.

After six months of this, my `CLAUDE.md` is a remarkably accurate model of how I work, what I care about, and what my systems look like. It took six months to build. A new developer joining my project who reads it would understand my technical philosophy in about ten minutes.

The compounding effect is real. My first agent (the Chief of Staff) took a weekend to configure, tune, and get to a point where I trusted it. My second agent (the research agent) took an afternoon, because it inherited the identity layer, the MCP connections, and all the lessons already encoded in `CLAUDE.md`. The third agent I build will take an hour.

This is the fundamental shift: instead of prompting an AI, you're operating a system that gets smarter every time you use it.

---

## What I Got Wrong Initially

A few mistakes I made that you can skip:

**Over-specifying the global CLAUDE.md.** I initially put everything in one file: tech stack details, project-specific rules, personal preferences, commit format, test structure. It became 280 lines. Claude started ignoring things. The attention budget is finite; I was exceeding it. The fix was splitting into modular `@rules/` files that get imported only when relevant.

**Using advisory rules for things that needed hooks.** I had "never edit .env files" in my CLAUDE.md for three months before I moved it to a hook. During those three months, Claude edited a `.env` file exactly once. After moving it to a hook: never again. Hard gates for hard rules.

**Not using Plan Mode before large changes.** Claude Code's Plan Mode (Ctrl+G) lets you review an implementation plan before a single line of code is written. I skipped it for months because it felt slow. Then I started using it and realized how often I was letting Claude start implementing the right solution in the wrong architecture. The plan review step catches this. It's not slow — catching a structural mistake after 200 lines of code is slow.

**Forgetting that context compaction happens.** When a session runs long enough, Claude summarizes the conversation history to free up context window space. This can silently discard rules you set at the start of the session. The fix is a `SessionStart` hook that re-injects critical context at the beginning of every session, and using `/clear` between unrelated tasks instead of letting sessions run indefinitely.

---

## Getting Started

If you want to build this, here's the minimum viable version:

**Day one (one hour):**
1. Create `~/.claude/CLAUDE.md` using the Interview Method described above.
2. Add three non-negotiable rules at the top.
3. Add your tech stack defaults.
4. Add one rule you wish Claude would always follow.

**Day two (two hours):**
1. Install `fetch` and `brave-search` MCP servers (no API keys needed for fetch; free tier for Brave).
2. Write one skill for something you do repeatedly. I'd suggest `/review` — it pays off immediately.
3. Create `./CLAUDE.md` in your current project and fill in the tech stack and architecture philosophy.

**Day three (two hours):**
1. Write the `pre-tool-use.sh` hook. Start with just blocking `.env` file edits. Add more blocked patterns over time.
2. Write the `stop-hook.sh` hook. Have it run your test suite.
3. Add the `#` habit: after every correction, update the relevant file.

You now have a Personal Claude OS. Not the full version — that takes weeks of iteration — but a real one that solves the three problems I described at the start.

---

## The Operator Mindset

The shift I'm trying to describe isn't just technical. It's a change in how you think about your relationship to these tools.

A chatbot user asks questions and evaluates answers.

An agent operator defines identity, provisions context, wires up tools, sets hard limits, and then steps back to let the system work — intervening to correct, improve, and expand the system's capabilities rather than to manually supervise each action.

The difference in output is not incremental. The Stripe engineers who used agentic systems to complete a 10-week migration in four days weren't better at prompting. They had built a system with the right architecture — persistent context, deterministic verification, specialized agents with appropriate tool access — and then let it run.

Most people are using these models at 20% capacity because they're treating them as sophisticated autocomplete. The other 80% is unlocked when you stop asking "what should I prompt?" and start asking "what system should I build?"

Your Claude OS is that system. Start small, iterate every day, and let it compound.

---

*The complete Claude OS template — all 19 files including hooks, skills, agents, and MCP config, plus a 50-page field guide — is available as a ready-to-install bundle on [Gumroad](https://gumroad.com/rachidhakim). Run one script and the whole thing installs to `~/.claude/` in under five minutes.*

For the step-by-step build guide covering architecture, MCP, memory management, and security hardening, see [Build Your AI Chief of Staff: A Complete Personal OS Guide](/posts/build-ai-chief-of-staff-claude-code-guide/). Or start with the [10-Minute Quick Start Setup](/posts/claude-code-personal-os-guide/) for the fastest path to operational.

---

**Tags:** Claude Code · AI Productivity · Developer Tools · Agent OS · MCP · Automation
