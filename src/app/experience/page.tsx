import Section from "@/components/section";
import Timeline from "@/components/timeline";
import { getExperience } from "@/lib/notion";
import { Experience } from "@/lib/types";

export const revalidate = 3600;

export const metadata = {
  title: "Experience | Arnav",
};

const staticExperience: Experience[] = [
  {
    id: "swe-intern",
    role: "SWE Intern",
    company: "UC San Diego",
    type: "work",
    startDate: "2024",
    endDate: "Present",
    description:
      "Software Engineering Intern working on undergraduate projects and research at UC San Diego.",
    skills: ["Python", "TypeScript", "React"],
  },
  {
    id: "gondilal-saraf",
    role: "Founder & Operator",
    company: "Gondilal Saraf",
    type: "work",
    startDate: "2022",
    endDate: "Present",
    description:
      "Founded and operate a jewelry business, applying data-driven strategies to inventory optimization, customer segmentation, and demand forecasting in a traditional industry.",
    skills: ["Entrepreneurship", "Data Analysis", "Business Strategy"],
  },
  {
    id: "ucsd",
    role: "BS Data Science (Minor: Entrepreneurship & Innovation)",
    company: "UC San Diego",
    type: "academic",
    startDate: "Sep 2022",
    endDate: "Jun 2026",
    description:
      "GPA: 3.96/4.0. Key coursework: CSE 258 (Recommender Systems), DSC 80 (Data Science in Practice), CSE 150A (AI). Activities: Wakesurfing, Swimming, Triton Thenix, Root]d Dance Club, Archery.",
    skills: ["Machine Learning", "Graph Theory", "Data Science", "Communication"],
  },
  {
    id: "dps-rkp",
    role: "High School — Engineering Science",
    company: "Delhi Public School, R. K. Puram",
    type: "academic",
    startDate: "Apr 2020",
    endDate: "Jun 2022",
    description:
      "Grade: 96.75%. Completed the final two years of high school with a focus on Physics, Chemistry, Mathematics, and Computer Science under the CBSE board. Active member of PhySoc, Mathematics Society, and Exun Clan.",
    skills: ["Mathematics", "Python", "Physics", "Computer Science"],
  },
];

export default async function ExperiencePage() {
  const notionExperience = await getExperience();
  const experience =
    notionExperience.length > 0 ? notionExperience : staticExperience;

  return (
    <>
      <Section className="pt-32 pb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Experience
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          My{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Journey
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          From founding a jewelry business to exploring the frontiers of machine
          learning at UCSD.
        </p>
      </Section>

      <Section className="pt-4">
        <Timeline items={experience} />
      </Section>
    </>
  );
}
