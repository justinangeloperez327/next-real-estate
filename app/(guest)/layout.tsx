import { Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`public-theme bg-background text-foreground ${instrumentSerif.variable}`}
    >
      <div className="min-h-screen">{children}</div>
      <SiteFooter />
    </div>
  );
}
