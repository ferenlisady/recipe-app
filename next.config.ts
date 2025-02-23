import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;
