"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { accentFor } from "@/lib/projects";
import type { Project } from "@/lib/types";

/**
 * Every project at once, as a live graph rather than a list.
 *
 * The column of cards below is the right way to read the work carefully, and it
 * is also eighteen cards deep: you cannot see the shape of what somebody has
 * built by scrolling past it one card at a time. This is the other view.
 * Projects that share tooling pull together, so the clusters are real rather
 * than arranged, and pressing a technology lights every project using it. A
 * visitor can ask "what has he actually done with Postgres" and get an answer
 * in one press instead of opening eighteen pages.
 *
 * It moves on purpose. A static scatter of dots reads as a diagram in a slide;
 * the same graph breathing, sweeping and reporting coordinates reads as an
 * instrument that is switched on, which is the difference between looking at a
 * picture of a system and looking at a system.
 *
 * Deterministic where it matters. The layout runs from a fixed seed so the
 * server and the client agree and there is no hydration jump; only the drift,
 * which starts after mount, is time-based. Nothing is invented: every mark,
 * link, size and technology comes from `projects.ts`, so this cannot drift from
 * the project list and adding a project adds a mark.
 */

const W = 100;
const H = 62;

type Mark = {
  id: string;
  name: string;
  href: string;
  tags: string[];
  featured: boolean;
  accent: string;
  x: number;
  y: number;
  /** Phase offsets, so nothing in the field breathes in lockstep. */
  px: number;
  py: number;
};

/** The bit of a title a person actually says out loud. */
function shortName(title: string): string {
  return title.split(/[:,]/)[0].trim();
}

/** Seeded, so the same field is drawn on the server and in the browser. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function layout(projects: Project[]): Mark[] {
  const rand = rng(20260824);
  const marks: Mark[] = projects.map((p) => ({
    id: p.id,
    name: shortName(p.title),
    href: `/projects/${p.id}`,
    tags: p.tags,
    featured: Boolean(p.featured),
    accent: accentFor(p.id),
    x: 12 + rand() * (W - 24),
    y: 10 + rand() * (H - 20),
    px: rand() * Math.PI * 2,
    py: rand() * Math.PI * 2,
  }));

  // Shared tooling attracts, everything else repels, walls push back.
  for (let pass = 0; pass < 120; pass++) {
    for (let i = 0; i < marks.length; i++) {
      for (let j = i + 1; j < marks.length; j++) {
        const a = marks[i];
        const b = marks[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        dx /= d;
        dy /= d;
        const shared = a.tags.filter((t) => b.tags.includes(t)).length;
        const target = shared >= 2 ? 15 : shared === 1 ? 24 : 33;
        const push = (d - target) * 0.02;
        a.x += dx * push;
        a.y += dy * push;
        b.x -= dx * push;
        b.y -= dy * push;
      }
    }
    for (const m of marks) {
      m.x = Math.min(W - 7, Math.max(7, m.x));
      m.y = Math.min(H - 6, Math.max(6, m.y));
    }
  }
  return marks;
}

export default function ProjectExplorer({
  projects,
  tags,
}: {
  projects: Project[];
  /** The technologies worth offering as filters, most used first. */
  tags: string[];
}) {
  const [tag, setTag] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [t, setT] = useState(0);
  const frame = useRef<number | null>(null);

  const marks = useMemo(() => layout(projects), [projects]);

  const links = useMemo(() => {
    const out: [number, number][] = [];
    for (let i = 0; i < marks.length; i++) {
      for (let j = i + 1; j < marks.length; j++) {
        const shared = marks[i].tags.filter((x) =>
          marks[j].tags.includes(x)
        ).length;
        if (shared >= 2) out.push([i, j]);
      }
    }
    return out;
  }, [marks]);

  // The clock. Starts only after mount, so the first paint matches the server,
  // and stops entirely for anyone who has asked for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Drift is tiny on purpose: enough that the field is alive, small enough that
  // a cluster still reads as a cluster and a target stays clickable.
  const at = (m: Mark) => ({
    x: m.x + Math.sin(t * 0.35 + m.px) * 0.55,
    y: m.y + Math.cos(t * 0.28 + m.py) * 0.45,
  });

  const matches = (m: Mark) => (tag === null ? true : m.tags.includes(tag));
  const shown = marks.filter(matches).length;
  const active = marks.find((m) => m.id === hover) ?? null;
  const activeAt = active ? at(active) : null;

  // The sweep, crossing the field and back.
  const sweep = ((t * 9) % (W + 40)) - 20;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {tags.map((x) => {
          const on = tag === x;
          return (
            <button
              key={x}
              type="button"
              aria-pressed={on}
              onClick={() => setTag(on ? null : x)}
              className={`rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                on
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-foreground/12 text-muted-foreground hover:border-foreground/35 hover:text-foreground"
              }`}
            >
              {x}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] tabular-nums text-muted-foreground">
          {String(shown).padStart(2, "0")}/{String(marks.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-foreground/12 bg-[#080807]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Every project, positioned so that projects sharing technologies sit together"
        >
          <defs>
            <pattern
              id="graticule"
              width="5"
              height="5"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 5 0 L 0 0 0 5"
                fill="none"
                stroke="var(--foreground)"
                strokeWidth="0.05"
                opacity="0.055"
              />
            </pattern>
            <linearGradient id="sweepGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <rect width={W} height={H} fill="url(#graticule)" />

          {/* The sweep. It is the single clearest signal that this is running
              rather than printed. */}
          <rect
            x={sweep - 16}
            y="0"
            width="16"
            height={H}
            fill="url(#sweepGrad)"
            opacity="0.25"
          />
          <line
            x1={sweep}
            x2={sweep}
            y1="0"
            y2={H}
            stroke="var(--primary)"
            strokeWidth="0.09"
            opacity="0.5"
          />

          {links.map(([i, j], k) => {
            const a = marks[i];
            const b = marks[j];
            const on = matches(a) && matches(b);
            const near =
              hover !== null && (a.id === hover || b.id === hover);
            const pa = at(a);
            const pb = at(b);
            return (
              <line
                key={k}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={near ? a.accent : "var(--foreground)"}
                strokeWidth={near ? 0.09 : 0.05}
                strokeDasharray={near ? "0.7 0.5" : undefined}
                strokeDashoffset={near ? -t * 4 : undefined}
                opacity={on ? (near ? 0.75 : 0.12) : 0.03}
              />
            );
          })}

          {marks.map((m) => {
            const on = matches(m);
            const lit = hover === m.id;
            const p = at(m);
            const r = m.featured ? 1.5 : 1.05;
            return (
              <Link key={m.id} href={m.href}>
                <g
                  onMouseEnter={() => setHover(m.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                >
                  <circle cx={p.x} cy={p.y} r={3} fill="transparent" />

                  {/* A reticle, drawn only on the target under the cursor. */}
                  {lit && (
                    <g opacity="0.9">
                      {[0, 90, 180, 270].map((deg) => (
                        <line
                          key={deg}
                          x1={p.x + Math.cos((deg * Math.PI) / 180) * r * 2.6}
                          y1={p.y + Math.sin((deg * Math.PI) / 180) * r * 2.6}
                          x2={p.x + Math.cos((deg * Math.PI) / 180) * r * 4}
                          y2={p.y + Math.sin((deg * Math.PI) / 180) * r * 4}
                          stroke={m.accent}
                          strokeWidth="0.1"
                        />
                      ))}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={r * 3.2 + Math.sin(t * 3) * 0.25}
                        fill="none"
                        stroke={m.accent}
                        strokeWidth="0.06"
                        opacity="0.55"
                      />
                    </g>
                  )}

                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={lit ? r * 1.9 : r * 1.5}
                    fill="none"
                    stroke={on ? m.accent : "var(--foreground)"}
                    strokeWidth={lit ? 0.2 : 0.11}
                    opacity={on ? (lit ? 1 : 0.5) : 0.09}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={lit ? r * 0.75 : r * 0.5}
                    fill={on ? m.accent : "var(--foreground)"}
                    opacity={on ? (lit ? 1 : 0.7) : 0.1}
                  />
                  {(m.featured || lit || (tag !== null && on)) && (
                  <text
                    x={p.x}
                    y={p.y + r * 3.1}
                    textAnchor="middle"
                    className="pointer-events-none font-mono"
                    style={{
                      fill: lit ? m.accent : "var(--muted-foreground)",
                      fontSize: 1.25,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      opacity: on ? (lit ? 1 : 0.5) : 0.09,
                    }}
                  >
                    {m.name}
                  </text>
                  )}
                </g>
              </Link>
            );
          })}
        </svg>

        {/* Corner brackets, so the field reads as a framed instrument. */}
        {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "left-2 bottom-14 border-l border-b", "right-2 bottom-14 border-r border-b"].map(
          (c) => (
            <span
              key={c}
              aria-hidden="true"
              className={`pointer-events-none absolute h-3 w-3 border-primary/40 ${c}`}
            />
          )
        )}

        {/* The readout. Fixed height so the field never jumps as a target is
            acquired and released. */}
        <div className="flex min-h-[3.25rem] items-center gap-3 border-t border-foreground/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em]">
          {active && activeAt ? (
            <>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: active.accent }}
              />
              <span
                className="flex-shrink-0 font-semibold"
                style={{ color: active.accent }}
              >
                {active.name}
              </span>
              <span className="flex-shrink-0 tabular-nums text-muted-foreground/70">
                {activeAt.x.toFixed(1)}/{activeAt.y.toFixed(1)}
              </span>
              <span className="truncate text-muted-foreground">
                {active.tags.slice(0, 4).join(" · ")}
              </span>
            </>
          ) : (
            <span className="tabular-nums text-muted-foreground/50">
              {marks.length} nodes · {links.length} links
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
