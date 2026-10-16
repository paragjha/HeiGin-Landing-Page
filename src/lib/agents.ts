/**
 * Agent catalogue. Status must stay honest.
 * Per the HeiGin team, all agents below are developed and available.
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
  problem: string;
  context: string;
  action: string;
  approval: string;
  result: string;
  scenario: string;
}

export const agents: Agent[] = [
  {
    id: "follow-up",
    name: "Follow-up agent",
    status: "available",
    problem: "Follow-ups get forgotten when the team is busy.",
    context: "Meetings, conversations and open questions on each record.",
    action: "Finds open loops and drafts the next message or task.",
    approval: "Outbound messages always wait for approval by default.",
    result: "The follow-up is logged on the timeline with who approved it.",
    scenario:
      "After a renewal call, a customer asks for pricing. A day later nothing has been sent — the agent raises it and drafts the reply.",
  },
  {
    id: "lead-qualification",
    name: "Lead qualification agent",
    status: "available",
    problem: "New leads come in faster than anyone can sort them.",
    context: "Form submissions, first messages and company details.",
    action: "Organises incoming information and highlights qualification signals.",
    approval: "Suggests ownership and priority; reps decide.",
    result: "Leads arrive with a summary and suggested next step.",
    scenario:
      "A web enquiry mentions a 40-person team and a contract ending next quarter — the agent summarises it and suggests an owner.",
  },
  {
    id: "deal-assistant",
    name: "Deal assistant",
    status: "available",
    problem: "Deals stall quietly before anyone notices.",
    context: "Stage history, last activity and conversation sentiment.",
    action: "Flags stalled opportunities and recommends a next step.",
    approval: "Recommendations only — no changes to deals without a person.",
    result: "Risk flags appear on the pipeline with the reason attached.",
    scenario:
      "A deal has sat in Proposal for 12 days with no reply. The assistant flags it and suggests a check-in referencing the last call.",
  },
  {
    id: "relationship",
    name: "Customer relationship agent",
    status: "available",
    problem: "Existing customers drift without anyone noticing.",
    context: "Engagement patterns across the full customer history.",
    action: "Surfaces customers who may need attention.",
    approval: "Surfaces insights; outreach stays with your team.",
    result: "A clear list of accounts to look at this week, with reasons.",
    scenario:
      "A long-standing customer hasn't been in touch for two months, unusual for them. The agent puts them on this week's list.",
  },
  {
    id: "workflow",
    name: "Workflow agent",
    status: "available",
    problem: "Repeatable processes still need someone to drive every step.",
    context: "The workflow you configure and the permissions you grant.",
    action: "Carries out multi-step processes within its permitted scope.",
    approval: "Steps you mark as sensitive pause for approval.",
    result: "Each step and outcome is recorded in the activity log.",
    scenario:
      "When a deal is won, the agent creates onboarding tasks, notifies the account team and schedules the kickoff — pausing before any customer email.",
  },
];
