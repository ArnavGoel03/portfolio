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
    title: "Uses — Arnav Goel",
    description: "My dev setup, tools, and daily drivers.",
  },
};

const categories = [
  {
    icon: Terminal,
    title: "Languages & Runtimes",
    items: [
      { name: "Python", detail: "Primary language — ML, data analysis, scripting" },
      { name: "TypeScript", detail: "All web projects, strict mode always" },
      { name: "SQL", detail: "PostgreSQL, complex queries, Prisma ORM" },
      { name: "JavaScript", detail: "When TS is overkill" },
    ],
  },
  {
    icon: Brain,
    title: "ML & Data Science",
    items: [
      { name: "TensorFlow / Keras", detail: "Deep learning, CNNs, NLP models" },
      { name: "PyTorch", detail: "Research experiments and prototyping" },
      { name: "Scikit-learn", detail: "Classical ML, preprocessing pipelines" },
      { name: "Pandas + NumPy", detail: "Data wrangling and analysis" },
      { name: "Jupyter Notebooks", detail: "Exploration and visualization" },
      { name: "Matplotlib / Seaborn", detail: "Publication-quality plots" },
    ],
  },
  {
    icon: Code2,
    title: "Web Development",
    items: [
      { name: "Next.js", detail: "My go-to framework — App Router, RSC, ISR" },
      { name: "React 19", detail: "Component architecture, hooks, server components" },
      { name: "TailwindCSS", detail: "Utility-first styling, custom design systems" },
      { name: "Framer Motion", detail: "Page transitions, scroll animations, gestures" },
      { name: "Prisma", detail: "Type-safe ORM for PostgreSQL" },
      { name: "Zod", detail: "Runtime schema validation" },
    ],
  },
  {
    icon: Database,
    title: "Databases & APIs",
    items: [
      { name: "PostgreSQL", detail: "Primary database for all full-stack projects" },
      { name: "Notion API", detail: "CMS for this portfolio" },
      { name: "Resend", detail: "Transactional email delivery" },
      { name: "NextAuth.js", detail: "Auth with OAuth + credentials" },
    ],
  },
  {
    icon: Cloud,
    title: "AI Services",
    items: [
      { name: "Claude API (Anthropic)", detail: "PCOD Tracker — rant parsing, report analysis" },
      { name: "Gemini 2.0 Flash", detail: "Gondilal Saraf — product descriptions from photos" },
      { name: "OpenAI API", detail: "Vaani chatbot — multilingual conversations" },
      { name: "Replicate (SDXL)", detail: "Gondilal Saraf — AI model image generation" },
    ],
  },
  {
    icon: Radio,
    title: "Real-Time & Extensions",
    items: [
      { name: "WebSocket (ws)", detail: "Watch Together — sub-second sync across global clients" },
      { name: "Chrome Manifest V3", detail: "Service worker extensions with content scripts and overlays" },
      { name: "Render", detail: "Always-on Node.js relay servers with self-ping keep-alive" },
      { name: "Service Workers", detail: "Offline caching, MV3 background workers, PWA install" },
    ],
  },
  {
    icon: TestTube2,
    title: "Testing & QA",
    items: [
      { name: "Vitest", detail: "Fast unit + integration tests for Node servers and TS libraries" },
      { name: "Puppeteer", detail: "Real-Chrome browser tests for extensions and end-to-end flows" },
      { name: "Jest", detail: "Legacy projects and React component testing" },
    ],
  },
  {
    icon: Monitor,
    title: "Hardware",
    items: [
      { name: "MacBook Pro", detail: "Daily driver for development" },
      { name: "External Monitor", detail: "Dual-screen setup for productivity" },
    ],
  },
  {
    icon: Palette,
    title: "Design",
    items: [
      { name: "Figma", detail: "UI design and prototyping" },
      { name: "shadcn/ui", detail: "Component library base" },
      { name: "Lucide Icons", detail: "Clean, consistent iconography" },
      { name: "Google Fonts", detail: "Geist, Playfair Display, Cormorant Garamond" },
    ],
  },
  {
    icon: Wrench,
    title: "Dev Tools",
    items: [
      { name: "VS Code", detail: "Primary editor with Vim keybindings" },
      { name: "Claude Code", detail: "AI pair programming in the terminal" },
      { name: "Git + GitHub", detail: "Version control, PRs, Actions CI" },
      { name: "Vercel", detail: "Deployment platform for all web projects" },
      { name: "Docker", detail: "Containerized dev environments" },
      { name: "Postman", detail: "API testing and documentation" },
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
          The tools, frameworks, and services I use to build things — from ML
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
                        — {item.detail}
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
