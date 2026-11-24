import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCarousel } from "@/features/properties/components/property-carousel";
import { DEFAULT_LOCATION } from "@/features/properties/constants";
import { getLatestListings } from "@/features/properties/queries";
import type { Listing } from "@/features/properties/types";

export default function Featured() {
  return (
    <section className="container py-10 sm:py-16">
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-normal sm:text-5xl">
            New on the market
          </h2>
          <p className="mt-2 text-muted-foreground">
            The latest homes for sale in {DEFAULT_LOCATION}.
          </p>
        </div>
        <Link
          href="/properties"
          className="inline-flex h-11 items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          Browse all homes <ArrowRightIcon aria-hidden className="size-4" />
        </Link>
      </div>
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedListings />
      </Suspense>
    </section>
  );
}

async function FeaturedListings() {
  // Read at request time (from the data cache, so it's fast) rather than at
  // build time, so deploys never depend on the database being reachable.
  await connection();

  let listings: Listing[];
  try {
    listings = await getLatestListings(6);
  } catch (error) {
    unstable_rethrow(error);
    console.error("Featured properties failed to load:", error);
    return (
      <FeaturedNotice>
        New listings couldn’t be loaded right now.
      </FeaturedNotice>
    );
  }
  if (listings.length === 0) {
    return (
      <FeaturedNotice>
        No new listings are available in {DEFAULT_LOCATION} right now.
      </FeaturedNotice>
    );
  }

  return <PropertyCarousel listings={listings} />;
}

function FeaturedNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border bg-card p-5 text-muted-foreground">
      {children}
    </p>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      ))}
    </div>
  );
}
