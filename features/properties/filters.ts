import type { PropertyFilters } from "@/features/properties/types";

const FILTER_KEYS = [
  "search",
  "property_type",
  "beds",
  "baths",
  "carpark",
  "minPrice",
  "maxPrice",
] as const satisfies readonly (keyof PropertyFilters)[];

/** Picks known, non-empty string filters out of URL search params. */
export function parseFilters(
  params: Record<string, string | string[] | undefined>,
): PropertyFilters {
  const filters: PropertyFilters = {};
  for (const key of FILTER_KEYS) {
    const value = params[key];
    if (typeof value === "string" && value) filters[key] = value;
  }
  return filters;
}
