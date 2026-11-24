import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PropertyForm } from "@/features/properties/components/property-form";
import { createProperty } from "@/features/properties/actions";

export const metadata: Metadata = { title: "Create property" };

export default function CreatePropertyPage() {
  return (
    <>
      <PageHeader title="Create Property" />
      <div className="max-w-3xl rounded-xl border bg-card p-6 sm:p-8">
        <PropertyForm
          action={createProperty}
          submitLabel="Create property"
          pendingLabel="Creating…"
        />
      </div>
    </>
  );
}
