import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The homepage is the calculator. /calculator was a second route
      // rendering the same component; keep old links and bookmarks working.
      { source: "/calculator", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
