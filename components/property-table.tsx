"use client";
import React from "react";
import { Property } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface PropertyTableProps {
  properties: Property[] | null;
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/properties/${id}`);
  };

  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead className="">#</TableHead>
          <TableHead className="">Title</TableHead>
          <TableHead className="">Address</TableHead>
          <TableHead className="">Bathrooms</TableHead>
          <TableHead className="">Bedrooms</TableHead>
          <TableHead className="">Carpark</TableHead>
          <TableHead className="">Pool</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {properties &&
          properties.map((property: Property, index) => (
            <TableRow
              key={property.id}
              onClick={() => handleRowClick(property.id)}
              className="group  cursor-pointer"
            >
              <TableCell className="">
                <div className="text-sm font-bold">{index + 1}</div>
              </TableCell>
              <TableCell className="">
                <div className="text-sm font-bold">{property.title}</div>
              </TableCell>
              <TableCell className="">
                <div className="text-sm ">{property.address}</div>
              </TableCell>
              <TableCell className="">
                <div className="text-sm ">{property.baths}</div>
              </TableCell>
              <TableCell className="">
                <div className="text-sm ">{property.beds}</div>
              </TableCell>
              <TableCell className="">
                <div className="text-sm ">{property.carpark}</div>
              </TableCell>
              <TableCell className="">
                <span className="text-sm">{property.pool ? "Yes" : "No"}</span>
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-white text-black">
                  ${property.price.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default PropertyTable;
