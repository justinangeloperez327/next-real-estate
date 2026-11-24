"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WithTooltip } from "@/components/ui/with-tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "./nav-links";

/** Below `md`, the navbar links collapse into this sheet. */
export function MobileNav({ auth }: { auth: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <WithTooltip label="Open menu">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-current hover:bg-accent md:hidden group-data-[transparent]/nav:hover:bg-white/15"
            aria-label="Open menu"
          >
            <MenuIcon aria-hidden className="size-5" />
          </Button>
        </SheetTrigger>
      </WithTooltip>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>
        {/* Close the sheet when any link inside it is followed. */}
        <nav
          aria-label="Main"
          className="mt-6 flex flex-col"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-11 items-center rounded-md px-3 text-base hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-3 border-t" />
          <div className="flex flex-col [&_a]:flex [&_a]:h-11 [&_a]:items-center [&_a]:rounded-md [&_a]:px-3 [&_a]:text-base [&_a:hover]:bg-accent [&_button]:flex [&_button]:h-11 [&_button]:w-full [&_button]:items-center [&_button]:rounded-md [&_button]:px-3 [&_button]:text-base [&_button:hover]:bg-accent">
            {auth}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
