
'use client'
import React, { useState } from 'react'
import PropertyCard from './property-card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

type Property = {
    id: number;
    image: string;
    title: string;
    address: string;
    beds: number;
    baths: number;
    carpark: number;
    property_type: string;
    price: number;
}

interface PropertyCarouselProps {
    properties?: Property[];
}

const PropertyCarousel = ({ properties = [] }: PropertyCarouselProps) => {
  return ( 
    <>
        <Carousel>
            <CarouselContent>
                {properties.map((property) => (
                    <CarouselItem key={property.id} className='lg:basis-1/3'>
                        <PropertyCard property={property} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </>
  )
}

export default PropertyCarousel