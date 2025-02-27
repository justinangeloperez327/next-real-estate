import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faShower } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface Property {
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

const PropertyCard = ({ property }: { property: Property }) => {

    return (
        <a href={`/properties/${property.id}`} key={property.id} className="group relative text-white shadow-xl mx-4 lg:mx-0 cursor-pointer rounded-lg overflow-hidden " style={{ height: '560px' }} >
            <div id="image-wrapper" className="overflow-hidden ">
                <Image src={`/images/properties/1.jpeg`} width={420} height={400} alt={property.title} className="group-hover:scale-110 transition-transform duration-300 w-full h-96 object-cover rounded-lg" />
            </div>
            <div id="details-wrapper">
                <div className="px-4 pt-4 pb-2 capitalize">
                    <div className="space-y-2">
                        {/* <h2 className="text-xl group-hover:text-rose-600">{property.title}</h2> */}
                        <h3 className="text-2xl group-hover:text-rose-600">{property.address}</h3>
                    </div>
                </div>
                <div className="px-4 mt-2 flex space-x-5">
                    <div className='text-2xl'>
                        ${property.price.toLocaleString()}
                    </div>
                </div>
                <div className="px-4 flex mt-4 justify-between">
                    <div className='flex space-x-2 '>
                        <div className='flex gap-2'>{property.beds} <FontAwesomeIcon icon={faBed} className='h-8' /></div>
                        <div className='flex gap-2'>{property.baths} <FontAwesomeIcon icon={faShower} className='h-8' /></div>
                        <div className='flex gap-2'>{property.carpark} <FontAwesomeIcon icon={faCar} className='h-8' /></div>
                    </div>
                    <div className='text-md group-hover:text-rose-600 mr-3 group-hover:mr-0 transition-all duration-300'>
                        <ChevronRight size={32} />
                    </div>
                </div>
            </div>
        </a>
    )
}

export default PropertyCard
