import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | Arnav Goel",
  description:
    "Get in touch with Arnav Goel: Data Science student at UCSD, ML engineer, and entrepreneur. Reach out for collaborations, projects, or opportunities.",
  openGraph: {
    title: "Contact | Arnav Goel",
    description:
      "Get in touch with Arnav Goel for collaborations, projects, or opportunities.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
