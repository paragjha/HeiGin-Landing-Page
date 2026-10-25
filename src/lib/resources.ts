import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  getResourceBySlug,
  listResources,
  SLUG_PATTERN,
  type ListResult,
  type ResourceResult,
  type StrapiEnv,
} from "@/lib/strapi";

/**
 * Server functions behind the Blog pages. Results are kept in memory for a minute so a busy
 * page doesn't hit Strapi on every request; a new article shows up within that time. Failures
 * are never cached.
 */

const CACHE_MS = 60_000;
const cache = new Map<string, { at: number; value: ListResult | ResourceResult }>();

export function strapiEnv(): StrapiEnv {
  return { url: process.env["STRAPI_URL"], token: process.env["STRAPI_API_TOKEN"] };
}

async function cached<T extends ListResult | ResourceResult>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value as T;
  const value = await load();
  if (value.ok) cache.set(key, { at: Date.now(), value });
  return value;
}

export function loadResources(): Promise<ListResult> {
  return cached("list", () => listResources(strapiEnv()));
}

export const getResources = createServerFn({ method: "GET" }).handler(() => loadResources());

export const getResource = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.string().regex(SLUG_PATTERN).max(120).parse(input))
  .handler(({ data: slug }) => cached(`one:${slug}`, () => getResourceBySlug(slug, strapiEnv())));
