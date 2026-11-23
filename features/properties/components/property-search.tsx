"use client";

import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  priceRange,
  propertyFeatures,
  propertyTypes,
} from "@/features/properties/constants";

const fieldClass = "w-full rounded-sm bg-white/80 py-1 text-lg text-black";

type Option = { text: string; value: string };

const selects: { name: string; label: string; options: Option[] }[] = [
  {
    name: "property_type",
    label: "Property Type",
    options: propertyTypes.map((t) => ({ text: t, value: t.toLowerCase() })),
  },
  { name: "beds", label: "Beds", options: propertyFeatures },
  { name: "baths", label: "Baths", options: propertyFeatures },
  { name: "carpark", label: "Carpark", options: propertyFeatures },
  { name: "minPrice", label: "Min Price", options: priceRange },
  { name: "maxPrice", label: "Max Price", options: priceRange },
];

/**
 * A plain GET form: next/form turns submission into a client-side navigation
 * to /properties?…, so no form library or validation code ships to the
 * browser. Filters are parsed on the server (features/properties/filters.ts).
 */
export default function PropertySearch() {
  const params = useSearchParams();

  return (
    <Form action="/properties">
      <label htmlFor="search" className="sr-only">
        Search by address
      </label>
      <Input
        id="search"
        name="search"
        placeholder="Search Address"
        defaultValue={params.get("search") ?? ""}
        className={fieldClass}
      />
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {selects.map(({ name, label, options }) => (
          <Select
            key={name}
            name={name}
            defaultValue={params.get(name) ?? undefined}
          >
            <SelectTrigger aria-label={label} className={fieldClass}>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>
      <Button
        type="submit"
        className="mt-4 w-full bg-rose-600 text-lg hover:bg-rose-500 lg:w-1/2"
      >
        Search
      </Button>
    </Form>
  );
}
