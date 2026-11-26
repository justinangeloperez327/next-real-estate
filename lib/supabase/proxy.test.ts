import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

let claims: Record<string, unknown> | null = null;

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({
    auth: { getClaims: async () => ({ data: claims ? { claims } : null }) },
  }),
}));

const { updateSession } = await import("./proxy");

const visit = async (path: string) => {
  const res = await updateSession(new NextRequest(`https://site.test${path}`));
  const location = res.headers.get("location");
  return location ? new URL(location).pathname : null;
};

const user = { sub: "u1", app_metadata: {} };
const admin = { sub: "a1", app_metadata: { role: "admin" } };

describe("updateSession route guards", () => {
  beforeEach(() => {
    claims = null;
  });

  it("keeps the admin dashboard protected when auth is unconfigured", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    claims = admin;
    try {
      expect(await visit("/dashboard")).toBe("/sign-in");
      expect(await visit("/sign-in")).toBeNull();
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("sends visitors from /dashboard to /sign-in", async () => {
    expect(await visit("/dashboard/properties")).toBe("/sign-in");
  });

  it("sends signed-in non-admins from /dashboard home", async () => {
    claims = user;
    expect(await visit("/dashboard")).toBe("/");
  });

  it("lets admins into /dashboard", async () => {
    claims = admin;
    expect(await visit("/dashboard")).toBeNull();
  });

  it("requires a session for /reset-password", async () => {
    expect(await visit("/reset-password")).toBe("/sign-in");
    claims = user;
    expect(await visit("/reset-password")).toBeNull();
  });

  it("redirects signed-in users away from auth pages", async () => {
    claims = user;
    expect(await visit("/sign-in")).toBe("/");
    claims = admin;
    expect(await visit("/sign-up")).toBe("/dashboard");
  });

  it("lets visitors see auth pages", async () => {
    expect(await visit("/sign-in")).toBeNull();
  });
});
