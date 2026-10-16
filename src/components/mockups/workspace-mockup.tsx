import { Mail, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import {
  ActivityItem,
  ActivityTimeline,
  ApprovalCard,
  Badge,
  Button,
  Card,
  CardHeader,
  RecordHeader,
  StatusBadge,
  TrustRungBadge,
} from "@heigin/ui";
import { demoCompany } from "@/lib/demo-data";

/**
 * Hero product scene: a customer record with a live timeline, an AI insight
 * and a pending approval. Fictional demo data throughout.
 */
export function WorkspaceMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--hg-shadow-popover)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-sidebar px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </span>
        <span className="ml-2 text-sm text-muted-foreground">HeiGin · Customers · {demoCompany.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* Left: record + timeline */}
        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <RecordHeader
            level={2}
            name={demoCompany.name}
            status={<StatusBadge tone="info" label="Active customer" />}
            meta={[`${demoCompany.contact} · ${demoCompany.contactRole}`, demoCompany.location, "Owner: Meera S"]}
            actions={
              <Button variant="secondary" size="sm" touch={false}>
                New note
              </Button>
            }
          />

          <div className="mt-5">
            <ActivityTimeline label={`Activity for ${demoCompany.name}`}>
              <ActivityItem icon={<PhoneCall size={14} />} dateTime="2026-10-14T15:40" timeLabel="Yesterday, 3:40 pm"
                detail="Renewal discussed. Asha asked for updated pricing for the spring line. Not yet answered.">
                <strong>Meera S</strong> called {demoCompany.contact}
              </ActivityItem>
              <ActivityItem icon={<Mail size={14} />} dateTime="2026-10-12T10:05" timeLabel="Mon, 10:05 am"
                detail="Sent the revised delivery schedule for October orders.">
                <strong>Meera S</strong> emailed {demoCompany.contact}
              </ActivityItem>
              <ActivityItem icon={<MessageSquare size={14} />} dateTime="2026-10-08T17:20" timeLabel="Oct 8"
                detail="“Looking forward to finalising the spring contract this month.”">
                <strong>{demoCompany.contact}</strong> replied on WhatsApp
              </ActivityItem>
            </ActivityTimeline>
          </div>
        </div>

        {/* Right: agent insight + approval */}
        <div className="space-y-4 bg-sidebar/50 p-5">
          <Card padding="md">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
                <Sparkles size={15} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="text-md font-semibold text-foreground">Unanswered question detected</p>
                <p className="mt-1 text-md leading-relaxed text-muted-foreground">
                  {demoCompany.contact} asked for spring-line pricing on yesterday's call. No reply has been sent in
                  22 hours. This account is in active renewal talks.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <TrustRungBadge rung={2} />
                  <span className="text-sm text-faint">Follow-up agent</span>
                </div>
              </div>
            </div>
          </Card>

          <ApprovalCard
            title={`Send pricing follow-up to ${demoCompany.contact}`}
            reason="Answers the open pricing question with the rates discussed on the call."
            requestedBy="Follow-up agent"
            rung={2}
            onApprove={() => {}}
            onReject={() => {}}
          >
            <div className="rounded-md border border-border bg-sidebar p-3 text-md leading-relaxed text-muted-foreground">
              Hi Asha, thanks for the time yesterday. Attaching the updated spring-line pricing we discussed, valid
              through November. Happy to walk through the volume tiers on a short call this week.
            </div>
          </ApprovalCard>
        </div>
      </div>
    </div>
  );
}
