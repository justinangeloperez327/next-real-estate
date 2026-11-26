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
import { createPublicClient } from "@/lib/supabase/public";

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

  const { data, error } = await createPublicClient()
    .from("property_listings")
    .select("summary, neighborhood")
    .eq("is_current", true)
    .eq("category", category)
    .order("position")
    .order("id");
  if (error)
    throw new Error(`Could not read the property snapshot: ${error.message}`);
  return data;
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

  const { data, error } = await createPublicClient()
    .from("property_listings")
    .select("detail")
    .eq("is_current", true)
    .eq("id", id)
    .maybeSingle();
  if (error)
    throw new Error(`Could not read the property snapshot: ${error.message}`);
  return data?.detail ?? null;
}
