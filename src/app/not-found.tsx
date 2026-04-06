import Link from "next/link";
import Section from "@/components/section";

export default function NotFound() {
  return (
    <Section className="pt-36 pb-20">
      <div className="flex flex-col items-center text-center">
        <p className="font-mono text-8xl font-bold heading-gradient text-glow md:text-9xl">
          404
        </p>
        <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/"
            className="btn-glow inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="btn-border-flow inline-flex h-11 items-center rounded-xl px-6 text-sm font-medium transition-all"
          >
            View Projects
          </Link>
        </div>
      </div>
    </Section>
  );
}
