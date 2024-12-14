// import type { NextConfig } from "next";
// /** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG images
    contentDispositionType: "inline", // Optional: Set how the SVGs are served
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
// export default nextConfig;
