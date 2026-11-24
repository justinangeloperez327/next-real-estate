import Navbar from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100svh-4rem)] items-start justify-center bg-muted px-4 py-12 sm:items-center">
        <div className="w-full max-w-sm rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
