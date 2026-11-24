import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Suspense } from "react";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PropertyMap } from "@/features/properties/components/property-map";
import PropertySearch from "@/features/properties/components/property-search";
import { PropertyGridSkeleton } from "@/features/properties/components/property-skeletons";
import { parseFilters } from "@/features/properties/filters";
import { getProperties } from "@/features/properties/queries";

export const metadata: Metadata = { title: "Properties" };

export default function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  return (
    <div>
      <PageHero
        image="/images/properties/hero.jpeg"
        title="Properties For Sale"
      >
        <Suspense>
          <PropertySearch />
        </Suspense>
      </PageHero>

      <Suspense
        fallback={
          <section className="container mx-auto my-10">
            <PropertyGridSkeleton />
          </section>
        }
      >
        <PropertyResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function PropertyResults({
  searchParams,
}: Pick<PageProps<"/properties">, "searchParams">) {
  const properties = await getProperties(parseFilters(await searchParams));

  if (properties.length === 0) {
    return (
      <section className="container mx-auto my-20 text-center">
        <h2 className="text-2xl">No properties match your search</h2>
        <p className="mt-2 text-muted-foreground">
          Try widening the price range or removing a filter.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="container mx-auto my-10">
        <PropertyMap points={properties} />
      </section>
      <section className="container mx-auto my-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </>
  );
}
