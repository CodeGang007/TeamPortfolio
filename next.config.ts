import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
