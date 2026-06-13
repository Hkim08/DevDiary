---
title: 'Replacing NLP Pipelines with LLM Agents: The MIS v2 Architecture'
description: "Why I scrapped spaCy and Hugging Face for a Batch-and-Specialize pattern using Gemini's 1M context window — and how the MIS got 40% faster with half the code."
pubDate: 2024-11-28
author: 'Rachid Houmayni'
image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200'
category: 'Projects'
subCategory: 'LLM Agents'
readTime: '6 min read'
tags: ['ml', 'python', 'ai-agents', 'tutorial']
---

The Marketing Intelligence System started as a classic NLP pipeline: spaCy for entity extraction, a fine-tuned DistilBERT for sentiment, a custom classifier for intent. It worked. It was also fragile, expensive to maintain, and required a GPU for anything resembling production performance.

MIS v2 throws all of that out and replaces it with LLM agents. Here's why, and how.

## The Problem with Traditional NLP

The v1 pipeline had three stages that each needed their own model:

```python
# MIS v1 — the old way
def analyse_content(text: str) -> dict:
    doc = nlp(text)                          # spaCy NER
    entities = extract_entities(doc)
    sentiment = sentiment_model(text)        # DistilBERT
    intent = intent_classifier(text)        # Custom BERT
    return {"entities": entities, "sentiment": sentiment, "intent": intent}
```

This meant:
- 3 models to load, version, and update separately
- ~800MB of model weights for a task an LLM does in one call
- Re-training whenever the domain shifted (new product categories, new markets)
- GPU required for acceptable latency

The real killer was the last point. Every time a client expanded into a new product vertical, I had to retrain the classifiers. That's weeks of work for what should be a config change.

## The Batch-and-Specialize Pattern

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
<h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2 uppercase font-display">The Batch-and-Specialize Pattern</h4>
<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
Batch your inputs and specialize your prompts. Instead of three models processing documents one-at-a-time, one LLM agent processes them in batches with a highly specialized prompt per task.
</p>
</div>
</div>
</div>

<div class="code-block-wrapper group">
<div class="code-header">
<span class="code-filename">agents/pain_agent.py</span>
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

```python
# MIS v2 — the new way
class PainAgent:
    """Specialized agent for extracting customer pain points."""

    SYSTEM = """You are a market research analyst specializing in B2B pain point extraction.
    
    For each input text, identify and structure:
    1. Primary pain point (what is broken or painful)
    2. Severity (1-5 scale with explicit criteria)
    3. Business context (department, company size signals)
    4. Urgency signals (timeline language, escalation words)
    
    Return ONLY valid JSON. No preamble.
    """

    async def analyse_batch(self, texts: list[str]) -> list[PainPoint]:
        prompt = f"Analyse these {len(texts)} items:\n\n"
        for i, t in enumerate(texts, 1):
            prompt += f"[{i}] {t[:500]}\n\n"

        response = await self.llm.complete(self.SYSTEM, prompt)
        return [PainPoint(**item) for item in json.loads(response)]
```

</div>

The `PainAgent` knows exactly one thing: how to find and score pain points. It doesn't do sentiment. It doesn't do intent. It does pain points — and it does them extremely well because the prompt is laser-focused.

![Batch-and-Specialize agent pipeline showing data flow through specialized agents](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800)

## Using Gemini's 1M Context Window

The real unlock was Gemini's large context window. The old pipeline had to process documents one at a time because DistilBERT has a 512-token limit.

With Gemini, I can send an entire week's worth of support tickets in a single call:

```python
async def weekly_pain_analysis(tickets: list[SupportTicket]) -> WeeklyReport:
    # Old way: 847 individual API calls
    # New way: 1 call with the full context
    
    batch_size = 200  # tickets per call
    batches = [tickets[i:i+batch_size] for i in range(0, len(tickets), batch_size)]
    
    results = await asyncio.gather(*[
        pain_agent.analyse_batch([t.body for t in batch])
        for batch in batches
    ])
    
    return WeeklyReport(pain_points=flatten(results))
```

247 API calls down to 5. Latency: from 4.2 minutes to 38 seconds.

## The Agent Architecture

MIS v2 has four specialized agents:

| Agent | Task | Prompt length |
|-------|------|---------------|
| `PainAgent` | Pain point extraction + severity scoring | 340 tokens |
| `TrendAgent` | Temporal pattern detection across batches | 280 tokens |
| `CompetitorAgent` | Competitor mention extraction + positioning | 420 tokens |
| `SummaryAgent` | Executive summary synthesis | 180 tokens |

Each agent is stateless — it takes inputs and returns structured JSON. The orchestrator handles sequencing:

```python
async def run_pipeline(data: RawData) -> IntelligenceReport:
    # Stage 1: parallel specialised extraction
    pain, trends, competitors = await asyncio.gather(
        pain_agent.analyse_batch(data.texts),
        trend_agent.analyse_batch(data.texts),
        competitor_agent.analyse_batch(data.texts),
    )

    # Stage 2: synthesis (depends on stage 1)
    summary = await summary_agent.synthesise(pain, trends, competitors)

    return IntelligenceReport(
        pain_points=pain,
        trends=trends,
        competitor_signals=competitors,
        executive_summary=summary,
    )
```

## Results vs v1

| Metric | MIS v1 | MIS v2 | Delta |
|--------|--------|--------|-------|
| Latency (100 docs) | 4.2 min | 38 sec | -85% |
| API calls (100 docs) | 247 | 5 | -98% |
| Model maintenance | Weekly | Never | — |
| Domain adaptation | Retrain (weeks) | Prompt edit (hours) | — |
| Code LOC | 1,847 | 634 | -66% |

The accuracy numbers are trickier to compare — the v1 models were trained on labelled data, v2 uses zero-shot prompting. In practice, v2 catches nuanced pain points that the classifier missed (because they don't fit a pre-trained category), but occasionally misclassifies edge cases that the fine-tuned model had seen in training.

Net result: v2 is more useful in production, even if the benchmark numbers aren't perfectly comparable.

## What I'd Do Differently

If I were starting from scratch today, I'd skip NLP libraries entirely for tasks like this. The Batch-and-Specialize pattern with a large-context LLM is faster to build, easier to adapt, and good enough for 95% of business intelligence use cases.

The remaining 5% — very high-volume pipelines where cost is the constraint, or tasks requiring sub-millisecond latency — still benefit from traditional ML. But that's not most business software.

The MIS v2 code is on [GitHub](https://github.com/Hkim08/mis-v2). The prompt templates for all four agents are in `agents/prompts/` if you want to adapt the pattern for your own intelligence pipeline.

For a complementary approach, check out [Arc: A Self-Learning ERP Agent](/blog/building-arc-erp-agent/) — a phase-gated agent that audits client infrastructure before writing code. Same batch-and-specialize philosophy, applied to structured business data instead of unstructured text.
