import {
  MAX_RESULTS_PAGE,
  PAGE_SIZE,
  PROPERTY_TYPE_OPTIONS,
} from "@/features/properties/constants";
import {
  hasInvertedPriceRange,
  positiveInt,
} from "@/features/properties/filters";
import type {
  Listing,
  PropertyFilters,
  SearchResult,
} from "@/features/properties/types";

export type SnapshotListing = {
  summary: Listing;
  neighborhood: string | null;
};

function normalizeLocation(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function descendingDate(a: Listing, b: Listing) {
  return (b.listedAt ?? "").localeCompare(a.listedAt ?? "");
}

function compareNumber(a: number | null, b: number | null, descending = false) {
  if (a === null) return b === null ? 0 : 1;
  if (b === null) return -1;
  return descending ? b - a : a - b;
}

export function searchSnapshot(
  rows: SnapshotListing[],
  filters: PropertyFilters,
): SearchResult {
  const page = Math.min(positiveInt(filters.page) ?? 1, MAX_RESULTS_PAGE);
  if (hasInvertedPriceRange(filters)) {
    return { listings: [], total: 0, page, hasNextPage: false };
  }

  const location = normalizeLocation(filters.location?.slice(0, 120) ?? "");
  const words = location ? location.split(" ") : [];
  const type = PROPERTY_TYPE_OPTIONS.find(
    (option) => option.value === filters.type,
  )?.text;
  const beds = positiveInt(filters.beds);
  const baths = positiveInt(filters.baths);
  const min = positiveInt(filters.minPrice);
  const max = positiveInt(filters.maxPrice);
  const matches = rows
    .filter(({ summary, neighborhood }) => {
      if (type && summary.propertyType !== type) return false;
      if (beds !== undefined && (summary.beds === null || summary.beds < beds))
        return false;
      if (
        baths !== undefined &&
        (summary.baths === null || summary.baths < baths)
      )
        return false;
      if (
        min !== undefined &&
        (summary.priceMax ?? summary.price ?? -Infinity) < min
      )
        return false;
      if (max !== undefined && (summary.price ?? Infinity) > max) return false;

      const address = normalizeLocation(
        `${summary.address.full} ${neighborhood ?? ""}`,
      );
      return words.every((word) => address.includes(word));
    })
    .map(({ summary }) => summary);

  switch (filters.sort) {
    case "Newest":
      matches.sort(descendingDate);
      break;
    case "Price_Low_to_High":
      matches.sort((a, b) => compareNumber(a.price, b.price));
      break;
    case "Price_High_to_Low":
      matches.sort((a, b) => compareNumber(a.price, b.price, true));
      break;
    case "Square_Feet":
      matches.sort((a, b) => compareNumber(a.sqft, b.sqft, true));
      break;
  }

  return {
    listings: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: matches.length,
    page,
    hasNextPage: page < MAX_RESULTS_PAGE && page * PAGE_SIZE < matches.length,
  };
}
