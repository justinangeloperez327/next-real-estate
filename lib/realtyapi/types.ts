/** Raw RealtyAPI (Realtor.com) response shapes: only the fields we use. */

export type RawAddress = {
  line?: string | null;
  unit?: string | null;
  city?: string | null;
  state_code?: string | null;
  postal_code?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type RawPhone = { number?: string | null; primary?: boolean | null };

export type RawAdvertiser = {
  name?: string | null;
  type?: string | null;
  email?: string | null;
  photo?: string | null;
  phones?: RawPhone[] | null;
  office?: string | { name?: string | null } | null;
};

export type RawSearchResult = {
  property_id: string;
  status?: string | null;
  href?: string | null;
  list_price?: number | null;
  list_price_min?: number | null;
  list_price_max?: number | null;
  list_date?: string | null;
  beds?: number | null;
  beds_min?: number | null;
  baths?: string | number | null;
  baths_min?: string | number | null;
  sqft?: number | null;
  lot_sqft?: number | null;
  year_built?: number | null;
  property_type?: string | null;
  description_text?: string | null;
  address?: RawAddress | null;
  primary_photo?: string | null;
  photos?: string[] | null;
  flags?: { is_pending?: boolean | null } | null;
  advertisers?: RawAdvertiser[] | null;
};

export type RawSearchResponse = {
  total?: number;
  nextPage?: boolean;
  searchResults?: RawSearchResult[];
};

export type RawDetail = {
  property_id: string;
  status?: string | null;
  href?: string | null;
  list_date?: string | null;
  list_price?: number | null;
  list_price_min?: number | null;
  list_price_max?: number | null;
  price_per_sqft?: number | null;
  hoa_fee?: number | null;
  details?: {
    beds?: number | null;
    baths?: string | number | null;
    sqft?: number | null;
    lot_sqft?: number | null;
    stories?: number | null;
    year_built?: number | null;
    garage?: number | null;
    type?: string | null;
    text?: string | null;
  } | null;
  flags?: { is_pending?: boolean | null } | null;
  address?: RawAddress | null;
  neighborhoods?: string[] | null;
  photos?: { href?: string | null }[] | null;
  advertisers?: RawAdvertiser[] | null;
  mls?: { name?: string | null; days_on_mls?: number | null } | null;
  schools?:
    | {
        name?: string | null;
        rating?: number | null;
        grades?: string[] | null;
        distance_in_miles?: number | null;
        funding_type?: string | null;
      }[]
    | null;
  property_history?:
    | {
        date?: string | null;
        event_name?: string | null;
        price?: number | null;
      }[]
    | null;
  details_sections?:
    { category?: string | null; text?: string[] | null }[] | null;
};

export type RawDetailResponse = { detail?: RawDetail | null };
