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
