"use client";

import { useState } from "react";
import type { z } from "zod";

type Errors = Record<string, string[] | null | undefined>;

/**
 * Client-side, per-field validation that follows the forms rules:
 * - nothing is shown while a pristine field is being typed in;
 * - a field is validated when it loses focus;
 * - its error clears as soon as the person edits it again.
 * Server errors (from the action's FormState) still show after submit,
 * and are hidden once the person edits that field.
 *
 * Only plain object schemas are validated per field; cross-field rules
 * (e.g. "passwords match") are checked on submit by the server action.
 */
export function useFieldValidation<Field extends string>(
  schema: z.ZodObject,
  serverErrors: Partial<Record<Field, string[]>> | undefined,
) {
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const [seenServerErrors, setSeenServerErrors] = useState(serverErrors);

  // A new submit result replaces any client-side state for its fields.
  if (seenServerErrors !== serverErrors) {
    setSeenServerErrors(serverErrors);
    setClientErrors({});
  }

  const validate = (name: string, value: string) => {
    const fieldSchema = schema.shape[name] as z.ZodType | undefined;
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(value);
    setClientErrors((prev) => ({
      ...prev,
      [name]: result.success ? null : result.error.issues.map((i) => i.message),
    }));
  };

  const clear = (name: string) =>
    setClientErrors((prev) =>
      prev[name] === null ? prev : { ...prev, [name]: null },
    );

  /** The error to display for a field, if any. */
  const errorFor = (name: Field): string[] | undefined => {
    const client = clientErrors[name];
    if (client === null) return undefined; // edited since: hide server error
    return client ?? serverErrors?.[name];
  };

  /** Spread onto an input/textarea. */
  const fieldProps = (name: Field) => ({
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Skip pristine fields the person only tabbed through.
      if (
        e.currentTarget.value === "" &&
        clientErrors[name] === undefined &&
        !serverErrors?.[name]
      )
        return;
      validate(name, e.currentTarget.value);
    },
    onChange: () => clear(name),
  });

  return { errorFor, fieldProps, validate, clear };
}
