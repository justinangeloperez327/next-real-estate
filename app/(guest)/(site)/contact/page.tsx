import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/features/contact/components/contact-form";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to our property specialists about buying, selling, renting or investing.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Buying, selling, renting or investing? We're happy to help."
      />
      <div className="container grid items-start gap-8 py-10 sm:py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <section>
          <h2 className="font-display text-3xl font-normal">Get in touch</h2>
          <p className="mt-3 max-w-prose text-muted-foreground">
            If you&apos;re asking about a specific home, include the address or
            listing link so we can find it quickly.
          </p>
        </section>
        <ContactForm />
      </div>
    </>
  );
}
