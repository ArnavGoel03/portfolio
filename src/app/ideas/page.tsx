import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

export const metadata = {
  title: "Ideas",
  description:
    "Concepts Arnav Goel is exploring — unbuilt ideas, open questions, and early-stage experiments across AI, fashion-tech, fintech, EdTech, and more.",
  openGraph: {
    title: "Ideas by Arnav Goel",
    description:
      "Concepts I'm exploring — still early, not yet built.",
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
}

const statusLabel: Record<IdeaStatus, string> = {
  exploring: "Exploring",
  concept: "Concept",
  researching: "Researching",
  shelved: "Shelved",
};

const statusTone: Record<IdeaStatus, string> = {
  exploring:
    "border-foreground/20 bg-foreground/5 text-foreground/80",
  concept:
    "border-sky-500/30 bg-sky-500/10 text-sky-400",
  researching:
    "border-amber-500/30 bg-amber-500/10 text-amber-400",
  shelved:
    "border-muted-foreground/20 bg-muted-foreground/5 text-muted-foreground",
};

const ideas: Idea[] = [
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
      </div>
    </div>
  );
}

export default function Ideas() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Ideas
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Things I&apos;m{" "}
          <span className="heading-gradient text-glow">Exploring</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Concepts I&apos;m turning over — not yet built. Some will graduate to
          the projects page, some will get shelved, some will merge into
          something bigger. This is where ideas live before they become real.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-sm italic text-muted-foreground/70">
          More ideas get added here as I research them. The bar to leave this
          page is a working prototype — until then, everything on this list is
          still a question, not an answer.
        </p>
      </Section>
    </>
  );
}
