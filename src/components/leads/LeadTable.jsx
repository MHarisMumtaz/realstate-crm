import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatAED } from "@/lib/format";

const COLS = ["Client", "Phone", "Interest", "Budget", "Area", "Source", "Status"];

export default function LeadTable({ leads }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full min-w-[820px] text-sm">
        <thead>
          <tr className="border-b text-left">
            {COLS.map((c) => <th key={c} className="px-5 py-4 text-[11px] font-normal uppercase tracking-[0.15em] text-muted-foreground">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} onClick={() => navigate(`/leads/${l.id}`)} className="cursor-pointer border-b last:border-0 transition-colors duration-200 hover:bg-gold-light/25">
              <td className="px-5 py-4">
                <p className="font-medium">{l.full_name}</p>
                <p className="text-xs text-muted-foreground">{l.email || l.nationality}</p>
              </td>
              <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">{l.phone || "—"}</td>
              <td className="px-5 py-4">{[l.interest, l.property_type].filter(Boolean).join(" · ") || "—"}</td>
              <td className="px-5 py-4 whitespace-nowrap">{formatAED(l.budget)}</td>
              <td className="px-5 py-4">{l.preferred_area || l.emirate || "—"}</td>
              <td className="px-5 py-4 text-muted-foreground">{l.source || "—"}</td>
              <td className="px-5 py-4"><StatusBadge status={l.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {leads.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No leads match your filters</p>}
    </div>
  );
}