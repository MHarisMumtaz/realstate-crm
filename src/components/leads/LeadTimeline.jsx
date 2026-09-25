import React from "react";
import { Eye, Handshake } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatAED } from "@/lib/format";

export default function LeadTimeline({ viewings, deals }) {
  const events = [
    ...viewings.map((v) => ({ id: `v-${v.id}`, icon: Eye, label: "Viewing", meta: v.property_title, date: v.viewing_date, status: v.status })),
    ...deals.map((d) => ({ id: `d-${d.id}`, icon: Handshake, label: "Deal", meta: `${d.title} · ${formatAED(d.value)}`, date: d.expected_close || d.created_date, status: d.stage })),
  ].filter((e) => e.date).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="rounded-2xl border bg-white p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Activity timeline</p>
      {events.length === 0 && <p className="mt-4 text-sm text-muted-foreground">No activity recorded yet</p>}
      <div className="mt-5">
        {events.map((e, i) => (
          <div key={e.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-light/60 text-gold"><e.icon className="h-3.5 w-3.5" strokeWidth={1.7} /></div>
              {i < events.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>
            <div className="pb-6">
              <p className="text-sm">{e.label}{e.meta && <span className="text-muted-foreground"> · {e.meta}</span>}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{format(new Date(e.date), "d MMM yyyy")}</p>
              <div className="mt-1.5"><StatusBadge status={e.status} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}