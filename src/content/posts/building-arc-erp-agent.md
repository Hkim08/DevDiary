---
title: 'Building Arc: A Self-Learning ERP Agent That Audits Clients Before Writing a Single Line of Code'
description: 'How I designed a phase-gated AI agent that explores client infrastructure, builds a SQLite knowledge base, and waits for my approval before advancing — no more building the wrong thing.'
pubDate: 2024-12-10
author: 'Rachid Houmayni'
image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200'
category: 'Projects'
subCategory: 'AI Agents'
readTime: '8 min read'
tags: ['ai-agents', 'claude-code', 'sqlite', 'tutorial']
featured: true
---

After years of building ERPs for SMB clients, I kept running into the same problem: I'd spend weeks building the wrong thing. The client would describe their process one way, the actual data would tell a different story, and I'd end up rebuilding 40% of the system after the first demo.

Arc is my answer to that problem. It's a phase-gated AI agent that **audits before it builds** — and won't advance to the next phase until I give it explicit approval.

## The Core Idea

Arc follows a 5-phase blueprint:

1. **DISCOVER** — read everything the client hands over (CSVs, PDFs, screenshots, notes)
2. **AUDIT** — map the actual data structure, flag inconsistencies, identify gaps
3. **DESIGN** — propose an architecture and wait for approval
4. **BUILD** — implement the agreed design
5. **DELIVER** — package, document, and hand off

The key word in all of that is *wait*. Most AI coding agents barrel forward. Arc stops at each gate and writes a report. Nothing happens until I read it and type `APPROVE`.

## The SOUL.md File

Every Arc instance has a `SOUL.md` at the root of the project. It looks like this:

<div class="code-block-wrapper group">
<div class="code-header">
<span class="code-filename">SOUL.md</span>
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
# Arc — Project Soul

## Identity
- Name: Arc
- Role: Business Systems Builder
- Client: SMB_004 (retail, 3 locations)
- Phase: AUDIT

## Current Knowledge Base
- kb_entries: 47
- last_updated: 2024-12-09T14:32:00Z
- confidence: 0.73

## Phase Gate Status
- DISCOVER: APPROVED
- AUDIT: IN_PROGRESS
- DESIGN: PENDING
- BUILD: PENDING
- DELIVER: PENDING
```

</div>

This file is Arc's persistent memory. Every tool call updates it. If the session restarts, Arc reads SOUL.md and picks up exactly where it left off.

## The Knowledge Base

Arc uses SQLite for its knowledge base — not because SQLite is glamorous, but because it's the right tool:

```typescript
// kb/schema.sql
CREATE TABLE observations (
  id INTEGER PRIMARY KEY,
  phase TEXT NOT NULL,
  category TEXT NOT NULL, -- 'data_structure' | 'process' | 'gap' | 'inconsistency'
  content TEXT NOT NULL,
  confidence REAL DEFAULT 0.5,
  source TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE phase_reports (
  id INTEGER PRIMARY KEY,
  phase TEXT NOT NULL,
  report_markdown TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft' | 'submitted' | 'approved' | 'rejected'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

When Arc discovers that the client's "product codes" in the inventory sheet don't match the "item codes" in the sales export, it logs that as an `inconsistency` observation with a confidence score. By the end of AUDIT, I have a full picture of every data problem before a single schema gets designed.

![Server rack infrastructure representing the client data Arc audits before building](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)

## Phase Gates in Practice

The gate mechanism is dead simple — a file check:

```typescript
// lib/gate.ts
export async function checkGate(phase: string, db: Database): Promise<boolean> {
  const row = db.prepare(
    'SELECT status FROM phase_reports WHERE phase = ? ORDER BY created_at DESC LIMIT 1'
  ).get(phase) as { status: string } | undefined;

  return row?.status === 'approved';
}
```

If the gate is locked, Arc writes a human-readable report and stops:

```text
AUDIT PHASE COMPLETE — AWAITING APPROVAL

I found 3 structural inconsistencies in the client data that need a design decision before I can proceed:

1. Product codes in inventory.csv (format: "P-XXXX") don't match item codes in sales_2024.xlsx (format: "ITM-XXXX"). Are these the same entities?
2. The "supplier" field in 23% of inventory rows is blank. Is this data that exists elsewhere, or genuinely unknown?
3. Location data exists in two formats across three sheets. I recommend normalising to a Location table — confirm?

Reply APPROVE to proceed to DESIGN, or provide corrections.
```

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
<h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase font-display">The Gate Philosophy</h4>
<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
That's it. That's the whole gate. A file check against a SQLite row. And it works better than any elaborate approval workflow I've tried. Simple, auditable, impossible to bypass.
</p>
</div>
</div>
</div>

## Results

Since deploying Arc on client projects:

- **Zero** major architecture rebuilds after the design phase
- Average AUDIT report catches **4-7 structural issues** that would have become bugs
- Client onboarding time down ~35% because discovery is systematic, not conversational

The biggest win is confidence. When I sit down to build, I know exactly what the data looks like, where the gaps are, and what the client approved. No guessing.

## What's Next

I'm working on Arc v2 which adds:
- Automatic data profiling (row counts, null rates, cardinality) during AUDIT
- A web UI for clients to review and annotate the phase reports directly
- Multi-agent mode where Arc can spawn sub-agents for specific audit tasks (financial reconciliation, inventory analysis, etc.)

The Arc agent framework is available on [GitHub](https://github.com/Hkim08/arc-agent). The full prompt templates for all five phases are in the repo if you want to adapt the pattern for your own client work.

If you're building something similar — phase-gated agents, knowledge-base patterns, approval workflows — [drop me a line](https://x.com/Hkim08).

For another take on agent architecture, see how I replaced traditional NLP pipelines with a [Batch-and-Specialize LLM agent pattern](/blog/mis-v2-llm-agents/) — the same philosophy of audit-before-build, applied to unstructured text intelligence.
