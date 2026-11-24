import type { Route } from "next";

export const NAV_LINKS: { href: Route; label: string }[] = [
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
