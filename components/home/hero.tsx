import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import PropertySearch from "@/features/properties/components/property-search";
import { DEFAULT_LOCATION } from "@/features/properties/constants";

export default function Hero() {
  return (
    <section className="bg-muted">
      <div className="container grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:py-16">
        <div className="min-w-0 lg:py-6">
          <h1 className="font-display text-5xl font-normal leading-[0.98] sm:text-6xl xl:text-7xl">
            Find a place to call home.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore homes for sale and rent. Start with a city, ZIP code, or
            neighborhood.
          </p>

          <div className="mt-7">
            <Suspense fallback={<div className="h-48 rounded-xl bg-card" />}>
              <PropertySearch compact />
            </Suspense>
          </div>
          <Link
            href="/properties"
            className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-current"
          >
            Browse homes in {DEFAULT_LOCATION}
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-accent sm:aspect-[16/10] lg:aspect-[5/4]">
          <Image
            src="/images/properties/1.jpeg"
            alt=""
            fill
            preload
            sizes="(min-width: 1280px) 620px, (min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
