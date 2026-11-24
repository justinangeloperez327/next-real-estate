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
      <PageHero image="/images/contact.jpg" title="Contact Us" />
      <section className="mx-auto my-20 max-w-3xl px-4">
        <h2 className="text-center text-3xl">Get in touch</h2>
        <div className="mt-4 space-y-2 text-center text-lg">
          <p>
            Whether you&apos;re looking to buy, sell, rent or invest, our
            property specialists have the knowledge, experience and passion to
            guide you through your next move.
          </p>
          <p>Leave your details and we&apos;ll get back to you soon.</p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
