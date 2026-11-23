import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";
import { isAdmin } from "@/features/auth/roles";

const AUTH_PAGES = ["/sign-in", "/sign-up", "/forgot-password"];

/**
 * Refreshes the Supabase session cookie and guards auth-only routes.
 * Pages and server actions still authorize on their own
 * (features/auth/session.ts): the proxy is a convenience, not a security
 * boundary.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Must run first: refreshes an expired session. getClaims() verifies the
  // JWT locally instead of calling Supabase Auth on every request.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;

  const { pathname } = request.nextUrl;
  const redirectTo = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = "";
    const redirect = NextResponse.redirect(url);
    // Carry over any refreshed session cookies.
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  };

  if (pathname.startsWith("/dashboard")) {
    if (!claims) return redirectTo("/sign-in");
    if (!isAdmin(claims)) return redirectTo("/");
  }

  if (pathname.startsWith("/reset-password") && !claims) {
    return redirectTo("/sign-in");
  }

  if (claims && AUTH_PAGES.includes(pathname)) {
    return redirectTo(isAdmin(claims) ? "/dashboard" : "/");
  }

  return response;
}
