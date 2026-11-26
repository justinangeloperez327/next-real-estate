"use client";

import Form from "next/form";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronDownIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CATEGORY_OPTIONS,
  DEFAULT_LOCATION,
  PRICE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  RENT_PRICE_OPTIONS,
  ROOM_OPTIONS,
} from "@/features/properties/constants";
import { cn } from "@/lib/utils";

type Option = { text: string; value: string };

function FilterSelect({
  name,
  label,
  options,
  defaultValue,
  placeholder,
  onChange,
}: {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block min-w-0 text-sm font-medium">
      <span className="mb-1.5 block">{label}</span>
      <span className="relative block">
        <select
          name={name}
          defaultValue={defaultValue}
          onChange={
            onChange ? (event) => onChange(event.target.value) : undefined
          }
          className="h-11 w-full appearance-none rounded-md border border-input bg-card ps-3 pe-8 text-foreground focus-visible:border-ring"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value === "0" ? "" : option.value}
            >
              {option.text}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </span>
    </label>
  );
}

const filterNames = ["type", "beds", "baths", "minPrice", "maxPrice"];

export default function PropertySearch({
  compact = false,
}: {
  compact?: boolean;
}) {
  const params = useSearchParams();
  const filterKey = JSON.stringify(
    ["location", "category", ...filterNames].map((name) => params.get(name)),
  );
  return <SearchForm key={filterKey} params={params} compact={compact} />;
}

function SearchButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="gap-2 px-5">
      <SearchIcon aria-hidden className="size-4" />
      {pending ? "Searching…" : "Search properties"}
    </Button>
  );
}

function SearchForm({
  params,
  compact,
}: {
  params: URLSearchParams;
  compact: boolean;
}) {
  const get = (name: string) => params.get(name) ?? undefined;
  const initialCategory = get("category") === "rent" ? "rent" : "sale";
  const [category, setCategory] = useState<string>(initialCategory);
  const priceOptions = category === "rent" ? RENT_PRICE_OPTIONS : PRICE_OPTIONS;
  const sort = get("sort");

  return (
    <Form
      action="/properties"
      role="search"
      aria-label="Search homes"
      className={cn(
        "rounded-lg border bg-card p-4 text-card-foreground sm:p-5",
        compact && "border-t-2 border-t-brass shadow-sm",
      )}
    >
      {sort && <input type="hidden" name="sort" value={sort} />}
      <div
        className={cn(
          "grid items-end gap-3",
          compact
            ? "sm:grid-cols-[7rem_minmax(0,1.35fr)_minmax(0,1fr)_auto]"
            : "grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)_auto]",
        )}
      >
        <FilterSelect
          name="category"
          label="Buy or rent"
          options={CATEGORY_OPTIONS}
          defaultValue={initialCategory}
          onChange={setCategory}
        />
        <div className="min-w-0">
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
            placeholder={DEFAULT_LOCATION}
            defaultValue={get("location")}
            className="bg-card text-base sm:text-sm"
          />
        </div>
        {compact && (
          <FilterSelect
            name="type"
            label="Property type"
            options={PROPERTY_TYPE_OPTIONS}
            defaultValue={get("type")}
            placeholder="Any type"
          />
        )}
        <div className={cn("grid", !compact && "col-span-2 sm:col-span-1")}>
          <SearchButton />
        </div>
      </div>
      {!compact && (
        <details
          className="group mt-3 border-t pt-1"
          open={
            filterNames.some((name) =>
              Boolean(get(name) && get(name) !== "0"),
            ) || undefined
          }
        >
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md text-sm font-medium text-primary hover:underline [&::-webkit-details-marker]:hidden">
            <SlidersHorizontalIcon aria-hidden className="size-4" />
            Filters
            <ChevronDownIcon
              aria-hidden
              className="size-4 group-open:rotate-180"
            />
          </summary>
          <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 lg:grid-cols-5">
            <FilterSelect
              name="type"
              label="Property type"
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
            <FilterSelect
              key={`min-${category}`}
              name="minPrice"
              label="Min price"
              options={priceOptions}
              defaultValue={
                category === initialCategory ? get("minPrice") : undefined
              }
            />
            <FilterSelect
              key={`max-${category}`}
              name="maxPrice"
              label="Max price"
              options={priceOptions}
              defaultValue={
                category === initialCategory ? get("maxPrice") : undefined
              }
            />
          </div>
        </details>
      )}
    </Form>
  );
}
