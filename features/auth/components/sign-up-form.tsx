"use client";

import { useActionState } from "react";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { signUpAction } from "@/features/auth/actions";
import {
  EmailField,
  PasswordField,
} from "@/features/auth/components/auth-fields";
import { initialFormState } from "@/lib/forms";

export function SignUpForm() {
  const [state, action, pending] = useActionState(
    signUpAction,
    initialFormState,
  );
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return <FormAlert status="success">{state.message}</FormAlert>;
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      <EmailField error={errors.email} defaultValue={state.values?.email} />
      <PasswordField
        autoComplete="new-password"
        hint="At least 8 characters."
        error={errors.password}
      />
      <FormAlert status={state.status}>{state.message}</FormAlert>
      <SubmitButton pending={pending} pendingText="Creating account…">
        Create account
      </SubmitButton>
    </form>
  );
}
