import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/delete-button";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getProperty } from "@/lib/properties/queries";
import { formatPrice } from "@/lib/format";

export default async function AdminPropertyPage({
  params,
}: PageProps<"/dashboard/properties/[id]">) {
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
      <div className="max-w-3xl overflow-hidden rounded-lg border p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">{property.title}</h2>
        <p className="mb-6 whitespace-pre-line">{property.description}</p>
        <dl className="grid gap-4 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="font-semibold capitalize">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
