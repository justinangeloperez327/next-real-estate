import "server-only";
import { createClient } from "@/lib/supabase/server";
import { propertyIdSchema } from "@/lib/properties/schema";
import type { Property, PropertyFilters } from "@/lib/types";

function toInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Escape characters that have meaning inside a PostgREST ilike pattern. */
function escapeLike(value: string): string {
  return value.replace(/[\\%_,()]/g, (c) => `\\${c}`);
}

export async function getProperties(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select("*")
    .order("id", { ascending: true });

  const search = filters.search?.trim();
  if (search) query = query.ilike("address", `%${escapeLike(search)}%`);
  if (filters.property_type) {
    query = query.eq("property_type", filters.property_type.toLowerCase());
  }

  const beds = toInt(filters.beds);
  const baths = toInt(filters.baths);
  const carpark = toInt(filters.carpark);
  const minPrice = toInt(filters.minPrice);
  const maxPrice = toInt(filters.maxPrice);
  if (beds) query = query.gte("beds", beds);
  if (baths) query = query.gte("baths", baths);
  if (carpark) query = query.gte("carpark", carpark);
  if (minPrice) query = query.gte("price", minPrice);
  if (maxPrice) query = query.lte("price", maxPrice);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load properties: ${error.message}`);
  return (data ?? []) as Property[];
}

export async function getLatestProperties(limit = 5): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("id", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`Failed to load properties: ${error.message}`);
  return (data ?? []) as Property[];
}

/** Returns the property, or `null` if the id is invalid or not found. */
export async function getProperty(id: unknown): Promise<Property | null> {
  const parsed = propertyIdSchema.safeParse(id);
  if (!parsed.success) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", parsed.data)
    .maybeSingle();
  if (error) throw new Error(`Failed to load property: ${error.message}`);
  return data as Property | null;
}
