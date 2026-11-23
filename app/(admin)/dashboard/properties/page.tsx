import { connection } from "next/server";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { PropertyTable } from "@/features/properties/components/property-table";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/features/properties/queries";

export const metadata: Metadata = { title: "Properties" };

export default async function DashboardPropertiesPage() {
  await connection(); // admin views always render at request time
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
