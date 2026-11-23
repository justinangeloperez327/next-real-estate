"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Client wrapper for scroll behaviour. With `overlay` the bar is transparent
 * over a hero and turns solid once the page scrolls.
 */
export function NavbarShell({
  overlay = false,
  children,
}: {
  overlay?: boolean;
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  return (
    <nav
      className={cn(
        "top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 text-white",
        overlay
          ? cn("fixed", isScrolled ? "bg-black" : "bg-transparent")
          : "bg-black",
      )}
    >
      {children}
    </nav>
  );
}
