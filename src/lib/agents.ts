/**
 * Agent catalogue. Status must stay honest: only mark an agent "available" once it is merged
 * and live in the product.
 *
 * Source: the HeiGin team's agent list (2026-10-19), corrected the same day: all seven agents
 * are live, including the Call agent.
 */

export type AgentStatus = "available" | "pilot" | "in-development" | "planned";

export const agentStatusLabels: Record<AgentStatus, string> = {
  available: "Available",
  pilot: "In pilot",
  "in-development": "In development",
  planned: "Planned",
};

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  /** One sentence on what it does. */
  summary: string;
  /** Where in the product it shows up. */
  appearsIn: string;
  /** How a person stays in control. Only set where the team has stated it. */
  oversight?: string;
}

export const agents: Agent[] = [
  {
    id: "copilot",
    name: "Copilot",
    status: "available",
    summary: "Answers questions, runs bulk actions and builds multi-step plans.",
    appearsIn: "Everywhere, via Ask HeiGin",
    oversight: "Asks you to confirm every change.",
  },
  {
    id: "sales-agent",
    name: "Sales Agent",
    status: "available",
    summary: "Drafts email replies using only the campaign's own offer, FAQs and PDFs, then fact-checks them.",
    appearsIn: "Inbox, lead page",
  },
  {
    id: "intent-scoring",
    name: "Intent scoring",
    status: "available",
    summary: "Rates email replies as Hot, Warm or Cold.",
    appearsIn: "Inbox, lead page, Leads column",
  },
  {
    id: "deal-brief",
    name: "Deal brief",
    status: "available",
    summary: "A brief for each deal, right on the deal page.",
    appearsIn: "Deal page",
  },
  {
    id: "hinglish-support",
    name: "Hinglish support",
    status: "available",
    summary: "Understands Hinglish, the way India actually talks, so it follows the context of the sale and updates the CRM.",
    appearsIn: "Activity notes",
  },
  {
    id: "documents-qa",
    name: "Documents Q&A",
    status: "available",
    summary: "Answers questions about your documents, with citations.",
    appearsIn: "Copilot, Documents",
  },
  {
    id: "call-agent",
    name: "Call agent",
    status: "available",
    summary: "Turns Hinglish calls into a transcript, summary, intent and suggested tasks.",
    appearsIn: "Lead, contact and deal pages",
  },
];
