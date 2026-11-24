import { describe, expect, it } from "vitest";
import { parseFilters, toSearchQuery } from "./filters";

const defaults = { location: "Austin, TX", pageSize: 24 };

describe("parseFilters", () => {
  it("keeps known non-empty string filters only", () => {
    expect(
      parseFilters({
        location: " Seattle, WA ",
        beds: "2",
        baths: "",
        maxPrice: ["1", "2"],
        carpark: "1",
      }),
    ).toEqual({ location: "Seattle, WA", beds: "2" });
  });
});

describe("toSearchQuery", () => {
  it("uses the default market and For_Sale when nothing is set", () => {
    expect(toSearchQuery({}, defaults)).toMatchObject({
      location: "Austin, TX",
      searchType: "For_Sale",
      page: 1,
      resultCount: 24,
      hasPhotos: true,
      priceRange: undefined,
      bedsRange: undefined,
    });
  });

  it("maps filters to RealtyAPI range syntax", () => {
    expect(
      toSearchQuery(
        {
          location: "78758",
          category: "rent",
          type: "Condo",
          beds: "3",
          baths: "2",
          minPrice: "1500",
          maxPrice: "4000",
          sort: "Newest",
          page: "2",
        },
        defaults,
      ),
    ).toMatchObject({
      location: "78758",
      searchType: "For_Rent",
      propertyType: "Condo",
      bedsRange: "min:3",
      bathsRange: "min:2",
      priceRange: "min:1500,max:4000",
      sortOrder: "Newest",
      page: 2,
    });
  });

  it("supports a one-sided price range", () => {
    expect(toSearchQuery({ maxPrice: "500000" }, defaults).priceRange).toBe(
      "max:500000",
    );
  });

  it("drops invalid or unknown values instead of sending them upstream", () => {
    const q = toSearchQuery(
      {
        type: "castle",
        sort: "drop table",
        beds: "-1",
        minPrice: "abc",
        page: "9999",
      },
      defaults,
    );
    expect(q.propertyType).toBeUndefined();
    expect(q.sortOrder).toBeUndefined();
    expect(q.bedsRange).toBeUndefined();
    expect(q.priceRange).toBeUndefined();
    expect(q.page).toBe(50);
  });
});
