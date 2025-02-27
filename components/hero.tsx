import PropertySearch from "@/components/property-search";
import { Suspense } from "react";
export default function Header() {
  return (
    <section className="flex relative h-screen justify-center items-center">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute w-full h-full bg-gray-900/40"></div>
      <div className="container mx-auto text-center text-white relative z-10">
        <h1 className="text-4xl font-bold tracking-widest">
          YOUR DREAM HOME AWAITS
        </h1>
        <p className="mt-4 text-lg mb-4 tracking-widest">
          - CREATE MEMORIES THAT LAST -
        </p>
        <Suspense>
          <PropertySearch />
        </Suspense>
      </div>
    </section>
  );
}
