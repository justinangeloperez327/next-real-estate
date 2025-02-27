"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Property } from "@/lib/types";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";

export const getProperties = async () => {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("properties")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return false;
  }

  return data;
};

export const getProperty = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("properties")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    return false;
  }

  return data;
};

export const createProperty = async (formData: FormData) => {
  const supabase = createClient();
  const { data, error } = await (await supabase).from("properties").insert({
    property_type: formData.get("property_type")?.toString(),
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    price: formData.get("price")
      ? parseInt(formData.get("price") as string)
      : 0,
    beds: formData.get("beds") ? parseInt(formData.get("beds") as string) : 0,
    baths: formData.get("baths")
      ? parseInt(formData.get("baths") as string)
      : 0,
    carpark: formData.get("carpark")
      ? parseInt(formData.get("carpark") as string)
      : 0,
    pool: formData.get("pool") === "true",
    category: formData.get("category")?.toString(),
    address: formData.get("address")?.toString(),
    longitude: formData.get("longitude")
      ? parseFloat(formData.get("longitude") as string)
      : 0,
    latitude: formData.get("latitude")
      ? parseFloat(formData.get("latitude") as string)
      : 0,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/properties/create",
      error.message
    );
  }
  return redirect("/dashboard/properties");
};

export const updateProperty = async (formData: FormData) => {
  const supabase = createClient();
  const { data, error } = await (
    await supabase
  )
    .from("properties")
    .update({
      property_type: formData.get("propertyType")?.toString(),
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      price: formData.get("price")
        ? parseInt(formData.get("price") as string)
        : 0,
      beds: formData.get("beds") ? parseInt(formData.get("beds") as string) : 0,
      baths: formData.get("baths")
        ? parseInt(formData.get("baths") as string)
        : 0,
      carpark: formData.get("carpark")
        ? parseInt(formData.get("carpark") as string)
        : 0,
      pool: formData.get("pool") === "true",
      category: formData.get("category")?.toString(),
      address: formData.get("address")?.toString(),
    })
    .eq("id", formData.get("id") as string);

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/properties/create",
      error.message
    );
  }
  return redirect("/dashboard/properties");
};

export const deleteProperty = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    return false;
  }

  revalidatePath("/dashboard/properties");

  return true;
};
