import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/pcod-tracker",
        destination: "/projects/serenity",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
