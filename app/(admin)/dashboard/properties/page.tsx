import React from "react";
import PropertyTable from "@/components/property-table";
import { getProperties } from "./actions";
import { Button } from "@headlessui/react";
const DashboardProperties = async () => {
  const properties = (await getProperties()) || null;

  return (
    <>
      <div className="">
        <div className="text-2xl mb-4 px-4 py-2 rounded-md shadow-lg">
          Properties
        </div>
        <div className="max-w-full shadow-lg rounded-xl border border-gray-200 overflow-hidden px-6 py-4">
          <div className="flex justify-end mb-4">
            <a
              href="/dashboard/properties/create"
              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-400 text-black rounded-md"
            >
              Create Property
            </a>
          </div>
          <PropertyTable properties={properties} />
        </div>
      </div>
    </>
  );
};

export default DashboardProperties;
