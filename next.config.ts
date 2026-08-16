import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [32, 48, 64, 96, 128, 160, 200, 256, 384],
    qualities: [75, 100],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/divisions/elevators",
        destination: "/elevators",
        permanent: true,
      },
      {
        source: "/divisions/cctv-smart-home",
        destination: "/cctv-smart-systems",
        permanent: true,
      },
      {
        source: "/services/maintenance",
        destination: "/maintenance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
