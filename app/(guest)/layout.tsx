import { SiteFooter } from "@/components/layout/site-footer";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
      <SiteFooter />
    </>
  );
}
