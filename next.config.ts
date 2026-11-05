import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  experimental: { globalNotFound: true },
  images: {
    loader: "custom",
    loaderFile: "./src/sanity/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
