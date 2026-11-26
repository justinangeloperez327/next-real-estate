"use server";

import { createPublicClient } from "@/lib/supabase/public";
import { validateForm, type FormState } from "@/lib/forms";
import { contactSchema, type ContactField } from "@/features/contact/schema";

const SUCCESS: FormState<ContactField> = {
  status: "success",
  message: "Thanks, we've received your message and will be in touch soon.",
};

export async function sendContactMessage(
  _prev: FormState<ContactField>,
  formData: FormData,
): Promise<FormState<ContactField>> {
  // Bots that fill the hidden field get a fake success and nothing is stored.
  if (formData.get("website")) return SUCCESS;

  const form = validateForm(contactSchema, formData);
  if (!form.ok) return form.state;

  const { website: _honeypot, ...message } = form.data;
  const { error } = await createPublicClient()
    .from("contact_messages")
    .insert(message);

  if (error) {
    console.error("sendContactMessage failed:", error);
    return {
      status: "error",
      message: "We couldn't send your message. Please try again.",
      values: form.values,
    };
  }

  return SUCCESS;
}
