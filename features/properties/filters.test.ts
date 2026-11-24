import { describe, expect, it } from "vitest";
import { parseFilters } from "./filters";

describe("parseFilters", () => {
  it("keeps known non-empty string filters only", () => {
    expect(
      parseFilters({
        search: "marina",
        beds: "2",
        baths: "",
        maxPrice: ["1", "2"],
        unknown: "x",
      }),
    ).toEqual({ search: "marina", beds: "2" });
  });
});
