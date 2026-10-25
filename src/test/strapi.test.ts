import { describe, expect, it, vi } from "vitest";

import { getResourceBySlug, listResources } from "@/lib/strapi";

const env = { url: "https://cms.example.com/", token: "tok_test" };

const article = (over: Record<string, unknown> = {}) => ({
  documentId: "abc",
  title: "What is an agentic CRM?",
  slug: "what-is-an-agentic-crm",
  summary: "A short summary.",
  category: "Agentic CRM",
  readTime: 6,
  customerApproved: null,
  publishedAt: "2026-10-20T10:00:00.000Z",
  updatedAt: "2026-10-21T10:00:00.000Z",
  body: [{ type: "paragraph", children: [{ type: "text", text: "Hello" }] }],
  ...over,
});

const json = (data: unknown, status = 200) => new Response(JSON.stringify({ data }), { status });
const mockFetch = (impl: (url: string) => Response | Promise<Response>) =>
  vi.fn(async (url: string, _init: RequestInit) => impl(url));

describe("listResources", () => {
  it("reports not_configured without calling Strapi when the URL or token is missing", async () => {
    const fetchMock = mockFetch(() => json([]));
    expect(await listResources({ url: env.url }, fetchMock)).toEqual({ ok: false, reason: "not_configured" });
    expect(await listResources({ token: env.token }, fetchMock)).toEqual({ ok: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("asks only for published articles, with the bearer token, and no body field", async () => {
    const fetchMock = mockFetch(() => json([article()]));

    const result = await listResources(env, fetchMock);

    const [url, init] = fetchMock.mock.calls[0]!;
    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe("https://cms.example.com/api/articles");
    expect(parsed.searchParams.get("status")).toBe("published");
    expect([...parsed.searchParams.values()]).not.toContain("body");
    expect((init.headers as Record<string, string>)["Authorization"]).toBe("Bearer tok_test");
    expect(result).toEqual({
      ok: true,
      resources: [
        {
          slug: "what-is-an-agentic-crm",
          title: "What is an agentic CRM?",
          summary: "A short summary.",
          category: "Agentic CRM",
          readTime: 6,
          publishedAt: "2026-10-20T10:00:00.000Z",
          updatedAt: "2026-10-21T10:00:00.000Z",
        },
      ],
    });
  });

  it("hides customer stories until the customer has approved them", async () => {
    const fetchMock = mockFetch(() =>
      json([
        article({ slug: "unapproved", category: "Customer stories", customerApproved: false }),
        article({ slug: "unset", category: "Customer stories", customerApproved: null }),
        article({ slug: "approved", category: "Customer stories", customerApproved: true }),
      ])
    );

    const result = await listResources(env, fetchMock);

    expect(result.ok && result.resources.map((r) => r.slug)).toEqual(["approved"]);
  });

  it("drops entries that don't match the expected shape instead of failing the page", async () => {
    const fetchMock = mockFetch(() => json([article({ slug: "Bad Slug!" }), article({ title: "" }), article({ slug: "fine" })]));

    const result = await listResources(env, fetchMock);

    expect(result.ok && result.resources.map((r) => r.slug)).toEqual(["fine"]);
  });

  it("reports failed on an error status or a network error", async () => {
    expect(await listResources(env, mockFetch(() => json(null, 500)))).toEqual({ ok: false, reason: "failed" });
    const down = vi.fn(async () => {
      throw new Error("network");
    });
    expect(await listResources(env, down)).toEqual({ ok: false, reason: "failed" });
  });
});

describe("getResourceBySlug", () => {
  it("returns the article with its body", async () => {
    const fetchMock = mockFetch(() => json([article()]));

    const result = await getResourceBySlug("what-is-an-agentic-crm", env, fetchMock);

    const parsed = new URL(fetchMock.mock.calls[0]![0]);
    expect(parsed.searchParams.get("filters[slug][$eq]")).toBe("what-is-an-agentic-crm");
    expect(parsed.searchParams.get("status")).toBe("published");
    expect(result.ok && result.resource?.body).toEqual([{ type: "paragraph", children: [{ type: "text", text: "Hello" }] }]);
  });

  it("returns null for an unknown slug and never calls Strapi for a malformed one", async () => {
    expect(await getResourceBySlug("nope", env, mockFetch(() => json([])))).toEqual({ ok: true, resource: null });

    const fetchMock = mockFetch(() => json([article()]));
    expect(await getResourceBySlug("../admin", env, fetchMock)).toEqual({ ok: true, resource: null });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats an unapproved customer story as not found", async () => {
    const fetchMock = mockFetch(() => json([article({ category: "Customer stories", customerApproved: false })]));
    expect(await getResourceBySlug("what-is-an-agentic-crm", env, fetchMock)).toEqual({ ok: true, resource: null });
  });
});
