import { createFileRoute } from "@tanstack/react-router";
import { FeaturePage } from "@/components/site/FeaturePage";
import { featureBySlug } from "@/content/features";

const feature = featureBySlug["gst-invoicing"]!;
const title = `${feature.eyebrow} — Heigin CRM`;
const description = feature.sub.slice(0, 155);

export const Route = createFileRoute("/gst-invoicing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FeaturePage feature={feature} />,
});
