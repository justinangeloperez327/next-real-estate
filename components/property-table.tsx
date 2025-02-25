'use client'
import React from 'react'
import { Property } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface PropertyTableProps {
    properties: Property[] | null;
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
    const router = useRouter()

    const handleRowClick = (id: string) => {
        router.push(`/dashboard/properties/${id}`)
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bathrooms</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bedrooms</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carpark</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {properties && properties.map((property: Property, index) => (
                    <tr key={property.id} onClick={() => handleRowClick(property.id)} className='group hover:bg-gray-800 cursor-pointer'>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <div className="text-sm font-bold">{index + 1}</div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <div className="text-sm font-bold">{property.title}</div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <div className="text-sm ">{property.address}</div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <div className="text-sm ">{property.baths}</div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <div className="text-sm ">{property.beds}</div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <div className="text-sm ">{property.carpark}</div>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                            <span className="text-sm">
                                {property.pool ? 'Yes' : 'No'}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {property.price}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PropertyTable