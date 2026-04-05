import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaOrcid } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Arnav
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Data Science &middot; Entrepreneurship &middot; Innovation
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ArnavGoel03"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/arnav-goel--/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://orcid.org/0009-0007-6477-6501"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <FaOrcid size={18} />
            </a>
            <a
              href="mailto:arnav@example.com"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        <Separator className="my-6 bg-border/50" />
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Arnav. Built with Next.js & Notion.
        </p>
      </div>
    </footer>
  );
}
