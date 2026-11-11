import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.102'],
};

export default nextConfig;
