import type {
  RawAdvertiser,
  RawDetail,
  RawSearchResult,
} from "@/lib/realtyapi/types";
import type {
  Agent,
  Listing,
  ListingCategory,
  ListingDetail,
} from "@/features/properties/types";

const TYPE_LABELS: Record<string, string> = {
  single_family: "House",
  condo: "Condo",
  condos: "Condo",
  condo_townhome: "Townhome",
  condo_townhome_rowhome_coop: "Townhome",
  townhomes: "Townhome",
  townhouse: "Townhome",
  multi_family: "Multi-family",
  mobile: "Mobile home",
  farm: "Farm",
  land: "Land",
  coop: "Co-op",
  apartment: "Apartment",
};

export function propertyTypeLabel(raw: string | null | undefined): string {
  if (!raw) return "Home";
  return (
    TYPE_LABELS[raw] ??
    raw.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())
  );
}

export function categoryFromStatus(
  status: string | null | undefined,
): ListingCategory {
  if (status === "for_rent") return "rent";
  if (status === "sold") return "sold";
  return "sale"; // for_sale, ready_to_build, pending, ...
}

/** rdcpix sometimes returns http:// URLs; always load images over https. */
export function secureUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.replace(/^http:\/\//, "https://");
}

/**
 * Listing photo URL at a usable size. Search results often point at the
 * 120x80 thumbnail (`…123s.jpg`); the `od` variant of the same photo is
 * ~1024px wide, and Next's image optimizer resizes it per device.
 */
export function photoUrl(url: string | null | undefined): string | null {
  const secure = secureUrl(url);
  if (!secure || !/\.rdcpix\.com\//.test(secure)) return secure;
  return secure.replace(/(\d)s\.jpg$/, "$1od.jpg");
}

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeAddress(raw: RawSearchResult["address"]) {
  const line = [raw?.line, raw?.unit].filter(Boolean).join(" ").trim();
  const city = raw?.city ?? "";
  const state = raw?.state_code ?? "";
  const postalCode = raw?.postal_code ?? "";
  const cityLine = [city, [state, postalCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  return {
    line: line || cityLine || "Address not provided",
    city,
    state,
    postalCode,
    full: [line, cityLine].filter(Boolean).join(", "),
  };
}

function normalizeAgent(raw: RawAdvertiser[] | null | undefined): Agent | null {
  const a = raw?.find((x) => x?.name) ?? null;
  if (!a?.name) return null;
  const office =
    typeof a.office === "string" ? a.office : (a.office?.name ?? null);
  const phone =
    a.phones?.find((p) => p?.primary)?.number ?? a.phones?.[0]?.number ?? null;
  return {
    name: a.name,
    office: office || null,
    email: a.email || null,
    phone: phone || null,
    photo: secureUrl(a.photo),
  };
}

function uniquePhotos(urls: (string | null | undefined)[]): string[] {
  return [...new Set(urls.map(photoUrl).filter((u): u is string => !!u))];
}

export function normalizeSearchResult(raw: RawSearchResult): Listing {
  const price = raw.list_price ?? raw.list_price_min ?? null;
  return {
    id: raw.property_id,
    category: categoryFromStatus(raw.status),
    price,
    priceMax:
      raw.list_price_max && raw.list_price_max !== price
        ? raw.list_price_max
        : null,
    beds: raw.beds ?? raw.beds_min ?? null,
    baths: toNumber(raw.baths ?? raw.baths_min),
    sqft: raw.sqft ?? null,
    lotSqft: raw.lot_sqft ?? null,
    yearBuilt: raw.year_built ?? null,
    propertyType: propertyTypeLabel(raw.property_type),
    address: normalizeAddress(raw.address),
    latitude: raw.address?.latitude ?? null,
    longitude: raw.address?.longitude ?? null,
    photos: uniquePhotos([raw.primary_photo, ...(raw.photos ?? [])]),
    description: raw.description_text?.trim() || null,
    listedAt: raw.list_date ?? null,
    isPending: !!raw.flags?.is_pending,
    agent: normalizeAgent(raw.advertisers),
    sourceUrl: raw.href ?? null,
  };
}

export function normalizeDetail(raw: RawDetail): ListingDetail {
  const d = raw.details ?? {};
  const base = normalizeSearchResult({
    property_id: raw.property_id,
    status: raw.status,
    href: raw.href,
    list_price: raw.list_price,
    list_price_min: raw.list_price_min,
    list_price_max: raw.list_price_max,
    list_date: raw.list_date,
    beds: d.beds,
    baths: d.baths,
    sqft: d.sqft,
    lot_sqft: d.lot_sqft,
    year_built: d.year_built,
    property_type: d.type,
    description_text: d.text,
    address: raw.address,
    photos: (raw.photos ?? [])
      .map((p) => p?.href ?? null)
      .filter(Boolean) as string[],
    flags: raw.flags,
    advertisers: raw.advertisers,
  });

  return {
    ...base,
    pricePerSqft: raw.price_per_sqft ?? null,
    hoaFee: raw.hoa_fee ?? null,
    garage: d.garage ?? null,
    stories: d.stories ?? null,
    neighborhood: raw.neighborhoods?.[0] ?? null,
    daysOnMarket: raw.mls?.days_on_mls ?? null,
    features: (raw.details_sections ?? [])
      .filter((s) => s?.category && s.text?.length)
      .map((s) => ({ category: s.category!, items: s.text! })),
    schools: (raw.schools ?? [])
      .filter((s) => s?.name)
      .map((s) => ({
        name: s.name!,
        rating: s.rating ?? null,
        grades: formatGrades(s.grades),
        distanceMiles: s.distance_in_miles ?? null,
        type: s.funding_type ?? null,
      })),
    history: (raw.property_history ?? [])
      .filter((h) => h?.date && h.event_name)
      .map((h) => ({
        date: h.date!,
        event: h.event_name!,
        price: h.price ?? null,
      })),
  };
}

function formatGrades(grades: string[] | null | undefined): string {
  if (!grades?.length) return "";
  const first = grades[0];
  const last = grades[grades.length - 1];
  return first === last ? `Grade ${first}` : `Grades ${first}–${last}`;
}
