# Wire the waitlist form to a Google Sheet

The waitlist dialog (`src/components/site/Waitlist.tsx`) posts submissions to
the URL in `VITE_LEADS_WEBHOOK_URL`. Point that at a Google Apps Script Web
App and every submission lands as a new row in a Sheet.

## 1. Create the sheet + script

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   spreadsheet (e.g. "Lovat Waitlist Leads").
2. **Extensions → Apps Script**.
3. Delete the boilerplate `Code.gs` contents and paste in
   [`apps-script.gs`](./apps-script.gs) from this folder.
4. Save (Ctrl+S), name the project anything.

## 2. Deploy as a Web App

1. Top right, **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access** and approve with your Google
   account (you'll see an "unverified app" warning: click **Advanced,
   Go to (project name)** since it's your own script).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 3. Wire it up

Give that URL to Claude (or paste it directly), and it goes into
`VITE_LEADS_WEBHOOK_URL` as a Vercel environment variable (and in a local
`.env` file for local dev). Redeploy after adding it.

Every waitlist submission then appends a row to a "Leads" sheet/tab with
timestamp, name, email, phone, company, and team size.

## Notes

- If you ever need to change who receives the data, just edit the Apps
  Script and re-deploy (**Deploy → Manage deployments → Edit → New
  version**).
- The frontend calls this with `mode: "no-cors"` since Apps Script doesn't
  support CORS preflight, so submissions can't report a granular failure
  reason back to the browser, but they do land in the sheet.
