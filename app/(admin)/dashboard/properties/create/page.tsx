import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PropertyForm } from "@/features/properties/components/property-form";
import { createProperty } from "@/features/properties/actions";

export const metadata: Metadata = { title: "Create property" };

export default function CreatePropertyPage() {
  return (
    <>
      <PageHeader title="Create Property" />
      <div className="max-w-3xl rounded-md border px-6 py-6 shadow-lg">
        <PropertyForm
          action={createProperty}
          submitLabel="Create property"
          pendingLabel="Creating…"
        />
      </div>
    </>
  );
}
