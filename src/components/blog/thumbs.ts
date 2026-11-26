import type { ComponentType } from "react";
import { ThumbAgenticCrm } from "./thumb-agentic-crm";
import { ThumbFollowUps } from "./thumb-follow-ups";
import { ThumbAgentTrust } from "./thumb-agent-trust";
import { ThumbDpdpReadiness } from "./thumb-dpdp-readiness";
import { ThumbLeadIntent } from "./thumb-lead-intent";
import { ThumbSheetImport } from "./thumb-sheet-import";
import { ThumbGroundedReply } from "./thumb-grounded-reply";
import { ThumbPipelineStages } from "./thumb-pipeline-stages";
import { ThumbGstQuote } from "./thumb-gst-quote";
import { ThumbCallCapture } from "./thumb-call-capture";
import { ThumbResponseDecay } from "./thumb-response-decay";
import { ThumbRuleOrAgent } from "./thumb-rule-or-agent";

/**
 * Registry mapping a blog post's `thumb` frontmatter value to its coded
 * thumbnail React component. Add an entry here whenever a new post lands,
 * then reference it by key in the post's frontmatter.
 *
 * Each component takes an optional `tone="light" | "dark"` prop. The
 * NewsroomCard renders a dark backdrop; the article hero renders light.
 */
export type ThumbKey =
  | "agentic-crm"
  | "follow-ups"
  | "agent-trust"
  | "dpdp-readiness"
  | "lead-intent"
  | "sheet-import"
  | "grounded-reply"
  | "pipeline-stages"
  | "gst-quote"
  | "call-capture"
  | "response-decay"
  | "rule-or-agent";

export const blogThumbs: Record<ThumbKey, ComponentType<{ tone?: "light" | "dark" }>> = {
  "agentic-crm": ThumbAgenticCrm,
  "follow-ups": ThumbFollowUps,
  "agent-trust": ThumbAgentTrust,
  "dpdp-readiness": ThumbDpdpReadiness,
  "lead-intent": ThumbLeadIntent,
  "sheet-import": ThumbSheetImport,
  "grounded-reply": ThumbGroundedReply,
  "pipeline-stages": ThumbPipelineStages,
  "gst-quote": ThumbGstQuote,
  "call-capture": ThumbCallCapture,
  "response-decay": ThumbResponseDecay,
  "rule-or-agent": ThumbRuleOrAgent,
};

export function isThumbKey(value: unknown): value is ThumbKey {
  return typeof value === "string" && value in blogThumbs;
}
