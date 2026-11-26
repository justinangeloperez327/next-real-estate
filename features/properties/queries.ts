import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { LISTING_ID_PATTERN } from "@/features/properties/constants";
import {
  searchSnapshot,
  type SnapshotListing,
} from "@/features/properties/snapshot";
import type {
  ListingDetail,
  PropertyFilters,
  SearchResult,
} from "@/features/properties/types";
import { getDb } from "@/lib/prisma";

export async function searchListings(
  filters: PropertyFilters = {},
): Promise<SearchResult> {
  const rows = await getListingSummaries(
    filters.category === "rent" ? "rent" : "sale",
  );
  return searchSnapshot(rows, filters);
}

async function getListingSummaries(
  category: "sale" | "rent",
): Promise<SnapshotListing[]> {
  "use cache";
  cacheTag("listings");
  cacheLife("minutes");

  const rows = await getDb().propertyListing.findMany({
    where: { isCurrent: true, category },
    select: { summary: true, neighborhood: true },
    orderBy: [{ position: "asc" }, { id: "asc" }],
  });
  return rows as SnapshotListing[];
}

export async function getLatestListings(limit = 6) {
  const { listings } = await searchListings({ sort: "Newest" });
  return listings.slice(0, limit);
}

export async function getListing(id: unknown): Promise<ListingDetail | null> {
  if (typeof id !== "string" || !LISTING_ID_PATTERN.test(id)) return null;
  return getListingById(id);
}

async function getListingById(id: string): Promise<ListingDetail | null> {
  "use cache";
  cacheTag("listings", `listing:${id}`);
  cacheLife("minutes");

  const row = await getDb().propertyListing.findFirst({
    where: { id, isCurrent: true },
    select: { detail: true },
  });
  return (row?.detail as ListingDetail | undefined) ?? null;
}
