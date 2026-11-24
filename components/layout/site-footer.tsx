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
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md text-xl font-semibold focus-visible:outline-white"
          >
            Justin Real Estate
          </Link>
          <p className="mt-1 text-sm text-primary-foreground/85">
            © <CurrentYear /> Justin Angelo Perez
          </p>
        </div>
        <nav aria-label="Footer" className="-mx-3 flex flex-wrap">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-11 items-center px-3 text-sm text-primary-foreground/85 underline-offset-4 hover:underline focus-visible:outline-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
