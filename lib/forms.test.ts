import { describe, expect, it } from "vitest";
import { z } from "zod";
import { readFormData, validateForm } from "./forms";

const form = (entries: Record<string, string>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.append(k, v);
  return fd;
};

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

describe("readFormData", () => {
  it("skips React's internal $ACTION fields", () => {
    expect(readFormData(form({ a: "1", $ACTION_ID_x: "y" }))).toEqual({
      a: "1",
    });
  });
});

describe("validateForm", () => {
  it("returns parsed data on success", () => {
    const result = validateForm(
      schema,
      form({ email: "a@b.co", password: "12345678" }),
    );
    expect(result).toMatchObject({
      ok: true,
      data: { email: "a@b.co", password: "12345678" },
    });
  });

  it("returns field errors and never echoes sensitive fields", () => {
    const result = validateForm(
      schema,
      form({ email: "nope", password: "short" }),
      { sensitive: ["password"] },
    );
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.state.status).toBe("error");
    expect(result.state.fieldErrors?.email?.length).toBeGreaterThan(0);
    expect(result.state.fieldErrors?.password?.length).toBeGreaterThan(0);
    expect(result.state.values).toEqual({ email: "nope" });
  });
});
