"use client";

import { useActionState } from "react";
import { FormAlert } from "@/components/forms/form-alert";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/features/contact/actions";
import type { ContactField } from "@/features/contact/schema";
import { initialFormState, type FormState } from "@/lib/forms";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    sendContactMessage,
    initialFormState as FormState<ContactField>,
  );
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="mt-8 rounded-md bg-gray-800 p-6">
        <FormAlert status="success">{state.message}</FormAlert>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="mt-8 space-y-6 rounded-md bg-gray-800 p-6"
    >
      <h2 className="text-lg">We&apos;re here to help</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="name" label="Name" error={errors.name}>
          {(aria) => (
            <Input
              {...aria}
              name="name"
              autoComplete="name"
              defaultValue={values.name}
              required
            />
          )}
        </FormField>
        <FormField id="email" label="Email" error={errors.email}>
          {(aria) => (
            <Input
              {...aria}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              required
            />
          )}
        </FormField>
      </div>
      <FormField id="phone" label="Phone (optional)" error={errors.phone}>
        {(aria) => (
          <Input
            {...aria}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
          />
        )}
      </FormField>
      <FormField id="message" label="Message" error={errors.message}>
        {(aria) => (
          <Textarea
            {...aria}
            name="message"
            rows={5}
            defaultValue={values.message}
            required
          />
        )}
      </FormField>
      {/* Honeypot field, hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <FormAlert status={state.status}>{state.message}</FormAlert>
      <SubmitButton
        pending={pending}
        pendingText="Sending…"
        variant="secondary"
      >
        Send message
      </SubmitButton>
    </form>
  );
}
