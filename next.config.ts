import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Assets are already sized for display; keep direct static delivery.
    unoptimized: true,
  },
};

export default nextConfig;
