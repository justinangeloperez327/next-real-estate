import React from "react";
import PropertySearch from "@/components/property-search";
import PropertyCard from "@/components/property-card";
import { getProperties } from "./actions";
import Image from "next/image";
import Map from "@/components/map";
import MulitplePropertyMap from "@/components/mulitple-property-map";

interface QueryParams {
  search?: string;
  property_type?: string;
  beds?: string;
  baths?: string;
  carpark?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function Properties({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const params = await searchParams;
  const properties = (await getProperties(params)) || [];

  return (
    <div className="">
      <section className="relative h-96 flex items-center justify-center">
        <Image
          alt="property"
          height={720}
          width={1270}
          src="/images/properties/hero.jpeg"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute w-full h-full bg-gray-900 opacity-60"></div>
        <div className="container mx-auto text-center text-white relative z-10">
          <h1 className="text-4xl font-bold tracking-wider">
            Properties For Sale
          </h1>
          <PropertySearch />
        </div>
      </section>
      <section className="my-10 container mx-auto">
        <MulitplePropertyMap properties={properties} />
      </section>
      <section className="my-10 container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
