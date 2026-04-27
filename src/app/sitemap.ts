import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { staticProjects } from "@/lib/projects";
import { caseStudies } from "@/lib/case-studies";

// Projects without enough shipped state to warrant a detail page, these
// don't appear in the sitemap either. Kept in sync with the [slug] route.
const NO_DETAIL_PAGE = new Set<string>();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ideas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/coursework`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const caseSlugs = new Set(caseStudies.map((c) => c.slug));

  const projectPages: MetadataRoute.Sitemap = staticProjects
    .filter((p) => !NO_DETAIL_PAGE.has(p.id))
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: new Date(p.date + "-01"),
      changeFrequency: "monthly" as const,
      priority: caseSlugs.has(p.id) ? 0.85 : 0.65,
    }));

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projectPages, ...blogPosts];
}
