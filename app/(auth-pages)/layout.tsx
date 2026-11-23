import { Suspense } from "react";
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
      <main className="flex min-h-screen items-center justify-center px-2">
        <div className="container w-full max-w-96 rounded-lg bg-gray-900 p-5 text-white">
          {/* Auth pages read flash messages from the URL at request time. */}
          <Suspense>{children}</Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
