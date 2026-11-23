import Navbar from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { getUser, isAdmin } from "@/lib/auth";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <>
      <Navbar signedIn={!!user} admin={isAdmin(user)} />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  );
}
