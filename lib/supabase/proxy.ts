import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";
import { isAdmin } from "@/lib/auth-shared";

const AUTH_PAGES = ["/sign-in", "/sign-up", "/forgot-password"];

/**
 * Refreshes the Supabase session cookie and performs coarse route guarding.
 * Pages and server actions still authorize on their own (see lib/auth.ts):
 * the proxy is a convenience, not a security boundary.
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

  // Do not run code between createServerClient and getUser():
  // getUser() refreshes the session and must happen first.
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    if (!user) return redirectTo("/sign-in");
    if (!isAdmin(user)) return redirectTo("/");
  }

  if (pathname.startsWith("/reset-password") && !user) {
    return redirectTo("/sign-in");
  }

  if (user && AUTH_PAGES.includes(pathname)) {
    return redirectTo(isAdmin(user) ? "/dashboard" : "/");
  }

  return response;
}
