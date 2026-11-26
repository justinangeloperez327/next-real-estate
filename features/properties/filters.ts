import {
  MAX_RESULTS_PAGE,
  PROPERTY_TYPE_OPTIONS,
  SORT_OPTIONS,
} from "@/features/properties/constants";
import type { PropertyFilters } from "@/features/properties/types";

const FILTER_KEYS = [
  "location",
  "category",
  "type",
  "beds",
  "baths",
  "minPrice",
  "maxPrice",
  "sort",
  "page",
] as const satisfies readonly (keyof PropertyFilters)[];

/** Picks known, non-empty string filters out of URL search params. */
export function parseFilters(
  params: Record<string, string | string[] | undefined>,
): PropertyFilters {
  const filters: PropertyFilters = {};
  for (const key of FILTER_KEYS) {
    const value = params[key];
    if (typeof value === "string" && value.trim()) filters[key] = value.trim();
  }
  return filters;
}

function positiveInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export const PRICE_RANGE_ERROR =
  "The maximum price must be at least the minimum price.";

export function hasInvertedPriceRange(
  filters: Pick<PropertyFilters, "minPrice" | "maxPrice">,
): boolean {
  const min = positiveInt(filters.minPrice);
  const max = positiveInt(filters.maxPrice);
  return min !== undefined && max !== undefined && min > max;
}

/**
 * Translates URL filters into RealtyAPI `/search/bylocation` parameters.
 * Unknown or invalid values are dropped rather than sent upstream.
 */
export function toSearchQuery(
  filters: PropertyFilters,
  defaults: { location: string; pageSize: number },
) {
  const min = positiveInt(filters.minPrice);
  const max = positiveInt(filters.maxPrice);
  const priceRange = hasInvertedPriceRange(filters)
    ? undefined
    : [min && `min:${min}`, max && `max:${max}`].filter(Boolean).join(",") ||
      undefined;
  const beds = positiveInt(filters.beds);
  const baths = positiveInt(filters.baths);
  const type = PROPERTY_TYPE_OPTIONS.find((o) => o.value === filters.type);
  const sort = SORT_OPTIONS.find((o) => o.value === filters.sort);

  return {
    location: filters.location?.slice(0, 120) || defaults.location,
    searchType: filters.category === "rent" ? "For_Rent" : "For_Sale",
    propertyType: type?.value,
    bedsRange: beds ? `min:${beds}` : undefined,
    bathsRange: baths ? `min:${baths}` : undefined,
    priceRange,
    sortOrder: sort?.value,
    page: Math.min(positiveInt(filters.page) ?? 1, MAX_RESULTS_PAGE),
    resultCount: defaults.pageSize,
    hasPhotos: true,
  };
}
