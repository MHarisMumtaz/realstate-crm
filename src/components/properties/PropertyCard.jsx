import React from "react";
import { BedDouble, Bath, Maximize, MapPin, Building2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatAED } from "@/lib/format";

export default function PropertyCard({ property: p, onClick }) {
  return (
    <button onClick={onClick} className="group text-left overflow-hidden rounded-2xl border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {p.image_url ? (
          <Image src={p.image_url} alt={p.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground"><Building2 className="h-10 w-10" strokeWidth={1} /></div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium backdrop-blur">For {p.listing || "Sale"}</span>
        <span className="absolute right-4 top-4"><StatusBadge status={p.status} /></span>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{[p.community, p.emirate].filter(Boolean).join(", ") || "UAE"}</p>
        <h3 className="mt-2 font-heading text-xl font-light leading-snug line-clamp-1">{p.title}</h3>
        <p className="mt-3 text-lg font-medium">{formatAED(p.price)}{p.listing === "Rent" && <span className="text-xs text-muted-foreground font-normal"> / yr</span>}</p>
        <div className="mt-4 flex gap-4 border-t pt-4 text-xs text-muted-foreground">
          {p.bedrooms != null && <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{p.bedrooms === 0 ? "Studio" : `${p.bedrooms} bd`}</span>}
          {p.bathrooms != null && <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" />{p.bathrooms} ba</span>}
          {p.area_sqft && <span className="flex items-center gap-1.5"><Maximize className="h-3.5 w-3.5" />{p.area_sqft.toLocaleString()} sqft</span>}
        </div>
      </div>
    </button>
  );
}