import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About us",
  description: "Who we are and how we help people find their next home.",
};

// TODO(content): replace with the agency's own story and photos.
const STORY = [
  "We started with a simple idea: buying, selling or renting a home should feel exciting, not exhausting. Today our team helps families, first-time buyers and investors find the right property at the right price.",
  "We know our neighbourhoods street by street, and we're with you at every step, from the first viewing to handing over the keys.",
];

const SECTIONS = [
  {
    title: "Our community",
    image: "/images/community.jpg",
    body: [
      "We live and work in the communities we sell in. That local knowledge means honest advice about schools, transport and what each street is really like.",
      "Many of our clients come to us through friends and neighbours, and we work hard to keep it that way.",
    ],
  },
  {
    title: "Our approach",
    image: "/images/community2.jpg",
    body: [
      "Clear pricing, regular updates and no pressure. We tell you what we'd do if it were our own home.",
      "Whether it's your first apartment or your fifth investment, you'll have one point of contact from start to finish.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/about.jpg"
        title="Making your move feel easier"
        subtitle="Our passion is people and property."
      />

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold">Our story</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted-foreground">
          {STORY.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-20 sm:px-6">
        {SECTIONS.map((section, i) => (
          <div
            key={section.title}
            className="grid items-stretch overflow-hidden rounded-xl border md:grid-cols-2"
          >
            <div
              className={cn(
                "flex flex-col justify-center gap-4 p-8",
                i % 2 === 1 && "md:order-2",
              )}
            >
              <h3 className="text-xl font-semibold">{section.title}</h3>
              {section.body.map((p) => (
                <p key={p} className="text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative h-80 md:h-96">
              <Image
                src={section.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
