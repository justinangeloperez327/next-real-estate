import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeRedirectPath } from "@/lib/redirect";

// Exchanges the auth code from email links (sign-up confirmation,
// password reset) for a session cookie.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirectTo = safeRedirectPath(searchParams.get("redirect_to"), "/");

  if (!code) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent("Missing auth code")}`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent("This link is invalid or has expired")}`,
    );
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}
