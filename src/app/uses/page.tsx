import {
  Monitor,
  Terminal,
  Code2,
  Palette,
  Database,
  Cloud,
  Brain,
  Wrench,
  Radio,
  TestTube2,
} from "lucide-react";
import Section from "@/components/section";

export const metadata = {
  title: "Uses",
  description:
    "Tools, tech, and setup that Arnav Goel uses for Data Science, ML, and web development.",
  openGraph: {
    title: "Uses: Arnav Goel",
    description: "My dev setup, tools, and daily drivers.",
  },
};

const categories = [
  {
    icon: Terminal,
    title: "Languages",
    items: [
      { name: "Python", detail: "Primary language for ML, data analysis, and scripting" },
      { name: "TypeScript", detail: "All web projects, strict mode" },
      { name: "SQL", detail: "PostgreSQL, complex queries via Prisma and raw" },
      { name: "Swift", detail: "SwiftUI for iOS/macOS (Buzz)" },
    ],
  },
  {
    icon: Brain,
    title: "ML & Data Science",
    items: [
      { name: "pandas + NumPy", detail: "Daily driver for data wrangling" },
      { name: "scikit-learn", detail: "Random Forest, permutation tests, NMAR reasoning" },
      { name: "TensorFlow / Keras", detail: "CNNs and transfer learning (MobileNetV2)" },
      { name: "Jupyter", detail: "EDA and reproducible notebooks" },
      { name: "Matplotlib / Seaborn", detail: "Publication-quality plots" },
      { name: "VADER", detail: "Sentiment scoring (Red Bull analytics)" },
    ],
  },
  {
    icon: Code2,
    title: "Web Development",
    items: [
      { name: "Next.js (App Router)", detail: "Go-to framework: RSC, streaming, ISR" },
      { name: "React", detail: "Component architecture, hooks, server components" },
      { name: "Tailwind CSS", detail: "Utility-first styling" },
      { name: "Framer Motion", detail: "Page transitions, scroll animations" },
      { name: "Prisma", detail: "Type-safe ORM for PostgreSQL" },
      { name: "Flask", detail: "Backend microservices (ADA internship, Vaani)" },
    ],
  },
  {
    icon: Database,
    title: "Data & APIs",
    items: [
      { name: "PostgreSQL", detail: "Primary database for full-stack projects" },
      { name: "Notion API", detail: "CMS for this portfolio" },
      { name: "NextAuth.js", detail: "OAuth + credentials (Serenity, Gondilal)" },
      { name: "YouTube Data API v3", detail: "Red Bull YouTube analytics" },
      { name: "yt-dlp", detail: "Video metadata extraction" },
    ],
  },
  {
    icon: Cloud,
    title: "AI Services",
    items: [
      { name: "Claude API (Anthropic)", detail: "Serenity, rant parsing, lab-report extraction" },
      { name: "Gemini 2.0 Flash", detail: "Gondilal Saraf, product descriptions from photos" },
      { name: "OpenAI API", detail: "Vaani chatbot, multilingual speech and text" },
      { name: "Replicate (SDXL)", detail: "Gondilal Saraf: AI model-image generation" },
    ],
  },
  {
    icon: Radio,
    title: "Real-Time & Extensions",
    items: [
      { name: "WebSocket (ws)", detail: "Watch Together, global sub-second sync" },
      { name: "Chrome Manifest V3", detail: "Service-worker extensions, content scripts, overlays" },
      { name: "Render", detail: "Always-on Node.js relay servers" },
      { name: "Supabase", detail: "Buzz: Postgres + PostGIS + RLS + Realtime" },
    ],
  },
  {
    icon: TestTube2,
    title: "Testing",
    items: [
      { name: "Vitest", detail: "Node server and TypeScript library tests" },
      { name: "Puppeteer", detail: "Real-Chrome browser tests for the Watch Together extension" },
    ],
  },
  {
    icon: Palette,
    title: "Design & Type",
    items: [
      { name: "Figma", detail: "UI design and prototyping" },
      { name: "shadcn/ui", detail: "Component library base for this site" },
      { name: "Lucide", detail: "Icon system" },
      { name: "Fraunces + Inter + Geist Mono", detail: "Serif display, sans body, mono kickers (this site)" },
    ],
  },
  {
    icon: Wrench,
    title: "Daily Tools",
    items: [
      { name: "VS Code", detail: "Primary editor" },
      { name: "Claude Code", detail: "AI pair programming in the terminal" },
      { name: "Git + GitHub", detail: "Version control, PRs, Actions CI" },
      { name: "Vercel", detail: "Deployment platform" },
      { name: "Docker", detail: "Containerised dev and production (ADA Flask services)" },
    ],
  },
  {
    icon: Monitor,
    title: "Hardware",
    items: [
      { name: "MacBook Pro", detail: "Daily driver" },
      { name: "External monitor", detail: "Dual-screen for long coding sessions" },
    ],
  },
];

export default function Uses() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Uses
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          My{" "}
          <span className="heading-gradient text-glow">Stack</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          The tools, frameworks, and services I use to build things, from ML
          pipelines to full-stack platforms.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-7 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5">
                  <cat.icon size={18} className="text-foreground/80 icon-glow" />
                </div>
                <h2 className="font-serif text-lg font-semibold tracking-tight">
                  {cat.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                    <div>
                      <span className="text-sm font-medium text-foreground/90">
                        {item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                       , {item.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
