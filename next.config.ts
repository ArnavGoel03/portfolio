import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/pcod-tracker",
        destination: "/projects/serenity",
        permanent: true,
      },
      // The studio was called Simple Games until 19 August 2026, when it took
      // a name whose .com was actually available. Anything already linking to
      // the old slug still lands.
      {
        source: "/projects/simple-games",
        destination: "/projects/glass-table-games",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
