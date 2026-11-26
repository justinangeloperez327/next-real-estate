import { describe, expect, it } from "vitest";
import { hasInvertedPriceRange, parseFilters } from "./filters";
import { normalizeSearchResult } from "./normalize";
import { searchSnapshot } from "./snapshot";

const listing = (overrides: Parameters<typeof normalizeSearchResult>[0]) => ({
  summary: normalizeSearchResult({
    property_type: "single_family",
    address: {
      line: "1200 Oak Lane",
      city: "Austin",
      state_code: "TX",
      postal_code: "78758",
    },
    ...overrides,
  }),
  neighborhood: "North Austin",
});
const rows = [
  listing({
    property_id: "1001",
    list_price: 600000,
    beds: 3,
    baths: 2,
    sqft: 1400,
    list_date: "2026-11-01",
  }),
  listing({
    property_id: "1002",
    list_price: 300000,
    property_type: "condo",
    beds: 2,
    baths: 1,
    sqft: 900,
    list_date: "2026-11-02",
  }),
  listing({
    property_id: "1003",
    list_price: 550000,
    list_price_max: 750000,
    beds: 4,
    baths: 3,
    sqft: 2100,
  }),
  listing({ property_id: "1004" }),
];

describe("parseFilters", () => {
  it("keeps known non-empty string filters only", () => {
    expect(
      parseFilters({
        location: " Austin, TX ",
        beds: "2",
        baths: "",
        maxPrice: ["1", "2"],
        carpark: "1",
      }),
    ).toEqual({ location: "Austin, TX", beds: "2" });
  });
});

describe("searchSnapshot", () => {
  it.each(["Austin, TX", "78758", "North Austin", "Oak Lane"])(
    "matches stored addresses and neighborhoods for %s",
    (location) => expect(searchSnapshot(rows, { location }).total).toBe(4),
  );

  it("matches property type, room counts, and overlapping price ranges", () => {
    const result = searchSnapshot(rows, {
      type: "House",
      beds: "3",
      baths: "2",
      minPrice: "700000",
      maxPrice: "760000",
    });
    expect(result.listings.map(({ id }) => id)).toEqual(["1003"]);
  });

  it("keeps recommended order and supports date, price and size ordering", () => {
    const ids = (sort: string) =>
      searchSnapshot(rows, { sort }).listings.map(({ id }) => id);
    expect(ids("Recommended")).toEqual(["1001", "1002", "1003", "1004"]);
    expect(ids("Newest")).toEqual(["1002", "1001", "1003", "1004"]);
    expect(ids("Price_Low_to_High")).toEqual(["1002", "1003", "1001", "1004"]);
    expect(ids("Price_High_to_Low")).toEqual(["1001", "1003", "1002", "1004"]);
    expect(ids("Square_Feet")).toEqual(["1003", "1001", "1002", "1004"]);
  });

  it("returns the stored count, paginates, and keeps the page cap", () => {
    const inventory = Array.from({ length: 25 }, (_, index) =>
      listing({ property_id: String(2000 + index) }),
    );
    expect(searchSnapshot(inventory, {})).toMatchObject({
      total: 25,
      page: 1,
      hasNextPage: true,
    });
    expect(searchSnapshot(inventory, { page: "2" })).toMatchObject({
      listings: [{ id: "2024" }],
      total: 25,
      page: 2,
      hasNextPage: false,
    });
    expect(searchSnapshot(inventory, { page: "9999" }).page).toBe(50);
  });

  it("rejects inverted ranges and accepts equal bounds", () => {
    const inverted = { minPrice: "750000", maxPrice: "300000" };
    expect(hasInvertedPriceRange(inverted)).toBe(true);
    expect(searchSnapshot(rows, inverted).total).toBe(0);
    const equal = { minPrice: "300000", maxPrice: "300000" };
    expect(hasInvertedPriceRange(equal)).toBe(false);
    expect(searchSnapshot(rows, equal).listings.map(({ id }) => id)).toEqual([
      "1002",
    ]);
  });
});
