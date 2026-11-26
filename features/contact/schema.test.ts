import { describe, expect, it } from "vitest";
import {
  contactSchema,
  listingMessagePrefix,
  MAX_CONTACT_MESSAGE_LENGTH,
} from "./schema";

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

  it("reserves space for a listing reference in the stored message", () => {
    const listingId = "12345678901234567890";
    const max =
      MAX_CONTACT_MESSAGE_LENGTH - listingMessagePrefix(listingId).length;
    expect(
      contactSchema.safeParse({ ...valid, listingId, message: "x".repeat(max) })
        .success,
    ).toBe(true);
    expect(
      contactSchema.safeParse({
        ...valid,
        listingId,
        message: "x".repeat(max + 1),
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        ...valid,
        message: "x".repeat(MAX_CONTACT_MESSAGE_LENGTH),
      }).success,
    ).toBe(true);
  });

  it("requires a valid listing identifier when one is submitted", () => {
    expect(
      contactSchema.safeParse({ ...valid, listingId: "home-1234" }).success,
    ).toBe(false);
  });

  it("requires a meaningful message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(
      false,
    );
  });
});
