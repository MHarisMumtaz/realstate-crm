import React from "react";
import { Image } from "@/components/ui/image";

export default function HeroBanner() {
  const today = new Date().toLocaleDateString("en-AE", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div className="relative mb-10 h-72 overflow-hidden rounded-3xl lg:h-80">
      <Image src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80" alt="Dubai skyline at dusk" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-8 text-white lg:p-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{today} · United Arab Emirates</p>
        <h1 className="mt-4 font-heading text-4xl font-light tracking-tight lg:text-6xl">
          Good day. <span className="text-gold-light">أهلاً وسهلاً</span>
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/70">
          Your agency at a glance — enquiries, listings, viewings and the deals moving through your pipeline.
        </p>
      </div>
    </div>
  );
}