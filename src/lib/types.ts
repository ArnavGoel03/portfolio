export type TeamMember = string | { name: string; url: string };

export function memberName(m: TeamMember): string {
  return typeof m === "string" ? m : m.name;
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
  learning?: boolean;
  doi?: string;
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
