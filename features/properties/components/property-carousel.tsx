"use client";

import { PropertyCard } from "@/features/properties/components/property-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Property } from "@/features/properties/types";

export function PropertyCarousel({ properties }: { properties: Property[] }) {
  return (
    <Carousel opts={{ align: "start" }} aria-label="Featured homes">
      <CarouselContent className="-ml-6">
        {properties.map((property) => (
          <CarouselItem
            key={property.id}
            className="pl-6 sm:basis-1/2 lg:basis-1/3"
          >
            <PropertyCard property={property} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Controls sit below the track so they never overflow the viewport. */}
      <div className="mt-6 flex justify-end gap-2">
        <CarouselPrevious className="static size-11 translate-y-0" />
        <CarouselNext className="static size-11 translate-y-0" />
      </div>
    </Carousel>
  );
}
