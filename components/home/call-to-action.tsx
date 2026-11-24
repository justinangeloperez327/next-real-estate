import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="border-t bg-accent">
      <div className="container flex flex-col items-start gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-14">
        <div>
          <h2 className="font-display text-3xl font-normal sm:text-4xl">
            Need help with your search?
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Tell us what you&apos;re looking for or ask about a specific
            listing.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/contact">
            Talk to our team
            <ArrowUpRightIcon aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
