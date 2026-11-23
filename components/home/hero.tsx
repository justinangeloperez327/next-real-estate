import { Suspense } from "react";
import PropertySearch from "@/features/properties/components/property-search";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center">
      {/* 2 MB 720p loop; the poster paints immediately while it loads. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        aria-hidden
        className="absolute h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[url(/images/hero-poster.jpg)] bg-cover bg-center motion-reduce:block"
      />
      <div className="absolute h-full w-full bg-gray-900/40" />
      <div className="container relative z-10 mx-auto text-center text-white">
        <h1 className="text-4xl font-bold tracking-widest">
          YOUR DREAM HOME AWAITS
        </h1>
        <p className="mb-4 mt-4 text-lg tracking-widest">
          - CREATE MEMORIES THAT LAST -
        </p>
        <Suspense>
          <PropertySearch />
        </Suspense>
      </div>
    </section>
  );
}
