import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/features/properties/types";

export function PropertyTable({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        No properties yet. Create your first listing to see it here.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Bedrooms</TableHead>
          <TableHead>Bathrooms</TableHead>
          <TableHead>Car parks</TableHead>
          <TableHead>Pool</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property, index) => (
          <TableRow key={property.id} className="relative">
            <TableCell className="font-bold">{index + 1}</TableCell>
            <TableCell className="font-bold">
              {/* The stretched link makes the whole row clickable and keyboard-accessible. */}
              <Link
                href={`/dashboard/properties/${property.id}`}
                className="after:absolute after:inset-0 hover:underline"
              >
                {property.title}
              </Link>
            </TableCell>
            <TableCell>{property.address}</TableCell>
            <TableCell>{property.beds}</TableCell>
            <TableCell>{property.baths}</TableCell>
            <TableCell>{property.carpark}</TableCell>
            <TableCell>{property.pool ? "Yes" : "No"}</TableCell>
            <TableCell className="whitespace-nowrap text-right">
              {formatPrice(property.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
