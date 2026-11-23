import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The listing may have been sold, or the link is incorrect.
      </p>
      <Link href="/properties" className="underline underline-offset-4">
        Browse properties
      </Link>
    </main>
  );
}
