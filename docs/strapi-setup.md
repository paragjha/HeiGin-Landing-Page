# Strapi setup for the Resources section

The website reads articles from a Strapi project and shows them on `/resources` and `/resources/<slug>`.
Until Strapi is connected, `/resources` shows the planned-topics list, so nothing breaks.

Reference: <https://docs.strapi.io/cms/quick-start> (project creation, Content-Type Builder, permissions).

## 1. Create the Strapi project

Follow Parts A and C of the Strapi Quick Start: create the project, push it to its own GitHub repository
(not this one) and deploy it to Strapi Cloud. Note the project URL, for example
`https://my-project.strapiapp.com`.

## 2. Create the content type

Content-Type Builder, **Collection types**, display name `Article`. Keep the default API IDs
(`article` / `articles`). Draft & Publish stays on, so a draft never appears on the site.

| Field | Type | Settings |
| --- | --- | --- |
| `title` | Text (short) | Required |
| `slug` | UID, attached to `title` | Required |
| `summary` | Text (long) | Required. Also used as the page description in search results |
| `body` | Rich text (Blocks) | Required |
| `readTime` | Number (integer) | Minutes |
| `category` | Enumeration | Required. Values, exactly: `Agentic CRM`, `Sales workflows`, `Product updates`, `Customer stories` |
| `customerApproved` | Boolean | Default false. Tick it only once the customer has signed the story off |

A `Customer stories` article stays hidden on the site until `customerApproved` is ticked, even when published.

Field names are case-sensitive. Rename them in the Builder only together with `src/lib/strapi.ts`.

## 3. Create a read-only API token

Strapi admin, **Settings, API Tokens, Create new API Token**: name `website`, type **Read-only**, duration
**Unlimited**. Copy the token when it is shown, because Strapi shows it once. Content stays private by
default, and this token is what lets the website read published articles.

## 4. Add two environment variables in Vercel

Project `heigin`, **Settings, Environment Variables**, for Production (and Preview if wanted):

| Name | Value |
| --- | --- |
| `STRAPI_URL` | The project URL, with no trailing path |
| `STRAPI_API_TOKEN` | The read-only token |

Redeploy once so the new variables apply. Both are server-only; never prefix them with `VITE_`.

## How it behaves

- A published article appears on `/resources` and in `/sitemap.xml` within about a minute (in-memory cache).
- If Strapi is unreachable, `/resources` falls back to the planned-topics list and article pages return a server error rather than a 404.
- Images inside an article use the URL Strapi returns. Strapi Cloud returns absolute URLs; a self-hosted
  Strapi using local uploads would need a public base URL added.
