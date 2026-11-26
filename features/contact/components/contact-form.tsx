"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { DraftNotice } from "@/components/forms/draft-notice";
import { useFormDraft } from "@/components/forms/use-form-draft";
import { FormAlert } from "@/components/forms/form-alert";
import { FormField } from "@/components/forms/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/features/contact/actions";
import { useFieldValidation } from "@/components/forms/use-field-validation";
import {
  contactSchema,
  listingMessagePrefix,
  MAX_CONTACT_MESSAGE_LENGTH,
  type ContactField,
} from "@/features/contact/schema";
import { initialFormState, type FormState } from "@/lib/forms";

const draftExcludedFields = ["website"];

export function ContactForm({ listingId }: { listingId?: string }) {
  const [state, action, pending] = useActionState(
    sendContactMessage,
    initialFormState as FormState<ContactField>,
  );
  const v = useFieldValidation(contactSchema, state.fieldErrors);
  const values = state.values ?? {};
  const draftKey = listingId ? `draft:contact:${listingId}` : "draft:contact";
  const draft = useFormDraft(draftKey, { exclude: draftExcludedFields });
  const { clear } = draft;

  useEffect(() => {
    if (state.status === "success") clear();
  }, [state.status, clear]);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-t-2 border-t-brass bg-card p-6">
        <FormAlert status="success">{state.message}</FormAlert>
      </div>
    );
  }

  return (
    <form
      {...draft.formProps}
      action={action}
      noValidate
      className="space-y-5 rounded-lg border border-t-2 border-t-brass bg-card p-4 sm:p-8"
    >
      <h2 className="font-display text-3xl">Send us a message</h2>
      {listingId && (
        <>
          <input type="hidden" name="listingId" value={listingId} />
          <p className="text-sm text-muted-foreground">
            <Link
              href={`/properties/${listingId}`}
              className="text-primary underline underline-offset-4"
            >
              Listing reference {listingId}
            </Link>{" "}
            will be included in your message.
          </p>
        </>
      )}
      {draft.restored && <DraftNotice onDiscard={draft.discard} />}
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="name" label="Name" error={v.errorFor("name")}>
          {(aria) => (
            <Input
              {...aria}
              {...v.fieldProps("name")}
              name="name"
              autoComplete="name"
              defaultValue={values.name}
              required
            />
          )}
        </FormField>
        <FormField id="email" label="Email" error={v.errorFor("email")}>
          {(aria) => (
            <Input
              {...aria}
              {...v.fieldProps("email")}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              required
            />
          )}
        </FormField>
      </div>
      <FormField
        id="phone"
        label="Phone (optional)"
        error={v.errorFor("phone")}
      >
        {(aria) => (
          <Input
            {...aria}
            {...v.fieldProps("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
          />
        )}
      </FormField>
      <FormField id="message" label="Message" error={v.errorFor("message")}>
        {(aria) => (
          <Textarea
            {...aria}
            {...v.fieldProps("message")}
            name="message"
            rows={5}
            maxLength={
              MAX_CONTACT_MESSAGE_LENGTH -
              (listingId ? listingMessagePrefix(listingId).length : 0)
            }
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
        className="w-full sm:w-auto"
      >
        Send message
      </SubmitButton>
    </form>
  );
}
