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
import { initialFormState } from "@/lib/forms";

export function SignInForm() {
  const [state, action, pending] = useActionState(
    signInAction,
    initialFormState,
  );
  // Errors from the email-link callback arrive as ?error=…
  const linkError = useSearchParams().get("error");
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      <FormAlert status="error">{!state.status && linkError}</FormAlert>
      <EmailField error={errors.email} defaultValue={state.values?.email} />
      <PasswordField autoComplete="current-password" error={errors.password} />
      <Link
        className="-mt-2 self-end text-xs underline"
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
