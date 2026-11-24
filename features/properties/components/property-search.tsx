"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  priceRange,
  propertyFeatures,
  propertyTypes,
} from "@/features/properties/constants";

const fieldClass = "w-full bg-background text-foreground";

type Option = { text: string; value: string };

const selects: { name: string; label: string; options: Option[] }[] = [
  {
    name: "property_type",
    label: "Type",
    options: propertyTypes.map((t) => ({ text: t, value: t.toLowerCase() })),
  },
  { name: "beds", label: "Beds", options: propertyFeatures },
  { name: "baths", label: "Baths", options: propertyFeatures },
  { name: "carpark", label: "Car parks", options: propertyFeatures },
  { name: "minPrice", label: "Min price", options: priceRange },
  { name: "maxPrice", label: "Max price", options: priceRange },
];

/**
 * A plain GET form: next/form turns submission into a client-side navigation
 * to /properties?…, so no form library or validation code ships to the
 * browser. Filters are parsed on the server (features/properties/filters.ts).
 */
export default function PropertySearch() {
  const params = useSearchParams();

  return (
    <Form
      action="/properties"
      role="search"
      aria-label="Search properties"
      className="rounded-xl border bg-card p-4 text-left text-card-foreground shadow-lg sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="mb-1.5 block text-sm font-medium">
            Location
          </label>
          <Input
            id="search"
            name="search"
            type="search"
            placeholder="Suburb, street or address"
            defaultValue={params.get("search") ?? ""}
            className={fieldClass}
          />
        </div>
        <Button type="submit" className="sm:w-36">
          <SearchIcon aria-hidden className="mr-2 size-4" />
          Search
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {selects.map(({ name, label, options }) => (
          <div key={name}>
            <label
              id={`${name}-label`}
              className="mb-1.5 block text-sm font-medium text-muted-foreground"
            >
              {label}
            </label>
            <Select name={name} defaultValue={params.get(name) ?? undefined}>
              <SelectTrigger
                aria-labelledby={`${name}-label`}
                className={fieldClass}
              >
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </Form>
  );
}
