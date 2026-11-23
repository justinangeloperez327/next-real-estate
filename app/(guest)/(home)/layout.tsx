import Navbar from "@/components/layout/navbar";

// The home page has a full-screen hero, so the navbar starts transparent.
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar overlay />
      <main>{children}</main>
    </>
  );
}
