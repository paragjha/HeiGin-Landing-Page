import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Eye, Mail, Sparkles } from "lucide-react";
import { ActivityItem, ActivityTimeline, Badge, Card, CardHeader, TrustRungBadge } from "@heigin/ui";
import { cn } from "@/lib/utils";

/** Agent activity log scene: a transparent record of what agents did and why. */
export function AgentActivityMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  // Stagger the log entries as the feed scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <CardHeader
          title="Agent activity"
          description="Every proposal and action, recorded with its reason"
        />
      </div>
      <div ref={ref} className={cn("p-5", seen ? "feed-seen" : "feed-waiting")}>
        <ActivityTimeline label="Recent agent activity">
          <ActivityItem icon={<CheckCircle2 size={14} />} dateTime="2026-10-15T09:12" timeLabel="9:12 am"
            detail={
              <span className="inline-flex items-center gap-2">
                Approved by Meera S <TrustRungBadge rung={2} />
              </span>
            }>
            <strong>Follow-up agent</strong> sent the pricing reply to Asha Rao
          </ActivityItem>
          <ActivityItem icon={<Sparkles size={14} />} dateTime="2026-10-15T08:50" timeLabel="8:50 am"
            detail="Reason: renewal call notes mention a budget decision this week.">
            <strong>Deal assistant</strong> flagged Sundaram Mills as stalled
          </ActivityItem>
          <ActivityItem icon={<Mail size={14} />} dateTime="2026-10-14T18:02" timeLabel="Yesterday"
            detail="Held for approval. No message was sent automatically.">
            <strong>Follow-up agent</strong> drafted a reply for Kaveri Textiles
          </ActivityItem>
          <ActivityItem icon={<Eye size={14} />} dateTime="2026-10-14T15:41" timeLabel="Yesterday"
            detail="Source: call transcript synced from Google Meet.">
            <strong>Relationship agent</strong> noted an unanswered question on Kaveri Textiles
          </ActivityItem>
        </ActivityTimeline>
      </div>
    </Card>
  );
}
