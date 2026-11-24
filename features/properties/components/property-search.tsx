"use client";

import Form from "next/form";
import { useState } from "react";
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
  CATEGORY_OPTIONS,
  DEFAULT_LOCATION,
  PRICE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  RENT_PRICE_OPTIONS,
  ROOM_OPTIONS,
} from "@/features/properties/constants";

const fieldClass = "w-full bg-background text-foreground";

type Option = { text: string; value: string };

function FilterSelect({
  name,
  label,
  options,
  defaultValue,
  placeholder = "Any",
  onValueChange,
}: {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div>
      <label
        id={`${name}-label`}
        className="mb-1.5 block text-sm font-medium text-muted-foreground"
      >
        {label}
      </label>
      <Select
        name={name}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger aria-labelledby={`${name}-label`} className={fieldClass}>
          <SelectValue placeholder={placeholder} />
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
  );
}

/**
 * A plain GET form: next/form turns submission into a client-side navigation
 * to /properties?…, so no form library ships to the browser. Filters are
 * validated and mapped to RealtyAPI on the server (features/properties/filters.ts).
 */
export default function PropertySearch() {
  const params = useSearchParams();
  const get = (name: string) => params.get(name) ?? undefined;
  const [category, setCategory] = useState(get("category") ?? "sale");
  const priceOptions = category === "rent" ? RENT_PRICE_OPTIONS : PRICE_OPTIONS;

  return (
    <Form
      action="/properties"
      role="search"
      aria-label="Search homes"
      className="rounded-xl border bg-card p-4 text-left text-card-foreground shadow-lg sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="location"
            className="mb-1.5 block text-sm font-medium"
          >
            Location
          </label>
          <Input
            id="location"
            name="location"
            type="search"
            autoComplete="address-level2"
            placeholder={`City, ZIP or neighborhood, e.g. ${DEFAULT_LOCATION}`}
            defaultValue={get("location") ?? ""}
            className={fieldClass}
          />
        </div>
        <Button type="submit" className="sm:w-36">
          <SearchIcon aria-hidden className="mr-2 size-4" />
          Search
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <FilterSelect
          name="category"
          label="Buy or rent"
          options={CATEGORY_OPTIONS}
          defaultValue={category}
          onValueChange={setCategory}
        />
        <FilterSelect
          name="type"
          label="Type"
          options={PROPERTY_TYPE_OPTIONS}
          defaultValue={get("type")}
          placeholder="Any type"
        />
        <FilterSelect
          name="beds"
          label="Beds"
          options={ROOM_OPTIONS}
          defaultValue={get("beds")}
        />
        <FilterSelect
          name="baths"
          label="Baths"
          options={ROOM_OPTIONS}
          defaultValue={get("baths")}
        />
        {/* Price lists differ for buying and renting; remount on switch. */}
        <FilterSelect
          key={`min-${category}`}
          name="minPrice"
          label="Min price"
          options={priceOptions}
          defaultValue={get("minPrice")}
        />
        <FilterSelect
          key={`max-${category}`}
          name="maxPrice"
          label="Max price"
          options={priceOptions}
          defaultValue={get("maxPrice")}
        />
      </div>
    </Form>
  );
}
