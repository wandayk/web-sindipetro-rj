import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/web-sindipetro-rj',
  assetPrefix: '/web-sindipetro-rj',
};

export default nextConfig;
