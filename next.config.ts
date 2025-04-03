import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Ignore 'fs' module in the client
    return config;
  },
};

export default nextConfig;
