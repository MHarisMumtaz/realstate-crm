import React from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { formatAED } from "@/lib/format";

export default function DealCard({ deal, onClick, dragging }) {
  return (
    <div onClick={onClick} className={`cursor-pointer rounded-xl border bg-white p-4 transition-all duration-300 hover:shadow-lg hover:shadow-ink/5 ${dragging ? "rotate-2 shadow-2xl shadow-ink/15 ring-1 ring-gold" : ""}`}>
      <p className="text-sm font-medium leading-snug">{deal.title}</p>
      {deal.lead_name && <p className="mt-1 text-xs text-muted-foreground">{deal.lead_name}</p>}
      <p className="mt-3 font-heading text-lg font-light">{formatAED(deal.value)}</p>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{deal.agent || ""}</span>
        {deal.expected_close && (
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{format(new Date(deal.expected_close), "d MMM")}</span>
        )}
      </div>
    </div>
  );
}