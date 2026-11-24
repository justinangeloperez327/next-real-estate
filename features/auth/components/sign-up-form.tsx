"use client";

import { useActionState } from "react";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { signUpAction } from "@/features/auth/actions";
import {
  EmailField,
  PasswordField,
} from "@/features/auth/components/auth-fields";
import { useFieldValidation } from "@/components/forms/use-field-validation";
import { initialFormState } from "@/lib/forms";
import { signUpSchema } from "@/features/auth/schema";

export function SignUpForm() {
  const [state, action, pending] = useActionState(
    signUpAction,
    initialFormState,
  );
  const v = useFieldValidation(signUpSchema, state.fieldErrors);

  if (state.status === "success") {
    return <FormAlert status="success">{state.message}</FormAlert>;
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      <EmailField
        error={v.errorFor("email")}
        {...v.fieldProps("email")}
        defaultValue={state.values?.email}
      />
      <PasswordField
        autoComplete="new-password"
        hint="At least 8 characters."
        error={v.errorFor("password")}
        {...v.fieldProps("password")}
      />
      <FormAlert status={state.status}>{state.message}</FormAlert>
      <SubmitButton pending={pending} pendingText="Creating account…">
        Create account
      </SubmitButton>
    </form>
  );
}
