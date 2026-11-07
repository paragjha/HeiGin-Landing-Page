/**
 * Integration registry — the single source of truth for the integrations
 * shown on the marketing site.
 *
 * Status rules (2026-11-07):
 *  - "available" ONLY when the integration is implemented in the product app
 *    AND verified end-to-end with a pilot team.
 *  - "in-development" when work is scoped or started but not yet verified.
 *  - "planned" when it is on the roadmap but no work has started.
 *
 * Status audit (2026-11-07): Rows marked `in-development` below are listed as
 * needing app-side verification. A product-facts audit found no corresponding
 * code in the CRM app for Google Calendar, Google Meet, Slack, Notion, Linear,
 * HubSpot import or Salesforce import. They stay `in-development` until the
 * owner points to the merged PR that lands each surface.
 *
 * Outlook: in-development until HNCRM-101 ships and the integration is verified.
 * Jira: added as in-development so the home-page marquee and this directory agree.
 */

export type IntegrationStatus = "available" | "in-development" | "planned";

export type IntegrationCategory =
  | "Communication"
  | "Meetings"
  | "Email & Calendar"
  | "Knowledge & Documents"
  | "CRM Migration"
  | "Sales & Productivity"
  | "Lead Sources"
  | "Calling";

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  /** Two-letter monogram used in the icon tile. */
  monogram: string;
  description: string;
  status: IntegrationStatus;
  capabilities: string[];
  featured?: boolean;
}

export const integrationCategories: IntegrationCategory[] = [
  "Lead Sources",
  "Communication",
  "Calling",
  "Meetings",
  "Email & Calendar",
  "Knowledge & Documents",
  "CRM Migration",
  "Sales & Productivity",
];

export const statusLabels: Record<IntegrationStatus, string> = {
  available: "Available",
  "in-development": "In development",
  planned: "Planned",
};

export const integrations: Integration[] = [
  {
    id: "gmail",
    name: "Gmail",
    category: "Email & Calendar",
    monogram: "Gm",
    description: "Bring customer email threads into the timeline so agents can draft follow-ups with full context.",
    status: "available",
    capabilities: ["Email sync", "Follow-up drafting", "Timeline context"],
    featured: true,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "Email & Calendar",
    monogram: "Gc",
    description: "See meetings on the customer timeline and let agents spot meetings without a next step booked.",
    // AUDIT: no surface found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Meeting sync", "Scheduling signals"],
    featured: true,
  },
  {
    id: "google-meet",
    name: "Google Meet",
    category: "Meetings",
    monogram: "GM",
    description: "Attach meeting context and notes to the right customer record after each call.",
    // AUDIT: no surface found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Meeting notes", "Action item capture"],
    featured: true,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    monogram: "Sl",
    description: "Get agent suggestions and approval requests where your team already works.",
    // AUDIT: no surface found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Agent notifications", "Approval requests"],
    featured: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Communication",
    monogram: "Wa",
    description: "Bring WhatsApp conversations onto the customer timeline for teams that sell through messaging.",
    status: "in-development",
    capabilities: ["Conversation sync", "Timeline context"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge & Documents",
    monogram: "No",
    description: "Let agents use your team's playbooks and notes as context when proposing next steps.",
    // AUDIT: no surface found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Knowledge context", "Playbook lookup"],
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    category: "Email & Calendar",
    monogram: "Ol",
    description: "Email and calendar sync for Microsoft 365 teams.",
    // HNCRM-101: Outlook sync is tracked but not shipped.
    status: "in-development",
    capabilities: ["Email sync", "Calendar sync"],
  },
  {
    id: "hubspot-import",
    name: "HubSpot import",
    category: "CRM Migration",
    monogram: "Hs",
    description: "Bring companies, contacts, deals and timelines across when you switch.",
    // AUDIT: no import tooling found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Data import", "Field mapping"],
  },
  {
    id: "salesforce-import",
    name: "Salesforce import",
    category: "CRM Migration",
    monogram: "Sf",
    description: "Migrate accounts, opportunities and activity history into HeiGin.",
    // AUDIT: no import tooling found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Data import", "Field mapping"],
  },
  {
    id: "csv-import",
    name: "CSV import",
    category: "CRM Migration",
    monogram: "Cv",
    description: "Import contacts and companies from spreadsheets with guided column mapping.",
    status: "available",
    capabilities: ["Data import", "Column mapping"],
  },
  {
    id: "linear",
    name: "Linear",
    category: "Sales & Productivity",
    monogram: "Li",
    description: "Escalate customer issues into engineering tickets without losing the link to the customer.",
    // AUDIT: no surface found in the CRM app repo (2026-11-07).
    status: "in-development",
    capabilities: ["Issue escalation", "Status sync"],
  },
  {
    id: "jira",
    name: "Jira",
    category: "Sales & Productivity",
    monogram: "Jr",
    description: "Escalate customer issues into Jira tickets tied back to the customer record.",
    // Added 2026-11-07 so the home-page marquee and directory agree.
    status: "in-development",
    capabilities: ["Issue escalation", "Status sync"],
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Sales & Productivity",
    monogram: "Zp",
    description: "Connect HeiGin events to thousands of other tools for custom workflows.",
    status: "available",
    capabilities: ["Event triggers", "Custom workflows"],
  },

  // --- Lead sources (surfaced in the CRM app; marketing site added 2026-11-07) ---
  {
    id: "indiamart",
    name: "IndiaMART",
    category: "Lead Sources",
    monogram: "IM",
    description: "Enquiries from IndiaMART land as leads on the Inbox, with the buyer's details already attached.",
    status: "available",
    capabilities: ["Lead ingestion", "Buyer details"],
  },
  {
    id: "justdial",
    name: "JustDial",
    category: "Lead Sources",
    monogram: "JD",
    description: "JustDial enquiries come in as leads with the contact and enquiry text ready for a reply.",
    status: "available",
    capabilities: ["Lead ingestion", "Contact capture"],
  },
  {
    id: "facebook-leads",
    name: "Facebook Lead Ads",
    category: "Lead Sources",
    monogram: "Fb",
    description: "Facebook lead forms post directly to HeiGin — the lead lands with the form answers attached.",
    status: "available",
    capabilities: ["Form sync", "Campaign source"],
  },
  {
    id: "instagram-leads",
    name: "Instagram Lead Ads",
    category: "Lead Sources",
    monogram: "Ig",
    description: "Instagram lead forms arrive as leads tagged with the campaign that generated them.",
    status: "available",
    capabilities: ["Form sync", "Campaign source"],
  },
  {
    id: "missed-call",
    name: "Missed call",
    category: "Lead Sources",
    monogram: "Mc",
    description: "Missed-call numbers become leads automatically, so a hangup is still a conversation you can start.",
    status: "available",
    capabilities: ["Number capture", "Auto-callback trigger"],
  },

  // --- Calling ---
  {
    id: "exotel",
    name: "Exotel",
    category: "Calling",
    monogram: "Ex",
    description: "Cloud telephony for AI Calling — minutes included on the add-on, overage billed per the pricing page.",
    status: "available",
    capabilities: ["AI Calling", "Call routing", "Recording"],
  },
];
