import type { Metadata } from "next";
import Link from "next/link";
import { SearchXIcon } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
    <>
      <PageHero
        image="/images/properties/hero.jpeg"
        title="Homes for sale and rent"
        subtitle="Filter by location, size and budget."
      >
        <Suspense>
          <PropertySearch />
        </Suspense>
      </PageHero>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <Suspense
          fallback={
            <>
              <Skeleton className="mb-6 h-7 w-40" />
              <PropertyGridSkeleton />
            </>
          }
        >
          <PropertyResults searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function PropertyResults({
  searchParams,
}: Pick<PageProps<"/properties">, "searchParams">) {
  const filters = parseFilters(await searchParams);
  const properties = await getProperties(filters);
  const filtered = Object.keys(filters).length > 0;

  if (properties.length === 0) {
    return (
      <section className="mx-auto max-w-md py-12 text-center">
        <SearchXIcon
          aria-hidden
          className="mx-auto size-10 text-muted-foreground"
        />
        <h2 className="mt-4 text-xl font-semibold">
          {filtered ? "No homes match your search" : "No homes listed yet"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {filtered
            ? "Try a wider price range or fewer filters."
            : "New listings appear here as soon as they're published."}
        </p>
        {filtered && (
          <Button asChild variant="outline" className="mt-6">
            <Link href="/properties">Clear all filters</Link>
          </Button>
        )}
      </section>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold">
          <span className="tabular-nums">{properties.length}</span>{" "}
          {properties.length === 1 ? "home" : "homes"}
          {filtered ? " match your search" : " available"}
        </h2>
        {filtered && (
          <Link
            href="/properties"
            className="inline-flex h-11 items-center text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Clear filters
          </Link>
        )}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <li key={property.id}>
            <PropertyCard property={property} />
          </li>
        ))}
      </ul>
      <section aria-labelledby="map-heading" className="mt-16">
        <h2 id="map-heading" className="mb-4 text-xl font-semibold">
          On the map
        </h2>
        <PropertyMap points={properties} height={480} />
      </section>
    </>
  );
}
