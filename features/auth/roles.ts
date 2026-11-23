import type { UserAppMetadata } from "@supabase/supabase-js";

type WithAppMetadata = { app_metadata?: UserAppMetadata } | null | undefined;

/**
 * Admins are users whose `app_metadata.role` is "admin".
 * `app_metadata` can only be changed with the service-role key (Supabase
 * dashboard or SQL), never by the user, so it is safe to authorize on.
 * Works with both a Supabase `User` and verified JWT claims.
 */
export function isAdmin(subject: WithAppMetadata): boolean {
  return subject?.app_metadata?.role === "admin";
}
