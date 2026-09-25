import React from "react";

export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="group rounded-2xl border bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <div className="rounded-full bg-gold-light/60 p-2 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </div>
      </div>
      <p className="mt-6 font-heading text-3xl font-light tracking-tight">{value}</p>
      <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}