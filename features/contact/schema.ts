import { z } from "zod";

export const contactSchema = z.object({
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
    .max(5000, "Keep it under 5,000 characters"),
  // Honeypot: hidden from people, often filled in by bots.
  website: z.string().max(0).optional(),
});

export type ContactField = keyof z.input<typeof contactSchema>;
