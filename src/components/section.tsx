import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * A section of a page, revealed on scroll without being hidden in the markup.
 *
 * This was a framer-motion client component whose initial state was opacity 0.
 * That state shipped in the server HTML, so every section was invisible to
 * anything that paints the page instead of parsing it. It is now a plain server
 * component wearing one class, and the reveal lives in CSS behind an @supports
 * guard, so the content is visible by default and animates only where the
 * browser can drive it. That also takes a client component off every section on
 * the site.
 */
export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("section-reveal py-20", className)}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
