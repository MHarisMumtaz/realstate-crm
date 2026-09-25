import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DEAL_STAGES } from "@/lib/constants";
import { formatAED, formatAEDCompact } from "@/lib/format";

export default function PipelineChart({ deals }) {
  const data = DEAL_STAGES.map((stage) => ({
    stage: stage.replace("Closed ", ""),
    value: deals.filter((d) => d.stage === stage).reduce((s, d) => s + (d.value || 0), 0),
  }));
  return (
    <div className="rounded-2xl border bg-white p-6 lg:col-span-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pipeline by stage</p>
      <p className="font-heading text-2xl font-light mt-2 mb-6">Deal value</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -10 }}>
            <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#8a8578" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => formatAEDCompact(v).replace("AED ", "")} tick={{ fontSize: 11, fill: "#8a8578" }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "#F3EEE6" }} formatter={(v) => formatAED(v)} contentStyle={{ borderRadius: 12, border: "1px solid #E7E1D6", fontSize: 12 }} />
            <Bar dataKey="value" fill="#B08D57" radius={[8, 8, 0, 0]} maxBarSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}