import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Static pages only. Listings come from RealtyAPI and change constantly;
 * enumerating them here would spend API credits on every crawl.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/properties", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
