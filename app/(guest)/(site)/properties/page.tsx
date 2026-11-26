import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeftIcon, ChevronRightIcon, SearchXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PropertyMap } from "@/features/properties/components/property-map";
import PropertySearch from "@/features/properties/components/property-search";
import { PropertyGridSkeleton } from "@/features/properties/components/property-skeletons";
import { SortSelect } from "@/features/properties/components/sort-select";
import { DEFAULT_LOCATION } from "@/features/properties/constants";
import {
  hasInvertedPriceRange,
  parseFilters,
} from "@/features/properties/filters";
import { toMapPoints } from "@/features/properties/map-points";
import { searchListings } from "@/features/properties/queries";
import type { PropertyFilters } from "@/features/properties/types";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = { title: "Homes for sale and rent" };

// Page pattern: List / Index (search, result count, sort, grid, pagination).
export default function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  return (
    <>
      <section className="border-b border-brass/55 bg-muted">
        <div className="container py-8 sm:py-10">
          <h1 className="font-display text-4xl font-normal sm:text-6xl">
            Homes for sale and rent
          </h1>
          <p className="mt-3 text-muted-foreground sm:text-lg">
            Search the monthly sample of listings by city, ZIP code, or
            neighborhood.
          </p>
          <div className="mt-6">
            <Suspense fallback={<Skeleton className="h-36 rounded-xl" />}>
              <PropertySearch />
            </Suspense>
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-12">
        <Suspense
          fallback={
            <>
              <Skeleton className="mb-6 h-7 w-56" />
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
  if (hasInvertedPriceRange(filters)) return null;
  const { listings, total, page, hasNextPage } = await searchListings(filters);
  const location = filters.location || DEFAULT_LOCATION;
  const rent = filters.category === "rent";
  const mapPoints = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    ? toMapPoints(listings)
    : [];
  const filtered = Object.entries(filters).some(
    ([key, value]) =>
      !["page", "sort"].includes(key) &&
      value !== "0" &&
      !(key === "category" && value === "sale"),
  );

  if (listings.length === 0) {
    return (
      <section className="rounded-xl border bg-card px-5 py-12 text-center">
        <SearchXIcon
          aria-hidden
          className="mx-auto size-10 text-muted-foreground"
        />
        <h2 className="mt-4 text-xl font-semibold">
          No homes match your search
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Try a wider price range or fewer filters. This demo only shows the
          listings saved in its monthly sample.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/properties">Clear all filters</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">
            <span className="tabular-nums">{formatNumber(total)}</span>{" "}
            {total === 1 ? "home" : "homes"} {rent ? "for rent" : "for sale"} in{" "}
            {location}
          </h2>
          {filtered && (
            <Link
              href="/properties"
              className="inline-flex h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear filters
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Suspense>
            <SortSelect />
          </Suspense>
          {mapPoints.length > 0 && (
            <a
              href="#results-map"
              className="inline-flex h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View map
            </a>
          )}
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing, i) => (
          <li key={listing.id}>
            <PropertyCard listing={listing} priority={i < 3} />
          </li>
        ))}
      </ul>

      <Pagination filters={filters} page={page} hasNextPage={hasNextPage} />

      {mapPoints.length > 0 && (
        <section
          id="results-map"
          aria-labelledby="map-heading"
          className="mt-12 scroll-mt-24 border-t border-brass/55 pt-6"
        >
          <h2 id="map-heading" className="mb-4 font-display text-4xl">
            On the map
          </h2>
          <PropertyMap points={mapPoints} height={480} />
        </section>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Monthly listing sample from Realtor.com via RealtyAPI. Prices and
        availability may have changed.
      </p>
    </>
  );
}

function Pagination({
  filters,
  page,
  hasNextPage,
}: {
  filters: PropertyFilters;
  page: number;
  hasNextPage: boolean;
}) {
  if (page <= 1 && !hasNextPage) return null;

  const hrefFor = (target: number) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([key]) => key !== "page"),
    );
    if (target > 1) params.set("page", String(target));
    const query = params.toString();
    return (query ? `/properties?${query}` : "/properties") as `/properties`;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 border-t pt-6 sm:gap-x-4"
    >
      {page > 1 ? (
        <Button asChild variant="outline" className="justify-self-start">
          <Link href={hrefFor(page - 1)} aria-label="Previous page">
            <ChevronLeftIcon aria-hidden className="mr-1 size-4" />
            Previous
          </Link>
        </Button>
      ) : (
        <span />
      )}
      <p className="text-sm text-muted-foreground tabular-nums">Page {page}</p>
      {hasNextPage ? (
        <Button asChild variant="outline" className="justify-self-end">
          <Link href={hrefFor(page + 1)} aria-label="Next page">
            Next
            <ChevronRightIcon aria-hidden className="ml-1 size-4" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
