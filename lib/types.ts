export const PROPERTY_TYPES = ["house", "apartment"] as const;
export const PROPERTY_CATEGORIES = ["sale", "rent"] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

/** A row of the `properties` table. */
export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  carpark: number;
  pool: boolean;
  property_type: PropertyType;
  category: PropertyCategory;
  latitude: number;
  longitude: number;
}

export type PropertyFilters = {
  search?: string;
  property_type?: string;
  beds?: string;
  baths?: string;
  carpark?: string;
  minPrice?: string;
  maxPrice?: string;
};
