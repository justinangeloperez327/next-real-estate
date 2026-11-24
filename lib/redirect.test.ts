import { describe, expect, it } from "vitest";
import { safeRedirectPath } from "./redirect";

describe("safeRedirectPath", () => {
  it.each(["/", "/reset-password", "/properties?beds=2"])(
    "allows same-origin path %s",
    (path) => expect(safeRedirectPath(path)).toBe(path),
  );

  it.each([
    "//evil.com",
    "/\\evil.com",
    "@evil.com",
    "https://evil.com",
    "evil.com",
    "",
    null,
    undefined,
  ])("rejects %s", (path) => {
    expect(safeRedirectPath(path, "/fallback")).toBe("/fallback");
  });
});
