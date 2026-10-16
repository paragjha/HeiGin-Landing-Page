import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { forwardLead } from "@/lib/lead-forwarding";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).default(""),
  company: z.string().trim().max(160).default(""),
  message: z.string().trim().max(4000).default(""),
});

/** Called from the contact form. Runs on the server so the API key stays private. */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    return forwardLead(data, {
      apiKey: process.env["HEIGIN_LEADS_API_KEY"],
      sheetWebhookUrl: process.env["LEADS_WEBHOOK_URL"] ?? import.meta.env["VITE_LEADS_WEBHOOK_URL"],
    });
  });
