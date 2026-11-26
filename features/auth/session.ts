import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { JwtPayload } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/features/auth/roles";

export { isAdmin };

/**
 * Returns the signed-in user's verified JWT claims, or null.
 *
 * Uses getClaims(), which verifies the JWT locally when the project uses
 * asymmetric signing keys (no round-trip to Supabase Auth), instead of
 * getUser(), which always makes a network request.
 * Deduplicated per request with React cache().
 */
export const getSession = cache(async (): Promise<JwtPayload | null> => {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data) return null;
  return data.claims;
});

export async function requireSession(): Promise<JwtPayload> {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}

export async function requireAdmin(): Promise<JwtPayload> {
  const session = await requireSession();
  if (!isAdmin(session)) redirect("/");
  return session;
}
