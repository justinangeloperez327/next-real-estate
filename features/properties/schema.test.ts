import { describe, expect, it } from "vitest";
import { propertyIdSchema, propertyInputSchema } from "./schema";

const valid = {
  title: " Sunny house ",
  description: "Lovely",
  address: "1 Main St",
  price: "450000",
  beds: "3",
  baths: "2",
  carpark: "1",
  property_type: "house",
  category: "sale",
  latitude: "24.49",
  longitude: "54.37",
};

describe("propertyInputSchema", () => {
  it("coerces numbers, trims text and defaults pool to false", () => {
    expect(propertyInputSchema.parse(valid)).toEqual({
      ...valid,
      title: "Sunny house",
      price: 450000,
      beds: 3,
      baths: 2,
      carpark: 1,
      latitude: 24.49,
      longitude: 54.37,
      pool: false,
    });
  });

  it('reads a checked checkbox ("on") as pool: true', () => {
    expect(propertyInputSchema.parse({ ...valid, pool: "on" }).pool).toBe(true);
  });

  it.each([
    ["price", "abc"],
    ["price", "-1"],
    ["beds", "1.5"],
    ["latitude", "91"],
    ["longitude", "-181"],
    ["property_type", "castle"],
    ["category", "lease"],
    ["title", "   "],
    ["price", ""],
    ["beds", "  "],
  ])("rejects %s = %j", (field, value) => {
    const result = propertyInputSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
  });
});

describe("propertyIdSchema", () => {
  it("accepts positive integer ids from route params", () => {
    expect(propertyIdSchema.parse("42")).toBe(42);
  });

  it.each(["abc", "0", "-3", "1.5"])("rejects %j", (id) => {
    expect(propertyIdSchema.safeParse(id).success).toBe(false);
  });
});
