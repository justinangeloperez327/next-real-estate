import type { Metadata } from "next";
import { ClockIcon, MailIcon, PhoneIcon } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/features/contact/components/contact-form";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to our property specialists about buying, selling, renting or investing.",
};

// TODO(content): replace with the agency's real contact details.
const DETAILS = [
  {
    Icon: MailIcon,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    Icon: PhoneIcon,
    label: "Phone",
    value: "123-456-789",
    href: "tel:123456789",
  },
  { Icon: ClockIcon, label: "Hours", value: "Mon–Sat, 9am–6pm" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/contact.jpg"
        title="Contact us"
        subtitle="Buying, selling, renting or investing? We're happy to help."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <section>
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Tell us a little about what you&apos;re looking for and one of our
            property specialists will get back to you, usually within one
            working day.
          </p>
          <dl className="mt-8 space-y-5">
            {DETAILS.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-3">
                <Icon
                  aria-hidden
                  className="mt-0.5 size-5 text-muted-foreground"
                />
                <div>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="font-medium">
                    {href ? (
                      <a
                        href={href}
                        className="-my-3 inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
        <ContactForm />
      </div>
    </>
  );
}
