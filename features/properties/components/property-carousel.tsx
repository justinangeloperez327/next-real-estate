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
    <Carousel>
      <CarouselContent>
        {properties.map((property) => (
          <CarouselItem key={property.id} className="lg:basis-1/3">
            <PropertyCard property={property} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
