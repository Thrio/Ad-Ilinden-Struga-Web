import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(5000),
  company_name: z.string().optional().default(""),
  rendered_at: z.coerce.number(),
  turnstileToken: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
