import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Globe2, MapPin, Wallet, User } from "lucide-react";
import useEntityCrud from "@/hooks/useEntityCrud";
import EntityFormDialog from "@/components/shared/EntityFormDialog";
import StatusBadge from "@/components/shared/StatusBadge";
import LeadTimeline from "@/components/leads/LeadTimeline";
import QuickActions from "@/components/leads/QuickActions";
import { leadFields } from "@/lib/fields";
import { formatAED } from "@/lib/format";

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-3">
    <Icon className="mt-0.5 h-4 w-4 text-gold" strokeWidth={1.6} />
    <div>
      <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="text-sm mt-0.5">{value || "—"}</p>
    </div>
  </div>
);

export default function LeadDetail() {
  const { id } = useParams();
  const { items: leads, isLoading, save, remove, saving } = useEntityCrud("Lead");
  const { items: viewings } = useEntityCrud("Viewing");
  const { items: deals } = useEntityCrud("Deal");
  const [editing, setEditing] = useState(false);
  const lead = leads.find((l) => l.id === id);

  if (isLoading) return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  if (!lead) return (
    <p className="py-16 text-center text-sm text-muted-foreground">
      Lead not found. <Link to="/leads" className="text-gold hover:underline">Back to leads</Link>
    </p>
  );

  return (
    <>
      <Link to="/leads" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to leads
      </Link>

      <div className="rounded-2xl border bg-white p-8 mb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-4xl font-light tracking-tight">{lead.full_name}</h1>
              <StatusBadge status={lead.status} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Looking to {lead.interest?.toLowerCase() || "buy"} a {lead.property_type || "property"} in {lead.preferred_area || lead.emirate || "the UAE"} · {lead.source || "Unknown source"}
            </p>
          </div>
          <button onClick={() => setEditing(true)} className="self-start rounded-full border px-5 py-2.5 text-sm transition-all duration-300 hover:border-gold hover:bg-gold-light/30">
            Edit lead
          </button>
          <div className="mt-5"><QuickActions lead={lead} /></div>
        </div>
        <div className="mt-6 grid gap-x-10 border-t pt-2 sm:grid-cols-2 lg:grid-cols-4">
          <Row icon={Phone} label="Phone" value={lead.phone} />
          <Row icon={Mail} label="Email" value={lead.email} />
          <Row icon={Globe2} label="Nationality" value={lead.nationality} />
          <Row icon={Wallet} label="Budget" value={formatAED(lead.budget)} />
          <Row icon={MapPin} label="Preferred area" value={lead.preferred_area || lead.emirate} />
          <Row icon={User} label="Assigned agent" value={lead.assigned_agent} />
        </div>
        {lead.notes && <p className="mt-4 rounded-xl bg-gold-light/20 p-4 text-sm text-muted-foreground">{lead.notes}</p>}
      </div>

      <LeadTimeline
        viewings={viewings.filter((v) => v.lead_name === lead.full_name)}
        deals={deals.filter((d) => d.lead_name === lead.full_name)}
      />

      <EntityFormDialog
        open={editing} onOpenChange={setEditing}
        title="Edit lead" fields={leadFields} record={lead}
        onSubmit={(data) => save(lead, data)} onDelete={(id2) => remove.mutateAsync(id2)} saving={saving}
      />
    </>
  );
}