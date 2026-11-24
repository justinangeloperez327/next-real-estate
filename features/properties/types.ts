/** A listing as the app uses it, normalised from RealtyAPI (Realtor.com). */

export type ListingCategory = "sale" | "rent" | "sold";

export type Agent = {
  name: string;
  office: string | null;
  email: string | null;
  phone: string | null;
  photo: string | null;
};

export type Listing = {
  id: string;
  category: ListingCategory;
  /** Price in USD; monthly for rentals. `priceMax` is set for ranges. */
  price: number | null;
  priceMax: number | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lotSqft: number | null;
  yearBuilt: number | null;
  /** Human label, e.g. "House", "Condo". */
  propertyType: string;
  address: {
    line: string;
    city: string;
    state: string;
    postalCode: string;
    full: string;
  };
  latitude: number | null;
  longitude: number | null;
  photos: string[];
  description: string | null;
  listedAt: string | null;
  isPending: boolean;
  agent: Agent | null;
  /** The listing on Realtor.com (source attribution). */
  sourceUrl: string | null;
};

export type ListingDetail = Listing & {
  pricePerSqft: number | null;
  hoaFee: number | null;
  garage: number | null;
  stories: number | null;
  neighborhood: string | null;
  daysOnMarket: number | null;
  features: { category: string; items: string[] }[];
  schools: {
    name: string;
    rating: number | null;
    grades: string;
    distanceMiles: number | null;
    type: string | null;
  }[];
  history: { date: string; event: string; price: number | null }[];
};

export type SearchResult = {
  listings: Listing[];
  total: number;
  page: number;
  hasNextPage: boolean;
};

/** Search filters as they appear in the URL (all optional strings). */
export type PropertyFilters = {
  location?: string;
  category?: string;
  type?: string;
  beds?: string;
  baths?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};
