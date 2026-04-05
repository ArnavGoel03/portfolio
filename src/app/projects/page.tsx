import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/notion";
import { Project } from "@/lib/types";

export const revalidate = 3600;

export const metadata = {
  title: "Projects | Arnav",
};

const staticProjects: Project[] = [
  {
    id: "vaani",
    title: "Vaani — Multilingual AI Chatbot",
    description:
      "Built a real-time, voice-enabled AI chatbot using OpenAI's API to support conversational interactions in 5+ Indian languages. Integrated speech-to-text and text-to-speech pipelines to enable smooth, multilingual voice communication. Designed for accessibility and inclusivity, especially in rural and semi-digital communities.",
    tags: ["OpenAI API", "Real-time Speech Recognition", "NLP", "Python"],
    image: "",
    github: "",
    demo: "",
    featured: true,
    date: "2024-07",
  },
  {
    id: "style-it",
    title: "Style It — AI Wardrobe Assistant",
    description:
      "Developed an AI-powered wardrobe assistant that delivered personalized outfit suggestions based on occasion, color, and mood. Built a recommendation engine using TensorFlow and semantic vector matching to enhance style prediction accuracy. Integrated a dynamic API layer to suggest e-commerce product pairings, boosting recommendation performance by 30%.",
    tags: ["Python", "TensorFlow", "Recommendation Systems"],
    image: "",
    github: "",
    demo: "",
    featured: true,
    date: "2024-04",
  },
  {
    id: "handwritten-digits",
    title: "Handwritten Digits Classifier",
    description:
      "Program that classifies handwritten digits using the MNIST Database. Built with TensorFlow at Delhi Public School, R. K. Puram.",
    tags: ["TensorFlow", "Deep Learning", "MNIST"],
    image: "",
    github: "",
    demo: "",
    featured: false,
    date: "2022-01",
  },
  {
    id: "pet-classifier",
    title: "Pet Classifier Model",
    description:
      "Program that classifies common pet animals using their pictures. Trained on a private database provided by Delhi Public School and utilized the CNN framework for image recognition.",
    tags: ["CNN", "Computer Vision", "Deep Learning"],
    image: "",
    github: "",
    demo: "",
    featured: false,
    date: "2022-01",
  },
];

export default async function Projects() {
  const notionProjects = await getProjects();
  const allProjects =
    notionProjects.length > 0 ? notionProjects : staticProjects;

  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Projects
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          Things I&apos;ve{" "}
          <span className="heading-gradient text-glow">Built</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          A collection of projects spanning Machine Learning, Web Development,
          and Data Science — all driven by curiosity and real-world impact.
        </p>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
