import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Cookie-free Supabase client for public, cacheable reads.
 * Because it never touches cookies() it can be used inside "use cache"
 * functions. Row-level security still applies (anon role).
 */
export function createPublicClient() {
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
