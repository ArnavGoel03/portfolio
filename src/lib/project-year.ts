import type { Project } from "@/lib/types";

/**
 * The year a project is dated to, read from its `date` ("2026-07" -> 2026).
 *
 * Derived rather than stored: a separate `year` field beside `date` is two
 * answers to one question, and the first time one is edited without the other
 * they disagree. Kept out of lib/projects.ts so client components can import
 * it without bundling the project list.
 */
export function projectYear(p: Pick<Project, "date">): number | null {
  const year = Number.parseInt(p.date.slice(0, 4), 10);
  return Number.isFinite(year) ? year : null;
}
