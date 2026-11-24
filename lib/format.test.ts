import { describe, expect, it } from "vitest";
import { formatDateTime, formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats whole dollars", () => {
    expect(formatPrice(1250000)).toBe("$1,250,000");
  });
});

describe("formatDateTime", () => {
  it("formats in UTC so server and client agree", () => {
    expect(formatDateTime("2026-01-02T03:04:00Z")).toBe(
      "Jan 2, 2026, 3:04 AM UTC",
    );
  });
});
