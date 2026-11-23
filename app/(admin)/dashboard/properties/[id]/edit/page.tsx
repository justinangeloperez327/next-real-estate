import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PropertyForm } from "@/components/property-form";
import { getProperty } from "@/lib/properties/queries";
import { updateProperty } from "../../actions";

export default async function EditPropertyPage({
  params,
}: PageProps<"/dashboard/properties/[id]/edit">) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  return (
    <>
      <PageHeader title="Edit Property" />
      <div className="max-w-3xl rounded-md border px-6 py-6 shadow-lg">
        <PropertyForm
          action={updateProperty.bind(null, property.id)}
          property={property}
          submitLabel="Save changes"
          pendingLabel="Saving…"
        />
      </div>
    </>
  );
}
