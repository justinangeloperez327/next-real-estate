"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/features/auth/session";
import { tags } from "@/features/properties/queries";
import { createClient } from "@/lib/supabase/server";
import { validateForm, type FormState } from "@/lib/forms";
import {
  propertyIdSchema,
  propertyInputSchema,
  type PropertyField,
} from "@/features/properties/schema";

type PropertyFormState = FormState<PropertyField>;

/** Expire cached listings so every page shows the change immediately. */
function invalidate(id?: number) {
  updateTag(tags.all);
  if (id) updateTag(tags.one(id));
}

export async function createProperty(
  _prev: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  await requireAdmin();

  const form = validateForm(propertyInputSchema, formData);
  if (!form.ok) return form.state;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .insert(form.data)
    .select("id")
    .single();

  if (error) {
    console.error("createProperty failed:", error);
    return {
      status: "error",
      message: "Could not create the property. Please try again.",
      values: form.values,
    };
  }

  invalidate();
  redirect(`/dashboard/properties/${data.id}`);
}

export async function updateProperty(
  id: number,
  _prev: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  await requireAdmin();

  const propertyId = propertyIdSchema.parse(id);
  const form = validateForm(propertyInputSchema, formData);
  if (!form.ok) return form.state;

  const supabase = await createClient();
  const { error, count } = await supabase
    .from("properties")
    .update(form.data, { count: "exact" })
    .eq("id", propertyId);

  if (error || count === 0) {
    console.error("updateProperty failed:", error ?? "no rows updated");
    return {
      status: "error",
      message: "Could not save the property. Please try again.",
      values: form.values,
    };
  }

  invalidate(propertyId);
  redirect(`/dashboard/properties/${propertyId}`);
}

export async function deleteProperty(id: number): Promise<{ error?: string }> {
  await requireAdmin();

  const propertyId = propertyIdSchema.parse(id);
  const supabase = await createClient();
  const { error, count } = await supabase
    .from("properties")
    .delete({ count: "exact" })
    .eq("id", propertyId);

  if (error || count === 0) {
    console.error("deleteProperty failed:", error ?? "no rows deleted");
    return { error: "Could not delete the property. Please try again." };
  }

  invalidate(propertyId);
  redirect("/dashboard/properties");
}
