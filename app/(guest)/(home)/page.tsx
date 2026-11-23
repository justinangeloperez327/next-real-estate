import CallToAction from "@/components/home/call-to-action";
import Featured from "@/components/home/featured";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";

export default async function Home() {
  return (
    <>
      <div className="flex-1 flex flex-col gap-6">
        <Hero />
        <Featured />
        <Testimonials />
        <CallToAction />
      </div>
    </>
  );
}
