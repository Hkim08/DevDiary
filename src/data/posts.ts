export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  categoryStyle: 'accent' | 'teal' | 'amber' | 'default';
  featured: boolean;
  coverType: 'neural' | 'radar' | 'doc' | 'code' | 'product';
}

export const posts: Post[] = [
  {
    slug: 'building-arc-erp-agent',
    title: 'Building Arc: A Self-Learning ERP Agent That Audits Clients Before Writing a Single Line',
    description:
      'Phase-gated autonomous agent with a SQLite knowledge base, infrastructure scanner, and human-in-the-loop approval gates before any code is generated.',
    date: 'Dec 2024',
    readTime: '4 min read',
    category: 'AI Agents',
    categoryStyle: 'accent',
    featured: true,
    coverType: 'neural',
  },
  {
    slug: 'building-ai-agent-systems',
    title: 'Building AI Agent Systems in 2026: Multi-Agent Orchestration, Memory, and Tool Calling',
    description:
      'Build AI agent systems in 2026. Multi-agent orchestration, SQLite vector memory, tool calling, and state management for production agent architectures.',
    date: 'Jun 2026',
    readTime: '18 min read',
    category: 'AI Agents',
    categoryStyle: 'accent',
    featured: true,
    coverType: 'neural',
  },
  {
    slug: 'replacing-nlp-with-llm-agents',
    title: 'Replacing NLP Pipelines with LLM Agents: MIS v2 Architecture',
    description:
      "Why I scrapped spaCy and Hugging Face for a Batch-and-Specialize pattern using Gemini's 1M context window — 40% faster, half the code.",
    date: 'Nov 2024',
    readTime: '5 min read',
    category: 'Machine Learning',
    categoryStyle: 'teal',
    featured: false,
    coverType: 'radar',
  },
  {
    slug: 'personal-claude-os',
    title: 'Personal Claude OS: ~/.claude/ as a Portable Developer System',
    description:
      'Slash commands, SOUL.md agent personas, lifecycle hooks, and permission gates — as a deployable, version-controlled package.',
    date: 'Nov 2024',
    readTime: '5 min read',
    category: 'Claude Code',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'code',
  },
  {
    slug: 'technical-founder-prompt-stack',
    title: "The Technical Founder's Prompt Stack — Gumroad Launch",
    description:
      '50 production-grade prompts for ERP consulting, agentic pipelines, and AI content operations. Numbers from the first 30 days.',
    date: 'Dec 2024',
    readTime: '3 min read',
    category: 'Products',
    categoryStyle: 'amber',
    featured: false,
    coverType: 'product',
  },
  {
    slug: 'claude-code-complete-mastery-guide',
    title: 'Claude Code Complete Mastery Guide: The Tool You Are Not Using Correctly',
    description:
      'Claude Code is the most powerful AI coding tool in 2026. Master slash commands, MCP servers, approval gates, and agentic loops to ship 10x faster.',
    date: 'Jun 2026',
    readTime: '20 min read',
    category: 'Tutorials',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'code',
  },
  {
    slug: 'claude-code-personal-os',
    title: 'I Stopped Prompting Claude and Started Operating It',
    description:
      'Personal Claude OS architecture — identity layer, memory management, hooks, skills, agents, and the self-improvement loop. How I turned ~/.claude/ into a portable operating environment.',
    readTime: '6 min read',
    category: 'Tutorials',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'code',
  },
  {
    slug: 'dag-vs-sequential-agent-execution',
    title: 'DAG vs Sequential Agent Execution: Choosing the Right Orchestration Pattern',
    description:
      'DAG vs sequential agent execution comparison. When to use DAG-based orchestration vs sequential pipelines for multi-agent systems.',
    date: 'Jun 2026',
    readTime: '10 min read',
    category: 'AI Agents',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'radar',
  },
  {
    slug: 'openclaw-2026-setup-tutorial',
    title: 'OpenClaw 2026 Setup Tutorial: From Zero to Your First Autonomous Agent',
    description:
      'OpenClaw 2026 setup tutorial. Install, configure, and run your first autonomous agent with OpenClaw in under 30 minutes.',
    date: 'Jun 2026',
    readTime: '15 min read',
    category: 'Tutorials',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'code',
  },
  {
    slug: 'build-ai-chief-of-staff-claude-code-guide',
    title: 'Build Your AI Chief of Staff: A Complete Claude Code Personal OS Guide',
    description:
      'A step-by-step blueprint for building a localized, self-improving cognitive workspace with Claude Code — from environment setup and MCP connections to auto-dreaming and parallel sessions.',
    date: 'Jun 2026',
    readTime: '12 min read',
    category: 'Tutorials',
    categoryStyle: 'accent',
    featured: true,
    coverType: 'code',
  },
  {
    slug: 'mcp-server-production-configuration',
    title: 'MCP Server Configuration: The Production Patterns I Actually Run',
    description:
      'Production MCP server configuration for Claude Code. 7 servers, one .mcp.json, context-aware chaining, and the decision tree for adding or removing each one.',
    date: 'Jun 2026',
    readTime: '10 min read',
    category: 'Tutorials',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'code',
  },
  {
    slug: 'build-your-own-lifeos',
    title: 'Build Your Own LifeOS: A Complete Life-Admin Operating System',
    description:
      'A complete spec for building lifeOS — a local, owned, personal life-admin system with four tabs, nine AI skills, and zero vendor lock-in.',
    date: 'Jun 2026',
    readTime: '8 min read',
    category: 'AI Agents',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'radar',
  },
  {
    slug: 'browser-native-micro-saas-ideas',
    title: 'Browser-Native Micro-SaaS: 6 Product Ideas That Need Zero Backend Infrastructure',
    description:
      '6 profitable browser-native micro-SaaS product ideas using WebGPU, WASM, and on-device AI — with zero server infrastructure and no data egress.',
    date: 'Jun 2026',
    readTime: '8 min read',
    category: 'Products',
    categoryStyle: 'amber',
    featured: false,
    coverType: 'product',
  },
  {
    slug: 'docr-invoice-ocr-claude-vision',
    title: 'DOCR: I Built a React App That Extracts Structured JSON from Invoices Using Claude Vision',
    description:
      'How I built a browser-native invoice OCR app using React 18, Claude Vision, and PDF.js — with a 5-step extraction pipeline, three result views, and CSV/JSON export.',
    date: 'Jun 2026',
    readTime: '7 min read',
    category: 'Products',
    categoryStyle: 'amber',
    featured: false,
    coverType: 'product',
  },
  {
    slug: 'real-world-multi-agent-workflows-production',
    title: 'Real-World Multi-Agent Workflows That Ship to Production',
    description:
      'How production multi-agent systems actually work: orchestration, state, verification gates, and human approval.',
    date: 'Jun 2026',
    readTime: '8 min read',
    category: 'AI Agents',
    categoryStyle: 'accent',
    featured: false,
    coverType: 'neural',
  },
];

export const featuredPost = posts.find((p) => p.featured)!;
export const recentPosts = posts.filter((p) => !p.featured);
