export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arnavgoel.dev";

export const SITE_NAME = "Arnav Goel";

export const SITE_DESCRIPTION =
  "Arnav Goel (a.k.a. Yash Goel): Data Science senior at UC San Diego, graduating June 2027. Ships ML and full-stack systems that land in production: a Chrome Web Store extension, the full-stack platform behind a 150-year family jewelry business, and AI-powered health tools. Open to new-grad roles and co-founding.";

export const EMAIL = "a2goel@ucsd.edu";

export const SOCIAL_LINKS = {
  github: "https://github.com/ArnavGoel03",
  linkedin: "https://www.linkedin.com/in/arnav-goel--/",
  orcid: "https://orcid.org/0009-0007-6477-6501",
  scholar: "https://scholar.google.com/citations?user=ftBu3R8AAAAJ",
  email: `mailto:${EMAIL}`,
} as const;

// Primary nav, kept intentionally short. Resume stays because recruiters
// literally scan nav bars for that word. Pages demoted from the top-level
// nav are still live and reachable via on-page cross-links, Cmd+K, the
// footer, and sitemap: /ideas, /experience, /coursework, /now, /uses.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

// Everything reachable from the footer "Also" column and from Cmd+K, but not
// in the top nav, kept out of the primary scan.
export const SECONDARY_LINKS = [
  { href: "/experience", label: "Experience" },
  { href: "/coursework", label: "Coursework" },
  { href: "/ideas", label: "Ideas" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
] as const;
