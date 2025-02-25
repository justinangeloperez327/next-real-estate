import CallToAction from "@/components/call-to-action";
import Featured from "@/components/featured";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonials";

export default async function Home() {
    return (
        <>
            <main className="flex-1 flex flex-col gap-6 px-4">
                <Hero />
                <Featured />
                <Testimonials />
                <CallToAction />
            </main>
        </>
    );
}
