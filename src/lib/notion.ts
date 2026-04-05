import { Client } from "@notionhq/client";
import { Project, Experience, Skill } from "./types";

function getNotionClient(): Client | null {
  const key = process.env.NOTION_API_KEY;
  if (!key || key === "your_notion_integration_secret_here") return null;
  return new Client({ auth: key });
}

function getTextProperty(page: any, key: string): string {
  const prop = page.properties[key];
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (prop.type === "url") return prop.url ?? "";
  return "";
}

function getSelectProperty(page: any, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name ?? "";
}

function getMultiSelectProperty(page: any, key: string): string[] {
  const prop = page.properties[key];
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select.map((s: any) => s.name);
}

function getCheckboxProperty(page: any, key: string): boolean {
  const prop = page.properties[key];
  if (!prop || prop.type !== "checkbox") return false;
  return prop.checkbox;
}

function getDateProperty(page: any, key: string): string {
  const prop = page.properties[key];
  if (!prop || prop.type !== "date" || !prop.date) return "";
  return prop.date.start ?? "";
}

function getCoverImage(page: any): string {
  if (page.cover?.type === "external") return page.cover.external.url;
  if (page.cover?.type === "file") return page.cover.file.url;
  return "";
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

    return response.results.map((page: any) => ({
      id: page.id,
      title: getTextProperty(page, "Title"),
      description: getTextProperty(page, "Description"),
      tags: getMultiSelectProperty(page, "Tags"),
      image: getCoverImage(page),
      github: getTextProperty(page, "GitHub"),
      demo: getTextProperty(page, "Demo"),
      featured: getCheckboxProperty(page, "Featured"),
      date: getDateProperty(page, "Date"),
    }));
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

    return response.results.map((page: any) => ({
      id: page.id,
      title: getTextProperty(page, "Title"),
      description: getTextProperty(page, "Description"),
      tags: getMultiSelectProperty(page, "Tags"),
      image: getCoverImage(page),
      github: getTextProperty(page, "GitHub"),
      demo: getTextProperty(page, "Demo"),
      featured: getCheckboxProperty(page, "Featured"),
      date: getDateProperty(page, "Date"),
    }));
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

    return response.results.map((page: any) => ({
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

    return response.results.map((page: any) => ({
      id: page.id,
      name: getTextProperty(page, "Name"),
      category: getSelectProperty(page, "Category"),
    }));
  } catch {
    return [];
  }
}
