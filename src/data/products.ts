export interface Product {
  name: string;
  slug: string;
  tagline: string;
  desc: string;
  descriptionLong: string;
  price: number;
  badge: string | null;
  features: string[];
  gumroadUrl: string;
  category: string;
  icon: string;
  highlights: string[];
  faq: { q: string; a: string }[];
  blogPosts?: string[];
  images?: string[];
  coverImage?: string;
  inlineImage?: string;
}

export const products: Product[] = [
  {
    name: 'Personal Claude OS', slug: 'personal-claude-os',
    tagline: 'The portable ~/.claude/ config system',
    desc: 'A battle-tested configuration system for Claude Code — slash commands, agent personas, lifecycle hooks, and a structured SOUL.md philosophy.',
    descriptionLong: 'Stop rebuilding your Claude Code setup every time you start a new project. Personal Claude OS is a complete, portable configuration system that ships your slash commands, agent personas, lifecycle hooks, and development philosophy — ready to deploy in any new environment within minutes.',
    price: 29, badge: 'BESTSELLER',
    icon: '⚡',
    features: [
      'Complete ~/.claude/ scaffold ready to deploy on any machine',
      '50-page PDF guide with architecture explanations and rationale',
      'Slash command library with 20+ pre-built commands for common workflows',
      'Agent persona templates (Arc, Analyst, Builder) for multi-role collaboration',
      'Lifecycle hooks for automated context management across sessions',
      'Lifetime updates included — new commands added quarterly',
    ],
    highlights: ['BESTSELLER — 200+ copies sold', 'Lifetime updates', 'Includes 50-page PDF guide'],
    gumroadUrl: 'https://gumroad.com', category: 'Claude Code',
    faq: [
      { q: 'Does this work with any Claude Code version?', a: 'Yes. Personal Claude OS is version-agnostic — it works with the standard ~/.claude/ directory structure that all Claude Code installations use.' },
      { q: 'Can I customize the slash commands?', a: 'Absolutely. Every command is just a markdown file — you can edit, remove, or add your own commands at any time. The guide explains the pattern.' },
      { q: 'What if I run into issues?', a: 'Email me and I will help you debug. All purchases include direct support.' },
    ],
  },
  {
    name: 'BizPulse', slug: 'bizpulse',
    tagline: 'The zero-server business KPI dashboard with multi-model AI diagnosis',
    desc: 'A single HTML file that turns your browser into a live business dashboard — track revenue, profit, leads, and customers with 4 interactive charts, health scoring, and AI diagnosis.',
    descriptionLong: 'BizPulse is a complete business KPI dashboard in a single HTML file. No server, no database, no subscription — just open it in your browser and start tracking.\n\nEnter up to 12 months of revenue, expenses, leads, and customer data. BizPulse auto-calculates 5 KPI cards, renders 4 interactive Chart.js visualizations, computes a 0–100 Business Health Score, and fires 8 automatic Smart Alerts that flag risks and opportunities in real time.\n\nThe optional AI Diagnosis tab lets you bring your own API key from Anthropic Claude, OpenAI ChatGPT, or Google Gemini — and get a plain-language business analysis specific to your numbers. 4 one-click quick questions and a custom prompt field are included.\n\nEverything except the AI feature works fully offline. Data persists in your browser between sessions via localStorage. Export to CSV or print to PDF with one click.\n\nComes with two bonus guides: an 8-industry KPI benchmark reference and a 20-prompt AI analysis cheatsheet.',
    price: 39, badge: null,
    icon: '📊',
    features: [
      'Single HTML file — zero installation, opens in any browser, works on all OSes',
      '12-month revenue, expense & profit tracking with auto-calculated totals',
      '5 KPI cards: Total Revenue, Total Profit, Avg. Margin, Conversion Rate, Customers',
      '4 interactive Chart.js charts: revenue vs expenses bar, profit bar, lead funnel line, margin % line',
      'Business Health Score (0–100) with canvas gauge and plain-language rating (Healthy / Moderate / Critical)',
      'Smart Alerts engine — 8 automatic risk and opportunity signals with color-coded severity',
      'Full monthly breakdown table with MoM % change for every metric',
      'AI Diagnosis tab — bring your own API key (Claude, ChatGPT, or Gemini) for data-specific analysis',
      '4 one-click AI quick questions + custom prompt field with auto-injected business context',
      'CSV export with Excel-compatible BOM header and print-to-PDF report view',
      'LocalStorage auto-save — data persists between sessions without a database',
      '8-industry KPI benchmark guide (bonus) and 20 AI analysis prompt cheatsheet (bonus) included',
    ],
    highlights: ['No install required', 'Works offline', 'Multi-model AI (Claude/ChatGPT/Gemini)', 'KPI benchmarks included'],
    gumroadUrl: 'https://gumroad.com', category: 'Dashboard',
    coverImage: '/images/products/bizpulse/cover.png',
    inlineImage: '/images/products/bizpulse/tab1-data-input.png',
    images: [
      '/images/products/bizpulse/tab2-dashboard.png',
      '/images/products/bizpulse/tab3-ai-diagnosis.png',
    ],
    faq: [
      { q: 'Do I need a server or database?', a: 'No. BizPulse is a single HTML file. Double-click it and it opens in your browser. All data is stored locally in your browser.' },
      { q: 'How does the AI Diagnosis work?', a: 'Bring your own API key from Anthropic, OpenAI, or Google. Paste it in the AI tab and click Analyze. Your data never leaves your browser — it is sent directly to the API you chose. Each analysis costs less than $0.01.' },
      { q: 'Does it work offline?', a: 'Yes. Everything except the optional AI feature works fully offline — all charts, calculations, health score, and alerts.' },
      { q: 'Can I export my data?', a: 'Yes. Click the CSV button to download a spreadsheet, or use the Print button to save a PDF report.' },
      { q: 'Is it mobile-friendly?', a: 'Yes. The layout is fully responsive and works on phones, tablets, and desktops.' },
      { q: 'Can I use it for multiple businesses?', a: 'The single-user license covers you personally. Just duplicate the HTML file and enter different data.' },
    ],
  },
  {
    name: 'ClientFlow', slug: 'clientflow',
    tagline: 'CRM for freelancers who hate SaaS',
    desc: 'A standalone client pipeline tracker built for solo consultants and freelancers. Track leads, proposals, active projects, and invoices.',
    descriptionLong: 'ClientFlow is a purpose-built CRM for solo operators who do not want another subscription. Track every client from first contact to paid invoice — all in a standalone tool that respects your privacy and your budget.',
    price: 19, badge: null,
    icon: '🔄',
    features: [
      'Lead → Proposal → Active → Invoiced pipeline with drag-and-drop',
      'Client contact book with notes, history, and tags',
      'Project notes and status tracker per engagement',
      'Revenue forecast view with monthly and quarterly projections',
      'CSV export for accounting and tax preparation',
      'Email template library for common client communications',
    ],
    highlights: ['One-time payment', 'No SaaS fees', 'CSV export'],
    gumroadUrl: 'https://gumroad.com', category: 'CRM',
    faq: [
      { q: 'Can I import existing client data?', a: 'Yes. ClientFlow supports CSV import for leads and existing clients.' },
      { q: 'Is there a mobile app?', a: 'ClientFlow is a standalone HTML file that works in any browser, including mobile browsers.' },
    ],
  },
  {
    name: 'BAO Scaffold', slug: 'bao-scaffold',
    tagline: 'Deploy a multi-agent OS in minutes',
    desc: 'The Business Agentic OS as a deployable ZIP — works with Claude Code, OpenCode, Gemini CLI, and Cursor.',
    descriptionLong: 'BAO Scaffold is a host-agnostic multi-agent operating system you can deploy in minutes. It works with Claude Code, OpenCode, Gemini CLI, and Cursor — giving you a structured agent team with memory, workflow gating, and audit trails, regardless of which AI tool you prefer.',
    price: 39, badge: 'NEW',
    icon: '🧠',
    features: [
      'Host-agnostic scaffold — works with Claude Code, OpenCode, Gemini CLI, and Cursor',
      'Pre-built agent roles: Planner, Builder, Auditor, Reviewer with SOP-defined responsibilities',
      'SQLite-backed Buffer-of-Thoughts memory for cross-session context retention',
      'Phase-gate workflow engine with automated handoffs between agent roles',
      'Full README with architecture diagram and onboarding guide',
      'Extensible skill system for adding custom agent behaviors',
    ],
    highlights: ['Host-agnostic', 'SQLite memory', 'Phase-gate workflows'],
    gumroadUrl: 'https://gumroad.com', category: 'AI Agents',
    faq: [
      { q: 'Which AI tools does BAO work with?', a: 'It works with Claude Code, OpenCode, Gemini CLI, and Cursor. The scaffold is designed to be tool-agnostic.' },
      { q: 'Do I need to know how to configure agents?', a: 'No. The scaffold ships with pre-built agent roles. You customize them as you grow.' },
    ],
  },
  {
    name: 'Local SEO Dominance OS', slug: 'local-seo-dominance-os',
    tagline: 'Replace $400/mo in local SEO tools with 12 Claude skills',
    desc: 'A complete search intelligence system for Claude — 12 skill files, 3 automated workflows, 6 schema templates, and 4 playbooks.',
    descriptionLong: 'The Local SEO Dominance OS replaces $400+/month in fragmented local SEO tools (Semrush, BrightLocal, Whitespark) with a single Claude Pro subscription. It is 12 production-ready Claude Skills, 3 automated workflow templates, 6 validated JSON-LD schema files, and 4 operational playbooks — packaged for the 2026 Ask Maps reality.',
    price: 29, badge: 'NEW',
    icon: '🌐',
    features: [
      '12 production-ready Claude Skills covering GBP, reviews, citations, and GEO audits',
      '3 automated workflow templates for audit, content optimization, and reporting',
      '6 validated JSON-LD schema templates for Restaurant, Medical, Legal, Home Services, Retail, and Professional Services',
      '4 operational playbooks for GBP dominance, review management, NAP citations, and local link building',
      'Ask Maps Mystery Shop toolkit for monitoring exactly what Gemini says about any business',
      'KPI dashboard template and monthly client reporting template',
    ],
    highlights: ['Replaces $400/mo in tools', '2026 Ask Maps ready', '12 Claude Skills'],
    gumroadUrl: 'https://gumroad.com', category: 'Local SEO',
    blogPosts: ['local-seo-dominance-os-claude'],
    faq: [
      { q: 'Does the OS require any coding to use?', a: 'No. The skills activate through natural language. Tell the dispatch router what you need and it sequences the relevant skills automatically.' },
      { q: 'What if I do not use Claude Pro?', a: 'The OS is built as a Claude Project setup. A Claude Pro subscription ($20/month) is the minimum requirement.' },
      { q: 'Can I add my own skills?', a: 'Yes. The dispatch-router is extensible — drop a new SKILL.md into the skills folder and add a route.' },
    ],
  },
];
