import React from "react";
import { STATUS_STYLES } from "@/lib/constants";

export default function StatusBadge({ status }) {
  if (!status) return <span className="text-muted-foreground">—</span>;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset whitespace-nowrap ${STATUS_STYLES[status] || "bg-muted text-muted-foreground ring-border"}`}>
      {status}
    </span>
  );
}