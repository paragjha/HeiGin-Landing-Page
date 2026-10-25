import { z } from "zod";

/**
 * Blog posts are markdown files in `content/blog/`, each starting with a small frontmatter block.
 * This module only parses and filters them (no file access), so it can be tested on its own;
 * `blog.ts` loads the files. Writing guide: `docs/writing-posts.md`.
 */

export const BLOG_CATEGORIES = ["Agentic CRM", "Sales workflows", "Product updates", "Customer stories"] as const;

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface PostSummary {
  slug: string;
  title: string;
  summary: string;
  category: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Minutes. */
  readTime: number;
}

export interface Post extends PostSummary {
  /** Markdown, without the frontmatter. */
  body: string;
}

const frontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.enum(BLOG_CATEGORIES),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slug: z.string().regex(SLUG_PATTERN).optional(),
  readTime: z.number().int().positive().optional(),
  draft: z.boolean().optional(),
  customerApproved: z.boolean().optional(),
});

function scalar(value: string): string | number | boolean {
  const v = value.trim().replace(/^(["'])(.*)\1$/, "$2");
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^\d+$/.test(v)) return Number(v);
  return v;
}

/** Splits `---` frontmatter (flat `key: value` lines) from the markdown body. */
export function splitFrontmatter(raw: string): { data: Record<string, string | number | boolean>; body: string } | null {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw.replace(/\r\n/g, "\n").replace(/^﻿/, ""));
  if (!match) return null;
  const data: Record<string, string | number | boolean> = {};
  for (const line of match[1]!.split("\n")) {
    const kv = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (kv) data[kv[1]!] = scalar(kv[2]!);
  }
  return { data, body: match[2]!.trim() };
}

const wordsPerMinute = 200;
const readTimeOf = (body: string) => Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / wordsPerMinute));

/** Parses one file. Returns null if the frontmatter is missing or invalid. */
export function parsePost(filePath: string, raw: string): (Post & { draft: boolean; customerApproved: boolean }) | null {
  const parts = splitFrontmatter(raw);
  if (!parts) return null;
  const fm = frontmatter.safeParse(parts.data);
  if (!fm.success) return null;
  const fileSlug = /([^/\\]+)\.md$/.exec(filePath)?.[1] ?? "";
  const slug = fm.data.slug ?? fileSlug;
  if (!SLUG_PATTERN.test(slug)) return null;
  return {
    slug,
    title: fm.data.title,
    summary: fm.data.summary,
    category: fm.data.category,
    date: fm.data.date,
    readTime: fm.data.readTime ?? readTimeOf(parts.body),
    body: parts.body,
    draft: fm.data.draft ?? false,
    customerApproved: fm.data.customerApproved ?? false,
  };
}

/**
 * Posts that should be live today, newest first. Hidden: drafts, posts dated in the future
 * (they appear on their date) and customer stories the customer hasn't signed off.
 */
export function livePosts(files: Record<string, string>, today: string = new Date().toISOString().slice(0, 10)): Post[] {
  const seen = new Set<string>();
  return Object.entries(files)
    .flatMap(([path, raw]) => {
      const post = parsePost(path, raw);
      if (!post || post.draft || post.date > today) return [];
      if (post.category === "Customer stories" && !post.customerApproved) return [];
      if (seen.has(post.slug)) return [];
      seen.add(post.slug);
      const { draft: _draft, customerApproved: _approved, ...rest } = post;
      return [rest];
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}
