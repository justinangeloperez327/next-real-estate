import { describe, expect, it } from "vitest";
import { isAdmin } from "./roles";

describe("isAdmin", () => {
  it("is true only for app_metadata.role === 'admin'", () => {
    expect(isAdmin({ app_metadata: { role: "admin" } })).toBe(true);
    expect(isAdmin({ app_metadata: { role: "user" } })).toBe(false);
    expect(isAdmin({ app_metadata: {} })).toBe(false);
    expect(isAdmin(null)).toBe(false);
  });
});
