---
title: "I Stopped Prompting Claude and Started Operating It"
description: "The architecture behind a Personal Claude OS — identity layer, memory management, hooks, skills, agents, and the self-improvement loop that makes it compound. Built from real sessions, real failures, real file structures."
slug: claude-code-personal-os-guide
pubDate: 2026-06-23
author: "Rachid Houmayni"
tags: [claude-code, mcp, memory, hooks, agents, skills, personal-os, automation]
readTime: "22–28 min read"
---

## The Architecture Behind a System That Gets Smarter Every Week

---

The session ran for forty-five minutes. I was watching Claude refactor a database migration layer — good progress, confident output, clean diffs. Twenty minutes in, it had silently abandoned a constraint I'd mentioned in the opening message. The constraint was still in the context window. Claude had just deprioritized it as more conversation accumulated. I caught it at minute forty-five because I ran the integration tests. If I hadn't, that regression would have shipped.

I wasn't using the model wrong. I was using it without architecture. No persistent memory. No verification gates. No behavioral rules that outlived the session. I was operating a stateful autonomous agent like a search engine — type, wait, evaluate, repeat. The model was doing what models do. The gap was mine.

That session ended my prompting era. What I built over the following two months is what this post is about.

---

## The Three Structural Problems Nobody Fixes

Before the solution, the diagnosis — precisely, because both common ones are wrong.

The complaint I hear most: *Claude keeps forgetting things.* That's a misframing. The model isn't forgetting. There is no persistence layer between sessions unless you build one. You are the only memory the system has, which means you are the bottleneck, and the bottleneck works best when it's asleep.

The second problem is subtler and more damaging: **instruction decay**. A frontier model can hold roughly 150 to 200 distinct behavioral instructions in reliable attention at once. Claude Code's internal system prompt consumes around 50 of those slots before your first message. So when you paste a 300-line `CLAUDE.md` into a session, you're not giving the model more guidance — you're overwriting your own earlier rules with noise as the context window fills. The instructions at the bottom of a long file start getting ignored by message 30. I tested this explicitly: added a canary sentence at the bottom of a 280-line `CLAUDE.md` that said "if asked about the canary, respond: purple hexagon." Asked at message 5 — perfect recall. Asked at message 40 — hallucinated an answer with complete confidence. The file was still there. The attention wasn't.

The third problem is the one that costs real hours: **the trust-then-verify gap**. You give an agent a bounded task and step away for twenty minutes. You come back to a diff that looks right but isn't — tests passing because three were deleted, a migration that applied against the wrong schema, a refactor that fixed the function you pointed at and silently broke the one that called it. These aren't hallucination failures. They're architecture failures. There was no gate between "Claude thinks it's done" and "the task is actually done."

These are solvable problems. Not with better prompts — with a real operating architecture.

---

## What a Personal Claude OS Actually Is

Not software. Not an npm package. Not a cloud service.

A Personal Claude OS is a directory — `~/.claude/` — containing a hierarchy of plain Markdown files and shell scripts that Claude Code reads at session start and during execution. The "operating system" is a metaphor, but it maps cleanly: the identity layer is the kernel, the rules files are device drivers, the skills and agents are user-space processes, and the hooks are the interrupt handlers. Every part has a defined scope, a defined moment of execution, and a defined way of failing.

Here is the full structure I run today:

```text
~/.claude/
│
├── CLAUDE.md                    ← Global identity: who I am, how I work, what never happens
├── claude.json                  ← MCP server registry + hook registration
│
├── rules/                       ← Behavioral modules loaded by reference, not by default
│   ├── security.md              ← Credential access, file write permissions, secret detection
│   ├── git.md                   ← Branch strategy, commit format, PR protocol
│   ├── testing.md               ← Coverage floors, test structure, when to write tests first
│   ├── code-style.md            ← TypeScript strictness, naming, import order, doc strings
│   └── database.md              ← Migration rules, query patterns, transaction requirements
│
├── skills/                      ← Slash-command workflows: /review, /debug, /simplify, /spec
│   ├── review-pr.md
│   ├── debug.md
│   ├── simplify.md
│   └── write-spec.md
│
├── agents/                      ← Named sub-agents with specific tool access and personas
│   ├── chief-of-staff.md        ← /chloe — morning brief, inbox triage, commitment tracking
│   ├── researcher.md            ← /research — deep-dive with citations, never fills gaps with memory
│   ├── implementer.md           ← /build — code-only persona, no architecture opinions
│   └── reviewer.md              ← /review-agent — review-only persona, never edits
│
└── hooks/
    ├── pre-tool-use.sh          ← Blocks dangerous commands before execution
    ├── post-tool-use.sh         ← Auto-formats, logs, runs linter on write events
    └── stop-hook.sh             ← Test suite must pass before task completion
```

Each project gets its own `./CLAUDE.md` committed to the repo and a `./CLAUDE.local.md` that's gitignored for machine-specific overrides.

The whole structure is portable plain text. Copy it to a new machine and you're operational in two minutes. Point a different agent runtime at the folder and it reads the same context. The OS travels with you.

---

## Layer 1: The Identity File

`~/.claude/CLAUDE.md` is the global identity layer. It loads in every session, before any project file, before any tool. It defines two things: *who I am as a developer*, and *what Claude must never do in any context*.

Mine is 94 lines. Here is why that number matters: I treat it as a hard limit. When a new rule wants to be added, something has to be removed or compressed. The constraint forces precision. Every line that stays has survived a cost-benefit analysis against attention budget.

### Structure

```markdown
# Identity
I'm Rachid — solo developer, mostly TypeScript/Node/Postgres stack.
I work on production systems, not side projects. Mistakes have consequences.
Respond directly. No preamble. No "Great question!" No hedging.
When I ask for a plan, give me a plan. When I ask for code, give me code.
If you're uncertain, say you're uncertain and give me the best option with caveats.

# Non-Negotiables
These apply in every session, every project, no exceptions:
- NEVER send a message (Slack, email, Discord) without showing me a draft first
- NEVER delete any file without explicit confirmation
- NEVER push to main or master
- NEVER run DROP, TRUNCATE, or DELETE without a WHERE clause without confirmation
- NEVER edit .env, .env.local, or any secrets file
- NEVER assume a migration is safe — always show the rollback first
- Prefer reversible actions. If both paths solve the problem, take the reversible one.

# Technical Defaults
These are overridden per-project. They're fallbacks when no project CLAUDE.md exists.
- Runtime: Node 22, TypeScript 5.4 strict mode
- DB: Postgres 16 with Drizzle ORM
- Package manager: pnpm
- Formatter: Prettier, runs on save
- Test runner: Vitest
- Lint: ESLint with @antfu/eslint-config

# Communication Protocol
- Lead with the answer. Put explanation below.
- Use inline code for anything technical: file paths, commands, function names.
- If a task will take more than 5 tool calls, give me the plan first and wait.
- If you disagree with my approach, say so once clearly, then do it my way if I confirm.

# Rules Reference
The following rule modules are available. Load them when relevant:
- @rules/security.md — for any file write, network call, or credential access
- @rules/git.md — for any git operation
- @rules/testing.md — for any test creation or modification
- @rules/database.md — for any schema change or query pattern
```

The `@rules/` import pattern is the piece most people miss. Instead of dumping all behavioral rules into the global file, you reference modular files and let Claude load them contextually. A session that's purely reading code never loads `@rules/database.md`. A session writing a migration loads it immediately. The attention budget stays clean.

### What belongs in the identity file vs rule modules

**Global identity file:** communication style, absolute non-negotiables, technical defaults, and the index of rule modules.

**Rule modules:** domain-specific behavioral contracts that apply in specific contexts. These can be long and detailed without polluting general session context.

**What doesn't belong anywhere in memory files:** task-specific context. Current sprint goals, ticket numbers, which PR is in review — that goes in the *project* `CLAUDE.md`, not the global one. And it changes every week.

---

## Layer 2: The Project Memory File

The global identity layer handles *how I work*. The project `CLAUDE.md` handles *how this specific codebase works*.

Here is the template I commit to every new project:

```markdown
# Project: [name]
[One sentence: what this is, who uses it, what happens if it breaks.]

# Stack
- Runtime: Node 22 / TypeScript 5.4
- Framework: Fastify 4.x
- Database: Postgres 16, Drizzle ORM, Redis 7 for queues
- Hosting: Railway (staging), Hetzner bare metal (production)
- CI: GitHub Actions — push to main triggers deploy

# Architecture
[Two or three sentences on the structural shape of the codebase.
Where the business logic lives. What's owned by this service vs external.]

# Directory Map
src/
├── api/          ← Route handlers only. No business logic.
├── services/     ← Business logic. One file per domain.
├── db/           ← Drizzle schema, migrations, query helpers
├── jobs/         ← BullMQ workers. Each job in its own file.
├── lib/          ← Shared utilities. No side effects.
└── __tests__/    ← Mirrors src/ structure.

# Non-Negotiables (Project-Specific)
- No logic in route handlers. Services only.
- Every DB write wraps in a transaction unless explicitly argued otherwise.
- No raw SQL strings. Use the query builder or a tagged template with the db client.
- src/lib/ has zero imports from src/services/. No circular deps.

# What Not To Touch
- src/db/migrations/ — never edit existing migrations, only add new ones
- .env.production — off limits, always
- src/lib/config.ts — don't add new config keys without asking

# Current State
Working on: [describe current task / sprint goal]
Known issues: [list anything Claude should know is broken or fragile]
Last major change: [most recent significant structural change]
```

The "Current State" section is the only one I update regularly. Everything else describes the codebase's permanent architecture. When a session starts, Claude reads this and knows the topology without me explaining it.

### The `CLAUDE.local.md` pattern

Committed `CLAUDE.md` is shared. `CLAUDE.local.md` is gitignored and personal.

I use it for machine-specific config that shouldn't live in the shared file:

```markdown
# Local Overrides (not committed)
- My local DB is at postgres://localhost:5432/myapp_dev
- I run the queue worker in a separate terminal — don't start it automatically
- I prefer pnpm, not npm, even though the repo uses npm scripts in package.json
```

Small file, real value. Nobody else sees it, and it prevents the thing where you keep correcting the same machine-specific behavior because you didn't document it.

---

## Layer 3: Rule Modules

Rules modules are the part of this architecture I wished existed from day one.

The problem they solve: behavioral rules for specific domains (security, git, database) are context-specific. You don't need Claude thinking about the SQL injection surface when you're drafting a README. But you absolutely need it when Claude is generating a query that takes user input. Loading everything by default is wasteful. Loading nothing means you have to re-state rules per-session.

Rule modules are a middle path: documented contracts that Claude loads when the context makes them relevant.

### `@rules/security.md`

```markdown
# Security Rules

## File Access
- Never read files outside the current project directory without asking
- Never read system files: /etc/, /var/, ~/.ssh/, ~/.aws/, ~/Library/
- Treat any file containing these patterns as a secrets file: API_KEY, SECRET, TOKEN, PASSWORD,
  PRIVATE_KEY, ACCESS_KEY — and do not read, log, or transmit its contents

## Credential Handling
- Environment variables are the only acceptable way to inject secrets into code
- Never hardcode a credential, even in a test or comment
- If I ask you to use a credential for testing, refuse and explain why env vars work instead

## Output Security
- All user-controlled input that reaches a database query must be parameterized
- All user-controlled input that reaches an HTML context must be escaped
- All user-controlled input that reaches a shell command must be rejected — no exec() with
  user input, no exceptions

## Before Any Network Call
Show me: what URL, what data is being sent, what credentials are used, what the response
will be logged as. Wait for confirmation.
```

### `@rules/git.md`

```markdown
# Git Rules

## Branch Strategy
- Feature branches: feat/TICKET-ID-short-description
- Bug fix branches: fix/TICKET-ID-short-description
- Hotfixes: hotfix/TICKET-ID-short-description
- Never work directly on main, master, or staging

## Commit Format (Conventional Commits)
type(scope): description in imperative present tense

Types: feat, fix, refactor, test, docs, chore, perf, ci
Examples:
  feat(auth): add refresh token rotation
  fix(jobs): prevent double-processing on queue reconnect
  test(billing): add edge cases for prorated refunds

- Subject line max 72 characters
- Body optional but required if fix is non-obvious
- Never "WIP", "temp", "fix stuff", "update" as the full message

## PR Protocol
Before creating a PR:
1. Run the full test suite locally
2. Run /review on your own diff
3. Check that every commit message is clean
4. Confirm the branch is rebased on main, not merged

## What Never Happens
- Force push to any shared branch
- Commit anything in .gitignore
- Commit node_modules, .env, *.pem, or build artifacts
- Squash commits without my explicit instruction
```

### `@rules/database.md`

```markdown
# Database Rules

## Migrations
- Every schema change is a new migration file — never edit an existing one
- Migration files are named: YYYYMMDDHHMMSS_description.sql
- Every migration must include a rollback comment showing the inverse operation
- Test migrations against a copy of production schema before shipping

## Query Patterns
- No raw string concatenation in queries — use the ORM or parameterized templates
- Every query that writes data must be wrapped in a transaction
- Queries that scan large tables must include a LIMIT or a specific WHERE index hint
- EXPLAIN ANALYZE any new query that will run in a hot path before committing it

## Forbidden Without Explicit Confirmation
- DROP TABLE, DROP COLUMN, DROP INDEX
- TRUNCATE
- DELETE without a WHERE clause
- ALTER TABLE on a column that has existing production data (show me the migration strategy first)

## Naming Conventions
- Tables: plural snake_case (users, webhook_events, job_runs)
- Columns: snake_case
- Indexes: idx_tablename_columnname
- Foreign keys: fk_tablename_referencedtable
```

These files are long by design. They're loaded only when relevant. The attention budget for a coding session doesn't get spent on database rules when you're writing a README. But when Claude is generating a migration, it loads the full contract and follows it.

---

## Layer 4: Hooks

Hooks are the enforcement mechanism. Not reminders — enforcement.

The distinction matters enormously. A rule in `CLAUDE.md` is visible to the model and can be reasoned about, which means it can be overridden if the model decides another consideration outweighs it. A hook is not part of the model's reasoning. It runs outside Claude's context. The model cannot talk itself out of a hook.

I had "never edit .env files" in my identity file for three months. During those three months, Claude edited a `.env` file once — during a long agentic session, there was a plausible-sounding reason, and the rule lost to the context. After I moved it to a hook, it has never happened again. The hook doesn't care about plausible-sounding reasons.

### Hook architecture

Hooks live in `.claude/settings.json` and fire at specific lifecycle events:

```
PreToolUse     → fires before a tool executes. Can block with exit 2.
PostToolUse    → fires after a tool runs. Can modify output, run side effects.
UserPromptSubmit → fires when you submit a prompt. Can transform input.
Stop           → fires when Claude believes the task is complete. Can re-open.
```

The hooks receive the tool payload as JSON on stdin. You parse it with `jq`, check conditions, and either exit cleanly (allow) or exit 2 (block with a reason).

### Full hook configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/pre-tool-use.sh"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/pre-write.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/post-write.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/stop-hook.sh"
          }
        ]
      }
    ]
  }
}
```

### `pre-tool-use.sh` — the security gate

```bash
#!/usr/bin/env bash
# Receives tool payload as JSON on stdin
# exit 0 = allow, exit 2 = block

PAYLOAD=$(cat)
CMD=$(echo "$PAYLOAD" | jq -r '.tool_input.command // ""')

# Block direct push to main or master
if echo "$CMD" | grep -qE 'git[[:space:]]+push.*(main|master)'; then
  echo "BLOCKED: Direct push to main is forbidden. Use a feature branch." >&2
  exit 2
fi

# Block rm -rf
if echo "$CMD" | grep -qE 'rm[[:space:]]+-[^[:space:]]*r[^[:space:]]*f'; then
  echo "BLOCKED: rm -rf is blocked. Use trash or confirm file-by-file." >&2
  exit 2
fi

# Block any command involving credential files
if echo "$CMD" | grep -qE '(\.env|id_rsa|id_ed25519|\.pem|\.key|credentials)'; then
  echo "BLOCKED: Command references a credential or secrets file. Requires manual confirmation." >&2
  exit 2
fi

# Block curl/wget piped to bash (supply chain attack vector)
if echo "$CMD" | grep -qE '(curl|wget).*(sh|bash|zsh)\b' || \
   echo "$CMD" | grep -qP '(curl|wget).*\|.*(sh|bash|zsh)'; then
  echo "BLOCKED: curl/wget piped to shell. Review the script content before executing manually." >&2
  exit 2
fi

# Block database destructive operations without a WHERE clause
if echo "$CMD" | grep -qiE '(DELETE[[:space:]]+FROM|TRUNCATE[[:space:]]+TABLE)[^;]*;' && \
   ! echo "$CMD" | grep -qi 'WHERE'; then
  echo "BLOCKED: DELETE or TRUNCATE without WHERE clause. Requires explicit confirmation." >&2
  exit 2
fi

exit 0
```

### `pre-write.sh` — secrets file protection

```bash
#!/usr/bin/env bash
PAYLOAD=$(cat)
FILE=$(echo "$PAYLOAD" | jq -r '.tool_input.path // ""')

# Block writes to any secrets or environment file
if echo "$FILE" | grep -qE '(\.env|\.env\.[a-z]+|secrets\.(json|yaml|yml|toml))$'; then
  echo "BLOCKED: Write to secrets file $FILE is forbidden. Edit manually." >&2
  exit 2
fi

# Block writes outside the project directory
PROJECT_ROOT=$(pwd)
RESOLVED=$(realpath "$FILE" 2>/dev/null || echo "$FILE")
if [[ ! "$RESOLVED" == "$PROJECT_ROOT"* ]]; then
  echo "BLOCKED: Write to $FILE is outside the project directory. Requires manual confirmation." >&2
  exit 2
fi

exit 0
```

### `post-write.sh` — auto-format on save

```bash
#!/usr/bin/env bash
PAYLOAD=$(cat)
FILE=$(echo "$PAYLOAD" | jq -r '.tool_input.path // ""')

# Auto-format TypeScript and JavaScript files after write
if echo "$FILE" | grep -qE '\.(ts|tsx|js|jsx)$'; then
  npx prettier --write "$FILE" 2>/dev/null
  echo "Formatted: $FILE" >&2
fi

# Auto-format Python files after write
if echo "$FILE" | grep -qE '\.py$'; then
  python -m black "$FILE" 2>/dev/null
  echo "Formatted: $FILE" >&2
fi

exit 0
```

### `stop-hook.sh` — tests must pass before task completion

This is the hook that closes the trust-then-verify gap.

```bash
#!/usr/bin/env bash
# Fires when Claude signals task completion
# If tests fail, exit 1 returns the failure output to Claude's context
# Claude resumes and tries to fix the failure

# Only run if a test command is configured for this project
if [ ! -f ".claude/test-command.txt" ]; then
  exit 0
fi

TEST_CMD=$(cat .claude/test-command.txt)

echo "Running test suite before task completion: $TEST_CMD" >&2
OUTPUT=$(eval "$TEST_CMD" 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "TEST SUITE FAILED. Task is not complete." >&2
  echo "$OUTPUT"
  exit 1  # Returns failure to Claude — session continues
fi

echo "Test suite passed. Task completion approved." >&2
exit 0
```

Each project has a `.claude/test-command.txt` with one line:

```text
pnpm test --run
```

Claude cannot mark a task complete while the test suite is red. Not because it's been asked to run the tests. Because the stop hook runs automatically and blocks the completion signal until they pass. This single hook has caught more real bugs in production-bound code than any review step I've added to my workflow.

---

## Layer 5: Skills

Skills are slash-command workflows. Not personas, not agents — executable procedures that run within your current session.

The difference between a skill and a prompt: a prompt asks Claude to do something. A skill defines the *exact protocol* for doing it, step by step, with specific output formats, specific checks, specific failure modes. A skill removes variation from repeated work.

Each skill is a Markdown file in `~/.claude/skills/` with a YAML frontmatter header.

### `/review` — The pre-commit audit

This skill runs before every commit. Without exception. I made that a personal rule eight months ago and it has caught real security issues, real missing tests, and real cases where Claude fixed the function I pointed at and broke the one that called it.

```markdown
---
name: review-pr
description: >
  Full pre-commit code review. Runs through security, correctness, test coverage,
  and code quality in sequence. Produces a structured report with severity ratings.
---

# Pre-Commit Review Protocol

You are performing a rigorous pre-commit review. Review the current diff (or if no
diff is staged, the last modified files). Work through each phase in order.
Do not skip phases. Do not combine phases.

## Phase 1: Security Scan (run first, always)
Check for:
- Hardcoded credentials, API keys, tokens, passwords — flag any string that looks like a secret
- SQL injection vectors — user input reaching a query without parameterization
- XSS vectors — user input reaching an HTML context without escaping
- Exposed internal paths or configuration in error messages
- Insecure direct object references (IDs in URLs that aren't validated against the authenticated user)
- Any use of eval(), exec(), child_process.exec() with user-controlled input

If you find a Critical security issue, STOP and report it before continuing to Phase 2.

## Phase 2: Correctness
Check for:
- Functions that handle a success path but silently ignore error/edge cases
- Async code without proper error handling (unhandled promise rejections, missing try/catch)
- Race conditions — concurrent writes to shared state without locks or transactions
- Off-by-one errors in loops or pagination
- Boundary conditions: what happens with empty input, null, undefined, 0, empty array?

## Phase 3: Test Coverage
Check for:
- New functions with no corresponding test
- Tests that test the happy path but nothing else
- Tests that would pass even if the implementation were deleted (vacuous tests)
- Missing tests for the specific edge cases found in Phase 2

If coverage is insufficient, list exactly which tests are missing — don't just say "add more tests."

## Phase 4: Code Quality
Check for:
- Functions over 40 lines that could be split
- Duplicated logic that should be extracted
- Variable names that require a comment to understand
- Comments that explain *what* the code does instead of *why* it does it
- Imports that are unused or could be lazy-loaded

## Output Format
Return a structured report in this exact format:

### Review Report

**Critical** (must fix before commit):
- [issue] — [file:line] — [why it matters]

**Advisory** (fix before merge, not necessarily this commit):
- [issue] — [file:line] — [suggested fix]

**Nit** (optional, low priority):
- [issue] — [file:line]

**Verdict:** APPROVED / BLOCKED

If BLOCKED, the first Critical issue is the blocker. Fix it and re-run /review.
```

### `/debug` — The five-phase protocol

The most intellectually valuable skill I've written, because it forces a diagnostic discipline I was bad at naturally.

```markdown
---
name: debug
description: >
  Systematic five-phase debugging protocol. Forces hypothesis generation before
  code changes. Prevents the "try random things" debugging spiral.
---

# Debug Protocol

You are debugging a problem I will describe. Work through each phase in order.
Do not write code until Phase 4. Do not skip Phase 3.

## Phase 1: Reproduce
Confirm you can describe the exact reproduction steps:
- What inputs or conditions trigger the issue?
- Is it deterministic or intermittent?
- When did it start? What changed?
- What does the failure look like exactly — error message, wrong output, silent failure?

If reproduction steps are unclear, ask me before proceeding.

## Phase 2: Isolate
Narrow the fault to the smallest possible code surface:
- Which service, file, or function is involved?
- What are the boundaries — where does the bad data enter, where does the failure surface?
- What logging or observability exists that can help pinpoint it?

List the tools available: logs, test suite, MCP access to monitoring, ability to add
temporary logging. Then pick the fastest path to isolation.

## Phase 3: Hypothesize
Generate exactly three ranked hypotheses. This is mandatory — do not skip it.
Format:
1. [Most likely cause] — [Why this fits the evidence] — [How to verify]
2. [Second hypothesis] — [Why this fits] — [How to verify]
3. [Third hypothesis] — [Why this fits] — [How to verify]

Do not proceed to Phase 4 until I confirm which hypothesis to pursue.
If I don't confirm, pursue Hypothesis 1 and report what you find.

## Phase 4: Verify
Test the hypothesis before fixing. Explain what you'll do to confirm the root cause,
do it, and show me the result. A verified root cause before a fix is always faster than
an unverified fix that introduces new behavior.

## Phase 5: Fix
Write the minimal fix that addresses the verified root cause. Not a refactor.
Not an improvement. The smallest change that closes the gap.

After the fix, run the relevant test suite. If tests don't exist for this case, write one.
The test should fail without the fix and pass with it — that's how we know it's real.

## Output at Each Phase
End each phase with a one-line summary of what was learned before moving to the next.
```

### `/simplify` — Complexity reduction without behavior change

```markdown
---
name: simplify
description: >
  Reduce complexity of the selected code without changing external behavior.
  No API changes. No feature removal. Readable internals only.
---

# Simplification Protocol

## Rules
- The public API (function signatures, exported types, return shapes) does not change
- Behavior does not change — same inputs produce same outputs
- If simplification requires a behavior change, stop and ask
- Don't add comments to explain complexity — remove the complexity instead

## Process
1. Read the code and identify the three highest-complexity points:
   - Functions over 30 lines
   - Nested conditionals deeper than 3 levels
   - Variables with names that require reading surrounding code to understand
   - Loops that could be replaced with array methods

2. For each complexity point, propose the simplification and explain the trade-off.
   Some complexity exists for performance reasons. Some for edge case handling. Name it.

3. Apply the simplifications I approve. Run the test suite after each one — not all at once.
   If a test breaks, stop and show me what changed.

## What I'm Not Asking For
- Don't rewrite everything in functional style because it's "cleaner"
- Don't rename things just because you'd name them differently
- Don't extract single-use helpers that make the call site less readable
- Don't add types where the inference is already obvious
```

### `/spec` — Write the spec before the code

```markdown
---
name: write-spec
description: >
  Generate a technical specification for a feature before implementation begins.
  Forces scope definition, interface design, and failure case analysis up front.
---

# Specification Protocol

I will describe a feature. Before writing any code, produce a specification document.

## Sections (all required)

### 1. Problem Statement
One paragraph. What user need or system requirement does this address?
What breaks or stays manual without it?

### 2. Scope
What this feature does. What it explicitly does not do.
If there are adjacent features that are out of scope, name them.

### 3. Interface Design
For each component of the feature:
- API endpoints: method, path, request schema, response schema, auth required
- Database changes: new tables, new columns, index implications
- Internal functions: signature, inputs, outputs, side effects

### 4. Failure Cases
For each interface, enumerate what can go wrong:
- Invalid input: what does the API return?
- Downstream service failure: how is it handled?
- Partial success: can a transaction succeed partially, and if so, what state is left?
- Concurrent requests: are there race conditions?

### 5. Test Plan
List the test cases that constitute "done":
- Happy path
- Each failure case from Section 4
- Any performance or load consideration

### 6. Open Questions
List anything that requires a decision before implementation can start.
Flag decisions that need product or design input vs. purely technical calls.

## Output
Return the spec as a Markdown document I can commit to docs/specs/.
After I approve the spec, ask: "Ready to implement Phase 1?"
```

---

## Layer 6: Agents

Skills handle workflows within a session. Agents are persistent personas — sub-processes with their own tool access, their own behavioral constraints, their own context boundary.

The key architectural point: agents don't inherit your session context automatically. When Claude spawns a sub-agent, it starts with a clean context. The agent's `CLAUDE.md` reference must be explicit in its definition, or it's operating without your rules.

### The Chief of Staff Agent — `/chloe`

```markdown
---
name: chief-of-staff
description: >
  Daily operating brief and inbox triage. Reads calendar, email, and task tracker.
  Produces a structured morning brief. Never sends anything without showing a draft.
---
model: claude-sonnet-4-6
tools:
  - google_calendar
  - gmail
  - linear
  - notion

# Identity
You are my Chief of Staff. Your job is to surface what matters today and eliminate
the noise. You are not an assistant — you are an operator with delegated authority
over information triage.

You have no authority to send, post, or modify anything without showing me a draft
and receiving explicit approval. Not even a calendar accept. Always show first.

# Morning Brief Protocol (triggered by: /chloe morning)

Work through these in order. Use all available tool access.

## 1. Priority Alerts (2 minutes of reading)
Check: calendar for today, Linear for P0/P1 issues assigned to me, Gmail for flagged
threads and anything from my direct contacts or clients sent in the last 24 hours.

Surface only items that require a decision or action from me today. Format:
🔴 [URGENT] — [what it is] — [what decision is needed] — [by when]
🟡 [TODAY] — [what it is] — [what action is needed]

If there are no urgent items, say so explicitly. Don't invent urgency.

## 2. Meeting Pre-Reads (1 minute per meeting)
For each calendar event today with external attendees:
- Who is attending (names and context if I've worked with them before)
- What the stated agenda is
- What I should not agree to without more information (flag scope expansions, new asks,
  anything that would require research I haven't done yet)
- One sentence: what a successful meeting outcome looks like

## 3. Commitment Tracker
Check my sent Gmail and Linear comments from the past 7 days for things I promised.
Cross-reference against what I've delivered.

Format:
- Overdue (I promised, haven't delivered): [what] — [promised to whom] — [when]
- Waiting (they promised, I'm waiting): [what] — [from whom] — [promised when]

## 4. Inbox Triage
All unread email. Sort into:
- **Reply today**: anything that will block someone if I don't respond
- **Reply this week**: important but not urgent
- **FYI only**: no action needed from me
- **Unsubscribe candidate**: promotional, no longer relevant

Show me the triage. Do not archive or reply to anything until I approve.

# Evening Wrap Protocol (triggered by: /chloe wrap)
What I shipped today. What moved to tomorrow. Any follow-ups I owe.
Pull from Linear activity and calendar. Keep it under 10 lines.
```

### The Research Agent — `/research`

```markdown
---
name: researcher
description: >
  Deep-dive research agent. Reads primary sources, never fills knowledge gaps with
  training data. Returns structured Markdown with citations. Runs in isolated context.
---
model: claude-sonnet-4-6
tools:
  - brave_search
  - fetch
  - context7

# Identity
You are a research agent. Your output is a structured Markdown document with citations.
You are not summarizing training data. Every claim must be backed by a source you
fetched during this session.

Critical rule: if you cannot find a source for a claim, say so. Do not fill the gap
with what you think is probably true. "I could not find a reliable source for X" is
a valid and valuable output.

# Research Protocol

## Step 1: Scope Definition
Before searching, write:
- The core question I'm answering
- What would constitute a complete answer
- What I'll explicitly not cover (to prevent scope creep)

## Step 2: Source Strategy
Determine source priority for this topic:
- Primary sources (official docs, papers, release notes, source code) always first
- Secondary sources (technical blogs by practitioners, post-mortems) second
- Aggregators and summaries: only to find primary source links, never to cite directly

## Step 3: Research (minimum 6 sources, maximum 15)
For each source:
- Fetch the full content, not just the snippet
- Extract the specific claim or data point it contributes
- Note the date — technical content older than 18 months may be outdated

## Step 4: Synthesis
Write the research document. Structure:
- **Summary** (3–5 sentences): the core finding
- **Detail sections** (one per major sub-question)
- **Open questions**: what I couldn't find or couldn't confirm
- **Sources**: numbered list with URL and date accessed

## Output Format
Return a Markdown document ready to commit to docs/research/.
Include date, research question, and a one-line reliability rating:
"Confidence: High / Medium / Low — [reason]"
```

### The Implementer Agent — `/build`

```markdown
---
name: implementer
description: >
  Code-only implementation agent. Executes approved specs. No architectural opinions.
  Reads CLAUDE.md and all rule modules before starting.
---
model: claude-sonnet-4-6

# Identity
You are an implementer. You take an approved specification and write code.
You do not have opinions about the architecture. You do not suggest alternative
approaches. You implement what the spec says.

Before writing a single line of code:
1. Read .claude/CLAUDE.md
2. Read @rules/security.md
3. Read @rules/testing.md
4. Confirm: "I've read the project rules. Starting implementation of [spec name]."

# Implementation Protocol

## Phase 1: Parse the spec
Identify:
- The interfaces being created (API routes, functions, DB schema)
- The order of implementation (bottom-up: schema → service → API → tests)
- Any open questions that would block implementation

If there are unresolved open questions in the spec, stop and ask before writing code.

## Phase 2: Scaffold
Write the structure before the logic:
- Create files with correct names in correct directories
- Write type definitions and function signatures with empty bodies
- Write the import graph

Show me the scaffold and wait for confirmation before filling in logic.

## Phase 3: Implement (one interface at a time)
Implement each interface in isolation. After each one:
- Run the test suite for that interface only
- If tests fail, fix before moving to the next interface

## Phase 4: Integration
Wire the interfaces together. Run the full test suite.
If tests fail, do not move on. Fix them.

## Output
A working implementation with tests, no console.log statements, and no TODO comments.
If a TODO is genuinely needed, it must be a GitHub issue linked in a code comment —
not a placeholder.
```

---

## The Self-Improvement Loop

This habit has compounded more than anything else in the system.

Every time Claude makes a mistake — wrong assumption, missed edge case, rule violation, unnecessary tool call — I type:

```
# Update the relevant rule file so this doesn't happen again.
```

Claude proposes the new rule, adds it to the correct file (global identity, project memory, or the specific rule module), and prefixes it with a date stamp. I review it. If it's right, I confirm. The system gets smarter and the lesson doesn't exist only in my memory.

After eight months of this pattern, my `CLAUDE.md` and rule modules are a remarkably precise model of how I think about code. A new developer who reads them would understand my technical philosophy in fifteen minutes. More useful to me: they encode every expensive lesson from production incidents, bad refactors, and debugging sessions that took too long.

The compounding is real and measurable. My first agent (Chief of Staff) took a full weekend to tune to a point I trusted it. My second (the research agent) took half a day — it inherited the identity layer, the MCP connections, and six months of encoded lessons. The third I build will take hours.

The system that exists today required significant investment. The system I'll have in six months required almost none.

---

## What I Got Wrong (And How To Skip It)

### Mistake 1: The 280-line CLAUDE.md

I initially put everything in one file. Technical stack, project rules, personal preferences, commit format, test philosophy. It became 280 lines. By message 30 in long sessions, the bottom third was being ignored. The attention budget was exhausted on the first 200 lines, which happened to be the rules I'd written first — not the most important ones.

The fix: the modular `@rules/` structure. The global file stays under 100 lines and acts as an index. Domain rules live in focused files loaded only when that domain is active.

### Mistake 2: Advisory rules for hard requirements

"Never edit .env files" lived as a line in my `CLAUDE.md` for three months. One long agentic session, Claude edited it with a plausible reason. The rule was there. It lost to context.

The fix: any rule that must be true 100% of the time belongs in a hook. The test is simple: *can I tolerate even one exception to this rule?* If not, it's a hook — not a suggestion.

### Mistake 3: Not using Plan Mode for structural changes

Claude Code's plan step (`Shift+Tab` before submitting, or enabled via settings) lets you review the full implementation plan before a single file is modified. I skipped it for months because it felt slow.

Then I started using it and found that roughly 30% of structural changes — refactors, new service layers, schema additions — had a better architectural approach that I only saw when I read the plan before the code. Catching a structural mistake in a plan review takes two minutes. Catching it after 200 lines of implementation takes forty.

### Mistake 4: Letting sessions run indefinitely

Claude Code compacts conversation history when the context window fills. It summarizes the earlier part of the conversation to make room. The summary is not the same as the original. Rules stated at the start of a session can become fuzzier in summary form.

The fix: use `/clear` between unrelated tasks. Don't treat session length as a metric of productivity. A fresh session with the full memory layer loaded is usually faster than a stale session with compacted context.

### Mistake 5: Building agents before the foundation was stable

I built the Chief of Staff agent in month one. It was too early. The identity layer wasn't stable, the rules weren't precise, and the agent inherited all the ambiguity. I spent more time correcting the agent than it saved me.

The sequence that works: identity layer first, rule modules second, hooks third, skills fourth, agents last. Each layer depends on the ones below it. An agent built on a shaky identity layer will have subtle, unpredictable behavior that's hard to diagnose because the problems come from the foundation, not the agent.

---

## Getting Started: The Right Sequence

### Day 1 (one hour): Identity layer

```bash
mkdir -p ~/.claude/rules ~/.claude/skills ~/.claude/agents ~/.claude/hooks
touch ~/.claude/CLAUDE.md
```

Open `~/.claude/CLAUDE.md` and answer four questions:
1. How do I want Claude to communicate with me?
2. What are the five things Claude must never do, in any context?
3. What are my technical defaults when no project file exists?
4. What rule modules will I eventually write? (List them now, write them later.)

Keep it under 100 lines. Every word costs attention budget.

### Day 2 (two hours): First rule module and first hook

Write `@rules/git.md`. Your git conventions are probably the most consistent rules you have, and violations are immediately visible in the diff. Start there.

Write `pre-write.sh` with two rules: block `.env` file writes and block writes outside the project directory. These two hooks solve the most common categories of agentic accidents.

Test it:

```bash
# In a Claude Code session
"Write a test line to .env"
# Should be blocked. Confirm the hook fires.

"Write a test line to /tmp/test.txt"
# Should be blocked. Confirm.
```

### Day 3 (two hours): First skill and stop hook

Write the `/review` skill. Use the template above as a starting point, then customize the security scan section to match your stack. If you work in Python, the XSS surface looks different than if you work in TypeScript.

Write `stop-hook.sh` and create `.claude/test-command.txt` in one active project. Run a session that makes a code change and confirm the test suite runs automatically before task completion.

### Week 2: First project CLAUDE.md

Pick one active repo. Write the project `CLAUDE.md` using the template above. Do the interview exercise: ask Claude to ask you questions about the codebase until it can produce the memory file. Review it. Correct it. Commit it.

Then run `/doctor` at the start of a session in that repo and confirm both the global and project files appear in the loaded context list.

### Week 3–4: First agent

Not before. The foundation needs two weeks of real use before you know what the agent should inherit.

Write the agent definition, test it against three real morning scenarios, find the places it's wrong, and update the definition. Budget four hours of tuning before you trust it for production use.

---

## The Operator Mindset

The shift I'm describing isn't just a configuration change. It's a different relationship to the tool.

A chatbot user submits prompts and evaluates responses.

An agent operator builds the environment the agent runs in, defines the rules it operates under, provisions the tools it needs, and sets the gates that verify its work. The operator's primary work is not per-session supervision. It's system design and system improvement.

The output difference isn't incremental. The same task run against a raw Claude session vs. a session with identity, rules, hooks, and skills produces qualitatively different results — not because the model changed, but because the system changed. The model is equally capable in both cases. In the first, its capabilities are bounded by what you type in this session. In the second, they're bounded by everything you've ever learned and encoded.

That's the compounding effect, and it's why six months of operating this system feels different from six months of prompting. The prompting gets you six months of decent outputs. The operating gets you a system that's dramatically more capable in month six than it was in month one — and that continues to improve every week.

**The practical first step:** Create `~/.claude/CLAUDE.md`. Write three non-negotiables. Write your technical defaults. Run a session and check that it loads. That's it. The system starts compounding from the first rule.

---

*→ For the complete architecture including MCP server configuration and team workflow patterns: [Claude Code: The Complete Mastery Guide (2026)](/blog/claude-code-complete-mastery-guide/)*

*→ For deep dives into agent memory systems: [Building AI Agent Systems](/blog/building-ai-agent-systems)*

*→ The complete Claude OS template — all files including hooks, skills, agents, and MCP config — is available as an installable bundle on [Gumroad](https://gumroad.com/rachidhakim).*

---

**Tags:** Claude Code · Agent OS · MCP · Hooks · Skills · Memory · Developer Tools · Automation
