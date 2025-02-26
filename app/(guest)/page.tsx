import CallToAction from "@/components/call-to-action";
import Featured from "@/components/featured";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";

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
