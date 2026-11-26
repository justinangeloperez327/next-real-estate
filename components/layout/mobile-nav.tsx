"use client";

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
import { SiteNavLinks } from "./site-nav-links";

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
            className="text-current hover:bg-accent md:hidden"
            aria-label="Open menu"
          >
            <MenuIcon aria-hidden className="size-5" />
          </Button>
        </SheetTrigger>
      </WithTooltip>
      <SheetContent side="right" className="public-theme w-72 overflow-y-auto">
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
          <SiteNavLinks />
          <div className="my-3 border-t" />
          <div className="grid gap-2">{auth}</div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
