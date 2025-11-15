import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.browser-use.com',
        pathname: '/screenshots/**',
      },
      {
        protocol: 'https',
        hostname: '**.proxy.daytona.works',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
