export type TeamMember = string | { name: string; url: string };

export function memberName(m: TeamMember): string {
  return typeof m === "string" ? m : m.name;
}

/**
 * One site within a larger body of work.
 *
 * Two relationships use this shape and they are not the same one. A
 * `collections` entry cross-links surfaces that are each listed as projects in
 * their own right, so a viewer landing on one can find the others. A studio
 * project folds its surfaces in precisely so they are *not* listed separately,
 * and this is then the only place those products stay clickable rather than
 * merely named in prose. The shape is shared so neither grows its own copy.
 */
export interface Surface {
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
  /**
   * What this surface actually contains, named the way a player or a user
   * would name it. A studio surface is usually a container: nothing in the
   * word "Deal" tells a reader that Call Break is behind it, so a card that
   * only carries a label is asking to be clicked on trust. Rendered as a
   * separate scannable line above the label rather than buried in the blurb.
   */
  holds?: string;
  /** Screenshot of the surface, so a studio reads as a shelf of products rather than a list of names. */
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
  date: string;
  inProgress?: boolean;
  privateRepo?: boolean;
  doi?: string;
  /** id of a `collections` entry when this project is one surface of a larger series. */
  collection?: string;
  /** The individual products under a studio entry, each linked in its own right. */
  surfaces?: Surface[];
  team?: {
    size: number;
    members?: TeamMember[];
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: "work" | "academic";
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
}
