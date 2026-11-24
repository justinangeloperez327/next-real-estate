"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { signInAction } from "@/features/auth/actions";
import {
  EmailField,
  PasswordField,
} from "@/features/auth/components/auth-fields";
import { useFieldValidation } from "@/components/forms/use-field-validation";
import { initialFormState } from "@/lib/forms";
import { signInSchema } from "@/features/auth/schema";

export function SignInForm() {
  const [state, action, pending] = useActionState(
    signInAction,
    initialFormState,
  );
  const v = useFieldValidation(signInSchema, state.fieldErrors);
  // Errors from the email-link callback arrive as ?error=…
  const linkError = useSearchParams().get("error");

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      <FormAlert status="error">{!state.status && linkError}</FormAlert>
      <EmailField
        error={v.errorFor("email")}
        {...v.fieldProps("email")}
        defaultValue={state.values?.email}
      />
      <PasswordField
        autoComplete="current-password"
        error={v.errorFor("password")}
        {...v.fieldProps("password")}
      />
      <Link
        className="-mt-3 inline-flex h-11 items-center self-end text-sm underline underline-offset-4"
        href="/forgot-password"
      >
        Forgot password?
      </Link>
      <FormAlert status={state.status}>{state.message}</FormAlert>
      <SubmitButton pending={pending} pendingText="Signing in…">
        Sign in
      </SubmitButton>
    </form>
  );
}
