import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faShower } from '@fortawesome/free-solid-svg-icons';

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
        <a href={`/properties/${property.id}`} key={property.id} className="group relative bg-white shadow-xl mx-4 cursor-pointer" style={{ height: '500px' }} >
            <div id="image-wrapper" className="overflow-hidden ">
                <img src={`/images/properties/5.jpeg`} alt={property.title} className="group-hover:scale-110 transition-transform duration-300 w-full h-72 object-cover" />
            </div>
            <div id="details-wrapper">
                <div className="px-4 pt-4 pb-2 capitalize">
                    <div className="text-gray-600 space-y-2">
                        <h2 className="text-xl text-gray-600 group-hover:text-rose-600">{property.title}</h2>
                        <h3 className="text-lg text-gray-600 group-hover:text-rose-600">{property.address}</h3>
                    </div>
                </div>
                <div className="px-4 text-gray-600 capitalize">
                    <div className='text-lg'>
                        {property.property_type}
                    </div>
                </div>
                <div className="px-4 flex text-gray-600 space-x-5">
                    <div className='flex gap-2'>{property.beds} <FontAwesomeIcon icon={faBed} className='h-6 w-6' /></div>
                    <div className='flex gap-2'>{property.baths} <FontAwesomeIcon icon={faShower} className='h-6 w-6' /></div>
                    <div className='flex gap-2'>{property.carpark} <FontAwesomeIcon icon={faCar} className='h-6 w-6' /></div>
                </div>
                <div className="px-4 flex mt-4 text-gray-600">
                    <div className='text-lg'>
                        ${property.price}
                    </div>
                </div>
            </div>
        </a>
    )
}

export default PropertyCard
