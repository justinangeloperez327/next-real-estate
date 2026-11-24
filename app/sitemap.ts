import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getProperties } from "@/features/properties/queries";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Built per request (from the data cache) so builds never need the DB.
  await connection();

  const pages: MetadataRoute.Sitemap = [
    "",
    "/properties",
    "/about",
    "/contact",
  ].map((path) => ({ url: `${siteUrl}${path}` }));

  try {
    const properties = await getProperties();
    return [
      ...pages,
      ...properties.map((p) => ({ url: `${siteUrl}/properties/${p.id}` })),
    ];
  } catch (error) {
    console.error("sitemap: failed to load properties:", error);
    return pages;
  }
}
