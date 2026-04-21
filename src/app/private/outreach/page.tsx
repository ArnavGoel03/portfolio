"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Lock } from "lucide-react";

type Template = {
  id: string;
  title: string;
  whenToUse: string;
  body: string;
};

const TEMPLATES: Template[] = [
  {
    id: "linkedin-dm",
    title: "LinkedIn DM — past manager",
    whenToUse:
      "Short, casual. Use when you're already connected on LinkedIn. Highest reply rate.",
    body: `Hey {firstName} — hope {opener} treating you well.

Quick ask: I'm heading into new-grad recruiting for summer 2027 roles (applied scientist / ML eng / SWE), and I'd love a short LinkedIn recommendation from you about the {specificWork} at {company} if you're open to it.

Totally fine if not — happy to just stay in touch either way. If you are, I can send over a rough paragraph you can edit rather than starting from scratch. Whatever's least annoying.

Thanks for the chance to work on {context}, genuinely one of the best things on my resume.`,
  },
  {
    id: "email-manager",
    title: "Email — past manager (medium length)",
    whenToUse:
      "Use when not connected on LinkedIn, or when you want to give more context. Subject: 'Quick LinkedIn recommendation ask'.",
    body: `Hi {firstName},

Hope you're doing well — last I heard you were {opener}.

I'm graduating from UCSD in June 2027 and starting to interview for new-grad applied-scientist and ML / SWE roles. Recruiters have been asking for references, and I'd love to put a short LinkedIn recommendation from you front-and-centre on my portfolio.

The work I'd most want you to touch on, if it'd help you write:

  • {bullet1}
  • {bullet2}
  • Anything about how I showed up on the team day-to-day

If it'd save time, I can draft a starting paragraph you can edit into your own voice — just say the word. And if now isn't a good moment to take this on, no pressure at all. Happy just to stay in touch.

Thanks again for an incredible {duration}.

Arnav
arnavgoel.dev`,
  },
  {
    id: "email-professor",
    title: "Email — UCSD professor",
    whenToUse:
      "For faculty references — DS recruiters value these. Subject: 'Brief reference request — Arnav Goel, {course}'. Best candidates: Prof from DSC 80, CSE 150A, LIGN 167, MATH 183, MGT 127R.",
    body: `Dear Professor {lastName},

I took {course} with you in {quarter} (earned an {grade}; my project {projectReference}).

I'm interviewing for new-grad applied-scientist and ML-engineer roles starting summer 2027 and would be very grateful for a short LinkedIn recommendation from you, if you're comfortable writing one. Even two or three sentences about my work in the course or on the project would carry real weight — data-science recruiters specifically look for faculty references.

I understand this is an unusual ask and you're busy. If it helps, I can draft a starting paragraph for you to edit, or share the project writeup and rubric score for context. And if now isn't a good time, no problem at all — a short "I'd decline but appreciate the ask" is a perfectly fine answer.

Project writeup: {projectUrl}
Portfolio: https://arnavgoel.dev

Thank you for the excellent course, and for considering this.

Best regards,
Arnav Goel (legal: Arnav · also goes by Yash)`,
  },
  {
    id: "starter-paragraph",
    title: "Starter paragraph — send when they say yes",
    whenToUse:
      "If they agree to write but ask for a starting point, send this as a draft to edit. Makes writing ~5× faster for them.",
    body: `Arnav joined the {company} {team} team as a {role} from {period}, working out of our {location} office. He owned development of the {deliverable1} and core {deliverable2} that supported {context}.

What stood out most was the combination of technical rigor and judgment — he {specificAchievement1}, but just as importantly, he {specificAchievement2}. That kind of intervention from {levelDescriptor} is rare. He also {thirdAchievement}, which materially improved {impactArea}.

He's the kind of early-career engineer I'd hire back full-time without a second thought. Anyone considering him for an applied-scientist, ML-engineer, or SWE role would be getting someone who writes code that holds up, communicates clearly, and takes responsibility for the parts of the system nobody else wants to own.`,
  },
  {
    id: "followup",
    title: "Follow-up (10–14 days after first ask)",
    whenToUse:
      "Send exactly once if you haven't heard back. Never a second follow-up.",
    body: `Hey {firstName} — no pressure, but bumping this in case it got buried.

If now isn't a good time that's totally fine — just wanted to make sure my earlier note reached you. Happy to wait or table it entirely.`,
  },
  {
    id: "thanks",
    title: "Thank-you — when they deliver",
    whenToUse:
      "Reply within 24 hours of the rec going live. Specific, short, warm. Closes the loop and keeps the relationship alive.",
    body: `Thank you so much, {firstName} — this is genuinely generous of you. I'll use it for {targetCompanies} applications right away.

One more thing — I'll put it up on my portfolio at arnavgoel.dev/about within the week. I'll send you the link so you can see how it lives on the site.

Grateful.

Arnav`,
  },
];

// Variables available for substitution. Order matters — shown in the input panel.
const VARIABLES: { key: string; label: string; placeholder: string }[] = [
  { key: "firstName", label: "First Name", placeholder: "Priya" },
  { key: "lastName", label: "Last Name (for professors)", placeholder: "Rangan" },
  { key: "company", label: "Company / Org", placeholder: "ADA" },
  { key: "team", label: "Team", placeholder: "Backend" },
  { key: "role", label: "Your Role There", placeholder: "SWE Intern" },
  { key: "period", label: "Period", placeholder: "October through December 2024" },
  { key: "duration", label: "Duration (short form)", placeholder: "three months" },
  { key: "location", label: "Location", placeholder: "Bengaluru" },
  { key: "context", label: "Project / Context", placeholder: "the hospital platform" },
  { key: "specificWork", label: "Specific work", placeholder: "Nurse Panel API" },
  { key: "opener", label: "Warm opener detail", placeholder: "Bengaluru's been" },
  { key: "bullet1", label: "Bullet 1 (what to highlight)", placeholder: "The Flask + Docker microservices for the Nurse Panel Backend API" },
  { key: "bullet2", label: "Bullet 2", placeholder: "How I handled the multi-region rollout" },
  { key: "course", label: "Course", placeholder: "DSC 80" },
  { key: "quarter", label: "Quarter", placeholder: "Fall 2025" },
  { key: "grade", label: "Grade", placeholder: "A" },
  { key: "projectReference", label: "Project reference line", placeholder: "with Paulina Pelayo on U.S. Power Outages 2000–2016 is the one you graded" },
  { key: "projectUrl", label: "Project URL", placeholder: "https://github.com/ArnavGoel03/Power-grid-analysis" },
  { key: "deliverable1", label: "Deliverable 1", placeholder: "Nurse Panel Backend API" },
  { key: "deliverable2", label: "Deliverable 2", placeholder: "Flask microservices" },
  { key: "specificAchievement1", label: "Achievement 1", placeholder: "containerised the services with Docker Compose and cut onboarding setup time by about 60%" },
  { key: "specificAchievement2", label: "Achievement 2", placeholder: "pushed back when our initial MDM table design wouldn't scale" },
  { key: "thirdAchievement", label: "Achievement 3", placeholder: "instrumented the services with OpenTelemetry end-to-end" },
  { key: "impactArea", label: "Impact area", placeholder: "our incident response" },
  { key: "levelDescriptor", label: "Level descriptor", placeholder: "an intern" },
  { key: "targetCompanies", label: "Target companies (for thanks note)", placeholder: "Meta / Anthropic / Stripe" },
];

function substitute(body: string, vars: Record<string, string>): string {
  return body.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key];
    return v && v.trim().length > 0 ? v : `{${key}}`;
  });
}

export default function OutreachTemplates() {
  const [vars, setVars] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const rendered = useMemo(() => {
    return TEMPLATES.map((t) => ({ ...t, filled: substitute(t.body, vars) }));
  }, [vars]);

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // noop — navigator.clipboard can fail in some browser contexts
    }
  }

  function reset() {
    setVars({});
  }

  return (
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <Lock size={12} />
        Private · noindex
      </div>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
        Outreach templates
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        Fill the variables once on the left, every template below renders
        with them substituted. Copy button on each template writes to
        clipboard.
      </p>

      <section className="mt-10 grid gap-10 md:grid-cols-[260px_1fr] md:gap-14">
        <aside className="md:sticky md:top-28 md:max-h-[calc(100vh-140px)] md:self-start md:overflow-y-auto">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Variables
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Reset
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {VARIABLES.map((v) => (
              <div key={v.key}>
                <label
                  htmlFor={`var-${v.key}`}
                  className="block text-[11px] font-medium text-foreground/75"
                >
                  {v.label}
                </label>
                <input
                  id={`var-${v.key}`}
                  type="text"
                  placeholder={v.placeholder}
                  value={vars[v.key] ?? ""}
                  onChange={(e) =>
                    setVars((prev) => ({ ...prev, [v.key]: e.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-foreground/10 bg-foreground/5 px-2.5 py-1.5 text-sm text-foreground outline-none transition-colors focus:border-foreground/30"
                />
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-10">
          {rendered.map((t) => {
            const isCopied = copiedId === t.id;
            return (
              <article
                key={t.id}
                className="gradient-border rounded-2xl bg-card p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-lg font-semibold tracking-tight">
                      {t.title}
                    </h2>
                    <p className="mt-1.5 text-xs italic text-muted-foreground">
                      {t.whenToUse}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(t.id, t.filled)}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10"
                  >
                    {isCopied ? (
                      <>
                        <Check size={12} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl border border-foreground/10 bg-foreground/5 p-5 font-sans text-[13px] leading-relaxed text-foreground/90">
                  {t.filled}
                </pre>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mt-16 border-t border-foreground/10 pt-8 text-xs text-muted-foreground/75">
        <p>
          This page is private. Not linked in navigation. Basic-auth gated via
          middleware. Excluded from sitemap and robots.txt.
        </p>
      </div>
    </main>
  );
}
