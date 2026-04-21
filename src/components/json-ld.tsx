import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    alternateName: ["Yash Goel", "Yash"],
    givenName: "Yash",
    additionalName: "Arnav",
    familyName: "Goel",
    url: SITE_URL,
    jobTitle: "Data Science Student & Entrepreneur",
    worksFor: [
      {
        "@type": "Organization",
        name: "UC San Diego",
      },
      {
        "@type": "Organization",
        name: "Gondilal Saraf",
        url: "https://gondilalsaraf.com",
      },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "UC San Diego",
        url: "https://ucsd.edu",
      },
      {
        "@type": "HighSchool",
        name: "Delhi Public School, R. K. Puram",
      },
    ],
    knowsAbout: [
      "Machine Learning",
      "Data Science",
      "Graph Theory",
      "Python",
      "TensorFlow",
      "Web Development",
      "Entrepreneurship",
    ],
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.orcid],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_NAME} — Portfolio`,
    url: SITE_URL,
    description:
      "Portfolio of Arnav Goel — Data Science student at UC San Diego specializing in Machine Learning, Graph Theory, and Entrepreneurship.",
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
  slug,
  tags,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}) {
  const url = `${SITE_URL}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    image: `${url}/opengraph-image`,
    keywords: tags.join(", "),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
