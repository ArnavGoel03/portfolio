import { Client } from "@notionhq/client";
import { Project, Experience, Skill } from "./types";

function getNotionClient(): Client | null {
  const key = process.env.NOTION_API_KEY;
  if (!key || key === "your_notion_integration_secret_here") return null;
  return new Client({ auth: key });
}

/**
 * The parts of a Notion page this file actually reads.
 *
 * Written out rather than imported from the SDK on purpose. `PageObjectResponse`
 * lives behind `@notionhq/client/build/src/api-endpoints`, which is not a
 * published entry point and has moved between majors, and every query below
 * returns a union of full pages, partial pages, databases and blocks that has
 * to be narrowed before it can be read anyway. Six fields written out here are
 * both honest about what this file requires and stable across an SDK upgrade.
 */
interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty | undefined>;
  cover?: NotionCover | null;
}

type NotionProperty =
  | { type: "title"; title?: { plain_text?: string }[] }
  | { type: "rich_text"; rich_text?: { plain_text?: string }[] }
  | { type: "url"; url?: string | null }
  | { type: "select"; select?: { name?: string } | null }
  | { type: "multi_select"; multi_select: { name: string }[] }
  | { type: "checkbox"; checkbox: boolean }
  | { type: "date"; date?: { start?: string | null } | null };

type NotionCover =
  | { type: "external"; external: { url: string } }
  | { type: "file"; file: { url: string } };

/**
 * Keeps the full pages out of a result set and drops everything else.
 *
 * A query can return a partial page, which carries an id and nothing else.
 * Reading one produces a row of empty strings, which renders as a blank card
 * rather than as an error, so it is dropped here instead.
 */
function pagesOf(results: readonly unknown[]): NotionPage[] {
  return results.filter((result): result is NotionPage => {
    const page = result as Partial<NotionPage> | null;
    return typeof page?.id === "string" && typeof page.properties === "object";
  });
}

function getTextProperty(page: NotionPage, key: string): string {
  const prop = page.properties[key];
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (prop.type === "url") return prop.url ?? "";
  return "";
}

function getSelectProperty(page: NotionPage, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name ?? "";
}

function getMultiSelectProperty(page: NotionPage, key: string): string[] {
  const prop = page.properties[key];
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((option) => option.name);
}

function getCheckboxProperty(page: NotionPage, key: string): boolean {
  const prop = page.properties[key];
  if (!prop || prop.type !== "checkbox") return false;
  return prop.checkbox;
}

function getDateProperty(page: NotionPage, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== "date" || !prop.date) return "";
  return prop.date.start ?? "";
}

function getCoverImage(page: NotionPage): string {
  if (page.cover?.type === "external") return page.cover.external.url;
  if (page.cover?.type === "file") return page.cover.file.url;
  return "";
}

/**
 * One row of the projects database, read the same way whether the caller wanted
 * every project or only the featured ones. Written twice before this, which is
 * how one of the two copies ends up missing a field nobody notices is gone.
 */
function toProject(page: NotionPage): Project {
  return {
    id: page.id,
    title: getTextProperty(page, "Title"),
    description: getTextProperty(page, "Description"),
    tags: getMultiSelectProperty(page, "Tags"),
    image: getCoverImage(page),
    github: getTextProperty(page, "GitHub"),
    demo: getTextProperty(page, "Demo"),
    featured: getCheckboxProperty(page, "Featured"),
    date: getDateProperty(page, "Date"),
  };
}

export async function getProjects(): Promise<Project[]> {
  const notion = getNotionClient();
  const dbId = process.env.NOTION_PROJECTS_DB;
  if (!notion || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return pagesOf(response.results).map(toProject);
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const notion = getNotionClient();
  const dbId = process.env.NOTION_PROJECTS_DB;
  if (!notion || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Featured", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return pagesOf(response.results).map(toProject);
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  const notion = getNotionClient();
  const dbId = process.env.NOTION_EXPERIENCE_DB;
  if (!notion || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "StartDate", direction: "descending" }],
    });

    return pagesOf(response.results).map((page) => ({
      id: page.id,
      role: getTextProperty(page, "Role"),
      company: getTextProperty(page, "Company"),
      type: (getSelectProperty(page, "Type") as "work" | "academic") || "work",
      startDate: getDateProperty(page, "StartDate"),
      endDate: getTextProperty(page, "EndDate"),
      description: getTextProperty(page, "Description"),
      skills: getMultiSelectProperty(page, "Skills"),
    }));
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  const notion = getNotionClient();
  const dbId = process.env.NOTION_SKILLS_DB;
  if (!notion || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Category", direction: "ascending" }],
    });

    return pagesOf(response.results).map((page) => ({
      id: page.id,
      name: getTextProperty(page, "Name"),
      category: getSelectProperty(page, "Category"),
    }));
  } catch {
    return [];
  }
}
