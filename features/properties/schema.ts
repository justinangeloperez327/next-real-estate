import { z } from "zod";
import {
  PROPERTY_CATEGORIES,
  PROPERTY_TYPES,
} from "@/features/properties/types";

/**
 * A number from a form field. Blank input is "required", not 0 (plain
 * z.coerce.number() turns "" into 0 and silently accepts it).
 */
function numberField(requiredMessage: string) {
  return z.preprocess(
    (v) =>
      typeof v === "string" ? (v.trim() === "" ? undefined : Number(v)) : v,
    z.number({
      error: (issue) =>
        issue.input === undefined ? requiredMessage : "Enter a number",
    }),
  );
}

const count = (label: string) =>
  numberField(`Enter the number of ${label}`).pipe(
    z
      .number()
      .int("Use a whole number")
      .min(0, "Use 0 or more")
      .max(100, "Use 100 or fewer"),
  );

export const propertyInputSchema = z.object({
  title: z.string().trim().min(1, "Enter a title").max(200),
  description: z.string().trim().min(1, "Enter a description").max(5000),
  address: z.string().trim().min(1, "Enter the address").max(500),
  price: numberField("Enter a price").pipe(
    z.number().int("Use a whole number").min(0, "Use 0 or more"),
  ),
  beds: count("bedrooms"),
  baths: count("bathrooms"),
  carpark: count("car parks"),
  // Checkboxes submit "on" when checked and nothing when unchecked.
  pool: z.preprocess((v) => v === "on" || v === "true", z.boolean()),
  property_type: z.enum(PROPERTY_TYPES, { error: "Select a property type" }),
  category: z.enum(PROPERTY_CATEGORIES, { error: "Select a category" }),
  latitude: numberField("Enter the latitude").pipe(
    z
      .number()
      .min(-90, "Use a value from -90 to 90")
      .max(90, "Use a value from -90 to 90"),
  ),
  longitude: numberField("Enter the longitude").pipe(
    z
      .number()
      .min(-180, "Use a value from -180 to 180")
      .max(180, "Use a value from -180 to 180"),
  ),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;

export const propertyIdSchema = z.coerce.number().int().positive();

export type PropertyField = keyof PropertyInput;
