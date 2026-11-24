"use client";

import { useActionState } from "react";
import { DraftNotice } from "@/components/forms/draft-notice";
import { useFormDraft } from "@/components/forms/use-form-draft";
import { FormAlert } from "@/components/forms/form-alert";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFieldValidation } from "@/components/forms/use-field-validation";
import {
  propertyInputSchema,
  type PropertyField,
} from "@/features/properties/schema";
import type { Property } from "@/features/properties/types";
import { initialFormState, type FormState } from "@/lib/forms";

type State = FormState<PropertyField>;

type Props = {
  action: (prev: State, formData: FormData) => Promise<State>;
  property?: Property;
  submitLabel: string;
  pendingLabel: string;
};

const PROPERTY_TYPE_OPTIONS = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
];
const CATEGORY_OPTIONS = [
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
];

export function PropertyForm({
  action,
  property,
  submitLabel,
  pendingLabel,
}: Props) {
  const [state, formAction, pending] = useActionState(
    action,
    initialFormState as State,
  );
  const v = useFieldValidation(propertyInputSchema, state.fieldErrors);
  // Only new listings keep a local draft; edits start from saved data.
  // The draft is cleared on submit (success redirects away; a failed
  // submit re-populates the form from the server's echoed values).
  const draft = useFormDraft("draft:property:new", { enabled: !property });

  // After a failed submit, re-populate with what the user typed.
  const value = (name: PropertyField): string | undefined =>
    state.values ? state.values[name] : property?.[name]?.toString();

  const text = (
    name: PropertyField,
    label: string,
    props: React.ComponentProps<typeof Input> = {},
  ) => (
    <FormField id={name} label={label} error={v.errorFor(name)}>
      {(aria) => (
        <Input
          {...aria}
          {...props}
          {...v.fieldProps(name)}
          name={name}
          defaultValue={value(name)}
        />
      )}
    </FormField>
  );

  const textarea = (name: PropertyField, label: string, rows: number) => (
    <FormField id={name} label={label} error={v.errorFor(name)}>
      {(aria) => (
        <Textarea
          {...aria}
          {...v.fieldProps(name)}
          name={name}
          rows={rows}
          defaultValue={value(name)}
          required
        />
      )}
    </FormField>
  );

  const select = (
    name: PropertyField,
    label: string,
    options: { value: string; label: string }[],
  ) => (
    <FormField id={name} label={label} error={v.errorFor(name)}>
      {(aria) => (
        <Select
          name={name}
          defaultValue={value(name) ?? defaults[name]}
          onValueChange={() => v.clear(name)}
        >
          <SelectTrigger {...aria}>
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  );

  // Inferred defaults for new listings (most are houses for sale).
  const defaults: Partial<Record<PropertyField, string>> = property
    ? {}
    : { property_type: "house", category: "sale" };

  const count = { type: "number", min: 0, step: 1, required: true } as const;

  return (
    // `key` remounts the uncontrolled inputs so re-populated values show.
    <form
      {...draft.formProps}
      key={JSON.stringify(state.values ?? {})}
      action={formAction}
      onSubmit={draft.clear}
      noValidate
      className="flex flex-col gap-6"
    >
      {draft.restored && <DraftNotice onDiscard={draft.discard} />}
      {text("title", "Title", { required: true })}
      {textarea("description", "Description", 5)}
      {textarea("address", "Address", 2)}
      {text("price", "Price", { ...count })}

      <div className="grid gap-4 sm:grid-cols-3">
        {text("beds", "Bedrooms", count)}
        {text("baths", "Bathrooms", count)}
        {text("carpark", "Car parks", count)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {select("property_type", "Property type", PROPERTY_TYPE_OPTIONS)}
        {select("category", "Category", CATEGORY_OPTIONS)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {text("latitude", "Latitude", { inputMode: "decimal", required: true })}
        {text("longitude", "Longitude", {
          inputMode: "decimal",
          required: true,
        })}
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

      <FormAlert status={state.status}>{state.message}</FormAlert>

      <SubmitButton
        pending={pending}
        pendingText={pendingLabel}
        className="self-start"
      >
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
