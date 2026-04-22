export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arnavgoel.dev";

export const SITE_NAME = "Arnav Goel";

export const SITE_DESCRIPTION =
  "Portfolio of Arnav Goel (Yash) — Data Science student at UC San Diego specializing in Machine Learning, Graph Theory, and Entrepreneurship. Building at the intersection of data and business.";

export const EMAIL = "a2goel@ucsd.edu";

export const SOCIAL_LINKS = {
  github: "https://github.com/ArnavGoel03",
  linkedin: "https://www.linkedin.com/in/arnav-goel--/",
  orcid: "https://orcid.org/0009-0007-6477-6501",
  email: `mailto:${EMAIL}`,
} as const;

// Primary nav — kept intentionally short (6 items). Pages demoted from the
// top-level nav are still live and reachable via on-page cross-links, Cmd+K,
// the footer, and sitemap: /ideas, /experience, /coursework, /resume, /now,
// /uses.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

// Everything reachable from the footer "Also" column and from Cmd+K, but not
// in the top nav — kept out of the primary scan.
export const SECONDARY_LINKS = [
  { href: "/resume", label: "Resume" },
  { href: "/experience", label: "Experience" },
  { href: "/coursework", label: "Coursework" },
  { href: "/ideas", label: "Ideas" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
] as const;
