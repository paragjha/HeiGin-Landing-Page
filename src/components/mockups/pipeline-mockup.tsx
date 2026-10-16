import { Badge, Card, CardHeader, DealStage, MoneyValue, StatusBadge } from "@heigin/ui";

const deals = [
  {
    name: "Kaveri Textiles",
    detail: "Annual fabric supply · Meera S",
    value: 840000,
    stage: "Negotiation",
    flag: { tone: "warning" as const, label: "No reply in 3 days" },
  },
  {
    name: "Northwind Traders",
    detail: "Q4 restock order · Arjun K",
    value: 260000,
    stage: "Proposal",
    flag: { tone: "info" as const, label: "Meeting booked" },
  },
  {
    name: "Sundaram Mills",
    detail: "New account · Divya R",
    value: 415000,
    stage: "Qualified",
    flag: { tone: "danger" as const, label: "Stalled 12 days" },
  },
];

/** Pipeline scene: deals with stage progress and agent-surfaced risk flags. */
export function PipelineMockup() {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <CardHeader
          title="Sales pipeline"
          description="3 open opportunities · flags raised by the deal assistant"
        />
      </div>
      <ul className="divide-y divide-border">
        {deals.map((deal) => (
          <li key={deal.name} className="px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-lg font-semibold text-foreground">{deal.name}</p>
              <MoneyValue amount={deal.value} className="text-lg font-semibold" />
            </div>
            <p className="mt-0.5 text-md text-muted-foreground">{deal.detail}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <DealStage compact stages={["Qualified", "Proposal", "Negotiation", "Won"]} current={deal.stage} />
              <StatusBadge tone={deal.flag.tone} label={deal.flag.label} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
