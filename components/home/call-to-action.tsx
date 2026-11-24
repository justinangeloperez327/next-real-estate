import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-xl border p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <h2 className="text-2xl font-semibold">Not sure where to start?</h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Tell us what you&apos;re looking for and one of our team will get
            back to you, usually within a day.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/contact">Talk to our team</Link>
        </Button>
      </div>
    </section>
  );
}
