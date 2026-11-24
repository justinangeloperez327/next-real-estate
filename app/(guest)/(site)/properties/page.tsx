import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeftIcon, ChevronRightIcon, SearchXIcon } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PropertyMap } from "@/features/properties/components/property-map";
import PropertySearch from "@/features/properties/components/property-search";
import { PropertyGridSkeleton } from "@/features/properties/components/property-skeletons";
import { SortSelect } from "@/features/properties/components/sort-select";
import { DEFAULT_LOCATION } from "@/features/properties/constants";
import { parseFilters } from "@/features/properties/filters";
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
      <PageHero
        image="/images/properties/hero.jpeg"
        title="Homes for sale and rent"
        subtitle="Search any US city, ZIP or neighborhood."
      >
        <Suspense>
          <PropertySearch />
        </Suspense>
      </PageHero>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
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
  const { listings, total, page, hasNextPage } = await searchListings(filters);
  const location = filters.location || DEFAULT_LOCATION;
  const rent = filters.category === "rent";
  const { page: _page, sort: _sort, ...narrowing } = filters;
  const filtered = Object.keys(narrowing).length > 0;

  if (listings.length === 0) {
    return (
      <section className="mx-auto max-w-md py-12 text-center">
        <SearchXIcon
          aria-hidden
          className="mx-auto size-10 text-muted-foreground"
        />
        <h2 className="mt-4 text-xl font-semibold">
          No homes match your search
        </h2>
        <p className="mt-2 text-muted-foreground">
          Check the spelling of the location, or try a wider price range or
          fewer filters.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/properties">Clear all filters</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
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
        <Suspense>
          <SortSelect />
        </Suspense>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing, i) => (
          <li key={listing.id}>
            <PropertyCard listing={listing} priority={i < 3} />
          </li>
        ))}
      </ul>

      <Pagination filters={filters} page={page} hasNextPage={hasNextPage} />

      <section aria-labelledby="map-heading" className="mt-16">
        <h2 id="map-heading" className="mb-4 text-xl font-semibold">
          On the map
        </h2>
        <PropertyMap points={toMapPoints(listings)} height={480} />
      </section>

      <p className="mt-8 text-sm text-muted-foreground">
        Listing data from Realtor.com via RealtyAPI. Information is deemed
        reliable but not guaranteed.
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
      className="mt-10 flex items-center justify-between gap-4 border-t pt-6"
    >
      {page > 1 ? (
        <Button asChild variant="outline">
          <Link href={hrefFor(page - 1)}>
            <ChevronLeftIcon aria-hidden className="mr-1 size-4" />
            Previous page
          </Link>
        </Button>
      ) : (
        <span />
      )}
      <p className="text-sm text-muted-foreground tabular-nums">Page {page}</p>
      {hasNextPage ? (
        <Button asChild variant="outline">
          <Link href={hrefFor(page + 1)}>
            Next page
            <ChevronRightIcon aria-hidden className="ml-1 size-4" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
