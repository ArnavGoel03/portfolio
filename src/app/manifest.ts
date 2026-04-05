import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arnav Goel — Data Science & Entrepreneurship",
    short_name: "Arnav Goel",
    description:
      "Portfolio of Arnav Goel — Data Science student at UC San Diego specializing in Machine Learning, Graph Theory, and Entrepreneurship.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#8b5cf6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
