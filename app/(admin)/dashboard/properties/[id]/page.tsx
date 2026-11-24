import { Suspense } from "react";
import { TableSkeleton } from "@/features/properties/components/property-skeletons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/features/properties/components/delete-property-button";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { getProperty } from "@/features/properties/queries";
import { formatPrice } from "@/lib/format";

export default function AdminPropertyPage({
  params,
}: PageProps<"/dashboard/properties/[id]">) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AdminPropertyPageContent params={params} />
    </Suspense>
  );
}

async function AdminPropertyPageContent({
  params,
}: Pick<PageProps<"/dashboard/properties/[id]">, "params">) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  const details: [string, React.ReactNode][] = [
    ["Address", property.address],
    ["Price", formatPrice(property.price)],
    ["Bedrooms", property.beds],
    ["Bathrooms", property.baths],
    ["Car parks", property.carpark],
    ["Pool", property.pool ? "Yes" : "No"],
    ["Property type", property.property_type],
    ["Category", property.category === "rent" ? "For rent" : "For sale"],
    ["Coordinates", `${property.latitude}, ${property.longitude}`],
  ];

  return (
    <>
      <PageHeader
        title="Property Details"
        actions={
          <>
            <Button asChild variant="outline">
              <Link href={`/dashboard/properties/${property.id}/edit`}>
                Edit
              </Link>
            </Button>
            <DeleteButton propertyId={property.id} title={property.title} />
          </>
        }
      />
      <div className="max-w-3xl rounded-xl border bg-card p-6 sm:p-8">
        <h2 className="mb-2 text-2xl font-semibold">{property.title}</h2>
        <p className="mb-8 max-w-prose whitespace-pre-line text-muted-foreground">
          {property.description}
        </p>
        <dl className="grid gap-4 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 font-medium capitalize tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
