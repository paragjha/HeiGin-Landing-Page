/**
 * Real brand logos for integrations, keyed by integration id.
 * Logos are static assets under src/assets/integrations.
 * Integrations without a brand logo (e.g. CSV import) fall back
 * to the monogram tile in IntegrationLogo.
 */
import gmail from "@/assets/integrations/gmail.svg";
import googleCalendar from "@/assets/integrations/googlecalendar.svg";
import googleMeet from "@/assets/integrations/googlemeet.svg";
import slack from "@/assets/integrations/slack.svg";
import whatsapp from "@/assets/integrations/whatsapp.svg";
import notion from "@/assets/integrations/notion.svg";
import microsoftOutlook from "@/assets/integrations/microsoftoutlook.svg";
import hubspot from "@/assets/integrations/hubspot.svg";
import salesforce from "@/assets/integrations/salesforce.svg";
import linear from "@/assets/integrations/linear.svg";
import zapier from "@/assets/integrations/zapier.svg";

export const integrationLogos: Record<string, string> = {
  gmail,
  "google-calendar": googleCalendar,
  "google-meet": googleMeet,
  slack,
  whatsapp,
  notion,
  outlook: microsoftOutlook,
  "hubspot-import": hubspot,
  "salesforce-import": salesforce,
  linear,
  zapier,
};
