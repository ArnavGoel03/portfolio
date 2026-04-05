import Section from "@/components/section";
import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/notion";
import { Project } from "@/lib/types";

export const revalidate = 3600;

export const metadata = {
  title: "Projects",
  description:
    "Explore projects by Arnav Goel — from multilingual AI chatbots and ML-powered wardrobe assistants to deep learning classifiers and family business web development.",
  openGraph: {
    title: "Projects by Arnav Goel",
    description:
      "Machine Learning, AI, and Web Development projects built by Arnav Goel at UCSD.",
  },
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
  {
    id: "pcod-tracker",
    title: "PCOD Tracker — AI Health Companion",
    description:
      "Built an AI-powered health management app for women with PCOD/PCOS. Users vent freely and Claude AI auto-extracts symptoms, mood, diet, and medications. Upload lab PDFs and AI parses hormone levels, flags abnormals, and detects medications. Features cycle tracking, medication streaks, lab trend charts via Recharts, calendar heatmaps, and Google OAuth. 15 Prisma models, 14 API routes, and a supportive, privacy-first UX.",
    tags: ["Next.js 16", "Claude AI", "PostgreSQL", "Prisma", "NextAuth", "Recharts"],
    image: "",
    github: "https://github.com/ArnavGoel03/pcod-tracker",
    demo: "https://pcod-tracker.vercel.app",
    featured: true,
    date: "2025-03",
  },
  {
    id: "gondilal-saraf",
    title: "Gondilal Saraf — Full-Stack Jewelry Platform",
    description:
      "Built a full-stack platform for my family's century-old jewelry business — bilingual storefront with live gold rates, 10-year investment charts, and a cinematic heritage design system. Includes a product catalogue with AR virtual try-on, AI-generated descriptions via Gemini 2.0 Flash, and an admin ERP with image processing pipeline (Photoroom + Sharp). 15 Prisma models, 26 API routes, OTP auth, AES encryption, and 85 tests.",
    tags: ["Next.js 15", "PostgreSQL", "Gemini AI", "Prisma", "TypeScript", "Framer Motion"],
    image: "",
    github: "https://github.com/ArnavGoel03/Gondilal",
    demo: "https://gondilalsaraf.com",
    featured: true,
    date: "2025-01",
  },
];

export default async function Projects() {
  const notionProjects = await getProjects();
  const notionIds = new Set(notionProjects.map((p) => p.title.toLowerCase()));
  const extraStatic = staticProjects.filter(
    (p) => !notionIds.has(p.title.toLowerCase())
  );
  const allProjects =
    notionProjects.length > 0
      ? [...notionProjects, ...extraStatic]
      : staticProjects;

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
