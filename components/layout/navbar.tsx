import { Suspense } from "react";
import Link from "next/link";
import { HouseIcon } from "lucide-react";
import { getAuthConfig } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/features/auth/actions";
import { getSession, isAdmin } from "@/features/auth/session";
import { MobileNav } from "./mobile-nav";
import { SiteNavLinks } from "./site-nav-links";

export default function Navbar() {
  const auth = getAuthConfig() ? (
    <Suspense fallback={<GuestLinks />}>
      <AuthLinks />
    </Suspense>
  ) : null;

  return (
    <header className="public-nav sticky top-0 z-50 border-b border-brass/45 bg-background text-foreground">
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-md"
          aria-label="Justin Real Estate, home"
        >
          <span className="grid size-9 place-items-center border border-brass text-brass">
            <HouseIcon aria-hidden className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold tracking-tight">
              Justin
            </span>
            <span className="block text-xs text-muted-foreground">
              Real Estate
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <SiteNavLinks />
        </nav>
        <div className="hidden items-center gap-2 md:flex">{auth}</div>
        <MobileNav auth={auth} />
      </div>
    </header>
  );
}

function GuestLinks() {
  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/sign-up">Create account</Link>
      </Button>
    </>
  );
}

async function AuthLinks() {
  const session = await getSession();
  if (!session) return <GuestLinks />;

  return (
    <>
      {isAdmin(session) && (
        <Button asChild variant="ghost">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      )}
      <form action={signOutAction}>
        <Button type="submit" variant="ghost" className="w-full">
          Sign out
        </Button>
      </form>
    </>
  );
}
