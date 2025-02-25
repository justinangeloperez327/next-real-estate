
import { getProperty } from "../actions"
import DeleteButton from "@/components/delete-button"

export default async function PropertyPage({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const id = (await params).id
    const property = await getProperty(id)
    const editLink = `/dashboard/properties/${id}/edit`

    return (
        <div className="p-4 min-h-screen bg-gray-200">
            {property ? (
                <>
                    <div className="text-2xl bg-background mb-4 px-4 py-2 rounded-md shadow-lg">Property Details</div>
                    <div className="w-1/2  bg-background shadow-lg rounded-lg overflow-hidden">
                        <div className="relative items-end p-4 flex justify-end">
                            <a href={editLink} className="px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-md">Edit</a>
                        </div>
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
                            <p className="mb-6">{property.description}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="">Address: </span>
                                    <span className=" font-semibold">{property.address}</span>
                                </div>
                                <div>
                                    <span className="">Price: </span>
                                    <span className=" font-semibold">${property.price}</span>
                                </div>
                                <div>
                                    <span className="">Location: </span>
                                    <span className=" font-semibold">{property.location}</span>
                                </div>
                                <div>
                                    <span className="">Bedrooms: </span>
                                    <span className=" font-semibold">{property.beds}</span>
                                </div>
                                <div>
                                    <span className="">Bathrooms: </span>
                                    <span className=" font-semibold">{property.baths}</span>
                                </div>
                                <div>
                                    <span className="">Car Park: </span>
                                    <span className=" font-semibold">{property.carpark}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative items-end p-4 flex justify-end">
                            <DeleteButton propertyId={id} />
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
        </div>
    )
}
