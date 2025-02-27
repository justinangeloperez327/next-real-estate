"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Real Estate App";
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <nav
      className={clsx(
        "w-full z-50  top-0 flex justify-center border-b border-b-foreground/10 h-16",
        isHomePage && (isScrolled ? "fixed bg-black" : "fixed bg-transparent"),
        !isHomePage && "bg-black"
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
          <Link href="/sign-in" className="hover:underline underline-offset-4">
            Sign in
          </Link>
          <Link href="/sign-up" className="hover:underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
