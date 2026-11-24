import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";

const valid = {
  name: "Ana",
  email: "ana@example.com",
  message: "I'd like to view the house on Main St.",
};

describe("contactSchema", () => {
  it("treats an empty phone as null", () => {
    expect(contactSchema.parse({ ...valid, phone: "" }).phone).toBeNull();
  });

  it("accepts common phone formats", () => {
    expect(
      contactSchema.safeParse({ ...valid, phone: "+1 (555) 010-2030" }).success,
    ).toBe(true);
  });

  it("rejects letters in the phone number", () => {
    expect(
      contactSchema.safeParse({ ...valid, phone: "call me" }).success,
    ).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(
      contactSchema.safeParse({ ...valid, website: "spam.biz" }).success,
    ).toBe(false);
  });

  it("requires a meaningful message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(
      false,
    );
  });
});
