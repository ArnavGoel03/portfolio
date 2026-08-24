"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { accentFor } from "@/lib/projects";
import type { Project } from "@/lib/types";

/**
 * Projects against what they are built from.
 *
 * This replaced a scatter of nodes on a dark field. The scatter was the wrong
 * form and no amount of framing fixed it: eighteen marks in a large box is
 * sparse by construction, and sparse plus round plus coloured reads as a toy
 * however the frame is dressed. It also answered nothing, because a position in
 * a force layout is not a fact about the work.
 *
 * The question underneath was always a relationship between two categorical
 * sets, which is a matrix. Rows are projects, columns are technologies, and a
 * cell is simply whether that project uses that thing. Dense by nature, exact,
 * and it answers real questions at a glance: what recurs across the work, which
 * projects are broad, which technology carried the most of it.
 *
 * Reading in either direction is the point, so hovering a row lights the
 * project's stack and hovering a column lights every project that uses it.
 * Every row, column and cell comes from `projects.ts`; nothing is invented, and
 * the columns are counted from real tags rather than chosen.
 */

type Row = {
  id: string;
  name: string;
  href: string;
  tags: Set<string>;
  featured: boolean;
  accent: string;
  count: number;
};

function shortName(title: string): string {
  return title.split(/[:,]/)[0].trim();
}

export default function ProjectMatrix({
  projects,
  columns,
}: {
  projects: Project[];
  /** Technologies to show as columns, most used first. */
  columns: string[];
}) {
  const [row, setRow] = useState<string | null>(null);
  const [col, setCol] = useState<string | null>(null);

  const rows: Row[] = useMemo(
    () =>
      projects
        .map((p) => ({
          id: p.id,
          name: shortName(p.title),
          href: `/projects/${p.id}`,
          tags: new Set(p.tags),
          featured: Boolean(p.featured),
          accent: accentFor(p.id),
          count: p.tags.filter((t) => columns.includes(t)).length,
        }))
        // Flagships first, then whatever spans the most of the stack. Sorting
        // by breadth is what turns a table into a finding.
        .sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured) ||
            b.count - a.count ||
            a.name.localeCompare(b.name)
        ),
    [projects, columns]
  );

  const colTotals = useMemo(
    () =>
      columns.map((c) => rows.filter((r) => r.tags.has(c)).length),
    [columns, rows]
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse font-mono text-[10px]">
        <caption className="sr-only">
          Every project against the technologies it is built from
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[13rem] p-0" />
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                onMouseEnter={() => setCol(c)}
                onMouseLeave={() => setCol(null)}
                className="p-0 align-bottom"
              >
                <div
                  className={`flex h-28 cursor-default items-end justify-center pb-2 transition-colors ${
                    col === c ? "text-foreground" : "text-muted-foreground/70"
                  }`}
                >
                  <span
                    className="whitespace-nowrap uppercase tracking-[0.16em]"
                    style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                  >
                    {c}
                    <span className="ml-2 tabular-nums opacity-50">
                      {colTotals[i]}
                    </span>
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const lit = row === r.id;
            return (
              <tr
                key={r.id}
                onMouseEnter={() => setRow(r.id)}
                onMouseLeave={() => setRow(null)}
                className="group"
              >
                <th scope="row" className="p-0 text-left font-normal">
                  <Link
                    href={r.href}
                    className="flex items-center gap-2 border-t border-foreground/8 py-1.5 pr-3"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-[2px] flex-shrink-0 transition-opacity"
                      style={{
                        background: r.accent,
                        opacity: r.featured ? 1 : lit ? 0.8 : 0.25,
                      }}
                    />
                    <span
                      className={`truncate uppercase tracking-[0.12em] transition-colors ${
                        lit
                          ? "text-foreground"
                          : r.featured
                          ? "text-foreground/85"
                          : "text-muted-foreground/70"
                      }`}
                    >
                      {r.name}
                    </span>
                  </Link>
                </th>
                {columns.map((c) => {
                  const on = r.tags.has(c);
                  const crossed = lit || col === c;
                  return (
                    <td
                      key={c}
                      className="border-t border-foreground/8 p-0"
                      title={on ? `${r.name} uses ${c}` : undefined}
                    >
                      <div className="flex h-[26px] items-center justify-center">
                        {on ? (
                          <span
                            className="block transition-all duration-200"
                            style={{
                              width: crossed ? 11 : 8,
                              height: crossed ? 11 : 8,
                              background: r.accent,
                              opacity: crossed ? 1 : r.featured ? 0.75 : 0.45,
                            }}
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="block h-[3px] w-[3px] rounded-full bg-foreground"
                            style={{ opacity: crossed ? 0.16 : 0.07 }}
                          />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
