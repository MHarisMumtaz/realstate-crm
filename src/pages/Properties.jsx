import React, { useState } from "react";
import useEntityCrud from "@/hooks/useEntityCrud";
import PageHeader from "@/components/shared/PageHeader";
import Toolbar from "@/components/shared/Toolbar";
import AddButton from "@/components/shared/AddButton";
import EntityFormDialog from "@/components/shared/EntityFormDialog";
import PropertyCard from "@/components/properties/PropertyCard";
import { propertyFields } from "@/lib/fields";

const FILTERS = { All: null, "For Sale": "Sale", "For Rent": "Rent" };

export default function Properties() {
  const { items, isLoading, save, remove, saving } = useEntityCrud("Property");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const q = search.toLowerCase();
  const filtered = items.filter((p) =>
    (!FILTERS[filter] || p.listing === FILTERS[filter]) &&
    [p.title, p.community, p.emirate, p.reference].some((v) => v?.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader eyebrow="Inventory" title="Properties" subtitle="Your listings across the Emirates, for sale and for rent." action={<AddButton label="New listing" onClick={() => setEditing({ listing: "Sale", status: "Available" })} />} />
      <Toolbar search={search} onSearch={setSearch} options={Object.keys(FILTERS)} value={filter} onChange={setFilter} placeholder="Search title, community, ref…" />
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />)}</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} onClick={() => setEditing(p)} />)}
        </div>
      )}
      {!isLoading && filtered.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">No properties match your filters</p>}
      <EntityFormDialog
        open={!!editing} onOpenChange={(o) => !o && setEditing(null)}
        title={editing?.id ? "Edit listing" : "New listing"} fields={propertyFields} record={editing}
        onSubmit={(data) => save(editing, data)} onDelete={(id) => remove.mutateAsync(id)} saving={saving}
      />
    </>
  );
}