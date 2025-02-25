

import { getProperty } from "@/app/(admin)/dashboard/properties/actions"
import Map from "@/components/map"
import { faBed, faCar, faShower } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default async function PropertyPage({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const id = (await params).id
    const property = await getProperty(id)

    return (
        <div className="bg-gray-200 min-h-screen text-black">
            <section className="relative max-w-[100rem] mx-auto flex items-center justify-center">
                <div className="grid grid-cols-4 grid-rows-2 h-[40rem]">
                    <div className="col-span-2 row-span-2 border border-gray-100">
                        <img src="/images/properties/5.jpeg" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <div className="border border-gray-100">
                        <img src="/images/properties/kitchen.jpg" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <div className="border border-gray-100">
                        <img src="/images/properties/bedroom.jpg" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <div className="border border-gray-100">
                        <img src="/images/properties/bathroom.jpg" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <div className="border border-gray-100">
                        <img src="/images/properties/floorplan.avif" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                </div>
            </section>
            <section id="details" className="container max-auto my-10">
                <div className="relative space-y-2">
                    <h1 className="text-lg">{property.address}</h1>
                    <h3 className="text-2xl">${property.price.toLocaleString()}</h3>
                    <div className="flex text-gray-600 space-x-5">
                        <div className='flex gap-2'><FontAwesomeIcon icon={faBed} className='h-4 w-4' /> {property.beds} </div>
                        <div className='flex gap-2'><FontAwesomeIcon icon={faShower} className='h-4 w-4' /> {property.baths} </div>
                        <div className='flex gap-2'><FontAwesomeIcon icon={faCar} className='h-4 w-4' /> {property.carpark} </div>
                    </div>
                </div>
                <hr className="my-8 border-gray-400" />
                <div className="space-y-4">
                    <h2 className="text-lg">{property.title}</h2>
                    <p>{property.description}</p>
                    <ul className="list-disc list-inside">
                        {property.features.map((feature: string) => (
                            <li key={feature}>{feature}</li>
                        ))}    </ul>
                </div>
                <hr className="my-8 border-gray-400" />
                <div className="space-y-4 ">
                    <h2 className="text-xl">Details</h2>
                    <table className="w-full">
                        <tbody className="text-left">
                            <tr className="">
                                <th className="text-md font-medium py-1">Address</th>
                                <td>{property.address}</td>
                            </tr>
                            <tr className="">
                                <th className="text-md font-medium py-1">Property Type</th>
                                <td className="capitalize">{property.property_type}</td>
                            </tr>
                            <tr className="">
                                <th className="text-md font-medium py-1">Price</th>
                                <td>${property.price}</td>
                            </tr>

                            <tr className="">
                                <th className="text-md font-medium py-1">Category</th>
                                <td>{property.category}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="my-8 border-gray-400" />
                <div className="space-y-4 pb-20">
                    <h2 className="text-xl">Location</h2>
                    <Map longitude={property.longitude} latitude={property.latitude} />
                </div>
            </section>
        </div>
    )
}
