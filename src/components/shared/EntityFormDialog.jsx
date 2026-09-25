import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import FormField from "@/components/shared/FormField";

export default function EntityFormDialog({ open, onOpenChange, title, fields, record, onSubmit, onDelete, saving }) {
  const [form, setForm] = useState({});
  useEffect(() => { if (open) setForm(record || {}); }, [open, record]);

  const submit = async (e) => {
    e.preventDefault();
    const data = {};
    fields.forEach(({ name, type }) => {
      const v = form[name];
      if (v === undefined || v === "") return;
      data[name] = type === "number" ? Number(v) : v;
    });
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-light">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-6 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <FormField key={f.name} field={f} value={form[f.name]} onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))} />
            ))}
          </div>
          <div className="flex items-center justify-between border-t pt-5">
            {record?.id && onDelete ? (
              <Button type="button" variant="ghost" className="text-destructive hover:text-destructive" onClick={async () => { await onDelete(record.id); onOpenChange(false); }}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            ) : <span />}
            <Button type="submit" disabled={saving} className="rounded-full px-6 bg-ink hover:bg-ink/90">
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}