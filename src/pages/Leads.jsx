import React, { useState } from "react";
import useEntityCrud from "@/hooks/useEntityCrud";
import PageHeader from "@/components/shared/PageHeader";
import Toolbar from "@/components/shared/Toolbar";
import AddButton from "@/components/shared/AddButton";
import EntityFormDialog from "@/components/shared/EntityFormDialog";
import LeadTable from "@/components/leads/LeadTable";
import { leadFields } from "@/lib/fields";
import { LEAD_STATUSES } from "@/lib/constants";

export default function Leads() {
  const { items, isLoading, save, remove, saving } = useEntityCrud("Lead");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const q = search.toLowerCase();
  const filtered = items.filter((l) =>
    (status === "All" || l.status === status) &&
    [l.full_name, l.email, l.phone, l.preferred_area].some((v) => v?.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader eyebrow="Clients" title="Leads" subtitle="Every enquiry from portals, referrals and walk-ins in one place." action={<AddButton label="New lead" onClick={() => setEditing({ status: "New", interest: "Buy" })} />} />
      <Toolbar search={search} onSearch={setSearch} options={["All", ...LEAD_STATUSES]} value={status} onChange={setStatus} placeholder="Search name, phone, area…" />
      {isLoading ? <div className="h-64 animate-pulse rounded-2xl bg-muted" /> : <LeadTable leads={filtered} />}
      <EntityFormDialog
        open={!!editing} onOpenChange={(o) => !o && setEditing(null)}
        title={editing?.id ? "Edit lead" : "New lead"} fields={leadFields} record={editing}
        onSubmit={(data) => save(editing, data)} onDelete={(id) => remove.mutateAsync(id)} saving={saving}
      />
    </>
  );
}