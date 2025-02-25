

import React from 'react'
import PropertyTable from '@/components/property-table'
import { getProperties } from './actions'
import { Button } from '@headlessui/react';
const DashboardProperties = async () => {

    const properties = await getProperties() || null;

    return (
        <>
            <div className="p-4 min-h-screen bg-gray-200 rounded-md">
                <div className="text-2xl bg-background mb-4 px-4 py-2 rounded-md shadow-lg">Properties</div>
                <div className="max-w-full bg-background shadow-lg rounded-md overflow-hidden px-6 py-4">
                    <div className="flex justify-end mb-4">
                        <a href="/dashboard/properties/create" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-md">Create Property</a>
                    </div>
                    <PropertyTable properties={properties} />
                </div>

            </div >
        </>

    )
}

export default DashboardProperties