"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/features/auth/session";
import { tags } from "@/features/properties/queries";
import { createClient } from "@/lib/supabase/server";
import {
  propertyIdSchema,
  propertyInputSchema,
  type PropertyFormState,
} from "@/features/properties/schema";

function parseForm(formData: FormData) {
  const values = Object.fromEntries(
    [...formData.entries()]
      .filter(([key, v]) => typeof v === "string" && !key.startsWith("$"))
      .map(([key, v]) => [key, v as string]),
  );
  return { values, result: propertyInputSchema.safeParse(values) };
}

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

  const { values, result } = parseForm(formData);
  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors, values };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .insert(result.data)
    .select("id")
    .single();

  if (error) {
    console.error("createProperty failed:", error);
    return {
      error: "Could not create the property. Please try again.",
      values,
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
  const { values, result } = parseForm(formData);
  if (!result.success) {
    return { fieldErrors: z.flattenError(result.error).fieldErrors, values };
  }

  const supabase = await createClient();
  const { error, count } = await supabase
    .from("properties")
    .update(result.data, { count: "exact" })
    .eq("id", propertyId);

  if (error || count === 0) {
    console.error("updateProperty failed:", error ?? "no rows updated");
    return { error: "Could not save the property. Please try again.", values };
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
