import Link from "next/link";
import { Download, Mail, MapPin, Globe } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaOrcid } from "react-icons/fa";
import Section from "@/components/section";
import { SOCIAL_LINKS, SITE_URL, EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Resume",
  description:
    "Arnav Goel: Data Science student at UC San Diego (UC GPA 3.911, graduating June 2027). Full resume with education, experience, projects, skills, and certifications.",
  alternates: { canonical: `${SITE_URL}/resume` },
};

const experience = [
  {
    role: "Member",
    company: "Triton Quantitative Trading",
    location: "UC San Diego",
    period: "Apr 2025: Present",
    bullets: [
      "Systematic-strategy research on tick-level market data in Python, pandas, NumPy.",
      "Statistical modelling, time-series analysis, and signal processing; backtests across multi-year historical data with feature engineering and parameter tuning.",
      "Weekly research discussions on risk management, market structure, and advanced quantitative methods.",
    ],
    skills: ["Python", "pandas", "NumPy", "Time-Series", "Backtesting"],
  },
  {
    role: "SWE Intern",
    company: "ADA",
    location: "Bengaluru, India",
    period: "Oct 2024: Dec 2024",
    bullets: [
      "Spearheaded backend development for a multi-region patient-management platform targeting 50,000+ patients across 120+ US, Japanese, and South Korean hospitals.",
      "Built and containerised Flask microservices with Docker Compose, cut onboarding and setup time by 60%.",
      "Developed the Nurse Panel Backend API; engineered supporting data models for onboarding, scheduling, and real-time shift tracking.",
      "Optimised PostgreSQL queries, automated daily ETL pipelines in Python, and architected scalable MDM tables.",
      "Established full-stack observability with OpenTelemetry (logs, traces, metrics), 90% faster issue detection.",
    ],
    skills: [
      "Flask",
      "Docker",
      "PostgreSQL",
      "Python",
      "OpenTelemetry",
      "ETL",
      "REST APIs",
    ],
  },
  {
    role: "Cloud Engineering Intern",
    company: "Espire Infolabs",
    location: "Hybrid",
    period: "Jul 2024: Sep 2024",
    bullets: [
      "Built KPI dashboards and real-time monitoring for enterprise digital-transformation clients.",
      "Integrated Azure Monitor, Log Analytics, and Workbooks, reduced manual reporting 40%.",
      "Deployed AWS Lambda + CloudWatch alerting pipelines, cut incident detection time 30%.",
    ],
    skills: ["Azure Monitor", "AWS Lambda", "CloudWatch", "Dashboards"],
  },
  {
    role: "Algorithmic Trading Intern",
    company: "AGS",
    location: "On-site",
    period: "Jun 2023: Sep 2023",
    bullets: [
      "Designed high-frequency arbitrage strategies on tick-level market data.",
      "Built scalable Python backtesting pipelines over 10+ years of HFT data.",
      "Boosted predictive accuracy 15% via feature engineering, hyperparameter tuning, and time-series normalisation.",
      "Ran volatility-adjusted Monte Carlo simulations; improved overall Sharpe Ratio by 12%.",
    ],
    skills: [
      "Python",
      "pandas",
      "NumPy",
      "Monte Carlo",
      "Backtesting",
    ],
  },
  {
    role: "Digital Platform Lead",
    company: "Gondilal Saraf",
    location: "Banda, India · Remote",
    period: "2022: Present",
    bullets: [
      "Run the full-stack platform for my family's 150-year-old jewelry business (since 1873).",
      "Bilingual Hindi/English storefront with live gold rates, AR virtual try-on, and AI-generated product descriptions via Gemini 2.0 Flash.",
      "Admin ERP with POS, inventory, customer database, and barcode generation, 15 Prisma models, 26 API routes, 85 vitest tests.",
      "Apply data-science techniques (demand forecasting, segmentation) to a century-old traditional industry.",
    ],
    skills: [
      "Full-Stack Development",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Gemini AI",
      "Business Strategy",
    ],
  },
];

const selectedProjects = [
  {
    name: "Watch Together",
    role: "Solo: Chrome/Firefox/Safari extension",
    href: "/projects/watch-together",
    summary:
      "Cross-site video-sync extension shipping on the Chrome Web Store. WebSocket relay with heartbeat drift correction (<0.5s), host-mode enforcement, site-specific player adapters, 59 vitest tests + Puppeteer e2e.",
  },
  {
    name: "Gondilal Saraf",
    role: "Solo, full-stack platform",
    href: "/projects/gondilal-saraf",
    summary:
      "Three surfaces (public site + bilingual catalogue + admin ERP) in one Next.js 15 codebase. Image pipeline: Photoroom → Sharp → Gemini 2.0 Flash → Replicate SDXL. 15 Prisma models, 26 API routes, 85 tests.",
  },
  {
    name: "PCOD Tracker",
    role: "Solo: AI health companion",
    href: "/projects/pcod-tracker",
    summary:
      "Rant-first health logging where Claude extracts structured symptoms, medications, and mood from free-form text. Lab-report PDF parser with Zod-validated JSON output and manual fallback form. 15 Prisma models.",
  },
  {
    name: "Red Bull YouTube Sentiment Analytics",
    role: "Solo, data-science case study",
    href: "/projects/redbull-youtube-analytics",
    summary:
      "VADER sentiment on 500 YouTube comments. Net Sentiment Score +28.6 pp (2× industry benchmark), 100% hashtag discipline across a 50-video catalog, 8-chart Excel dashboard + executive-summary PDF.",
  },
  {
    name: "U.S. Power Outages (DSC 80)",
    role: "With Paulina Pelayo",
    href: "https://github.com/ArnavGoel03/Power-grid-analysis",
    summary:
      "Analysed 1,534 major U.S. power outages (2000 to 2016). Random Forest with engineered features reached RMSE 6,189 min and R² 0.220, with fairness checks across weather vs. non-weather outages (p ≈ 0.007 on price-tier hypothesis test).",
  },
  {
    name: "MLB Playoff Prediction (COGS 108)",
    role: "Team of 5, ethics lead",
    href: "/projects#mlb-playoff-cogs108",
    summary:
      "Team-of-5 Winter 2026 final project on early-season predictors of MLB playoff qualification 2015 to 2023 via Fangraphs pybaseball. Proposal → EDA → final analysis across four notebooks. I led the ethics section.",
  },
];

const educationItems = [
  {
    school: "UC San Diego",
    degree:
      "BS Data Science · Minor in Entrepreneurship & Innovation (Rady School)",
    period: "Sep 2022: Jun 2027",
    detail:
      "UC GPA 3.911 · Major GPA 3.860 · Minor GPA 3.950. Key coursework: CSE 150A (AI: Probabilistic Models), CSE 151A (ML: Learning Algorithms), CSE 151B (Deep Learning, Summer 2026), CSE 158R (Recommender Systems & Web Mining), LIGN 167 (Deep Learning for NLP), DSC 80, DSC 100, COGS 108, MATH 183, MATH 189, MGT 127R (AI & Technology Strategy).",
  },
  {
    school: "Delhi Public School, R. K. Puram",
    degree: "High School · Engineering Science (CBSE)",
    period: "Apr 2020: Jun 2022",
    detail: "96.75% · Mathematics Society + PhySoc leadership.",
  },
];

const skills = {
  Proficient: [
    "Python (pandas, NumPy)",
    "SQL / PostgreSQL",
    "TypeScript / React / Next.js",
    "Flask / REST APIs",
    "Jupyter · EDA · data cleaning",
    "Git / GitHub",
  ],
  Comfortable: [
    "scikit-learn (Random Forest, permutation tests, NMAR reasoning)",
    "TensorFlow / Keras (CNNs, transfer learning)",
    "Matplotlib · Seaborn · Recharts",
    "Time-series analysis · backtesting",
    "Prisma ORM · relational schema design",
    "Docker · containerised microservices",
    "WebSockets · real-time sync",
    "Swift / SwiftUI",
    "Claude / Gemini / OpenAI APIs",
    "Chrome Manifest V3 extensions",
  ],
  Familiar: [
    "PyTorch",
    "Bayesian networks · Markov models · RL (CSE 150A)",
    "Recommender systems · web mining (CSE 258)",
    "VADER · NLP fundamentals",
    "Azure Monitor · Log Analytics",
    "AWS Lambda · CloudWatch",
    "OpenTelemetry (logs, traces, metrics)",
    "Monte Carlo simulation",
    "C (systems programming)",
    "Linear algebra · differential equations",
  ],
};

const certifications = [
  { name: "Neural Networks and Deep Learning", issuer: "DeepLearning.AI", date: "Jul 2024" },
  { name: "Machine Learning Specialization", issuer: "Stanford University", date: "Jul 2024" },
  { name: "Google AI Essentials", issuer: "Google", date: "Jul 2024" },
  { name: "Google Data Analytics Professional Certificate", issuer: "Google", date: "Jul 2024" },
];

export default function Resume() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-6 print:pt-0 print:pb-0">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">
              Arnav Goel
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Data Science · UC San Diego · Graduating June 2027
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail size={13} />
                {EMAIL}
              </a>
              <a
                href={SITE_URL}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Globe size={13} />
                arnavgoel.dev
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                San Diego, CA
              </span>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <FaGithub size={12} />
                ArnavGoel03
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <FaLinkedinIn size={12} />
                arnav-goel--
              </a>
              <a
                href={SOCIAL_LINKS.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <FaOrcid size={13} />
                0009-0007-6477-6501
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/8"
            >
              <Download size={13} />
              PDF
            </a>
          </div>
        </div>
      </div>

      <Section className="pt-4 print:py-2">
        <ResumeBlock title="About">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Senior in the BS Data Science program at UC San Diego (minor in
            Entrepreneurship & Innovation). Work sits where machine learning
            meets systems that ship: Flask microservices for a
            50,000-patient hospital platform at ADA, quantitative research at
            Triton Quant, and the full-stack platform for{" "}
            <a
              href="https://gondilalsaraf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              Gondilal Saraf
            </a>
            , my family&apos;s 150-year-old jewelry business.
          </p>
        </ResumeBlock>

        <ResumeBlock title="Experience">
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={`${e.company}-${e.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-serif text-base font-semibold tracking-tight text-foreground">
                    {e.role} · {e.company}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {e.period}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground/85">
                  {e.location}
                </p>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-foreground/50" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {e.skills.length > 0 && (
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground/75">
                    {e.skills.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeBlock>

        <ResumeBlock title="Education">
          <div className="space-y-5">
            {educationItems.map((edu) => (
              <div key={edu.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-serif text-base font-semibold tracking-tight text-foreground">
                    {edu.school}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {edu.period}
                  </p>
                </div>
                <p className="mt-0.5 text-sm font-medium text-foreground/85">
                  {edu.degree}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {edu.detail}
                </p>
              </div>
            ))}
          </div>
        </ResumeBlock>

        <ResumeBlock title="Selected Projects">
          <div className="space-y-4">
            {selectedProjects.map((p) => (
              <div key={p.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={p.href}
                    className="font-serif text-base font-semibold tracking-tight text-foreground underline-offset-4 hover:underline"
                  >
                    {p.name}
                  </Link>
                  <p className="font-mono text-xs text-muted-foreground">
                    {p.role}
                  </p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
              </div>
            ))}
          </div>
        </ResumeBlock>

        <ResumeBlock title="Skills">
          <div className="space-y-4">
            {Object.entries(skills).map(([tier, items]) => (
              <div key={tier}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {tier}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
                  {items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeBlock>

        <ResumeBlock title="Certifications">
          <div className="grid gap-2 sm:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.name}>
                <p className="text-sm font-medium text-foreground/90">
                  {c.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {c.issuer} · {c.date}
                </p>
              </div>
            ))}
          </div>
        </ResumeBlock>

        <div className="border-t border-foreground/10 pt-6 pb-8 print:border-0">
          <p className="text-xs text-muted-foreground/70">
            Legal name: Arnav Goel. Also goes by alias Yash Goel (UCSD email:
            yashgoel0304@gmail.com). International student. Considering
            new-grad Applied Scientist / ML Engineer / Data Scientist / SWE
            roles for summer 2027 onward.
          </p>
        </div>
      </Section>
    </>
  );
}

function ResumeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-t border-foreground/10 pt-8 first:mt-0 first:border-0 first:pt-0 print:mt-6 print:pt-4">
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

