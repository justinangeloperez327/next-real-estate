import { Suspense } from "react";
import Link from "next/link";
import { signOutAction } from "@/features/auth/actions";
import { getSession, isAdmin } from "@/features/auth/session";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "./nav-links";
import { NavbarShell } from "./navbar-shell";

const linkClass =
  "inline-flex h-11 items-center rounded-md px-3 text-sm font-medium opacity-90 transition-opacity hover:opacity-100 hover:underline underline-offset-4 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  // Only the auth links depend on the visitor; they stream in without
  // blocking the static navbar.
  const auth = (
    <Suspense fallback={<GuestLinks />}>
      <AuthLinks />
    </Suspense>
  );

  return (
    <NavbarShell overlay={overlay}>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex h-11 items-center text-base font-semibold tracking-wide"
        >
          JUSTIN
          <span className="sr-only"> Real Estate, home</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <span aria-hidden className="mx-2 h-5 w-px bg-current opacity-20" />
          {auth}
        </nav>
        <MobileNav auth={auth} />
      </div>
    </NavbarShell>
  );
}

function GuestLinks() {
  return (
    <>
      <Link href="/sign-in" className={linkClass}>
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          linkClass,
          "bg-primary text-primary-foreground opacity-100 hover:bg-primary-hover hover:no-underline",
        )}
      >
        Create account
      </Link>
    </>
  );
}

async function AuthLinks() {
  const session = await getSession();
  if (!session) return <GuestLinks />;

  return (
    <>
      {isAdmin(session) && (
        <Link href="/dashboard" className={linkClass}>
          Dashboard
        </Link>
      )}
      <form action={signOutAction}>
        <button type="submit" className={linkClass}>
          Sign out
        </button>
      </form>
    </>
  );
}
