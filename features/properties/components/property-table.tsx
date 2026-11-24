import Link from "next/link";
import { Button } from "@/components/ui/button";
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

export function PropertyTable({
  properties,
  search,
}: {
  properties: Property[];
  search?: string;
}) {
  if (properties.length === 0 && search) {
    return (
      <div className="px-6 py-16 text-center">
        <h2 className="font-semibold">No listings match “{search}”</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Try part of the street or suburb name instead.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/dashboard/properties">Clear search</Link>
        </Button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <h2 className="font-semibold">No listings yet</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first listing and it will appear here and on the site.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard/properties/create">Create property</Link>
        </Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">Bedrooms</TableHead>
          <TableHead className="text-right">Bathrooms</TableHead>
          <TableHead className="text-right">Car parks</TableHead>
          <TableHead>Pool</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow
            key={property.id}
            className="relative has-[a:focus-visible]:bg-accent"
          >
            <TableCell className="font-medium">
              {/* The stretched link makes the whole row clickable and keyboard-accessible. */}
              <Link
                href={`/dashboard/properties/${property.id}`}
                className="text-primary underline-offset-4 after:absolute after:inset-0 hover:underline focus-visible:underline focus-visible:outline-hidden"
              >
                {property.title}
              </Link>
            </TableCell>
            <TableCell className="max-w-64 truncate text-muted-foreground">
              {property.address}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {property.beds}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {property.baths}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {property.carpark}
            </TableCell>
            <TableCell>{property.pool ? "Yes" : "No"}</TableCell>
            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums">
              {formatPrice(property.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
