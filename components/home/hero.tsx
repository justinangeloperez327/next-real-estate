import { Suspense } from "react";
import PropertySearch from "@/features/properties/components/property-search";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[640px] items-center justify-center px-4 pt-24 pb-16 md:h-[88vh]">
      {/* 2 MB 720p loop; the poster paints immediately while it loads.
          People who prefer reduced motion get the still poster only. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[url(/images/hero-poster.jpg)] bg-cover bg-center motion-reduce:block"
      />
      {/* 65% slate keeps white text at AA over any frame. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-slate-950/65" />
      <div className="w-full max-w-5xl text-center text-white">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Find a home that fits your life
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
          Browse houses and apartments for sale and rent, with local experts
          ready to help when you need them.
        </p>
        <div className="mt-10">
          <Suspense>
            <PropertySearch />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
