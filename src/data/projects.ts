export interface Project {
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  status: 'active' | 'released' | 'wip' | 'archived';
  github: string;
  icon: string;
}

export const projects: Project[] = [
  {
    name: 'clawd', tagline: 'TypeScript multi-agent AI runtime',
    desc: 'A host-agnostic multi-agent OS built on pi-agent-core. Features HTTP+SSE API, React dashboard, Chrome bridge, and SQLite Buffer-of-Thoughts memory. Deployed on Hugging Face Spaces.',
    tags: ['TypeScript', 'AI Agents', 'Node.js'], status: 'active', github: 'https://github.com/rachid/clawd', icon: '🧠',
  },
  {
    name: 'Arc', tagline: 'Self-learning ERP agent for SMB clients',
    desc: 'Phase-gated AI agent (Discovery → Audit → Design → Build → Delivery) that audits client infrastructure, builds a SQLite knowledge base, and waits for approval before advancing.',
    tags: ['Python', 'SQLite', 'AI Agents'], status: 'active', github: 'https://github.com/rachid/arc', icon: '🏗️',
  },
  {
    name: 'BAO Scaffold', tagline: 'Business Agentic OS — host-agnostic',
    desc: 'Deployable ZIP scaffold for multi-agent systems across Claude Code, OpenCode, Gemini CLI, and Cursor. Generalises the Personal Claude OS philosophy for any agentic host.',
    tags: ['Claude Code', 'OpenCode', 'Agents'], status: 'released', github: 'https://github.com/rachid/bao-scaffold', icon: '🚀',
  },
  {
    name: 'QuickBill', tagline: 'Full-stack invoice generator',
    desc: 'React + Vite + Express + SQLite invoice generator with PDF export. Built in an afternoon. Clean, self-hosted, no subscriptions.',
    tags: ['React', 'Node.js', 'SQLite'], status: 'released', github: 'https://github.com/rachid/quickbill', icon: '🧾',
  },
  {
    name: 'DOCR', tagline: 'Client-side invoice OCR',
    desc: 'Browser-based invoice OCR using Tesseract.js + Claude API. No server, no uploads — runs entirely in the browser.',
    tags: ['JavaScript', 'Claude API', 'OCR'], status: 'released', github: 'https://github.com/rachid/docr', icon: '🔍',
  },
  {
    name: 'Synapse-Core', tagline: 'React analytics dashboard',
    desc: 'Modular React dashboard for business intelligence — sales KPIs, inventory trends, client health scores. Designed for SMB ERP integrations.',
    tags: ['React', 'TypeScript', 'Dashboard'], status: 'released', github: 'https://github.com/rachid/synapse-core', icon: '📊',
  },
];
