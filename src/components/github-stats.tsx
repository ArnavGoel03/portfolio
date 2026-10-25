import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { fetchGitHubStats, GITHUB_USERNAME } from "@/lib/github";
import { SOCIAL_LINKS } from "@/lib/constants";

const nf = new Intl.NumberFormat("en-US");

/**
 * Live public GitHub numbers as a definition list: each <dt> names a figure
 * and its <dd> is the figure, which is exactly what a <dl> is for.
 *
 * Laid out as a grid with every term on the first row and every value on the
 * second, so the four read as columns without any wrapper elements breaking
 * the dt/dd pairing. Two columns on a phone, four from sm up.
 *
 * Renders nothing at all if the API is down or rate limited.
 */
export default async function GitHubStats() {
  const stats = await fetchGitHubStats();
  if (!stats) return null;

  const items = [
    { term: "Public repos", value: stats.publicRepos },
    { term: "Public gists", value: stats.publicGists },
    { term: "Followers", value: stats.followers },
    { term: "Following", value: stats.following },
  ];

  return (
    <div
      id="profile-stats"
      className="gradient-border rounded-2xl bg-card p-6 md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <FaGithub size={13} aria-hidden="true" />
          GitHub · live
        </p>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          @{GITHUB_USERNAME}
          <ArrowUpRight
            size={13}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-y-2">
        {items.map((item) => (
          // A <div> grouping one dt/dd pair is valid inside <dl>. Below sm it
          // stacks the pair; from sm up it steps aside (`contents`) so the
          // terms share row 1 and the values row 2 of the dl's own grid.
          <div key={item.term} className="flex flex-col gap-1 sm:contents">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:row-start-1">
              {item.term}
            </dt>
            <dd className="font-serif text-4xl font-semibold tabular-nums tracking-tight text-foreground sm:row-start-2 md:text-5xl">
              {nf.format(item.value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
