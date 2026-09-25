import React from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";

const waNumber = (phone) => {
  let digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 10) digits = "971" + digits.slice(1);
  return digits;
};

export default function QuickActions({ lead }) {
  const first = lead.full_name?.split(" ")[0] || "there";
  const msg = encodeURIComponent(`Hi ${first}, this is Sahara Realty following up on your property enquiry. When would suit you for a viewing?`);
  const actions = [];
  if (waNumber(lead.phone)) actions.push({ label: "WhatsApp", href: `https://wa.me/${waNumber(lead.phone)}?text=${msg}`, icon: MessageCircle, cls: "bg-[#25D366] text-white hover:brightness-95" });
  if (lead.phone) actions.push({ label: "Call", href: `tel:${lead.phone.replace(/\s/g, "")}`, icon: Phone, cls: "bg-ink text-white hover:bg-ink/90" });
  if (lead.email) actions.push({ label: "Email", href: `mailto:${lead.email}`, icon: Mail, cls: "border border-border hover:border-gold" });

  if (!actions.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map(({ label, href, icon: Icon, cls }) => (
        <a key={label} href={href} target={label === "WhatsApp" ? "_blank" : undefined} rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 ${cls}`}>
          <Icon className="h-4 w-4" strokeWidth={1.7} /> {label}
        </a>
      ))}
    </div>
  );
}