import Link from "next/link";
import { cacheLife } from "next/cache";
import { NAV_LINKS } from "./nav-links";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold tracking-wide">JUSTIN</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © <CurrentYear /> Justin Angelo Perez
          </p>
        </div>
        <nav aria-label="Footer" className="-mx-3 flex flex-wrap">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-11 items-center px-3 text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
