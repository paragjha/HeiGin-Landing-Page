/**
 * Integration registry — the single source of truth for the integrations
 * shown on the marketing site.
 *
 * Status rules (keep honest):
 * - "available": the integration is implemented and verified.
 * - "in-development": actively being built.
 * - "planned": on the roadmap, not started.
 *
 * Per the HeiGin team, all integrations below are developed and available.
 * Update a status if one is pulled back into development.
 */

export type IntegrationStatus = "available" | "in-development" | "planned";

export type IntegrationCategory =
  | "Communication"
  | "Meetings"
  | "Email & Calendar"
  | "Knowledge & Documents"
  | "CRM Migration"
  | "Sales & Productivity";

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
  "Communication",
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
    status: "available",
    capabilities: ["Meeting sync", "Scheduling signals"],
    featured: true,
  },
  {
    id: "google-meet",
    name: "Google Meet",
    category: "Meetings",
    monogram: "GM",
    description: "Attach meeting context and notes to the right customer record after each call.",
    status: "available",
    capabilities: ["Meeting notes", "Action item capture"],
    featured: true,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    monogram: "Sl",
    description: "Get agent suggestions and approval requests where your team already works.",
    status: "available",
    capabilities: ["Agent notifications", "Approval requests"],
    featured: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "Communication",
    monogram: "Wa",
    description: "Track WhatsApp conversations on the customer timeline for teams that sell through messaging.",
    status: "available",
    capabilities: ["Conversation sync", "Timeline context"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge & Documents",
    monogram: "No",
    description: "Let agents use your team's playbooks and notes as context when proposing next steps.",
    status: "available",
    capabilities: ["Knowledge context", "Playbook lookup"],
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    category: "Email & Calendar",
    monogram: "Ol",
    description: "Email and calendar sync for Microsoft 365 teams.",
    status: "available",
    capabilities: ["Email sync", "Calendar sync"],
  },
  {
    id: "hubspot-import",
    name: "HubSpot import",
    category: "CRM Migration",
    monogram: "Hs",
    description: "Bring companies, contacts, deals and timelines across when you switch.",
    status: "available",
    capabilities: ["Data import", "Field mapping"],
  },
  {
    id: "salesforce-import",
    name: "Salesforce import",
    category: "CRM Migration",
    monogram: "Sf",
    description: "Migrate accounts, opportunities and activity history into HeiGin.",
    status: "available",
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
    status: "available",
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
];
