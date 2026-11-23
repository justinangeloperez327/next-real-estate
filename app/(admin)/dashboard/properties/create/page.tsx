import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PropertyForm } from "@/components/property-form";
import { createProperty } from "../actions";

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
