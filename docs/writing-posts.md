# Writing blog posts

Posts are markdown files in `content/blog/`. Add a file, commit it, push to `master`, and Vercel publishes it
at `https://heigin.com/blog/<file-name>`. Until the first post exists, `/blog` shows the planned-topics list.

## A post

Create `content/blog/what-is-an-agentic-crm.md`. The file name (without `.md`) becomes the web address, so use
lowercase words joined by hyphens.

```md
---
title: What is an agentic CRM?
summary: How CRMs shift from storing what happened to deciding what happens next.
category: Agentic CRM
date: 2026-10-27
---

Write the post here in markdown.

## A heading

- Lists work
- So do **bold**, *italics* and [links](https://heigin.com/product)

> Quotes too.
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Page title and headline |
| `summary` | yes | One or two sentences. Shown on the list and used as the search-result description |
| `category` | yes | Exactly one of: `Agentic CRM`, `Sales workflows`, `Product updates`, `Customer stories` |
| `date` | yes | `YYYY-MM-DD`. A date in the future keeps the post hidden until that day (the site checks the date on each request) |
| `slug` | no | Overrides the file name as the web address |
| `readTime` | no | Minutes. Worked out from the word count when left out |
| `draft` | no | `draft: true` keeps the post off the site |
| `customerApproved` | customer stories only | A `Customer stories` post stays hidden until this is `true`, which you set once the customer has signed it off |

A post with a missing or invalid field is skipped silently, so check it on `/blog` after publishing.

## Preview

Run `bun run dev` and open `http://localhost:8080/blog` (the terminal prints the port).

## Images

Put image files in `public/images/blog/` and reference them as `![Alt text](/images/blog/file.png)`.
Always write alt text.
