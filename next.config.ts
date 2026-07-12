import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@tabler/icons-react",
      "@nextui-org/react",
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "codegang.online",
          },
        ],
        destination: "https://www.codegang.online/:path*",
        permanent: true,
      },
      // Console revamp — old routes keep whatever link equity exists
      { source: "/project", destination: "/work", permanent: true },
      { source: "/project/:slug", destination: "/work/:slug", permanent: true },
      { source: "/about", destination: "/studio", permanent: true },
      { source: "/team", destination: "/studio", permanent: true },
      { source: "/contactus", destination: "/contact", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
