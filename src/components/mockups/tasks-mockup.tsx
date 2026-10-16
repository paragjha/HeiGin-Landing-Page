import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Avatar, Badge, Card, CardHeader, TaskRow } from "@heigin/ui";

const initialTasks = [
  {
    id: "t1",
    title: "Send spring-line pricing to Asha Rao",
    context: "Kaveri Textiles · proposed by Follow-up agent",
    due: "Today, 4:00 pm",
    overdue: false,
    done: false,
  },
  {
    id: "t2",
    title: "Confirm renewal call with Northwind Traders",
    context: "Northwind Traders · Arjun K",
    due: "Tomorrow, 10:00 am",
    overdue: false,
    done: false,
  },
  {
    id: "t3",
    title: "Re-engage Sundaram Mills — stalled 12 days",
    context: "Sundaram Mills · flagged by Deal assistant",
    due: "Yesterday",
    overdue: true,
    done: false,
  },
];

/** Task list scene: agent-proposed follow-ups a rep can complete. */
export function TasksMockup() {
  const [tasks, setTasks] = useState(initialTasks);
  const [flash, setFlash] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Demo the loop live: when the card scrolls into view, one task ticks
  // itself and a "record updated" moment flashes.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t1: number | undefined;
    let t2: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        t1 = window.setTimeout(() => {
          setTasks((prev) => prev.map((t) => (t.id === "t1" ? { ...t, done: true } : t)));
          t2 = window.setTimeout(() => setFlash(true), 600);
        }, 1500);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t1 !== undefined) window.clearTimeout(t1);
      if (t2 !== undefined) window.clearTimeout(t2);
    };
  }, []);

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <CardHeader
          title="Up next for Meera"
          description="Ordered by the follow-up agent from open loops across your accounts"
        />
      </div>
      <div ref={ref}>
        <ul>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              context={task.context}
              due={task.due}
              overdue={task.overdue}
              done={task.done}
              onDoneChange={(done) =>
                setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done } : t)))
              }
              aside={<Avatar name="Meera S" size="sm" decorative />}
            />
          ))}
        </ul>
        {flash && (
          <p className="update-flash flex items-center gap-2 border-t border-border bg-info-soft-bg px-5 py-2.5 text-sm font-medium text-info-ink">
            <CheckCircle2 size={14} aria-hidden="true" />
            Record updated — follow-up logged on the Kaveri Textiles timeline
          </p>
        )}
      </div>
    </Card>
  );
}
