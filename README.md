# Arnav Goel (Yash): Portfolio

A premium dark-themed portfolio built with Next.js 16, featuring 3D visualizations, AI-optimized SEO, a blog, and a Notion-powered CMS. Fully installable as a PWA on any OS.

## Live Site

[arnavgoel.com](https://arnavgoel.com)

## Overview

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | 3D rotating icosahedron hero, typewriter name animation, "Currently" status cards, skills ticker, featured projects |
| **About** | `/about` | Animated stat counters (GPA, projects, certs, legacy), highlights, story, education, certifications |
| **Projects** | `/projects` | Click-to-expand project cards. Notion CMS + static merged with deduplication, sorted by links |
| **Experience** | `/experience` | Alternating timeline with active role glow, hover lift, skill badges |
| **Uses** | `/uses` | Full tech stack: Languages, ML, Web Dev, Databases, AI Services, Hardware, Design, Dev Tools |
| **Blog** | `/blog` | Technical writing with 3 posts on building projects and career reflections |
| **Contact** | `/contact` | Contact form → Resend API → email inbox, social links, location |

## Blog Posts

| Post | Slug |
|------|------|
| Building a Full-Stack Jewelry Platform for a Century-Old Family Business | `/blog/building-gondilal-saraf` |
| Why I Built an AI Health Tracker for Women with PCOD | `/blog/pcod-tracker-ai-health` |
| From Algorithms to Jewelry: My Path Through Data Science & Entrepreneurship | `/blog/from-algorithms-to-jewelry` |

## Featured Projects

- **PCOD Tracker**: AI-powered health companion for women with PCOD/PCOS. Claude AI auto-extracts symptoms, mood, and meds from free-form text. PDF lab report parsing. 15 Prisma models, medication streaks, lab trend charts. [pcod-tracker.vercel.app](https://pcod-tracker.vercel.app)
- **Gondilal Saraf**: Full-stack jewelry platform for a century-old family business. Bilingual storefront, live gold rates, AR try-on, Gemini AI descriptions, admin ERP, 26 API routes, 85 tests. [gondilalsaraf.com](https://gondilalsaraf.com)
- **Vaani**: Voice-first AI chatbot for Indian-language customer support (co-authored with Ahaskar). Shelved after market-fit check showed LLM inference cost-per-conversation exceeded cheap Indian human-agent labour.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | TailwindCSS 4 + tw-animate-css + custom CSS (glassmorphism, 3D cards, gradient borders) |
| Animations | Framer Motion + canvas-based 3D icosahedron hero + CSS keyframes (typewriter, border-flow, glow) |
| Fonts | Geist Sans (body), Geist Mono (code labels), Playfair Display (serif headings), via next/font |
| CMS | Notion API (@notionhq/client) for projects, experience, skills, with static fallback + merge |
| Email | Resend API for contact form submissions delivered to inbox |
| UI Components | shadcn + Lucide React + react-icons |
| SEO | Dynamic OG/Twitter images, robots.ts, sitemap.ts (pages + blog slugs), manifest.ts, JSON-LD |
| AI SEO | llms.txt + llms-full.txt, explicit allow for GPTBot, ClaudeBot, PerplexityBot, and 7 more AI crawlers |
| PWA | Service worker with offline caching, dynamic app icons, installable on iOS/Android/macOS/Windows |

## Design System

| Element | Detail |
|---------|--------|
| **3D Gem Hero** | Canvas-rendered rotating icosahedron (12 vertices, 30 edges) with orbital nodes, ambient particles, scroll-enhanced rotation, mouse-reactive glow |
| **Typewriter** | "Hi, I'm" → "Arnav" types letter-by-letter with blinking cursor |
| **Micro-Grid** | Subtle 60px geometric grid overlay, radially masked, schematic/blueprint depth |
| **Glassmorphism** | `backdrop-blur` nav and cards with purple-tinted borders |
| **Gradient Borders** | Animated multi-stop purple gradients on card hover |
| **Button Effects** | `btn-glow` (expanding lavender shadow) and `btn-border-flow` (cycling gradient border animation) |
| **Brand Icon** | Geometric jewel SVG (pentagon gem made of connected nodes) in navbar |
| **3D Cards** | `perspective: 1000px` with `rotateX/Y` tilt on hover, click-to-expand modal |
| **Page Transitions** | Fade + slide-up on route change via Framer Motion |
| **Color Palette** | Primary `#a78bfa`, background `#06050b`, foreground `#eee8f5` (purple-on-dark) |

## Architecture

```
src/
  app/
    layout.tsx                # Root: fonts, metadata, JSON-LD, navbar, footer, SW register, page transitions
    page.tsx                  # Home: hero, typewriter, status cards, featured projects, skills ticker
    globals.css               # Theme vars, glassmorphism, animations, micro-grid, button effects
    not-found.tsx             # Custom 404 page
    robots.ts                 # Allow all crawlers + AI bots
    sitemap.ts                # All pages + dynamic blog post slugs
    manifest.ts               # PWA manifest with maskable icons
    icon.tsx                  # Dynamic 512x512 app icon (ImageResponse)
    apple-icon.tsx            # Apple touch icon (re-exports icon.tsx)
    opengraph-image.tsx       # Dynamic OG image: branded card with gem icon, gradient, tags
    twitter-image.tsx         # Twitter card image (re-exports OG image)
    about/page.tsx            # Stat counters, highlights, education, certifications, story
    projects/page.tsx         # Notion + static merged & sorted project grid
    experience/page.tsx       # Timeline (Notion + static)
    uses/page.tsx             # Tech stack: 8 categories with tools and descriptions
    blog/
      page.tsx                # Blog index with post cards
      [slug]/page.tsx         # Individual blog post with generateStaticParams
    contact/
      layout.tsx              # Metadata wrapper (page is a client component)
      page.tsx                # Form → /api/contact → Resend → inbox
    api/contact/route.ts      # POST handler: Resend email delivery
  components/
    hero-nodes.tsx            # 3D icosahedron canvas visualization
    typewriter.tsx            # Letter-by-letter typing effect
    gem-icon.tsx              # SVG brand icon (data-node jewel)
    navbar.tsx                # Fixed glassmorphism nav with gem icon + resume button
    project-card.tsx          # 3D card with click-to-expand modal, icon mapping
    skills-ticker.tsx         # Infinite horizontal scroll of skill badges
    stat-counter.tsx          # Animated count-up numbers (IntersectionObserver)
    section.tsx               # Reusable page section wrapper with scroll reveal
    json-ld.tsx               # Person + WebSite + Breadcrumb structured data
    footer.tsx                # 3-column footer: bio, nav links, CTA
    timeline.tsx              # Experience timeline with active role highlighting
    scroll-to-top.tsx         # Floating scroll-to-top button
    page-transition.tsx       # Fade + slide-up route transition wrapper
    sw-register.tsx           # Service worker registration (client component)
    ui/                       # shadcn primitives (badge, button, card, input, textarea, separator)
  lib/
    types.ts                  # All interfaces: Project, Experience, Skill, BlogPost
    constants.ts              # SITE_URL, SITE_NAME, EMAIL, SOCIAL_LINKS, NAV_LINKS
    blog.ts                   # Blog posts data + getPost() / getAllPosts()
    notion.ts                 # Notion API: getProjects, getFeaturedProjects, getExperience, getSkills
    utils.ts                  # cn() classname utility
public/
  sw.js                       # Service worker: precache routes, offline fallback, stale-while-revalidate
  llms.txt                    # AI SEO: concise portfolio summary
  llms-full.txt               # AI SEO: detailed project and blog breakdowns
  resume.pdf                  # Downloadable resume
  favicon.ico                 # Browser favicon
```

## How to Edit

All editable content is centralized for easy updates:

| What to change | Where to edit |
|----------------|---------------|
| **Email / social links** | `src/lib/constants.ts` → `EMAIL`, `SOCIAL_LINKS` (updates navbar, footer, contact, API, JSON-LD) |
| **Navigation links** | `src/lib/constants.ts` → `NAV_LINKS` (auto-updates navbar + footer) |
| **Site name / description / URL** | `src/lib/constants.ts` → `SITE_NAME`, `SITE_DESCRIPTION`, `SITE_URL` |
| **Add a project** | Add to `staticProjects` array in `src/app/projects/page.tsx` (or add to Notion DB) |
| **Add a blog post** | Add to `posts` array in `src/lib/blog.ts` (auto-generates page, sitemap entry, static params) |
| **Add a tool to Uses** | Add to `categories` array in `src/app/uses/page.tsx` |
| **Update resume** | Replace `public/resume.pdf` |
| **Add experience** | Add to `staticExperience` in `src/app/experience/page.tsx` (or Notion DB) |
| **Add skills to ticker** | Edit `skills` array in `src/components/skills-ticker.tsx` |
| **Change theme colors** | Edit CSS variables in `src/app/globals.css` (`:root` and `.dark` blocks) |
| **Change fonts** | Edit font imports in `src/app/layout.tsx` |
| **Project card icons** | Edit `projectIcons` map in `src/components/project-card.tsx` |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL (defaults to `https://arnavgoel.com`) |
| `NOTION_API_KEY` | No | Notion integration secret for CMS |
| `NOTION_PROJECTS_DB` | No | Notion database ID for projects |
| `NOTION_EXPERIENCE_DB` | No | Notion database ID for experience |
| `NOTION_SKILLS_DB` | No | Notion database ID for skills |
| `RESEND_API_KEY` | No | Resend API key for contact form email delivery |

All optional. The site works fully with static data when Notion/Resend are unconfigured.

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

Deployed on **Vercel**. Push to `main` triggers auto-deploy. PWA installable on iOS, Android, macOS, Windows, and ChromeOS.

## License

Private project. All rights reserved.
