import { describe, expect, it, vi } from "vitest";

import { LEADS_API_URL, forwardLead, type Lead } from "@/lib/lead-forwarding";

const lead: Lead = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+910000000000",
  company: "Example Co",
  message: "Interested in a walkthrough",
};

const SHEET = "https://script.google.com/macros/s/test/exec";
const ok = () => new Response("{}", { status: 200 });
const mockFetch = (impl: (url: string) => Response | Promise<Response>) =>
  vi.fn(async (url: string, _init: RequestInit) => impl(url));
const bad = () => new Response('{"error":"nope"}', { status: 400 });

describe("forwardLead", () => {
  it("posts to the HeiGin API with the key header and without the message field", async () => {
    const fetchMock = mockFetch(ok);

    const result = await forwardLead(lead, { apiKey: "hgn_test" }, fetchMock);

    expect(result).toEqual({ ok: true, crm: true, sheet: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe(LEADS_API_URL);
    expect((init.headers as Record<string, string>)["X-Api-Key"]).toBe("hgn_test");
    expect(JSON.parse(init.body as string)).toEqual({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+910000000000",
      company: "Example Co",
    });
  });

  it("omits empty optional fields instead of sending empty strings", async () => {
    const fetchMock = mockFetch(ok);

    await forwardLead({ ...lead, phone: "", company: "" }, { apiKey: "k" }, fetchMock);

    const [, init] = fetchMock.mock.calls[0]!;
    expect(JSON.parse(init.body as string)).toEqual({ name: "Jane Doe", email: "jane@example.com" });
  });

  it("keeps the message in the Sheet backup and never sends the API key there", async () => {
    const fetchMock = mockFetch(ok);

    const result = await forwardLead(lead, { apiKey: "hgn_secret", sheetWebhookUrl: SHEET }, fetchMock);

    expect(result).toEqual({ ok: true, crm: true, sheet: true });
    const sheetCall = fetchMock.mock.calls.find(([u]) => u === SHEET)!;
    expect(JSON.parse(sheetCall[1].body as string).message).toBe(lead.message);
    expect(JSON.stringify(sheetCall[1])).not.toContain("hgn_secret");
  });

  it("still succeeds when the CRM rejects the lead but the Sheet accepts it", async () => {
    const fetchMock = mockFetch((u) => (u === LEADS_API_URL ? bad() : ok()));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await forwardLead(lead, { apiKey: "k", sheetWebhookUrl: SHEET }, fetchMock);

    expect(result).toEqual({ ok: true, crm: false, sheet: true });
  });

  it("reports failure only when every configured destination fails", async () => {
    const fetchMock = mockFetch(bad);
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await forwardLead(lead, { apiKey: "k", sheetWebhookUrl: SHEET }, fetchMock);

    expect(result).toEqual({ ok: false, reason: "failed" });
  });

  it("treats a network error as a failed destination, not a crash", async () => {
    const fetchMock = mockFetch(() => {
      throw new Error("network down");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await forwardLead(lead, { apiKey: "k" }, fetchMock);

    expect(result).toEqual({ ok: false, reason: "failed" });
  });

  it("signals not_configured when neither destination is set", async () => {
    const fetchMock = mockFetch(ok);

    const result = await forwardLead(lead, {}, fetchMock);

    expect(result).toEqual({ ok: false, reason: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
