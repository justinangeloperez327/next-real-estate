import { Suspense } from "react";
import { connection } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCarousel } from "@/features/properties/components/property-carousel";
import { getLatestProperties } from "@/features/properties/queries";
import type { Property } from "@/features/properties/types";

export default function Featured() {
  return (
    <section className="py-20">
      <div className="container mx-auto tracking-wide">
        <h2 className="mb-4 text-4xl">Properties We Love</h2>
        <p className="mb-6">A selection of our favourite sales listings</p>
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedListings />
        </Suspense>
      </div>
    </section>
  );
}

async function FeaturedListings() {
  // Read at request time (from the data cache, so it's fast) rather than at
  // build time, so deploys never depend on the database being reachable.
  await connection();

  let properties: Property[] = [];
  try {
    properties = await getLatestProperties(5);
  } catch (error) {
    unstable_rethrow(error);
    // The strip is decorative: if it fails, the rest of the page still works.
    console.error("Featured properties failed to load:", error);
  }
  if (properties.length === 0) return null;

  return <PropertyCarousel properties={properties} />;
}

function FeaturedSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-[560px] rounded-lg" />
      ))}
    </div>
  );
}
