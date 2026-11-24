"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { resetPasswordAction } from "@/features/auth/actions";
import { PasswordField } from "@/features/auth/components/auth-fields";
import { initialFormState } from "@/lib/forms";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(
    resetPasswordAction,
    initialFormState,
  );
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-4">
        <FormAlert status="success">{state.message}</FormAlert>
        <Link href="/" className="text-sm underline">
          Continue to the site
        </Link>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      <PasswordField
        label="New password"
        autoComplete="new-password"
        hint="At least 8 characters."
        error={errors.password}
      />
      <PasswordField
        id="confirmPassword"
        label="Confirm new password"
        autoComplete="new-password"
        error={errors.confirmPassword}
      />
      <FormAlert status={state.status}>{state.message}</FormAlert>
      <SubmitButton pending={pending} pendingText="Updating…">
        Update password
      </SubmitButton>
    </form>
  );
}
