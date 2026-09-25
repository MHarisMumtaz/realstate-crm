import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

export default function RecentLeads({ leads }) {
  return (
    <div className="rounded-2xl border bg-white p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Latest enquiries</p>
        <Link to="/leads" className="text-xs text-gold flex items-center gap-1 hover:underline">
          View all <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-5 divide-y">
        {leads.slice(0, 6).map((l) => (
          <div key={l.id} className="flex items-center justify-between py-3">
            <div className="min-w-0">
              <p className="text-sm truncate">{l.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">{[l.preferred_area, l.source].filter(Boolean).join(" · ")}</p>
            </div>
            <StatusBadge status={l.status} />
          </div>
        ))}
        {leads.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No leads yet</p>}
      </div>
    </div>
  );
}