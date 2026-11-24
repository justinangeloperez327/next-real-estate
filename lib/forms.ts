import { z } from "zod";

/**
 * State returned by every form server action and consumed with
 * React's useActionState. `values` echoes non-sensitive input back so the
 * form can be re-populated after a failed submit.
 */
export type FormState<Field extends string = string> = {
  status?: "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<Field, string[]>>;
  values?: Partial<Record<Field, string>>;
};

export const initialFormState: FormState = {};

/** Reads the string fields of a FormData, skipping React's internal `$` keys. */
export function readFormData(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$")) values[key] = value;
  }
  return values;
}

type Validated<S extends z.ZodType> =
  | { ok: true; data: z.output<S>; values: Record<string, string> }
  | { ok: false; state: FormState<Extract<keyof z.input<S>, string>> };

/**
 * Validates FormData against a zod object schema. On failure returns a
 * FormState with per-field errors, echoing back every field except those in
 * `sensitive` (e.g. passwords).
 */
export function validateForm<S extends z.ZodType>(
  schema: S,
  formData: FormData,
  { sensitive = [] }: { sensitive?: string[] } = {},
): Validated<S> {
  const values = readFormData(formData);
  const result = schema.safeParse(values);
  if (result.success) return { ok: true, data: result.data, values };

  const echoed = Object.fromEntries(
    Object.entries(values).filter(([key]) => !sensitive.includes(key)),
  );
  type Field = Extract<keyof z.input<S>, string>;
  return {
    ok: false,
    state: {
      status: "error",
      fieldErrors: z.flattenError(result.error)
        .fieldErrors as FormState<Field>["fieldErrors"],
      values: echoed as FormState<Field>["values"],
    },
  };
}
