import { SITE_URL, SITE_NAME, SOCIAL_LINKS, EMAIL } from "@/lib/constants";

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: SITE_NAME,
    alternateName: ["Yash Goel", "Yash"],
    givenName: "Arnav",
    additionalName: "Yash",
    familyName: "Goel",
    description:
      "Data Science student at UC San Diego graduating June 2026. UC GPA 3.911. Considering new-grad applied-scientist, ML-engineer, and software-engineer roles for summer 2026 onward.",
    url: SITE_URL,
    email: EMAIL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: [
      "Data Science Student",
      "Digital Platform Lead",
      "Quantitative Research (Student)",
    ],
    knowsLanguage: ["en", "hi"],
    worksFor: [
      {
        "@type": "Organization",
        name: "UC San Diego",
        url: "https://ucsd.edu",
      },
      {
        "@type": "Organization",
        name: "Triton Quantitative Trading",
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
        name: "UC San Diego — Seventh College",
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
      "Recommender Systems",
      "Deep Learning",
      "Natural Language Processing",
      "Time Series Analysis",
      "Quantitative Research",
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "SQL",
      "PostgreSQL",
      "Flask",
      "Next.js",
      "React",
      "TypeScript",
      "SwiftUI",
      "Full-Stack Development",
      "Entrepreneurship",
    ],
    seeks: {
      "@type": "Demand",
      name: "New-grad Applied Scientist / ML Engineer / Data Scientist / Software Engineer roles for summer 2026 onward",
    },
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.orcid,
      "https://github.com/ArnavGoel03",
    ],
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

export function ProfilePageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}#profilepage`,
    url: SITE_URL,
    dateCreated: "2025-01-01",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@id": `${SITE_URL}#person`,
    },
    about: {
      "@id": `${SITE_URL}#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
