import { z } from "zod";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_TYPES,
} from "@/features/properties/types";

const count = z.coerce
  .number({ error: "Must be a number" })
  .int("Must be a whole number")
  .min(0, "Cannot be negative")
  .max(100, "Too large");

export const propertyInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(5000),
  address: z.string().trim().min(1, "Address is required").max(500),
  price: z.coerce
    .number({ error: "Must be a number" })
    .int("Must be a whole number")
    .min(0, "Cannot be negative"),
  beds: count,
  baths: count,
  carpark: count,
  // Checkboxes submit "on" when checked and nothing when unchecked.
  pool: z.preprocess((v) => v === "on" || v === "true", z.boolean()),
  property_type: z.enum(PROPERTY_TYPES, { error: "Select a property type" }),
  category: z.enum(PROPERTY_CATEGORIES, { error: "Select a category" }),
  latitude: z.coerce
    .number({ error: "Must be a number" })
    .min(-90, "Must be between -90 and 90")
    .max(90, "Must be between -90 and 90"),
  longitude: z.coerce
    .number({ error: "Must be a number" })
    .min(-180, "Must be between -180 and 180")
    .max(180, "Must be between -180 and 180"),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;

export const propertyIdSchema = z.coerce.number().int().positive();

export type PropertyField = keyof PropertyInput;
