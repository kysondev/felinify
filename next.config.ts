import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/workspace",
        destination: "/workspace/library",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
