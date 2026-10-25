import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { livePosts, SLUG_PATTERN, type Post, type PostSummary } from "@/lib/posts";

/**
 * Loads the markdown files in `content/blog/` (bundled at build time, server side only so drafts and
 * unapproved stories never reach the browser) and serves them to the Blog pages and the sitemap.
 */
const files = import.meta.glob("/content/blog/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export function loadPosts(): Post[] {
  return livePosts(files);
}

export const getPosts = createServerFn({ method: "GET" }).handler((): PostSummary[] =>
  loadPosts().map(({ body: _body, ...summary }) => summary)
);

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.string().regex(SLUG_PATTERN).max(120).parse(input))
  .handler(({ data: slug }): Post | null => loadPosts().find((p) => p.slug === slug) ?? null);
