import Link from "next/link";
import {
  GraduationCap,
  Globe,
  Gem,
  Code2,
  Award,
  Cpu,
  BookOpen,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import Section from "@/components/section";
import StatCounter from "@/components/stat-counter";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About",
  description:
    "Learn about Arnav Goel — Data Science student at UC San Diego (GPA: 3.96), operator at Gondilal Saraf, and ML enthusiast with expertise in Graph Theory and deep learning.",
  openGraph: {
    title: "About Arnav Goel",
    description:
      "Data Science student at UCSD with a 3.96 GPA, helping run Gondilal Saraf, certified in ML from Stanford and DeepLearning.AI.",
  },
};

const highlights = [
  {
    icon: GraduationCap,
    title: "UCSD Data Science",
    description:
      "Pursuing a BS in Data Science with a minor in Entrepreneurship & Innovation at UC San Diego. GPA: 3.96/4.0.",
  },
  {
    icon: Globe,
    title: "International Roots",
    description:
      "Completed high school at Delhi Public School, R.K. Puram with 96.75% in Engineering Science under CBSE.",
  },
  {
    icon: Gem,
    title: "Gondilal Saraf",
    description:
      "Took my family's century-old jewelry business online to solidify our legacy and bring transparency to customers.",
  },
  {
    icon: Code2,
    title: "Technical Focus",
    description:
      "Deep interest in Machine Learning, Graph Theory, and Web Development. Key coursework: CSE 258, DSC 80, CSE 150A.",
  },
];

const education = [
  {
    school: "UC San Diego",
    degree:
      "Bachelor of Science — BS, Data Science (Minor: Entrepreneurship & Innovation)",
    period: "Sep 2022 — Jun 2026",
    grade: "3.960 (out of 4)",
    activities:
      "Wakesurfing, Swimming, Triton Thenix, Root]d Dance Club, Archery",
    skills: ["Communication", "Coding Experience"],
  },
  {
    school: "Delhi Public School — R. K. Puram",
    degree: "High School, Engineering Science",
    period: "Apr 2020 — Jun 2022",
    grade: "96.75%",
    activities: "PhySoc (Physics Society), Mathematics Society, Exun Clan",
    skills: ["Mathematics", "Python", "Physics", "Computer Science"],
  },
  {
    school: "GD Goenka Public School, Kanpur",
    degree: "High School",
    period: "Apr 2018 — Mar 2020",
    grade: "97.4%",
    activities: "Marching band",
    skills: ["Acting", "Archery"],
  },
];

type SkillTier = {
  id: string;
  label: string;
  summary: string;
  items: string[];
};

const skillTiers: SkillTier[] = [
  {
    id: "proficient",
    label: "Proficient",
    summary:
      "Daily drivers — languages and tools I reach for without thinking, across shipped projects and research code.",
    items: [
      "Python (pandas, NumPy)",
      "SQL / PostgreSQL",
      "TypeScript / React / Next.js",
      "Flask / REST APIs",
      "Jupyter · EDA · data cleaning",
      "Git / GitHub",
    ],
  },
  {
    id: "comfortable",
    label: "Comfortable",
    summary:
      "Solid across multiple projects — I know the trade-offs, debug my own mistakes, and can pair on them without hand-holding.",
    items: [
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
  },
  {
    id: "familiar",
    label: "Familiar",
    summary:
      "Used in coursework, internships, or one-off projects. I can read the code, ship small features, and ramp quickly.",
    items: [
      "PyTorch",
      "Bayesian networks · Markov models · RL (CSE 150A)",
      "Recommender systems · web mining (CSE 258)",
      "VADER · NLP fundamentals",
      "Azure Monitor · Log Analytics · Workbooks",
      "AWS Lambda · CloudWatch",
      "OpenTelemetry (logs, traces, metrics)",
      "Monte Carlo simulation",
      "C (systems programming)",
      "Linear algebra · differential equations",
    ],
  },
];

type WritingEntry = {
  title: string;
  blurb: string;
  href: string;
  external?: boolean;
};

const writing: WritingEntry[] = [
  {
    title: "Blog",
    blurb:
      "Short notes on data science, building things, and the occasional deep-dive. Where I think out loud before ideas are fully formed.",
    href: "/blog",
    external: false,
  },
  {
    title: "Synthesis Writing Portfolio",
    blurb:
      "Seventh College Synthesis sequence (SYN 1 / SYN 2 / AWP 4A / AWP 4B) — writing threaded around climate change, evidence, and community inquiry.",
    href: "https://sites.google.com/ucsd.edu/synthesis-yash/home",
    external: true,
  },
  {
    title: "U.S. Power Outages — DSC 80 Writeup",
    blurb:
      "Full data-science writeup on 1,534 U.S. power outages — EDA, NMAR reasoning, hypothesis tests, and Random Forest modelling with fairness checks.",
    href: "https://github.com/ArnavGoel03/Power-grid-analysis",
    external: true,
  },
];

type Certification = {
  name: string;
  issuer: string;
  date: string;
  skills?: string[];
};

const certifications: Certification[] = [
  {
    name: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Jul 2024",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "Jul 2024",
    skills: ["Machine Learning"],
  },
  {
    name: "Google AI Essentials",
    issuer: "Google",
    date: "Jul 2024",
    skills: ["Artificial Intelligence (AI)"],
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "Jul 2024",
    skills: ["SQL", "Data Cleaning"],
  },
  {
    name: "Sololearn SQL",
    issuer: "Sololearn",
    date: "",
    skills: ["SQL"],
  },
  {
    name: "Sololearn Python",
    issuer: "Sololearn",
    date: "",
    skills: ["Python"],
  },
  {
    name: "Vigyantram — Senior Mobile App Developer",
    issuer: "Enactus IIT Delhi",
    date: "Jun 2021",
    skills: ["Mobile Application Development"],
  },
  {
    name: "Junior Data Analyst",
    issuer: "White Hat Jr.",
    date: "Jan 2021",
    skills: ["Data Cleaning", "Data Interpretation"],
  },
  {
    name: "Junior Python Developer",
    issuer: "White Hat Jr.",
    date: "Oct 2020",
    skills: ["Data Cleaning"],
  },
];

export default function About() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          About Me
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          The Intersection of Data
          <br />
          <span className="heading-gradient text-glow">& Enterprise</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I&apos;m Arnav — a Data Science student at UCSD with roots in India
          and a passion for turning raw data into meaningful action. My journey
          spans from building ML pipelines to taking my family&apos;s century-old
          jewelry business, Gondilal Saraf, online — solidifying our legacy and
          bringing transparency to customers through technology.
        </p>
      </Section>

      <Section className="pt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <item.icon size={22} className="text-primary icon-glow" />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="gradient-border rounded-2xl bg-card p-8 backdrop-blur-sm md:p-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter value={3.96} suffix="/4.0" label="GPA at UCSD" decimals={2} />
            <StatCounter value={6} suffix="+" label="Projects Built" />
            <StatCounter value={9} suffix="+" label="Certifications" />
            <StatCounter value={110} suffix="+" label="Years of Family Legacy" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="gradient-border rounded-2xl bg-card p-8 backdrop-blur-sm md:p-12">
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            My Story
          </h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Growing up in India, I was always drawn to patterns — whether in
              mathematics, market trends, or the intricate designs of traditional
              jewelry. This curiosity led me to pursue Data Science at UCSD,
              where I discovered the power of translating complex datasets into
              actionable insights.
            </p>
            <p>
              At UCSD, courses like CSE 258 (Recommender Systems), DSC 80 (Data
              Science in Practice), and CSE 150A (AI) shaped my approach to
              problem-solving. I developed a deep appreciation for how graph
              theory and machine learning can model real-world networks and
              decision systems.
            </p>
            <p>
              Alongside my studies, I took my family&apos;s century-old jewelry
              business, Gondilal Saraf, online — building its full-stack digital
              platform to solidify a generational legacy and bring transparency
              to customers who have long relied on word-of-mouth and trust. On
              top of the storefront, I apply data science to inventory
              optimization, customer segmentation, and demand forecasting.
              Working inside a generational business while studying taught me
              how to bridge the gap between theory and practice, and gave me a
              unique perspective on how technology can transform traditional
              industries.
            </p>
            <p>
              My minor in Entrepreneurship & Innovation at UCSD further
              solidified my belief that the best solutions emerge when technical
              rigor meets creative thinking and real-world constraints.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <GraduationCap size={22} className="text-primary icon-glow" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            Education
          </h2>
        </div>
        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-tight">
                    {edu.school}
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    {edu.degree}
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs text-muted-foreground">
                  {edu.period}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Grade: {edu.grade}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Activities: {edu.activities}
              </p>
              {edu.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {edu.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Cpu size={22} className="text-primary icon-glow" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight">
              Skills
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              An honest breakdown — not a wall of logos. Three tiers by depth of
              real use, not by what looks impressive on a resume.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {skillTiers.map((tier) => (
            <div
              key={tier.id}
              className="gradient-border rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary/70">
                {tier.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90">
                {tier.summary}
              </p>
              <ul className="mt-6 space-y-2.5">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <BookOpen size={22} className="text-primary icon-glow" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight">
              Writing &amp; Research
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Where I think things through on the page — short notes, long
              writeups, and the occasional class project worth sharing.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {writing.map((entry) => {
            const Tag: React.ElementType = entry.external ? "a" : Link;
            const tagProps = entry.external
              ? {
                  href: entry.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : { href: entry.href };
            const Icon = entry.external ? ExternalLink : ArrowUpRight;
            return (
              <Tag
                key={entry.href}
                {...tagProps}
                className="group gradient-border rounded-2xl bg-card p-7 backdrop-blur-sm transition-colors hover:bg-card/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <Icon
                    size={16}
                    className="mt-1 flex-shrink-0 text-primary/60 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {entry.blurb}
                </p>
              </Tag>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Award size={22} className="text-primary icon-glow" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            Certifications
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <h3 className="font-serif text-base font-semibold tracking-tight">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {cert.issuer}
              </p>
              {cert.date && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Issued {cert.date}
                </p>
              )}
              {cert.skills && cert.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
