import CallToAction from "@/components/home/call-to-action";
import Featured from "@/components/home/featured";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Featured />
      <Testimonials />
      <CallToAction />
    </>
  );
}
