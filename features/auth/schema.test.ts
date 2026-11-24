import { describe, expect, it } from "vitest";
import { resetPasswordSchema, signInSchema, signUpSchema } from "./schema";

describe("auth schemas", () => {
  it("normalises email before validating", () => {
    expect(
      signInSchema.parse({ email: "  Me@Example.COM ", password: "x" }).email,
    ).toBe("me@example.com");
  });

  it("requires 8+ character passwords on sign up", () => {
    expect(
      signUpSchema.safeParse({ email: "a@b.co", password: "short" }).success,
    ).toBe(false);
  });

  it("reports mismatched passwords on confirmPassword", () => {
    const result = resetPasswordSchema.safeParse({
      password: "long-enough",
      confirmPassword: "different!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["confirmPassword"]);
  });
});
