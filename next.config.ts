import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [{ pathname: "/assets/**", search: "?v=**" }],
  },
  async headers() {
    return [
      {
        source: "/assets/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-store, no-cache, must-revalidate, proxy-revalidate"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
