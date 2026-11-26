import { z } from "zod";
import { LISTING_ID_PATTERN } from "@/features/properties/constants";

export const listingIdSchema = z.string().regex(LISTING_ID_PATTERN);
export const MAX_CONTACT_MESSAGE_LENGTH = 5000;

export function listingMessagePrefix(listingId: string): string {
  return `Listing reference: /properties/${listingId}\n\n`;
}

export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name").max(120),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email({ error: "Enter a valid email address" })),
    phone: z
      .string()
      .trim()
      .max(40)
      .regex(/^[\d\s()+-]*$/, "Use digits, spaces and + ( ) - only")
      .optional()
      .transform((v) => v || null),
    message: z
      .string()
      .trim()
      .min(10, "Tell us a little more (at least 10 characters)")
      .max(MAX_CONTACT_MESSAGE_LENGTH, "Keep it under 5,000 characters"),
    listingId: listingIdSchema.optional(),
    // Honeypot: hidden from people, often filled in by bots.
    website: z.string().max(0).optional(),
  })
  .superRefine(({ listingId, message }, ctx) => {
    if (!listingId) return;
    const limit =
      MAX_CONTACT_MESSAGE_LENGTH - listingMessagePrefix(listingId).length;
    if (message.length > limit) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: `Keep the message to ${limit.toLocaleString("en-US")} characters.`,
      });
    }
  });

export type ContactField = keyof z.input<typeof contactSchema>;
