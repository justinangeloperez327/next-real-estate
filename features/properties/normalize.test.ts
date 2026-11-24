import { describe, expect, it } from "vitest";
import type { RawDetail, RawSearchResult } from "@/lib/realtyapi/types";
import {
  categoryFromStatus,
  normalizeDetail,
  normalizeSearchResult,
  photoUrl,
  propertyTypeLabel,
  secureUrl,
} from "./normalize";

// Fictional data in the shape RealtyAPI returns.
const searchResult: RawSearchResult = {
  property_id: "1234567890",
  status: "for_sale",
  href: "https://www.realtor.com/realestateandhomes-detail/example_M12345-67890",
  list_price: 450000,
  list_date: "2026-11-05T19:21:45.000000Z",
  beds: 3,
  baths: "2.5",
  sqft: 1800,
  lot_sqft: 6000,
  year_built: 2005,
  property_type: "single_family",
  description_text: "  Bright corner home.  ",
  address: {
    line: "100 Example St",
    unit: "Unit 2",
    city: "Austin",
    state_code: "TX",
    postal_code: "78701",
    latitude: 30.27,
    longitude: -97.74,
  },
  primary_photo: "http://ap.rdcpix.com/a.jpg",
  photos: ["http://ap.rdcpix.com/a.jpg", "https://ap.rdcpix.com/b.jpg"],
  flags: { is_pending: true },
  advertisers: [
    { name: "Alex Agent", type: "seller", office: "Example Realty" },
  ],
};

describe("normalizeSearchResult", () => {
  const listing = normalizeSearchResult(searchResult);

  it("maps core fields", () => {
    expect(listing).toMatchObject({
      id: "1234567890",
      category: "sale",
      price: 450000,
      priceMax: null,
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      propertyType: "House",
      description: "Bright corner home.",
      isPending: true,
      latitude: 30.27,
      longitude: -97.74,
    });
  });

  it("builds readable address lines", () => {
    expect(listing.address).toEqual({
      line: "100 Example St Unit 2",
      city: "Austin",
      state: "TX",
      postalCode: "78701",
      full: "100 Example St Unit 2, Austin, TX 78701",
    });
  });

  it("upgrades photos to https and removes duplicates", () => {
    expect(listing.photos).toEqual([
      "https://ap.rdcpix.com/a.jpg",
      "https://ap.rdcpix.com/b.jpg",
    ]);
  });

  it("reads the agent and office", () => {
    expect(listing.agent).toEqual({
      name: "Alex Agent",
      office: "Example Realty",
      email: null,
      phone: null,
      photo: null,
    });
  });

  it("handles rental price ranges and missing data", () => {
    const rental = normalizeSearchResult({
      property_id: "42",
      status: "for_rent",
      list_price: null,
      list_price_min: 1800,
      list_price_max: 2400,
      baths: null,
      address: null,
      photos: null,
    });
    expect(rental).toMatchObject({
      category: "rent",
      price: 1800,
      priceMax: 2400,
      baths: null,
      photos: [],
      agent: null,
      latitude: null,
    });
    expect(rental.address.line).toBe("Address not provided");
  });
});

describe("normalizeDetail", () => {
  const raw: RawDetail = {
    property_id: "1234567890",
    status: "for_sale",
    list_price: 450000,
    price_per_sqft: 250,
    hoa_fee: 28,
    details: { beds: 3, baths: "2", sqft: 1800, garage: 2, type: "condo" },
    address: searchResult.address,
    neighborhoods: ["Downtown"],
    photos: [{ href: "http://ap.rdcpix.com/a.jpg" }, { href: null }],
    advertisers: [
      {
        name: "Alex Agent",
        email: "alex@example.com",
        phones: [
          { number: "5550100000", primary: false },
          { number: "5550199999", primary: true },
        ],
        office: { name: "Example Realty" },
      },
    ],
    mls: { days_on_mls: 16 },
    schools: [
      {
        name: "Example Elementary",
        rating: 8,
        grades: ["K", "1", "2", "3", "4", "5"],
        distance_in_miles: 0.4,
        funding_type: "public",
      },
    ],
    property_history: [
      { date: "2026-11-05", event_name: "Listed", price: 450000 },
      { date: null, event_name: "Ignored", price: 1 },
    ],
    details_sections: [
      { category: "Bedrooms", text: ["Bedrooms: 3"] },
      { category: "Empty", text: [] },
    ],
  };
  const detail = normalizeDetail(raw);

  it("maps detail-only fields", () => {
    expect(detail).toMatchObject({
      propertyType: "Condo",
      pricePerSqft: 250,
      hoaFee: 28,
      garage: 2,
      neighborhood: "Downtown",
      daysOnMarket: 16,
      photos: ["https://ap.rdcpix.com/a.jpg"],
      features: [{ category: "Bedrooms", items: ["Bedrooms: 3"] }],
      history: [{ date: "2026-11-05", event: "Listed", price: 450000 }],
    });
  });

  it("prefers the agent's primary phone and reads the office object", () => {
    expect(detail.agent).toMatchObject({
      phone: "5550199999",
      email: "alex@example.com",
      office: "Example Realty",
    });
  });

  it("summarises school grades", () => {
    expect(detail.schools[0]).toMatchObject({
      grades: "Grades K–5",
      rating: 8,
      type: "public",
    });
  });
});

describe("helpers", () => {
  it.each([
    ["single_family", "House"],
    ["condos", "Condo"],
    ["mobile", "Mobile home"],
    ["some_new_type", "Some new type"],
    [null, "Home"],
  ])("labels %s as %s", (raw, label) => {
    expect(propertyTypeLabel(raw)).toBe(label);
  });

  it.each([
    ["for_rent", "rent"],
    ["sold", "sold"],
    ["ready_to_build", "sale"],
    [null, "sale"],
  ] as const)("maps status %s to %s", (status, category) => {
    expect(categoryFromStatus(status)).toBe(category);
  });

  it("upgrades rdcpix thumbnails to the full-size variant", () => {
    expect(photoUrl("http://nh.rdcpix.com/abc-f94336300s.jpg")).toBe(
      "https://nh.rdcpix.com/abc-f94336300od.jpg",
    );
    expect(photoUrl("https://ap.rdcpix.com/xyzl-m425605232od.jpg")).toBe(
      "https://ap.rdcpix.com/xyzl-m425605232od.jpg",
    );
    expect(photoUrl("https://example.com/photos.jpg")).toBe(
      "https://example.com/photos.jpg",
    );
  });

  it("only upgrades http URLs", () => {
    expect(secureUrl("http://x.rdcpix.com/a.jpg")).toBe(
      "https://x.rdcpix.com/a.jpg",
    );
    expect(secureUrl("https://x.rdcpix.com/a.jpg")).toBe(
      "https://x.rdcpix.com/a.jpg",
    );
    expect(secureUrl(null)).toBeNull();
  });
});
