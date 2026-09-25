import React from "react";

export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-3">{eyebrow}</p>}
        <h1 className="font-heading text-4xl lg:text-5xl font-light tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-3 text-sm text-muted-foreground max-w-lg">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}