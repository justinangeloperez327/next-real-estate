import { createClient } from "@/utils/supabase/server"
import { Property } from "@/lib/types"
import PropertyForm from "@/components/property-form"

export default async function PropertyEditPage({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const id = (await params).id
    const supabase = createClient()
    const { data: property } = await (await supabase).from('properties').select('*').eq('id', id).limit(1).single()

    return (
        <div className="p-4 min-h-screen bg-gray-200 rounded-md">
            {property ? (
                <>
                    <div className="text-2xl bg-background mb-4 px-4 py-2 rounded-md shadow-lg">Edit Property Details</div>
                    <div className="w-1/2 bg-background shadow-lg rounded-md overflow-hidden px-6 py-4">
                        <PropertyForm property={property as Property} />
                    </div>
                </>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
        </div>
    )
}