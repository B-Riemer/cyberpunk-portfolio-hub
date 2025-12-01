import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static Export für z.B. GitHub Pages
  output: "export",

  // Bilder ohne serverseitige Optimierung (notwendig für GitHub Pages)
  images: {
    unoptimized: true,
  },

  reactCompiler: true,
};

export default nextConfig;
