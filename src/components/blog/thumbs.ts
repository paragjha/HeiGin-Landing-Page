import type { ComponentType } from "react";
import { ThumbAgenticCrm } from "./thumb-agentic-crm";
import { ThumbFollowUps } from "./thumb-follow-ups";
import { ThumbAgentTrust } from "./thumb-agent-trust";

/**
 * Registry mapping a blog post's `thumb` frontmatter value to its coded
 * thumbnail React component. Add an entry here whenever a new post lands,
 * then reference it by key in the post's frontmatter.
 *
 * Each component takes an optional `tone="light" | "dark"` prop. The
 * NewsroomCard renders a dark backdrop; the article hero renders light.
 */
export type ThumbKey = "agentic-crm" | "follow-ups" | "agent-trust";

export const blogThumbs: Record<ThumbKey, ComponentType<{ tone?: "light" | "dark" }>> = {
  "agentic-crm": ThumbAgenticCrm,
  "follow-ups": ThumbFollowUps,
  "agent-trust": ThumbAgentTrust,
};

export function isThumbKey(value: unknown): value is ThumbKey {
  return typeof value === "string" && value in blogThumbs;
}
