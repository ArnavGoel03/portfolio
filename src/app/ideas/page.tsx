import Link from "next/link";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ArrowUpRight, Mail, CalendarClock } from "lucide-react";
import { EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Ideas — Open to Co-Founding",
  description:
    "Unbuilt ideas Arnav Goel is exploring, and an open invitation to co-found. Technical-founder profile, what a good partner looks like, and how to reach out.",
  openGraph: {
    title: "Ideas & Co-Founder Call — Arnav Goel",
    description:
      "Things I'm exploring — and the kind of partner I'd build them with.",
  },
};

type IdeaStatus = "exploring" | "concept" | "researching" | "shelved";

interface Idea {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  tags: string[];
  status: IdeaStatus;
  cofounderNote?: string;
}

const statusLabel: Record<IdeaStatus, string> = {
  exploring: "Exploring",
  concept: "Concept",
  researching: "Researching",
  shelved: "Shelved",
};

const statusTone: Record<IdeaStatus, string> = {
  exploring: "border-foreground/20 bg-foreground/5 text-foreground/80",
  concept: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  researching: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  shelved:
    "border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground",
};

const ideas: Idea[] = [
  {
    id: "fair-ludo",
    title: "Fair Ludo — Provably Fair Dice Game",
    oneLiner:
      "A consumer Ludo app where the dice are provably un-riggable.",
    description:
      "Ludo at scale on every Indian platform is infamously rigged — operators tune dice to keep losing players hooked and new players lucky. I want to build the opposite: a consumer-grade Ludo app (web + iOS + Android) where every roll is server-authoritative under a commit-reveal scheme. The server publishes a hashed seed before each game and reveals it after, so any player can replay and mathematically verify every roll in the match. Core RNG + game logic open-sourced so the fairness claim is independently auditable. Planned stack: Next.js for web, React Native / Expo for mobile, shared TypeScript game engine, Node + WebSockets backend, Postgres for accounts and match history. Big-app ambition — real-money tournaments, matchmaking, replay sharing, social. Still pre-build; the technical design is the easy part, the consumer-growth motion is where a co-founder changes everything.",
    tags: ["Consumer App", "Provably Fair", "React Native", "Expo", "WebSockets", "Commit-Reveal"],
    status: "concept",
    cofounderNote:
      "Looking for a co-founder on this one — consumer-growth / marketing / Indian-gaming-market partner who can match the build pace.",
  },
  {
    id: "style-it",
    title: "Style It — AI Wardrobe Assistant",
    oneLiner: "A digital wardrobe that actually helps you dress.",
    description:
      "A software tool that maintains a digital wardrobe — each garment tagged with fabric, colour, care instructions, and photos of both the garment and the user wearing it. The goal is to solve the everyday 'I don't know what to wear' dilemma, reduce impulse purchases, and help people actually use the clothes they already own. Long-term hooks: weekly outfit planning that load-balances across fabric and colour to prolong garment life, a digital try-on loop, crowdsourced garment ideas with royalties for creators whose designs get produced, and affiliate-style recommendations. Spiritual successor to the earlier Style It experiment from high school — same problem, bigger frame.",
    tags: ["AI", "Fashion Tech", "Recommendation Systems", "Computer Vision"],
    status: "exploring",
  },
];

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div className="card-3d group">
      <div className="card-3d-inner gradient-border glow-card rounded-2xl bg-card p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-2.5 backdrop-blur-sm">
              <Lightbulb size={18} className="text-foreground/80 icon-glow" />
            </div>
            <h3 className="font-serif text-lg font-semibold tracking-tight">
              {idea.title}
            </h3>
          </div>
          <Badge
            variant="secondary"
            className={`text-[10px] font-medium uppercase tracking-[0.12em] ${statusTone[idea.status]}`}
          >
            {statusLabel[idea.status]}
          </Badge>
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {idea.oneLiner}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {idea.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {idea.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border-foreground/10 bg-foreground/5 text-xs font-normal text-foreground/75"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {idea.cofounderNote && (
          <div className="mt-6 rounded-xl border border-foreground/15 bg-foreground/[0.03] px-4 py-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Co-founder note
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground/85">
              {idea.cofounderNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CofounderPanel() {
  return (
    <div className="gradient-border rounded-3xl bg-card p-8 md:p-10">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        Building with me
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl">
        I&apos;m open to co-founding.
      </h2>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        Some of the ideas below I&apos;d build as solo projects. Others I
        won&apos;t — because the fun part isn&apos;t the engineering, it&apos;s
        the users, the commercial motion, and the taste that only a partner
        brings. If you&apos;re already working on something and need a
        technical founder who can ship a full product end-to-end, or you have
        an idea that needs a builder, this is the door.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What I bring
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90">
            <li>
              <span className="text-foreground font-medium">
                End-to-end build speed.
              </span>{" "}
              Full-stack (Next.js, Prisma, Postgres, TypeScript), mobile (Swift,
              React Native), ML (Python, PyTorch, TF), real-time systems
              (WebSockets, MV3 extensions), Claude / Gemini / OpenAI glue.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Commercial judgment from a real business.
              </span>{" "}
              I run the full-stack platform for my family&apos;s 150-year
              jewelry business — real customers, real P&amp;L, real inventory,
              real complaints.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Shipped products, not prototypes.
              </span>{" "}
              Watch Together is live on the Chrome Web Store. Gondilal is at
              gondilalsaraf.com. PCOD Tracker is in production. I finish
              things.
            </li>
            <li>
              <span className="text-foreground font-medium">
                The &ldquo;know when to stop&rdquo; muscle.
              </span>{" "}
              I shelved Vaani after a market-fit check showed the unit
              economics didn&apos;t work. I&apos;d rather kill an idea than
              force-ship it.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What makes a good partner
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90">
            <li>
              <span className="text-foreground font-medium">
                You&apos;ve talked to users.
              </span>{" "}
              A concrete segment and a specific problem they&apos;ve paid or
              would pay to solve. Not &ldquo;Uber for X&rdquo; energy.
            </li>
            <li>
              <span className="text-foreground font-medium">
                You cover the muscle I don&apos;t.
              </span>{" "}
              Distribution, sales, design, a specific-domain wedge — the parts
              where &ldquo;just ship it&rdquo; isn&apos;t the bottleneck.
            </li>
            <li>
              <span className="text-foreground font-medium">
                You move.
              </span>{" "}
              I ship full products in weeks, not quarters. A partner who can
              match the speed on their side is table-stakes.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Not crypto / gambling / dropshipping / attention-scam.
              </span>{" "}
              Life&apos;s too short.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-foreground/10 pt-8">
        <a
          href={`mailto:${EMAIL}?subject=Build%20with%20me%3A%20%7Bidea%7D`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
        >
          <Mail size={14} />
          Pitch me: {EMAIL}
        </a>
        <a
          href="https://cal.com/arnavgoel"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10"
        >
          <CalendarClock size={14} />
          Book 20 minutes
          <ArrowUpRight size={12} className="text-muted-foreground" />
        </a>
        <p className="text-xs text-muted-foreground">
          Best subject line: &ldquo;build with me: &lt;idea in one line&gt;&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function Ideas() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Ideas &middot; Open to Co-Founding
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Things I&apos;d{" "}
          <span className="heading-gradient text-glow">Build</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Concepts I&apos;m turning over. Some I&apos;ll take solo all the way
          to launch. Others I won&apos;t — because the right partner changes
          the product more than another commit would. The door&apos;s open if
          you&apos;re one of them.
        </p>
      </Section>

      <Section className="pt-2">
        <CofounderPanel />
      </Section>

      <Section className="pt-10 pb-8">
        <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          On my desk
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </Section>

      <Section className="pb-20">
        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Also pitch me
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
            Have an idea that isn&apos;t on this page? Even better. The ones
            listed are mine — the ones you bring are yours. If you have
            concrete users in mind and a problem worth building against, send
            me the sharpest version of your pitch and we&apos;ll take a day to
            talk it through.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Reach out
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <p className="mt-10 max-w-2xl text-sm italic text-muted-foreground/70">
          The bar to leave this page for{" "}
          <Link
            href="/projects"
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            Projects
          </Link>{" "}
          is a working prototype. Until then, everything here is still a
          question, not an answer.
        </p>
      </Section>
    </>
  );
}
