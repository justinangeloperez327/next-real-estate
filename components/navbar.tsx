"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions";

export default function Navbar({
  signedIn,
  admin,
}: {
  signedIn: boolean;
  admin: boolean;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <nav
      className={clsx(
        "w-full z-50 top-0 flex justify-center border-b border-b-foreground/10 h-16 text-white",
        isHomePage && (isScrolled ? "fixed bg-black" : "fixed bg-transparent"),
        !isHomePage && "bg-black",
      )}
    >
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>JUSTIN</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href={"/properties"}
            className="hover:underline underline-offset-4"
          >
            Properties
          </Link>
          <Link href={"/about"} className="hover:underline underline-offset-4">
            About
          </Link>
          <Link
            href={"/contact"}
            className="hover:underline underline-offset-4"
          >
            Contact
          </Link>
          {admin && (
            <Link
              href="/dashboard"
              className="hover:underline underline-offset-4"
            >
              Dashboard
            </Link>
          )}
          {signedIn ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="hover:underline underline-offset-4"
              >
                Sign out
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hover:underline underline-offset-4"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
