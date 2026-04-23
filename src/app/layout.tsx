import type { Metadata } from "next";
import { Inter, Geist_Mono, Fraunces } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollProgress from "@/components/scroll-progress";
import PageTransition from "@/components/page-transition";
import CommandPalette from "@/components/command-palette";
import ServiceWorkerRegister from "@/components/sw-register";
import {
  PersonJsonLd,
  WebSiteJsonLd,
  ProfilePageJsonLd,
  PublishedWorksJsonLd,
} from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} (Yash Goel): UCSD Data Science`,
    template: `%s | ${SITE_NAME} (Yash Goel)`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Arnav Goel",
    "Yash Goel",
    "Arnav Goel UCSD",
    "Arnav Goel portfolio",
    "Arnav Goel resume",
    "Data Science",
    "Machine Learning Engineer",
    "Applied Scientist",
    "ML Engineer",
    "UCSD",
    "UC San Diego",
    "new grad data science 2027",
    "co-founder",
    "technical co-founder",
    "Graph Theory",
    "Entrepreneurship",
    "Python",
    "TypeScript",
    "Next.js",
    "PyTorch",
    "TensorFlow",
    "Gondilal Saraf",
    "Watch Together",
    "PCOD Tracker",
    "Full-stack engineer",
    "International student UCSD",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${SITE_NAME}: Portfolio`,
    title: `${SITE_NAME} | Data Science & Entrepreneurship`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Data Science & Entrepreneurship`,
    description: SITE_DESCRIPTION,
    creator: "@ArnavGoel03",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [
        { url: `${SITE_URL}/feed.xml`, title: `${SITE_NAME}: Blog RSS` },
      ],
    },
  },
  category: "technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${fraunces.variable} dark`}
      style={
        {
          "--font-heading": "var(--font-serif)",
        } as React.CSSProperties
      }
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#121110" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Arnav Goel" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="me" href="https://github.com/ArnavGoel03" />
        <link rel="me" href="https://www.linkedin.com/in/arnav-goel--/" />
        <link rel="author" href="/humans.txt" />
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ProfilePageJsonLd />
        <PublishedWorksJsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
        <CommandPalette />
        <ServiceWorkerRegister />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
