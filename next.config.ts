import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Partial prerendering: static shells are served instantly from the CDN,
  // cached data ("use cache") is reused across requests, and only truly
  // per-user parts stream in at request time.
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
