import {
  GraduationCap,
  Globe,
  Gem,
  Code2,
  Award,
} from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About | Arnav",
};

const highlights = [
  {
    icon: GraduationCap,
    title: "UCSD Data Science",
    description:
      "Pursuing a BS in Data Science with a minor in Entrepreneurship & Innovation at UC San Diego. GPA: 3.96/4.0.",
  },
  {
    icon: Globe,
    title: "International Roots",
    description:
      "Completed high school at Delhi Public School, R.K. Puram with 96.75% in Engineering Science under CBSE.",
  },
  {
    icon: Gem,
    title: "Gondilal Saraf",
    description:
      "Founder & Operator of a jewelry business — applying data-driven strategies to a traditional industry.",
  },
  {
    icon: Code2,
    title: "Technical Focus",
    description:
      "Deep interest in Machine Learning, Graph Theory, and Web Development. Key coursework: CSE 258, DSC 80, CSE 150A.",
  },
];

const education = [
  {
    school: "UC San Diego",
    degree:
      "Bachelor of Science — BS, Data Science (Minor: Entrepreneurship & Innovation)",
    period: "Sep 2022 — Jun 2026",
    grade: "3.960 (out of 4)",
    activities:
      "Wakesurfing, Swimming, Triton Thenix, Root]d Dance Club, Archery",
    skills: ["Communication", "Coding Experience"],
  },
  {
    school: "Delhi Public School — R. K. Puram",
    degree: "High School, Engineering Science",
    period: "Apr 2020 — Jun 2022",
    grade: "96.75%",
    activities: "PhySoc (Physics Society), Mathematics Society, Exun Clan",
    skills: ["Mathematics", "Python", "Physics", "Computer Science"],
  },
];

const certifications = [
  {
    name: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Jul 2024",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford University",
    date: "Jul 2024",
    skills: ["Machine Learning"],
  },
];

export default function About() {
  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          About Me
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          The Intersection of Data
          <br />
          <span className="heading-gradient text-glow">& Enterprise</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I&apos;m Arnav — a Data Science student at UCSD with roots in India
          and a passion for turning raw data into meaningful action. My journey
          spans from building ML pipelines to running Gondilal Saraf, a jewelry
          business where I blend analytical thinking with entrepreneurial grit.
        </p>
      </Section>

      <Section className="pt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <item.icon size={22} className="text-primary icon-glow" />
              </div>
              <h3 className="font-serif text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="gradient-border rounded-2xl bg-card p-8 backdrop-blur-sm md:p-12">
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            My Story
          </h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Growing up in India, I was always drawn to patterns — whether in
              mathematics, market trends, or the intricate designs of traditional
              jewelry. This curiosity led me to pursue Data Science at UCSD,
              where I discovered the power of translating complex datasets into
              actionable insights.
            </p>
            <p>
              At UCSD, courses like CSE 258 (Recommender Systems), DSC 80 (Data
              Science in Practice), and CSE 150A (AI) shaped my approach to
              problem-solving. I developed a deep appreciation for how graph
              theory and machine learning can model real-world networks and
              decision systems.
            </p>
            <p>
              Alongside my studies, I founded Gondilal Saraf — a jewelry
              business where I apply data science to inventory optimization,
              customer segmentation, and demand forecasting. Running a business
              while studying taught me how to bridge the gap between theory and
              practice, and gave me a unique perspective on how technology can
              transform traditional industries.
            </p>
            <p>
              My minor in Entrepreneurship & Innovation at UCSD further
              solidified my belief that the best solutions emerge when technical
              rigor meets creative thinking and real-world constraints.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <GraduationCap size={22} className="text-primary icon-glow" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            Education
          </h2>
        </div>
        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-tight">
                    {edu.school}
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    {edu.degree}
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs text-muted-foreground">
                  {edu.period}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Grade: {edu.grade}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Activities: {edu.activities}
              </p>
              {edu.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {edu.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
            <Award size={22} className="text-primary icon-glow" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            Certifications
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="gradient-border glow-card rounded-2xl bg-card p-7 backdrop-blur-sm"
            >
              <h3 className="font-serif text-base font-semibold tracking-tight">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {cert.issuer}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Issued {cert.date}
              </p>
              {cert.skills && cert.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="border-primary/10 bg-primary/5 text-xs font-normal text-primary/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
