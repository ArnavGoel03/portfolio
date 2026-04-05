# Arnav Goel (Yash) — Portfolio

A premium dark-themed portfolio built with Next.js 16, featuring 3D visualizations, AI-optimized SEO, and a Notion-powered CMS.

## Live Site

[arnavgoel.com](https://arnavgoel.com)

## Overview

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | 3D rotating icosahedron hero (graph-theory gem), typewriter name animation, featured projects, skills ticker |
| **About** | `/about` | Background, education (UCSD, DPS RKP), certifications (Stanford ML, DeepLearning.AI), personal story |
| **Projects** | `/projects` | Full project grid — Notion CMS + static fallback, merged with deduplication |
| **Experience** | `/experience` | Professional + academic timeline with Notion integration |
| **Contact** | `/contact` | Contact form with Resend email delivery to inbox, social links |

## Featured Projects

- **PCOD Tracker** — AI-powered health companion for women with PCOD/PCOS. Claude AI auto-extracts symptoms, mood, and meds from free-form text. PDF lab report parsing. 15 Prisma models, medication streaks, lab trend charts. [pcod-tracker.vercel.app](https://pcod-tracker.vercel.app)
- **Gondilal Saraf** — Full-stack jewelry platform for a century-old family business. Bilingual storefront, live gold rates, AR try-on, Gemini AI descriptions, admin ERP, 26 API routes, 85 tests. [gondilalsaraf.com](https://gondilalsaraf.com)
- **Vaani** — Multilingual AI chatbot supporting 5+ Indian languages with real-time speech-to-text and text-to-speech
- **Style It** — AI wardrobe assistant with TensorFlow recommendation engine, 30% accuracy boost via semantic vector matching

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | TailwindCSS 4 + tw-animate-css + custom CSS (glassmorphism, 3D cards, gradient borders) |
| Animations | Framer Motion + canvas-based 3D icosahedron hero + CSS keyframes (typewriter, border-flow, glow) |
| Fonts | Geist Sans (body), Geist Mono (code labels), Playfair Display (serif headings) — via next/font |
| CMS | Notion API (@notionhq/client) for projects, experience, skills — with static fallback + merge |
| Email | Resend API — contact form submissions delivered to inbox |
| UI Components | shadcn + Lucide React + react-icons |
| SEO | Full metadata (OG, Twitter, canonical), robots.ts, sitemap.ts, manifest.ts, JSON-LD (Person + WebSite) |
| AI SEO | llms.txt + llms-full.txt, explicit allow for GPTBot, ClaudeBot, PerplexityBot, and 7 more AI crawlers |

## Design System

| Element | Detail |
|---------|--------|
| **3D Gem Hero** | Canvas-rendered rotating icosahedron (12 vertices, 30 edges) with orbital nodes, ambient particles, scroll-enhanced rotation, mouse-reactive glow |
| **Typewriter** | "Hi, I'm" → "Arnav" types letter-by-letter with blinking cursor |
| **Micro-Grid** | Subtle 60px geometric grid overlay, radially masked, gives a schematic/blueprint depth |
| **Glassmorphism** | `backdrop-blur` nav and cards with purple-tinted borders |
| **Gradient Borders** | Animated multi-stop purple gradients on card hover |
| **Button Effects** | `btn-glow` (expanding lavender shadow) and `btn-border-flow` (cycling gradient border animation) |
| **Brand Icon** | Geometric jewel SVG (pentagon gem made of connected nodes) in navbar |
| **3D Cards** | `perspective: 1000px` with `rotateX/Y` tilt on hover |
| **Color Palette** | Primary `#a78bfa`, background `#06050b`, foreground `#eee8f5` — purple-on-dark |

## Architecture

```
src/
  app/
    layout.tsx              # Root: fonts, metadata, JSON-LD, navbar, footer
    page.tsx                # Home: hero, typewriter, featured projects, skills ticker
    globals.css             # Theme vars, glassmorphism, animations, button effects
    robots.ts               # Allow all crawlers + AI bots
    sitemap.ts              # All 5 pages with priority
    manifest.ts             # PWA manifest
    about/page.tsx          # Education, certifications, story
    projects/page.tsx       # Notion + static merged project grid
    experience/page.tsx     # Timeline (Notion + static)
    contact/
      layout.tsx            # Metadata (client page can't export metadata)
      page.tsx              # Form → /api/contact → Resend → inbox
    api/contact/route.ts    # POST handler: Resend email delivery
  components/
    hero-nodes.tsx          # 3D icosahedron canvas visualization
    typewriter.tsx          # Letter-by-letter typing effect
    gem-icon.tsx            # SVG brand icon (data-node jewel)
    navbar.tsx              # Fixed glassmorphism nav with gem icon
    project-card.tsx        # 3D card with icon mapping per project
    skills-ticker.tsx       # Infinite horizontal scroll of skill badges
    section.tsx             # Reusable page section wrapper
    json-ld.tsx             # Person + WebSite structured data
    footer.tsx              # Site footer
    timeline.tsx            # Experience timeline component
  lib/
    notion.ts               # Notion API: getProjects, getFeaturedProjects, getExperience, getSkills
    types.ts                # Project, Experience, Skill interfaces
    constants.ts            # SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS
    utils.ts                # cn() classname utility
  public/
    llms.txt                # AI SEO: concise portfolio summary
    llms-full.txt           # AI SEO: detailed project breakdowns
    favicon.ico
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL (defaults to `https://arnavgoel.com`) |
| `NOTION_API_KEY` | No | Notion integration secret for CMS |
| `NOTION_PROJECTS_DB` | No | Notion database ID for projects |
| `NOTION_EXPERIENCE_DB` | No | Notion database ID for experience |
| `NOTION_SKILLS_DB` | No | Notion database ID for skills |
| `RESEND_API_KEY` | No | Resend API key for contact form email delivery |

All optional — the site works fully with static data when Notion/Resend are unconfigured.

## Getting Started

```bash
npm install
cp .env.example .env.local   # Fill in API keys (all optional)
npm run dev                   # localhost:3000
```

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

## Deployment

Deployed on **Vercel**. Push to `main` triggers auto-deploy.

## License

Private project. All rights reserved.
