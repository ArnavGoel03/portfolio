// Canonical map of multi-surface project series.
//
// A "collection" is one body of work that shipped as several separate sites.
// Without this, a viewer who lands on one surface has no way to know the others
// exist, they read as unrelated one-offs. Every place that needs to state the
// relationship (project cards, project detail pages, the coursework page)
// reads from here rather than restating the links.

export interface CollectionSurface {
  /** Short name for this surface within the series. */
  label: string;
  /** What this specific surface does that the others don't. */
  blurb: string;
  /** Where the link goes: an internal detail page when it is a listed project, the live site otherwise. */
  href: string;
  /** Set when the surface is also an entry in `staticProjects`. */
  projectId?: string;
  /** Public URL of the site itself, shown next to the detail-page link. */
  liveUrl?: string;
  /** Non-empty when the link is not publicly readable. Rendered as a warning so nobody hits a login wall unwarned. */
  gated?: string;
}

export interface CollectionRelated {
  label: string;
  blurb: string;
  href: string;
}

export interface Collection {
  id: string;
  label: string;
  /** Course, college, term. */
  kicker: string;
  summary: string;
  surfaces: CollectionSurface[];
  /** Adjacent work in the same program, not part of this project itself. */
  related?: CollectionRelated[];
}

export const collections: Collection[] = [
  {
    id: "built-for-cars",
    label: "Built for Cars, Banned for Bikes",
    kicker: "SYN 100 · Seventh College, UC San Diego · Summer 2026",
    summary:
      "One project on campus micromobility as climate infrastructure, shipped as three separate sites. The research site makes the argument, the game makes you feel it, and the course site holds the coursework both were built for. They are meant to be read together.",
    surfaces: [
      {
        label: "The research site",
        blurb:
          "The written argument with every statistic cited, plus our own survey, two field observations, seven interviews, a trip calculator, a ten-campus resource finder, and the policy playbook.",
        href: "/projects/syn100-micromobility",
        projectId: "syn100-micromobility",
        liveUrl: "https://syn100-micromobility.vercel.app",
      },
      {
        label: "Library Walk, the game",
        blurb:
          "The same thesis as a playable runner down the real UC San Diego route, where the protected lane ends at the metre the weekday dismount ban begins. The argument you play rather than read.",
        href: "/projects/library-walk",
        projectId: "library-walk",
        liveUrl: "https://library-walk.vercel.app",
      },
      {
        label: "The SYN 100 course site",
        blurb:
          "The Google Site for the course deliverable itself: the project as our section reads it, which is what the two builds above were made to serve.",
        href: "https://sites.google.com/ucsd.edu/built-for-cars/home",
        gated: "Needs a Google sign-in",
      },
    ],
    related: [
      {
        label: "Synthesis writing portfolio",
        blurb:
          "My portfolio for the Seventh College Synthesis sequence, SYN 1 and SYN 2 through SYN 100, the climate-writing program this project is the final project of.",
        href: "https://sites.google.com/ucsd.edu/synthesis-yash/home",
      },
    ],
  },
];

export function getCollection(id: string | undefined): Collection | undefined {
  if (!id) return undefined;
  return collections.find((c) => c.id === id);
}
