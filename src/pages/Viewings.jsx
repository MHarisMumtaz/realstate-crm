import React, { useState } from "react";
import useEntityCrud from "@/hooks/useEntityCrud";
import PageHeader from "@/components/shared/PageHeader";
import Toolbar from "@/components/shared/Toolbar";
import AddButton from "@/components/shared/AddButton";
import EntityFormDialog from "@/components/shared/EntityFormDialog";
import ViewingTable from "@/components/viewings/ViewingTable";
import { viewingFields } from "@/lib/fields";
import { VIEWING_STATUSES } from "@/lib/constants";

export default function Viewings() {
  const { items, isLoading, save, remove, saving } = useEntityCrud("Viewing");
  const { items: leads } = useEntityCrud("Lead");
  const { items: properties } = useEntityCrud("Property");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const q = search.toLowerCase();
  const filtered = items.filter((v) =>
    (status === "All" || v.status === status) &&
    [v.lead_name, v.property_title, v.agent].some((x) => x?.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader eyebrow="Schedule" title="Viewings" subtitle="Property viewings booked for your clients across the Emirates." action={<AddButton label="New viewing" onClick={() => setEditing({ status: "Scheduled" })} />} />
      <Toolbar search={search} onSearch={setSearch} options={["All", ...VIEWING_STATUSES]} value={status} onChange={setStatus} placeholder="Search client, property, agent…" />
      {isLoading ? <div className="h-64 animate-pulse rounded-2xl bg-muted" /> : <ViewingTable viewings={filtered} onSelect={setEditing} />}
      <EntityFormDialog
        open={!!editing} onOpenChange={(o) => !o && setEditing(null)}
        title={editing?.id ? "Edit viewing" : "New viewing"} fields={viewingFields(leads, properties)} record={editing}
        onSubmit={(data) => save(editing, data)} onDelete={(id) => remove.mutateAsync(id)} saving={saving}
      />
    </>
  );
}