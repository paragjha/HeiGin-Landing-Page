import { z } from "zod";

/**
 * Reads published articles for the Resources section from Strapi's REST API.
 * Imported only from server code (`resources.ts`), so the API token never reaches the browser.
 *
 * Expected Strapi content type: "Article" (plural API ID `articles`) with fields
 *   title (text), slug (uid), summary (text), body (rich text blocks), readTime (integer, minutes),
 *   category (enumeration, see RESOURCE_CATEGORIES) and customerApproved (boolean).
 * Setup steps live in `docs/strapi-setup.md`.
 */

export const RESOURCE_CATEGORIES = ["Agentic CRM", "Sales workflows", "Product updates", "Customer stories"] as const;

export interface ResourceSummary {
  slug: string;
  title: string;
  summary: string;
  category: string;
  /** Minutes. */
  readTime: number | null;
  publishedAt: string | null;
  updatedAt: string | null;
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/**
 * Strapi rich-text blocks, kept as plain JSON so they can cross the server/client boundary.
 * The article page hands them to `BlocksRenderer`, which defines the block shapes.
 */
export type ArticleBlocks = Record<string, Json>[];

export interface Resource extends ResourceSummary {
  body: ArticleBlocks;
}

export interface StrapiEnv {
  /** Base URL of the Strapi project, e.g. https://my-project.strapiapp.com */
  url?: string | undefined;
  /** Read-only API token. Server-only secret. */
  token?: string | undefined;
}

export type ListResult =
  | { ok: true; resources: ResourceSummary[] }
  | { ok: false; reason: "not_configured" | "failed" };

export type ResourceResult =
  | { ok: true; resource: Resource | null }
  | { ok: false; reason: "not_configured" | "failed" };

type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

const TIMEOUT_MS = 5000;
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const listFields = ["title", "slug", "summary", "category", "readTime", "customerApproved", "publishedAt", "updatedAt"];

const rawArticle = z.object({
  title: z.string().min(1),
  slug: z.string().regex(SLUG_PATTERN),
  summary: z.string().nullish(),
  category: z.string().nullish(),
  readTime: z.number().nullish(),
  customerApproved: z.boolean().nullish(),
  publishedAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  body: z.array(z.record(z.unknown())).nullish(),
});

type RawArticle = z.infer<typeof rawArticle>;

/** A customer story only goes live once the customer has signed it off. */
function isVisible(a: RawArticle): boolean {
  return a.category !== "Customer stories" || a.customerApproved === true;
}

function toSummary(a: RawArticle): ResourceSummary {
  return {
    slug: a.slug,
    title: a.title,
    summary: a.summary ?? "",
    category: a.category ?? "",
    readTime: a.readTime ?? null,
    publishedAt: a.publishedAt ?? null,
    updatedAt: a.updatedAt ?? null,
  };
}

/** Parses Strapi's `data` array, silently dropping entries that don't match the expected shape. */
function parseArticles(data: unknown): RawArticle[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap((item) => {
    const parsed = rawArticle.safeParse(item);
    return parsed.success && isVisible(parsed.data) ? [parsed.data] : [];
  });
}

async function get(path: string, params: URLSearchParams, env: StrapiEnv, doFetch: FetchLike): Promise<unknown> {
  const base = (env.url ?? "").replace(/\/+$/, "");
  const res = await doFetch(`${base}/api/${path}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${env.token}`, Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Strapi responded ${res.status}`);
  return ((await res.json()) as { data?: unknown }).data;
}

function configured(env: StrapiEnv): boolean {
  return Boolean(env.url && env.token);
}

/** All published articles, newest first, without their bodies. */
export async function listResources(env: StrapiEnv, doFetch: FetchLike = fetch): Promise<ListResult> {
  if (!configured(env)) return { ok: false, reason: "not_configured" };
  const params = new URLSearchParams({ status: "published", sort: "publishedAt:desc", "pagination[pageSize]": "100" });
  listFields.forEach((f, i) => params.set(`fields[${i}]`, f));
  try {
    const data = await get("articles", params, env, doFetch);
    return { ok: true, resources: parseArticles(data).map(toSummary) };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

/** One published article by slug, with its body. `resource` is null when there is no match. */
export async function getResourceBySlug(slug: string, env: StrapiEnv, doFetch: FetchLike = fetch): Promise<ResourceResult> {
  if (!configured(env)) return { ok: false, reason: "not_configured" };
  if (!SLUG_PATTERN.test(slug)) return { ok: true, resource: null };
  const params = new URLSearchParams({ status: "published", "filters[slug][$eq]": slug, "pagination[pageSize]": "1" });
  try {
    const [article] = parseArticles(await get("articles", params, env, doFetch));
    if (!article) return { ok: true, resource: null };
    return { ok: true, resource: { ...toSummary(article), body: (article.body ?? []) as ArticleBlocks } };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
