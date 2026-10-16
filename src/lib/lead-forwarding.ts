/**
 * Server-side lead forwarding. Imported only from the server function in
 * `submit-lead.ts`, so the API key never reaches the browser bundle.
 *
 * A lead goes to two places in parallel:
 *  - the HeiGin inbound leads API (primary; accepts name, email, phone, company only)
 *  - the Google Sheet webhook (backup; also keeps the free-text message)
 * The visitor sees success if either one accepted the lead.
 */

export const LEADS_API_URL = "https://api.heigin.com/integrations/inbound/leads";
const TIMEOUT_MS = 8000;

export interface Lead {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface LeadEnv {
  /** Value for the X-Api-Key header. Server-only secret. */
  apiKey?: string | undefined;
  /** Google Apps Script web app URL. */
  sheetWebhookUrl?: string | undefined;
  /** Override for tests. */
  apiUrl?: string | undefined;
}

export type LeadResult =
  | { ok: true; crm: boolean; sheet: boolean }
  | { ok: false; reason: "not_configured" | "failed" };

type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

async function sendToCrm(lead: Lead, env: LeadEnv, doFetch: FetchLike): Promise<boolean> {
  // The inbound API rejects unknown properties and has no field for a message.
  const body: { name: string; email: string; phone?: string; company?: string } = {
    name: lead.name,
    email: lead.email,
  };
  if (lead.phone) body.phone = lead.phone;
  if (lead.company) body.company = lead.company;

  try {
    const res = await doFetch(env.apiUrl ?? LEADS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": env.apiKey as string },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 300);
      console.error(`[leads] HeiGin API rejected lead: ${res.status} ${detail}`);
    }
    return res.ok;
  } catch (err) {
    console.error("[leads] HeiGin API request failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

async function sendToSheet(lead: Lead, url: string, doFetch: FetchLike): Promise<boolean> {
  try {
    // Apps Script answers the POST with a redirect to the result; fetch follows it.
    const res = await doFetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[leads] Sheet webhook returned ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[leads] Sheet webhook failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function forwardLead(
  lead: Lead,
  env: LeadEnv,
  doFetch: FetchLike = fetch,
): Promise<LeadResult> {
  if (!env.apiKey && !env.sheetWebhookUrl) return { ok: false, reason: "not_configured" };

  const [crm, sheet] = await Promise.all([
    env.apiKey ? sendToCrm(lead, env, doFetch) : Promise.resolve(false),
    env.sheetWebhookUrl ? sendToSheet(lead, env.sheetWebhookUrl, doFetch) : Promise.resolve(false),
  ]);

  return crm || sheet ? { ok: true, crm, sheet } : { ok: false, reason: "failed" };
}
