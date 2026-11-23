import type { User } from "@supabase/supabase-js";

/**
 * Admins are users whose `app_metadata.role` is "admin".
 * `app_metadata` can only be changed with the service-role key (Supabase
 * dashboard or SQL), never by the user, so it is safe to authorize on.
 */
export function isAdmin(user: User | null | undefined): boolean {
  return user?.app_metadata?.role === "admin";
}
