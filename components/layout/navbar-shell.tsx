"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Client wrapper for scroll behaviour. With `overlay` the bar sits
 * transparent over a photo hero (white text) and becomes a solid surface
 * once the page scrolls.
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
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const transparent = overlay && !isScrolled;

  return (
    <header
      data-transparent={transparent || undefined}
      className={cn(
        "group/nav top-0 z-50 w-full border-b",
        overlay ? "fixed" : "sticky",
        transparent
          ? "border-transparent bg-transparent text-white"
          : "border-border bg-background text-foreground",
      )}
    >
      {children}
    </header>
  );
}
