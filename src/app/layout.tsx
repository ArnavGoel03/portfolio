import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import PageTransition from "@/components/page-transition";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Data Science & Entrepreneurship`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Arnav Goel",
    "Yash",
    "Yash Goel",
    "Data Science",
    "Machine Learning",
    "UCSD",
    "UC San Diego",
    "Graph Theory",
    "Entrepreneurship",
    "Python",
    "TensorFlow",
    "Web Developer",
    "Portfolio",
    "Gondilal Saraf",
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
    siteName: `${SITE_NAME} — Portfolio`,
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
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} dark`}
    >
      <head>
        <PersonJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
