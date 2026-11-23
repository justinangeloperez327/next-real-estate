import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

// Only run on routes that need a fresh session or a redirect. Public pages
// (home, listings, about, contact) skip the proxy entirely so they can be
// served straight from the cache.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reset-password",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
  ],
};
