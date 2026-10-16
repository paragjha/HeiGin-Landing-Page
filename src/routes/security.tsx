import { createFileRoute } from "@tanstack/react-router";
import { Badge, Card } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { site } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: pageHead(
    "/security",
    "Security",
    "How HeiGin approaches data access, agent permissions, approvals and visibility, and what we are still confirming."
  ),
  component: Security,
});

type Status = "design" | "confirm";

const topics: { title: string; body: string; status: Status }[] = [
  {
    title: "Data access and permissions",
    body: "Team members see the customer data their role allows. Role and permission details for the pilot are being finalised.",
    status: "confirm",
  },
  {
    title: "Agent permissions and approvals",
    body: "Agents act only within the scope granted to them. Outbound and sensitive actions require human approval by default.",
    status: "design",
  },
  {
    title: "Visibility into agent activity",
    body: "Every agent proposal and action is recorded with its reason and, where applicable, who approved it.",
    status: "design",
  },
  {
    title: "Data handling and retention",
    body: "Retention periods, deletion processes and where data is stored are being documented and will be published here.",
    status: "confirm",
  },
  {
    title: "Integration access",
    body: "Connected tools are intended to request only the access an integration needs, and can be disconnected at any time.",
    status: "confirm",
  },
  {
    title: "Certifications and compliance",
    body: "We do not currently claim any security certifications. We'll list them here if and when they are achieved.",
    status: "confirm",
  },
];

function Security() {
  return (
    <>
      <PageHero
        eyebrow="Security & trust"
        title="Transparent about what's built and what isn't."
        description="HeiGin is early. Rather than listing badges we haven't earned, this page explains our security model and clearly marks what is still being confirmed."
        showCtas={false}
      />
      <Section>
        <SectionHeading title="Our approach" description="Each topic is labelled by where it stands today." />
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="info" size="sm">Core design principle</Badge>
          <Badge tone="warning" size="sm">Details being confirmed</Badge>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {topics.map((t) => (
            <Card key={t.title} padding="lg">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.title}</h2>
                <Badge tone={t.status === "design" ? "info" : "warning"} size="sm">
                  {t.status === "design" ? "Core design principle" : "Being confirmed"}
                </Badge>
              </div>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{t.body}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section tone="tint">
        <SectionHeading
          eyebrow="Questions"
          title="Have a security question?"
          description={
            <>
              Ask us directly at{" "}
              <a href={`mailto:${site.securityEmail}`} className="font-medium text-foreground underline">
                {site.securityEmail}
              </a>
              . We'd rather give you a straight answer than a vague one.
            </>
          }
        />
      </Section>
    </>
  );
}
