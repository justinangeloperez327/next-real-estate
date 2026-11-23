import { Suspense } from "react";
import { TableSkeleton } from "@/features/properties/components/property-skeletons";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { PropertyForm } from "@/features/properties/components/property-form";
import { getProperty } from "@/features/properties/queries";
import { updateProperty } from "@/features/properties/actions";

export default function EditPropertyPage({
  params,
}: PageProps<"/dashboard/properties/[id]/edit">) {
  return (
    <Suspense fallback={<TableSkeleton rows={8} />}>
      <EditPropertyPageContent params={params} />
    </Suspense>
  );
}

async function EditPropertyPageContent({
  params,
}: Pick<PageProps<"/dashboard/properties/[id]/edit">, "params">) {
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
