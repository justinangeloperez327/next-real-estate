import type { Metadata } from "next";
import Image from "next/image";
import { PropertyMap } from "@/components/map";
import { PropertyCard } from "@/components/property-card";
import PropertySearch from "@/components/property-search";
import { getProperties } from "@/lib/properties/queries";
import type { PropertyFilters } from "@/lib/types";

export const metadata: Metadata = { title: "Properties" };

const FILTER_KEYS = [
  "search",
  "property_type",
  "beds",
  "baths",
  "carpark",
  "minPrice",
  "maxPrice",
] as const satisfies readonly (keyof PropertyFilters)[];

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  const params = await searchParams;
  const filters: PropertyFilters = {};
  for (const key of FILTER_KEYS) {
    const value = params[key];
    if (typeof value === "string" && value) filters[key] = value;
  }
  const properties = await getProperties(filters);

  return (
    <div>
      <section className="relative flex h-96 items-center justify-center">
        <Image
          alt=""
          fill
          priority
          sizes="100vw"
          src="/images/properties/hero.jpeg"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60" />
        <div className="container relative z-10 mx-auto text-center text-white">
          <h1 className="text-4xl font-bold tracking-wider">
            Properties For Sale
          </h1>
          <PropertySearch />
        </div>
      </section>

      {properties.length === 0 ? (
        <section className="container mx-auto my-20 text-center">
          <h2 className="text-2xl">No properties match your search</h2>
          <p className="mt-2 text-muted-foreground">
            Try widening the price range or removing a filter.
          </p>
        </section>
      ) : (
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
      )}
    </div>
  );
}
