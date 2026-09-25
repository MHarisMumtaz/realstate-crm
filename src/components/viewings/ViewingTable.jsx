import React from "react";
import { format } from "date-fns";
import StatusBadge from "@/components/shared/StatusBadge";

const COLS = ["Date & time", "Client", "Property", "Agent", "Status"];

export default function ViewingTable({ viewings, onSelect }) {
  const sorted = [...viewings].sort((a, b) => new Date(b.viewing_date || 0) - new Date(a.viewing_date || 0));
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b text-left">
            {COLS.map((c) => <th key={c} className="px-5 py-4 text-[11px] font-normal uppercase tracking-[0.15em] text-muted-foreground">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {sorted.map((v) => (
            <tr key={v.id} onClick={() => onSelect(v)} className="cursor-pointer border-b last:border-0 transition-colors duration-200 hover:bg-gold-light/25">
              <td className="px-5 py-4 whitespace-nowrap">{v.viewing_date ? format(new Date(v.viewing_date), "EEE, d MMM yyyy · h:mm a") : "—"}</td>
              <td className="px-5 py-4 font-medium">{v.lead_name}</td>
              <td className="px-5 py-4 text-muted-foreground">{v.property_title || "—"}</td>
              <td className="px-5 py-4 text-muted-foreground">{v.agent || "—"}</td>
              <td className="px-5 py-4"><StatusBadge status={v.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewings.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No viewings match your filters</p>}
    </div>
  );
}