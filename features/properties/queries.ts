import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { realtyGet, RealtyApiError } from "@/lib/realtyapi/client";
import type {
  RawDetailResponse,
  RawSearchResponse,
} from "@/lib/realtyapi/types";
import { DEFAULT_LOCATION, PAGE_SIZE } from "@/features/properties/constants";
import { toSearchQuery } from "@/features/properties/filters";
import {
  normalizeDetail,
  normalizeSearchResult,
} from "@/features/properties/normalize";
import type {
  ListingDetail,
  PropertyFilters,
  SearchResult,
} from "@/features/properties/types";

/**
 * RealtyAPI bills per request (the free plan is 250/month), so every read
 * is cached across visitors. Identical searches within the cache lifetime
 * cost nothing.
 */

export async function searchListings(
  filters: PropertyFilters = {},
): Promise<SearchResult> {
  "use cache";
  cacheTag("listings");
  cacheLife("hours");

  const query = toSearchQuery(filters, {
    location: DEFAULT_LOCATION,
    pageSize: PAGE_SIZE,
  });
  const data = await realtyGet<RawSearchResponse>("/search/bylocation", query);
  const listings = (data.searchResults ?? [])
    .filter((r) => r?.property_id)
    .map(normalizeSearchResult);

  return {
    listings,
    total: data.total ?? listings.length,
    page: query.page,
    hasNextPage: !!data.nextPage,
  };
}

/** Newest listings in the default market (shares the search cache). */
export async function getLatestListings(limit = 6) {
  const { listings } = await searchListings({ sort: "Newest" });
  return listings.slice(0, limit);
}

/** Returns the listing, or null if the id is malformed or not found. */
export async function getListing(id: unknown): Promise<ListingDetail | null> {
  if (typeof id !== "string" || !/^\d{4,20}$/.test(id)) return null;
  return getListingById(id);
}

async function getListingById(id: string): Promise<ListingDetail | null> {
  "use cache";
  cacheTag("listings", `listing:${id}`);
  cacheLife("hours");

  try {
    const data = await realtyGet<RawDetailResponse>("/details/byid", {
      property_id: id,
    });
    return data.detail?.property_id ? normalizeDetail(data.detail) : null;
  } catch (error) {
    if (error instanceof RealtyApiError && error.status === 404) return null;
    throw error;
  }
}
