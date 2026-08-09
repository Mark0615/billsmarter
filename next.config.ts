import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next-on-pages has no image optimizer: /_next/image returns the original
    // bytes untouched. Serving the file directly skips a pointless hop, and
    // assets are pre-sized to their display dimensions instead.
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
