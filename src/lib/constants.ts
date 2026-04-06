export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://arnavgoel.com";

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

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/uses", label: "Uses" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
