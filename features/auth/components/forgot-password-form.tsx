"use client";

import { useActionState } from "react";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { forgotPasswordAction } from "@/features/auth/actions";
import { EmailField } from "@/features/auth/components/auth-fields";
import { useFieldValidation } from "@/components/forms/use-field-validation";
import { initialFormState } from "@/lib/forms";
import { forgotPasswordSchema } from "@/features/auth/schema";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    forgotPasswordAction,
    initialFormState,
  );
  const v = useFieldValidation(forgotPasswordSchema, state.fieldErrors);

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
      <FormAlert status={state.status}>{state.message}</FormAlert>
      <SubmitButton pending={pending} pendingText="Sending link…">
        Send reset link
      </SubmitButton>
    </form>
  );
}
