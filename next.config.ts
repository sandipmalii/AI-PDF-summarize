// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false }; // Ignore 'fs' module in the client
//     return config;
//   },
// };

// export default nextConfig;


// next.config.js


// next.config.js

const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Ignore 'fs' module in client
    return config;
  },
};

module.exports = nextConfig;
