import Link from "next/link";
import {
  GraduationCap,
  Code2,
  BookOpen,
  Music,
  Dumbbell,
  Plane,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Section from "@/components/section";

export const metadata = {
  title: "Now",
  description:
    "What Arnav Goel is focused on right now — current projects, classes, reading, and life updates. Inspired by nownownow.com.",
  openGraph: {
    title: "Now — Arnav Goel",
    description:
      "What I'm working on, learning, and obsessing over right this minute.",
  },
};

const lastUpdated = "April 17, 2026";
const location = "San Diego, CA";

const focusAreas = [
  {
    icon: Code2,
    label: "Building",
    title: "Watch Together v1.1",
    detail:
      "Pushed the Chrome Web Store submission this week. Next: voice chat over WebRTC, reaction emojis, and a 'watch party' scheduling feature with calendar invites.",
  },
  {
    icon: GraduationCap,
    label: "Classes",
    title: "Final quarter at UCSD",
    detail:
      "Wrapping up CSE 158 (Recommender Systems & Web Mining), DSC 190 (Graph Theory), and ECON 191 (Senior Capstone). Graduating June 2027 with a BS in Data Science + minor in Entrepreneurship.",
  },
  {
    icon: Sparkles,
    label: "Shipping",
    title: "Gondilal Saraf Q2 release",
    detail:
      "Adding a wholesale portal for partner jewelers and a hi-res certificate viewer for BIS hallmark verification. Real users in Banda waiting on this one.",
  },
  {
    icon: BookOpen,
    label: "Reading",
    title: "Designing Data-Intensive Applications",
    detail:
      "Kleppmann. Rereading the chapters on stream processing for the third time — finally clicking now that I've built something with real-time sync.",
  },
  {
    icon: Music,
    label: "Listening",
    title: "Anuv Jain + The Marías",
    detail:
      "On rotation while I code. Switch to lo-fi or classical Indian when I need to think hard.",
  },
  {
    icon: Dumbbell,
    label: "Training",
    title: "Half-marathon in October",
    detail:
      "Running 30 mpw, lifting 3x a week. Goal is sub-1:45. La Jolla Cove loop is the daily.",
  },
  {
    icon: Plane,
    label: "Travel",
    title: "Banda → Delhi → SD",
    detail:
      "Home for a few weeks in May to spend time at the shop and ship the wholesale portal in person. Back to San Diego before finals.",
  },
];

const looking = [
  "New-grad SWE, ML engineer, or applied scientist roles starting summer 2026",
  "Founding-engineer opportunities at early-stage startups (especially health, commerce, or developer tooling)",
  "Conversations with people building real-time systems, agentic AI, or platforms for SMBs",
];

export default function Now() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Now
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          What I&apos;m{" "}
          <span className="heading-gradient text-glow">Doing</span>{" "}
          Right Now
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A snapshot of where my attention is — projects, classes, what I&apos;m
          reading, and what I&apos;m chasing. Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/75 underline-offset-4 hover:text-foreground/80 hover:underline"
          >
            Derek Sivers&apos; /now movement
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/70">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            Updated {lastUpdated}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span>{location}</span>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="gradient-border glow-card rounded-2xl bg-card p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5">
                  <area.icon size={18} className="text-foreground/80 icon-glow" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {area.label}
                  </p>
                  <h2 className="mt-1.5 font-serif text-lg font-semibold tracking-tight">
                    {area.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {area.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-4 pb-20">
        <div className="gradient-border glow-card rounded-2xl bg-card p-8 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            What I&apos;m Looking For
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight">
            Open to the right opportunity
          </h2>
          <ul className="mt-5 space-y-3">
            {looking.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="btn-border-flow mt-7 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all"
          >
            Get in touch
            <ArrowUpRight size={14} className="text-muted-foreground" />
          </Link>
        </div>
      </Section>
    </>
  );
}
