import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static Export für z.B. GitHub Pages
  output: "export",

  // Bilder ohne serverseitige Optimierung (notwendig für GitHub Pages)
  images: {
    unoptimized: true,
  },

  reactCompiler: true,

  // WICHTIG: Ignoriere alle Fehler für den Production Build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
