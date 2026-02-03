import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "export",     // 👈 required for static export
  images: {
    unoptimized: true,  // 👈 required for static hosting
  },
};

export default nextConfig;
