import { Suspense } from "react";
import Link from "next/link";
import { signOutAction } from "@/features/auth/actions";
import { getSession, isAdmin } from "@/features/auth/session";
import { NavbarShell } from "./navbar-shell";

const linkClass = "underline-offset-4 hover:underline";

export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  return (
    <NavbarShell overlay={overlay}>
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <Link href="/" className="font-semibold">
          JUSTIN
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
          <Link href="/properties" className={linkClass}>
            Properties
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          {/* Everything above is static; only the auth links depend on the
              visitor, so they stream in without blocking the page. */}
          <Suspense fallback={<GuestLinks />}>
            <AuthLinks />
          </Suspense>
        </div>
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
      <Link href="/sign-up" className={linkClass}>
        Sign up
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
