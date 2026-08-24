"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { accentFor } from "@/lib/projects";
import type { Project } from "@/lib/types";

/**
 * The hero, made out of the work instead of out of a shape.
 *
 * What stood here was a rotating icosahedron: twelve vertices, some edges, no
 * meaning. It read as futuristic for about a year and then read as every other
 * portfolio, because a wireframe solid says nothing about whose page it is.
 *
 * This draws the same kind of picture out of real rows. Every node is a project
 * from `projects.ts`, an edge exists where two projects share a technology, and
 * the flagships sit on the inner ring because they are the ones worth clicking.
 * Nothing here is invented: the names, the tags and the flagship flag are the
 * same data the rest of the site renders, so the picture cannot drift from the
 * project list, and adding a project adds a node.
 *
 * It is also the argument the page is making. A portfolio that claims data
 * science and opens with an abstract solid is telling; one that opens with its
 * own dependency graph is showing.
 *
 * Deterministic on purpose. Positions come from the index, never from
 * Math.random, so the server and the client draw the same picture and there is
 * no hydration mismatch waiting for the day someone screenshots it.
 */

const R_INNER = 27;
const R_OUTER = 43;

type Node = {
  id: string;
  title: string;
  short: string;
  href: string;
  x: number;
  y: number;
  r: number;
  featured: boolean;
  accent: string;
};

/** The first word of a title, which is what a person calls the project. */
function shortName(title: string): string {
  return title.split(/[:,]/)[0].trim();
}

export default function WorkConstellation({
  projects,
}: {
  projects: Project[];
}) {
  const [hover, setHover] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);

    const place = (list: Project[], radius: number, offset: number): Node[] =>
      list.map((p, i) => {
        const angle = offset + (i / list.length) * Math.PI * 2;
        return {
          id: p.id,
          title: p.title,
          short: shortName(p.title),
          href: `/projects/${p.id}`,
          x: 50 + Math.cos(angle) * radius,
          y: 50 + Math.sin(angle) * radius * 0.62,
          // In viewBox units. A 100-unit box sliced across 1440px makes one
          // unit about 14 real pixels, so these are points, not planets.
          r: p.featured ? 0.55 : 0.32,
          featured: Boolean(p.featured),
          // The project's own hue, the same one its card wears, so a node and
          // a card are recognisably the same thing.
          accent: accentFor(p.id),
        };
      });

    const nodes = [
      ...place(featured, R_INNER, -Math.PI / 2),
      ...place(rest, R_OUTER, -Math.PI / 2 + 0.35),
    ];

    // An edge is a shared technology. Two is the threshold because one shared
    // tag is usually "TypeScript" and would wire the whole board together.
    const byId = new Map(projects.map((p) => [p.id, p]));
    const edges: [Node, Node][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = byId.get(nodes[i].id);
        const b = byId.get(nodes[j].id);
        if (!a || !b) continue;
        const shared = a.tags.filter((t) => b.tags.includes(t)).length;
        if (shared >= 2) edges.push([nodes[i], nodes[j]]);
      }
    }
    return { nodes, edges };
  }, [projects]);

  const lit = (id: string) =>
    hover === null ? false : hover === id;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label="The projects on this site, linked where they share a technology"
      >
        <g>
          {edges.map(([a, b], i) => {
            const on = lit(a.id) || lit(b.id);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={on ? a.accent : "var(--foreground)"}
                strokeWidth={on ? 0.12 : 0.045}
                opacity={on ? 0.55 : 0.07}
                className="transition-all duration-500"
              />
            );
          })}
        </g>
        <g className="pointer-events-auto">
          {nodes.map((n) => {
            const on = lit(n.id);
            const dim = hover !== null && !on;
            return (
              <Link key={n.id} href={n.href}>
                <g
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                >
                  {/* A hit target a person can actually land on, which is
                      always bigger than the dot they are aiming at. */}
                  <circle cx={n.x} cy={n.y} r={1.6} fill="transparent" />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={on ? n.r * 1.8 : n.r}
                    fill={n.featured || on ? n.accent : "var(--muted-foreground)"}
                    opacity={dim ? 0.2 : n.featured ? 0.85 : 0.4}
                    className="transition-all duration-300"
                  />
                  {on && (
                    <text
                      x={n.x}
                      y={n.y - n.r * 3.4}
                      textAnchor="middle"
                      className="font-mono"
                      style={{
                        fill: n.accent,
                        fontSize: 1.15,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {n.short}
                    </text>
                  )}
                </g>
              </Link>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
