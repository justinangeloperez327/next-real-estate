
import React from 'react';
import PropertySearch from '@/components/property-search'
import PropertyCard from '@/components/property-card';
import { getProperties } from './actions';

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
    searchParams
}: {
    searchParams: QueryParams
}) {

    const properties = await getProperties(searchParams) || [];

    return (
        <div className=''>
            <section className="relative h-96 flex items-center justify-center">
                <img
                    src="/images/properties/hero.jpeg"
                    className="absolute w-full h-full object-cover"
                />

                <div className="absolute w-full h-full bg-gray-900 opacity-60"></div>
                <div className="container mx-auto text-center text-white relative z-10">
                    <h1 className="text-4xl font-bold">Properties</h1>
                    <PropertySearch />
                </div >
            </section >

            <section className='my-20 container mx-auto '>
                <h2 className='text-3xl font-bold mb-6'>Viewing All Properties For Sale</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>
        </div >
    );
};
