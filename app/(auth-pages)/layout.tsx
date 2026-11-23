import Navbar from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar signedIn={false} admin={false} />
      <main className="flex min-h-screen items-center justify-center px-2">
        <div className="container w-full max-w-96 rounded-lg bg-gray-900 p-5 text-white">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
