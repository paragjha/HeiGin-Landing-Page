/**
 * Analytics integration point.
 *
 * No analytics provider is configured yet. Events are typed and centralised
 * here so a provider (e.g. a first-party collector) can be wired in later
 * without touching call sites. Until then, events are silently dropped —
 * nothing is reported anywhere.
 */

export type AnalyticsEvent =
  | "cta_early_access_clicked"
  | "cta_demo_clicked"
  | "demo_form_started"
  | "demo_form_submitted"
  | "product_tour_interacted"
  | "integration_card_selected"
  | "pricing_page_visited"
  | "workflow_demo_replayed";

export function track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>): void {
  // Intentionally a no-op until a provider is configured.
  void event;
  void properties;
}
