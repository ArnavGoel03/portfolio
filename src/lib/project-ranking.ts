import { Project } from "@/lib/types";

/**
 * How `/projects` orders itself, and how the optional `?focus=<x>` URL param
 * bends that order.
 *
 * This lived inside `src/app/projects/page.tsx` and was applied on the server,
 * which meant the page had to read `searchParams`, which meant Next marked the
 * whole route dynamic and rendered it per request. Measured against the live
 * site that cost roughly 300ms of TTFB on every visit to the second most
 * important page here, for a param that nothing on the site ever links to.
 *
 * So the ranking moved here and is now shared: the page imports it to produce
 * the default order at build time, and the client view imports the same
 * functions to re-order after hydration when someone does arrive with a focus
 * param. One definition, two callers, identical output for the default case.
 */
export const FOCUS_BOOSTS: Record<string, string[]> = {
  ml: [
    "machine learning",
    "deep learning",
    "cnn",
    "keras",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "transfer learning",
    "recommender",
    "mobilenetv2",
    "vader",
    "nlp",
    "claude ai",
    "gemini ai",
    "openai api",
  ],
  data: [
    "python",
    "pandas",
    "numpy",
    "scikit-learn",
    "jupyter",
    "data analysis",
    "random forest",
    "permutation testing",
    "pybaseball",
    "dsc 80",
    "cogs 108",
    "time-series",
    "signal processing",
  ],
  fullstack: [
    "next.js",
    "next.js 15",
    "next.js 16",
    "typescript",
    "react",
    "prisma",
    "postgresql",
    "supabase",
    "flask",
    "swiftui",
    "chrome extension",
    "websocket",
    "manifest v3",
    "pwa",
    "framer motion",
  ],
  quant: [
    "time-series",
    "backtesting",
    "monte carlo",
    "pandas",
    "python",
    "quantitative",
    "numpy",
  ],
  strategy: [
    "mgt 127r",
    "case study",
    "technology strategy",
    "s-curve analysis",
    "investment analysis",
    "disruptive innovation",
    "defense tech",
  ],
};

/**
 * The focus param used to be rendered straight back into the page, so any URL
 * could put arbitrary text on the projects page ("Ordered for <whatever>
 * focus"). React escaped it, so it was never script injection, but it was
 * still a stranger choosing words that appear on a portfolio a recruiter is
 * reading. Only the five keys above are honoured now; anything else is
 * ignored and the page reads exactly as it does with no param at all.
 */
export function isFocusKey(value: string | null | undefined): value is string {
  return typeof value === "string" && value.toLowerCase() in FOCUS_BOOSTS;
}

export function focusBoost(project: Project, focus?: string): number {
  if (!focus) return 0;
  const terms = FOCUS_BOOSTS[focus.toLowerCase()];
  if (!terms) return 0;
  const tags = project.tags.map((t) => t.toLowerCase());
  const matches = terms.filter((term) =>
    tags.some((t) => t.includes(term))
  ).length;
  return matches * 15;
}

export function relevanceScore(p: Project, focus?: string): number {
  let score = 0;
  if (p.demo) score += 50;
  if (p.github) score += 30;
  if (p.featured) score += 20;
  score += new Date(p.date + "-01").getTime() / 1e11;
  score += focusBoost(p, focus);
  return score;
}

export function sortByRelevance(projects: Project[], focus?: string): Project[] {
  return [...projects].sort(
    (a, b) => relevanceScore(b, focus) - relevanceScore(a, focus)
  );
}
