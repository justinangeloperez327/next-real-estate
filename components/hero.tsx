import NextLogo from "./next-logo";
import PropertySearch from "@/components/property-search";
import SupabaseLogo from "./supabase-logo";

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
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="container mx-auto text-center text-white relative z-10">
        <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
        <p className="mt-4 text-lg">- CREATE MEMORIES THAT LAST -</p>
        <PropertySearch />
      </div >
    </section>
  );
}
