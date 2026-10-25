/**
 * Public GitHub profile numbers, for the stats block on the home page.
 *
 * Fetched on the server, not in the browser. The CSP in next.config.ts allows
 * `connect-src 'self'` and PostHog only, so a client fetch to api.github.com
 * would be blocked; and the unauthenticated API allows 60 requests an hour per
 * IP, which a busy page would spend in minutes. Server-side with hourly
 * revalidation is one request an hour no matter the traffic.
 *
 * Every failure (network, rate limit, a 404, a shape change) returns null, and
 * the caller renders nothing. A portfolio that shows "undefined followers"
 * looks worse than one that shows no stats at all.
 */

export const GITHUB_USERNAME = "ArnavGoel03";

/** Overridable so the failure path can be exercised locally against a stub. */
const API_BASE = process.env.GITHUB_API_BASE || "https://api.github.com";

export interface GitHubStats {
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
}

const isCount = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v >= 0;

export async function fetchGitHubStats(
  username: string = GITHUB_USERNAME,
): Promise<GitHubStats | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    // Optional: a token lifts the limit to 5,000/hour. Never required.
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${API_BASE}/users/${encodeURIComponent(username)}`,
      {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) {
      console.warn(`GitHub stats unavailable: HTTP ${response.status}`);
      return null;
    }

    const data: Record<string, unknown> = await response.json();
    const stats = {
      publicRepos: data.public_repos,
      publicGists: data.public_gists,
      followers: data.followers,
      following: data.following,
    };
    if (!Object.values(stats).every(isCount)) {
      console.warn("GitHub stats unavailable: unexpected response shape");
      return null;
    }
    return stats as GitHubStats;
  } catch (error) {
    console.warn("GitHub stats unavailable:", (error as Error).message);
    return null;
  }
}
