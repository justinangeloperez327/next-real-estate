import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PropertyTable } from "@/components/property-table";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/properties/queries";

export const metadata: Metadata = { title: "Properties" };

export default async function DashboardPropertiesPage() {
  const properties = await getProperties();

  return (
    <>
      <PageHeader
        title="Properties"
        actions={
          <Button asChild>
            <Link href="/dashboard/properties/create">Create property</Link>
          </Button>
        }
      />
      <div className="max-w-full overflow-x-auto rounded-xl border px-6 py-4 shadow-lg">
        <PropertyTable properties={properties} />
      </div>
    </>
  );
}
