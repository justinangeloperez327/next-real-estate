import Form from "next/form";
import Link from "next/link";
import type { Metadata } from "next";
import { SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertyTable } from "@/features/properties/components/property-table";
import { getProperties } from "@/features/properties/queries";

export const metadata: Metadata = { title: "Properties" };

export default async function DashboardPropertiesPage({
  searchParams,
}: PageProps<"/dashboard/properties">) {
  const { q } = await searchParams;
  const search = typeof q === "string" ? q.trim() : "";
  const properties = await getProperties(search ? { search } : {});

  return (
    <>
      <PageHeader
        title="Properties"
        description="Every listing on the public site."
        actions={
          <Button asChild>
            <Link href="/dashboard/properties/create">Create property</Link>
          </Button>
        }
      />
      <div className="overflow-hidden rounded-xl border bg-card">
        <Form
          action="/dashboard/properties"
          role="search"
          className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-center"
        >
          <label htmlFor="q" className="text-sm font-medium sm:sr-only">
            Search listings
          </label>
          <div className="relative w-full sm:max-w-sm">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="q"
              name="q"
              type="search"
              defaultValue={search}
              placeholder="Search by address"
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
          {search && (
            <Button asChild variant="ghost">
              <Link href="/dashboard/properties">Clear search</Link>
            </Button>
          )}
        </Form>
        <div className="overflow-x-auto">
          <PropertyTable properties={properties} search={search} />
        </div>
      </div>
    </>
  );
}
