import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arnav Goel: Data Science & Entrepreneurship",
    short_name: "Arnav Goel",
    description:
      "Portfolio of Arnav Goel: Data Science student at UC San Diego specializing in Machine Learning, Graph Theory, and Entrepreneurship.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#121110",
    theme_color: "#121110",
    categories: ["portfolio", "technology", "education"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
    ],
  };
}
