import { describe, expect, it } from "vitest";

import { livePosts, parsePost, splitFrontmatter } from "@/lib/posts";

const file = (fields: Record<string, string | number | boolean>, body = "Hello **world**.") =>
  `---\n${Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n---\n\n${body}\n`;

const base = {
  title: "What is an agentic CRM?",
  summary: "A short summary.",
  category: "Agentic CRM",
  date: "2026-10-20",
};

describe("splitFrontmatter", () => {
  it("reads flat key: value lines and returns the markdown body", () => {
    const parts = splitFrontmatter(file({ title: '"Quoted: title"', readTime: 6, draft: true }, "Body text"));
    expect(parts).toEqual({ data: { title: "Quoted: title", readTime: 6, draft: true }, body: "Body text" });
  });

  it("handles Windows line endings and a missing block", () => {
    expect(splitFrontmatter(file({ title: "A" }).replace(/\n/g, "\r\n"))?.data).toEqual({ title: "A" });
    expect(splitFrontmatter("No frontmatter here")).toBeNull();
  });
});

describe("parsePost", () => {
  it("takes the slug from the file name and works out the read time", () => {
    const body = Array(450).fill("word").join(" ");
    const post = parsePost("/content/blog/what-is-an-agentic-crm.md", file(base, body));
    expect(post).toMatchObject({ slug: "what-is-an-agentic-crm", readTime: 3, category: "Agentic CRM", date: "2026-10-20" });
  });

  it("prefers an explicit slug and readTime", () => {
    const post = parsePost("/content/blog/x.md", file({ ...base, slug: "custom-slug", readTime: 9 }));
    expect(post).toMatchObject({ slug: "custom-slug", readTime: 9 });
  });

  it("rejects missing fields, unknown categories, bad dates and bad slugs", () => {
    expect(parsePost("/c/a.md", file({ title: "A" }))).toBeNull();
    expect(parsePost("/c/a.md", file({ ...base, category: "Gossip" }))).toBeNull();
    expect(parsePost("/c/a.md", file({ ...base, date: "20 Oct 2026" }))).toBeNull();
    expect(parsePost("/c/Bad_Name.md", file(base))).toBeNull();
  });
});

describe("livePosts", () => {
  const today = "2026-10-25";

  it("sorts newest first and strips the visibility flags", () => {
    const posts = livePosts(
      {
        "/c/older.md": file({ ...base, date: "2026-10-01" }),
        "/c/newer.md": file({ ...base, date: "2026-10-20" }),
      },
      today
    );
    expect(posts.map((p) => p.slug)).toEqual(["newer", "older"]);
    expect(posts[0]).not.toHaveProperty("draft");
  });

  it("hides drafts and posts dated in the future, and shows a post on its own date", () => {
    const posts = livePosts(
      {
        "/c/draft.md": file({ ...base, draft: true }),
        "/c/future.md": file({ ...base, date: "2026-10-26" }),
        "/c/today.md": file({ ...base, date: today }),
      },
      today
    );
    expect(posts.map((p) => p.slug)).toEqual(["today"]);
  });

  it("hides customer stories until the customer has approved them", () => {
    const story = { ...base, category: "Customer stories" };
    const posts = livePosts(
      {
        "/c/unapproved.md": file(story),
        "/c/false.md": file({ ...story, customerApproved: false }),
        "/c/approved.md": file({ ...story, customerApproved: true }),
      },
      today
    );
    expect(posts.map((p) => p.slug)).toEqual(["approved"]);
  });

  it("skips invalid files and duplicate slugs instead of failing", () => {
    const posts = livePosts(
      {
        "/c/broken.md": "no frontmatter",
        "/c/a.md": file({ ...base, slug: "same" }),
        "/c/b.md": file({ ...base, slug: "same" }),
      },
      today
    );
    expect(posts.map((p) => p.slug)).toEqual(["same"]);
  });
});
