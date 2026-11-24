/** Default market shown when no location is searched. */
export const DEFAULT_LOCATION =
  process.env.NEXT_PUBLIC_DEFAULT_LOCATION || "Austin, TX";

export const PAGE_SIZE = 24;

export const CATEGORY_OPTIONS = [
  { text: "Buy", value: "sale" },
  { text: "Rent", value: "rent" },
];

/** Realtor.com property types accepted by RealtyAPI. */
export const PROPERTY_TYPE_OPTIONS = [
  { text: "House", value: "House" },
  { text: "Condo", value: "Condo" },
  { text: "Townhome", value: "Townhome" },
  { text: "Multi-family", value: "Multi_Family" },
  { text: "Land", value: "Land" },
];

export const ROOM_OPTIONS = [
  { text: "Any", value: "0" },
  { text: "1+", value: "1" },
  { text: "2+", value: "2" },
  { text: "3+", value: "3" },
  { text: "4+", value: "4" },
  { text: "5+", value: "5" },
];

export const PRICE_OPTIONS = [
  { text: "Any", value: "0" },
  ...[
    100_000, 200_000, 300_000, 400_000, 500_000, 750_000, 1_000_000, 1_500_000,
    2_000_000, 3_000_000,
  ].map((v) => ({ text: `$${v.toLocaleString("en-US")}`, value: String(v) })),
];

export const RENT_PRICE_OPTIONS = [
  { text: "Any", value: "0" },
  ...[1_000, 1_500, 2_000, 2_500, 3_000, 4_000, 5_000, 7_500, 10_000].map(
    (v) => ({ text: `$${v.toLocaleString("en-US")}/mo`, value: String(v) }),
  ),
];

export const SORT_OPTIONS = [
  { text: "Recommended", value: "Recommended" },
  { text: "Newest", value: "Newest" },
  { text: "Price: low to high", value: "Price_Low_to_High" },
  { text: "Price: high to low", value: "Price_High_to_Low" },
  { text: "Largest", value: "Square_Feet" },
];
