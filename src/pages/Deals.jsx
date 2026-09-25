import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useEntityCrud from "@/hooks/useEntityCrud";
import PageHeader from "@/components/shared/PageHeader";
import AddButton from "@/components/shared/AddButton";
import EntityFormDialog from "@/components/shared/EntityFormDialog";
import DealBoard from "@/components/deals/DealBoard";
import { dealFields } from "@/lib/fields";

export default function Deals() {
  const qc = useQueryClient();
  const { items, isLoading, save, update, remove, saving } = useEntityCrud("Deal");
  const { items: leads } = useEntityCrud("Lead");
  const { items: properties } = useEntityCrud("Property");
  const [editing, setEditing] = useState(null);

  const move = (id, stage) => {
    qc.setQueryData(["Deal"], (old) => old.map((d) => (d.id === id ? { ...d, stage } : d)));
    update.mutate({ id, data: { stage } });
  };

  return (
    <>
      <PageHeader eyebrow="Pipeline" title="Deals" subtitle="Drag deals between stages as they progress from enquiry to transfer." action={<AddButton label="New deal" onClick={() => setEditing({ stage: "Inquiry", commission_pct: 2 })} />} />
      {isLoading ? <div className="h-96 animate-pulse rounded-2xl bg-muted" /> : <DealBoard deals={items} onMove={move} onSelect={setEditing} />}
      <EntityFormDialog
        open={!!editing} onOpenChange={(o) => !o && setEditing(null)}
        title={editing?.id ? "Edit deal" : "New deal"} fields={dealFields(leads, properties)} record={editing}
        onSubmit={(data) => save(editing, data)} onDelete={(id) => remove.mutateAsync(id)} saving={saving}
      />
    </>
  );
}