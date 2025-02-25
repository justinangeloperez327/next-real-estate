
import { createClient } from "@/utils/supabase/server";
import PropertyCard from "./property-card";

interface Property {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    beds: number,
    baths: number,
    carpark: number,
    address: string,
    city: string,
    imageUrl: string,
    title: string,
}

export default async function Featured() {
    const supabase = createClient()
    const { data } = await (await supabase).from('properties').select('*')
    const properties = data
    return (
        <section className="py-20 font-[Nimbus_Sans_L]">
            <div className="container mx-auto text-center tracking-wide">
                <h2 className="text-4xl mb-4">Properties We Love</h2>
                <h6 className="text-md mb-6">A selection of our favourite sales listings</h6>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 gap-y-10">
                    {properties && properties.slice(0, 3).map((property: Property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    )
}