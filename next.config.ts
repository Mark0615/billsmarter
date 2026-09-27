import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Assets are already sized for display; keep direct static delivery.
    unoptimized: true,
  },
  async redirects() {
    return [
      // The homepage is the calculator. /calculator was a second route
      // rendering the same component; keep old links and bookmarks working.
      { source: "/calculator", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
