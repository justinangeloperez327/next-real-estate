import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PropertySearch from "@/features/properties/components/property-search";

export default function Hero() {
  return (
    <section className="grid bg-primary text-primary-foreground lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex min-w-0 items-center px-4 py-12 sm:px-8 lg:col-start-1 lg:row-start-1 lg:py-24 lg:pl-[max(3rem,calc((100vw-1224px)/2))]">
        <div className="max-w-xl border-t border-brass pt-5">
          <h1 className="font-display text-6xl leading-[0.92] sm:text-7xl xl:text-[6rem]">
            Find a place to call home.
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            Explore homes for sale and rent by city, ZIP code, or neighborhood.
          </p>
        </div>
      </div>
      <div className="relative z-10 px-4 pb-5 text-foreground sm:px-8 lg:col-span-2 lg:row-start-2 lg:bg-background lg:pb-0">
        <div className="mx-auto max-w-5xl lg:-mt-12">
          <Suspense fallback={<Skeleton className="h-44 bg-card sm:h-28" />}>
            <PropertySearch compact />
          </Suspense>
        </div>
      </div>
      <div className="relative aspect-[16/9] lg:col-start-2 lg:row-start-1 lg:aspect-auto">
        <Image
          src="/images/properties/1.jpeg"
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 53vw, 100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
