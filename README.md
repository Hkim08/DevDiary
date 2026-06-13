# DevDiary

![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?style=flat&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-BaaS-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat&logo=opensourceinitiative&logoColor=white)

> **Live:** [devdiary.uk](https://devdiary.uk)

---

## Overview

**DevDiary** is a high-performance technical blog built with **Astro 6** in hybrid mode (SSR + SSG), focused on AI development, Claude Code, agentic systems, and AI productivity tools. It combines static content generation for speed and SEO with dynamic real-time interaction layers backed by **Supabase**.

The project features a full authentication system, social interactions (likes, comments, bookmarks), a dark-mode premium design, and production deployment on Vercel.

---

## Features

- **Hybrid SSR + SSG rendering** with Astro 6 — articles are statically generated at build time; dynamic routes serve via SSR
- **Full authentication** via Supabase Auth — email registration, secure login, persistent sessions, personalized activity page
- **Guest interactions** — anonymous visitors can like, bookmark, and comment with state tracked via `localStorage`
- **Interactive article sidebar** — real-time like, comment, and bookmark counters via Supabase client SDK
- **Account deletion** with anti-cache RPC functions for complete and secure data removal
- **Row-Level Security (RLS)** policies in PostgreSQL ensuring data isolation at the database level
- **Prisma ORM** for versioned migrations and auto-typed database entities
- **Premium dark design** — glassmorphism, smooth transitions, Aldrich typography, Tailwind CSS 4 with `@tailwindcss/typography`
- **E2E tests** with Playwright for critical user flows
- **Docker-ready** for production containerization
- **Content focus** — AI development, Claude Code, agentic systems, AI productivity tools

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Web framework | Astro (hybrid SSR/SSG) | 6.1.3+ |
| Language | TypeScript | 5.9+ |
| Styling | Tailwind CSS + Typography | 4.x |
| Build tool | Vite (via Astro) | — |
| BaaS / Auth | Supabase (PostgreSQL + Auth + RLS) | 2.93+ |
| ORM / Migrations | Prisma | — |
| Linting | ESLint + @typescript-eslint | — |
| Formatting | Prettier | — |
| Type checking | TypeScript `tsc --noEmit` | — |
| Tests | Playwright | 1.59+ |
| Deployment | Vercel | — |
| Container | Docker | — |
| License | MIT | — |

---

## Installation

### Prerequisites

- **Node.js** (version pinned in `.nvmrc`)
- **npm** updated
- A **Supabase** project with tables applied via Prisma

### 1. Clone the repository

```bash
git clone <repo-url>
cd DevDiary
```

### 2. Use the correct Node version

```bash
nvm use
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
# .env — never commit this file
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Apply database schema (Prisma)

```bash
npx prisma db push        # development
npx prisma migrate deploy # production
```

---

## Usage

### Development server

```bash
npm run dev
```

Opens at [http://localhost:4321](http://localhost:4321).

### Production build

```bash
npm run build
npm run preview
```

### Quality commands

```bash
npm run lint          # Check lint errors
npm run lint:fix      # Auto-fix lint errors
npm run format        # Format all files
npm run format:check  # Verify formatting
npm run type-check    # TypeScript type checking
```

### Tests

```bash
npm test                                              # Run all tests
npx playwright test --ui                              # Interactive UI mode
```

### Deploy to Vercel

1. Connect the repo to a [Vercel](https://vercel.com) project
2. Add environment variables: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`
3. Vercel auto-detects Astro and configures the build

---

## Project Structure

```
DevDiary/
├── src/
│   ├── pages/                # Astro routes (SSR + SSG)
│   │   ├── index.astro       # Home / post listing
│   │   ├── posts/            # Individual article pages
│   │   ├── login.astro       # Authentication
│   │   ├── register.astro
│   │   ├── archive.astro     # All posts archive
│   │   ├── my-favorites.astro
│   │   ├── my-likes.astro
│   │   └── settings.astro
│   ├── components/           # Reusable Astro/TS components
│   ├── content/
│   │   ├── config.ts         # Content collection schema
│   │   └── posts/            # Markdown blog posts
│   ├── layouts/              # Base layouts
│   ├── lib/
│   │   └── supabase.ts       # Supabase client
│   └── styles/
│       └── global.css        # Tailwind + theme
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── tests/                    # E2E tests
└── configs/                  # Additional config
```

---

## Security

### Row-Level Security (RLS)

All user interaction tables (likes, comments, bookmarks, profile data) have active RLS policies ensuring authenticated users can only read and modify their own records.

### Account deletion

Implemented via custom Supabase RPC functions to prevent race conditions and ensure complete transactional deletion of all associated user data.

### Credential management

Supabase credentials are managed exclusively via environment variables (`.env`), excluded from the repo via `.gitignore`. The `.env.example` documents required variables without exposing real values. Only `PUBLIC_`-prefixed variables are exposed to the client.

### Guest user interactions

Anonymous interactions are tracked exclusively in the browser's `localStorage` — no backend records are created until the user registers.

---

## License

This project is distributed under the **MIT** license.

Copyright © 2026 **Rachid Houmayni**

---

## Author

**Rachid Houmayni** — AI developer, productivity systems builder, and author of the Personal Claude OS and opencode agent ecosystem.

- [GitHub](https://github.com/Hkim08)
- [Gumroad](https://gumroad.com/rachidhakim)
- [DevDiary](https://devdiary.uk)
