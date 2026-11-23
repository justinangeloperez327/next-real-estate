"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PropertyFormState, PropertyInput } from "@/lib/properties/schema";
import type { Property } from "@/lib/types";

type Action = (
  prev: PropertyFormState,
  formData: FormData,
) => Promise<PropertyFormState>;

type Props = {
  action: Action;
  property?: Property;
  submitLabel: string;
  pendingLabel: string;
};

export function PropertyForm({
  action,
  property,
  submitLabel,
  pendingLabel,
}: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  // After a failed submit, re-populate with what the user typed.
  const value = (name: keyof PropertyInput): string | undefined =>
    state.values?.[name] ?? property?.[name]?.toString();
  const errors = state.fieldErrors ?? {};

  const field = (
    name: keyof PropertyInput,
    label: string,
    input: React.ReactNode,
  ) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      {input}
      {errors[name]?.[0] && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {errors[name][0]}
        </p>
      )}
    </div>
  );

  const inputProps = (name: keyof PropertyInput) => ({
    id: name,
    name,
    defaultValue: value(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  // `key` forces uncontrolled inputs to pick up re-populated values.
  return (
    <form
      action={formAction}
      key={JSON.stringify(state.values ?? {})}
      className="flex flex-col gap-6"
      noValidate
    >
      {field("title", "Title", <Input {...inputProps("title")} required />)}
      {field(
        "description",
        "Description",
        <Textarea {...inputProps("description")} rows={5} required />,
      )}
      {field(
        "address",
        "Address",
        <Textarea {...inputProps("address")} rows={2} required />,
      )}
      {field(
        "price",
        "Price",
        <Input {...inputProps("price")} type="number" min={0} required />,
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {field(
          "beds",
          "Bedrooms",
          <Input {...inputProps("beds")} type="number" min={0} required />,
        )}
        {field(
          "baths",
          "Bathrooms",
          <Input {...inputProps("baths")} type="number" min={0} required />,
        )}
        {field(
          "carpark",
          "Car parks",
          <Input {...inputProps("carpark")} type="number" min={0} required />,
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {field(
          "property_type",
          "Property type",
          <Select name="property_type" defaultValue={value("property_type")}>
            <SelectTrigger id="property_type">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
            </SelectContent>
          </Select>,
        )}
        {field(
          "category",
          "Category",
          <Select name="category" defaultValue={value("category")}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For sale</SelectItem>
              <SelectItem value="rent">For rent</SelectItem>
            </SelectContent>
          </Select>,
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {field(
          "latitude",
          "Latitude",
          <Input {...inputProps("latitude")} inputMode="decimal" required />,
        )}
        {field(
          "longitude",
          "Longitude",
          <Input {...inputProps("longitude")} inputMode="decimal" required />,
        )}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="pool"
          defaultChecked={
            state.values ? state.values.pool === "on" : property?.pool
          }
          className="h-4 w-4 accent-primary"
        />
        Has a pool
      </label>

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
