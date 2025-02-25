import { createClient } from "@/utils/supabase/server"

import PropertyForm from "@/components/property-form"

export default async function PropertyCreatePage() {

    return (
        <div className="p-4 min-h-screen bg-gray-200 rounded-md">
            <div className="text-2xl bg-background mb-4 px-4 py-2 rounded-md shadow-lg">Create Property</div>
            <div className="w-full lg:w-1/2 bg-background shadow-lg rounded-md overflow-hidden px-6 py-4">
                <PropertyForm />
            </div>
        </div>
    )
}