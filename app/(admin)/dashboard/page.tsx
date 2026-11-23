import { connection } from "next/server";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getProperties } from "@/features/properties/queries";

export default async function DashboardPage() {
  await connection(); // admin views always render at request time
  const properties = await getProperties();
  const forSale = properties.filter((p) => p.category === "sale").length;
  const forRent = properties.filter((p) => p.category === "rent").length;

  const stats = [
    { label: "Total listings", value: properties.length },
    { label: "For sale", value: forSale },
    { label: "For rent", value: forRent },
  ];

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href="/dashboard/properties"
            className="rounded-xl border bg-muted/50 p-6 transition-colors hover:bg-muted"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
