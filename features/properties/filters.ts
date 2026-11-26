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

export function positiveInt(value: string | undefined): number | undefined {
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
