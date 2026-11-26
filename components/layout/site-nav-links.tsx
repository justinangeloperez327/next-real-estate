"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-links";

export function SiteNavLinks() {
  return (
    <Suspense fallback={<Links />}>
      <CurrentLinks />
    </Suspense>
  );
}

function CurrentLinks() {
  return <Links pathname={usePathname()} />;
}

function Links({ pathname = "" }: { pathname?: string }) {
  return NAV_LINKS.map(({ href, label }) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        key={href}
        href={href}
        aria-current={
          pathname === href ? "page" : active ? "location" : undefined
        }
        className={cn(
          "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium hover:bg-accent hover:text-foreground",
          active
            ? "bg-accent text-foreground shadow-[inset_0_-2px_var(--color-brass)]"
            : "text-muted-foreground",
        )}
      >
        {label}
      </Link>
    );
  });
}
