import Section from "@/components/section";
import Timeline from "@/components/timeline";
import { getExperience } from "@/lib/notion";
import { Experience } from "@/lib/types";

export const revalidate = 3600;

export const metadata = {
  title: "Experience",
  description:
    "Arnav Goel's professional and academic journey — SWE Intern at UCSD, operator and developer at Gondilal Saraf, and Data Science education at UC San Diego and Delhi Public School.",
  openGraph: {
    title: "Experience — Arnav Goel",
    description:
      "From running a family jewelry business to exploring ML frontiers at UC San Diego.",
  },
};

const staticExperience: Experience[] = [
  {
    id: "triton-quant",
    role: "Member",
    company: "Triton Quantitative Trading",
    type: "work",
    startDate: "Apr 2025",
    endDate: "Present",
    description:
      "Part-time quantitative research at UCSD's student-run trading group. Conducting research on financial markets using high-frequency data to identify arbitrage and alpha-generating opportunities. Collaborating with other researchers to build and test systematic trading strategies in Python, Pandas, and NumPy. Applying statistical modeling, time-series analysis, and signal processing; running backtests across historical data and optimizing strategy performance through feature engineering and parameter tuning. Weekly discussions on risk management, market structure, and advanced quantitative methods.",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Time-Series Analysis",
      "Backtesting",
      "Quantitative Research",
    ],
  },
  {
    id: "ada-swe",
    role: "SWE Intern",
    company: "ADA",
    type: "work",
    startDate: "Oct 2024",
    endDate: "Dec 2024",
    description:
      "On-site internship in Bengaluru, India. Spearheaded backend development for a multi-region patient management platform targeting hospitals in the US, Japan, and South Korea — projected to onboard 50,000+ patients across 120+ hospitals by 2025. Built and containerized Flask microservices with Docker Compose, reducing onboarding and setup time by 60%. Developed the Nurse Panel Backend API and engineered supporting data models via dbdiagram.io for onboarding, scheduling, and real-time shift tracking. Optimized PostgreSQL queries, automated daily ETL pipelines in Python, and architected scalable MDM tables for hospital, patient, and service master data. Established full-stack observability with OpenTelemetry (logs, traces, metrics), enabling 90% faster issue detection.",
    skills: [
      "Flask",
      "Docker",
      "PostgreSQL",
      "Python",
      "OpenTelemetry",
      "ETL",
      "REST APIs",
    ],
  },
  {
    id: "espire-cloud",
    role: "Cloud Engineering Intern",
    company: "Espire Infolabs",
    type: "work",
    startDate: "Jul 2024",
    endDate: "Sep 2024",
    description:
      "Hybrid internship. Built KPI dashboards and real-time monitoring systems to support digital transformation initiatives for enterprise clients, enabling faster decision-making and SLA compliance tracking. Integrated Azure Monitor, Log Analytics, and Workbooks to centralize IT insights and reduce manual reporting by 40%. Deployed automated alerting pipelines with AWS Lambda and CloudWatch, cutting incident detection time by 30%. Contributed to communication-enhancement tools under Espire's Total Experience (TX) strategy, improving report clarity across departments.",
    skills: ["Azure Monitor", "AWS Lambda", "CloudWatch", "ITSM", "Dashboards"],
  },
  {
    id: "ags-algo-trading",
    role: "Algorithmic Trading Intern",
    company: "AGS",
    type: "work",
    startDate: "Jun 2023",
    endDate: "Sep 2023",
    description:
      "On-site internship. Designed high-frequency arbitrage strategies using tick-level market data to uncover short-term alpha opportunities. Built scalable Python backtesting pipelines leveraging Pandas and NumPy, analyzing 10+ years of high-frequency trading data to enhance model evaluation. Boosted predictive accuracy by 15% via feature engineering, hyperparameter tuning, and time-series normalization. Conducted volatility-adjusted Monte Carlo simulations to stress-test strategy robustness, and improved overall Sharpe Ratio by 12% through optimized risk management and volatility modeling.",
    skills: ["Python", "Pandas", "NumPy", "Quantitative Analytics", "Monte Carlo", "Backtesting"],
  },
  {
    id: "techlearn-ambassador",
    role: "Campus Ambassador",
    company: "TechLearn India",
    type: "work",
    startDate: "Nov 2021",
    endDate: "Dec 2022",
    description:
      "Freelance role in India. Spearheaded marketing initiatives across 5+ college campuses, increasing brand visibility and driving 150+ new student signups for TechLearn's online programs. Organized and led community outreach campaigns to promote tech literacy among underrepresented groups. Collaborated cross-functionally on strategic communications — digital flyers, workshops, and webinars. Coordinated on-site events and info sessions, and tracked engagement metrics with regular reports to outreach managers.",
    skills: ["Marketing", "Community Outreach", "Event Planning", "Communications"],
  },
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
    role: "Digital Platform Lead",
    company: "Gondilal Saraf",
    type: "work",
    startDate: "2022",
    endDate: "Present",
    description:
      "Took my family's century-old jewelry business online to solidify our legacy and bring transparency to customers — building a bilingual storefront with live gold rates, 10-year investment charts, AR virtual try-on, and AI-generated product descriptions. Also applying data-driven strategies to inventory optimization, customer segmentation, and demand forecasting in a traditional industry.",
    skills: ["Full-Stack Development", "Data Analysis", "Business Strategy", "Digital Transformation"],
  },
  {
    id: "ucsd",
    role: "BS Data Science (Minor: Entrepreneurship & Innovation)",
    company: "UC San Diego",
    type: "academic",
    startDate: "Sep 2022",
    endDate: "Jun 2026",
    description:
      "GPA: 3.911/4.0 (major GPA 3.860, minor GPA 3.950). Key coursework: CSE 150A (AI: Probabilistic Models), CSE 151A (ML: Learning Algorithms), CSE 158R (Recommender Systems & Web Mining), DSC 80 (Practice of Data Science), DSC 100 (Data Management), MATH 183 (Statistical Methods), LIGN 167 (Deep Learning for NLP), MGT 127R (AI & Technology Strategy). Activities: Wakesurfing, Swimming, Triton Thenix, Root]d Dance Club, Archery.",
    skills: [
      "Machine Learning",
      "Graph Theory",
      "Data Science",
      "Communication",
    ],
  },
  {
    id: "dps-rkp",
    role: "High School — Engineering Science",
    company: "Delhi Public School, R. K. Puram",
    type: "academic",
    startDate: "Apr 2020",
    endDate: "Jun 2022",
    description:
      "Grade: 96.75%. Completed the final two years of high school with a focus on Physics, Chemistry, Mathematics, and Computer Science under the CBSE board. Served as Vice President of the Mathematics Society (May 2021 — Jun 2022) — led event planning for math competitions and guest lectures (60% engagement lift), designed interactive workshops bridging real-world math and classroom learning, and coordinated with faculty and external educators. Concurrently Vice President of the Physics Society, PhySoc (Apr 2021 — Jun 2022) — oversaw science-communication initiatives for 500+ physics enthusiasts, managed a 10-member core team, and partnered with peer societies on interdepartmental panels. Also active in Exun Clan.",
    skills: ["Mathematics", "Python", "Physics", "Computer Science", "Leadership"],
  },
  {
    id: "gd-goenka",
    role: "High School",
    company: "GD Goenka Public School, Kanpur",
    type: "academic",
    startDate: "Apr 2018",
    endDate: "Mar 2020",
    description:
      "Grade: 97.4%. Completed middle/early high school at GD Goenka Kanpur. Activities included the marching band.",
    skills: ["Acting", "Archery"],
  },
];

export default async function ExperiencePage() {
  const notionExperience = await getExperience();
  const experience =
    notionExperience.length > 0 ? notionExperience : staticExperience;

  return (
    <>
      <Section className="pt-36 pb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/80">
          Experience
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-6xl">
          My{" "}
          <span className="heading-gradient text-glow">Journey</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          From taking my family&apos;s century-old jewelry business online to
          exploring the frontiers of machine learning at UCSD.
        </p>
      </Section>

      <Section className="pt-4">
        <Timeline items={experience} />
      </Section>
    </>
  );
}
