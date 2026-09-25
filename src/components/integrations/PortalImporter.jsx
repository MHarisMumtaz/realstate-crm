import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { PROPERTY_TYPES, EMIRATES } from "@/lib/constants";
import { formatAED } from "@/lib/format";

const PORTALS = ["Property Finder", "Bayut", "Dubizzle", "Website", "Other"];

const SCHEMA = {
  type: "object",
  properties: {
    full_name: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
    nationality: { type: "string" },
    interest: { type: "string", enum: ["Buy", "Rent", "Invest"] },
    property_type: { type: "string", enum: PROPERTY_TYPES },
    emirate: { type: "string", enum: EMIRATES },
    preferred_area: { type: "string" },
    budget: { type: "number" },
    notes: { type: "string" },
  },
};

export default function PortalImporter() {
  const qc = useQueryClient();
  const [portal, setPortal] = useState(PORTALS[0]);
  const [text, setText] = useState("");
  const [extracted, setExtracted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedName, setSavedName] = useState("");

  const extract = async () => {
    setLoading(true); setError(""); setSavedName("");
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `The following is a property enquiry message forwarded to a UAE real estate agency from the ${portal} channel. Extract the client's details. Only include fields actually present in the message, omit anything unknown. Budget must be a number in AED (for rentals, multiply the monthly rent by 12).\n\n---\n${text}\n---`,
        response_json_schema: SCHEMA,
      });
      setExtracted({ ...res, source: portal === "Other" ? undefined : portal, status: "New" });
    } catch {
      setError("Could not read that enquiry. Please check the text and try again.");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    await base44.entities.Lead.create(extracted);
    qc.invalidateQueries({ queryKey: ["Lead"] });
    setSavedName(extracted.full_name || "Lead");
    setExtracted(null);
    setText("");
  };

  const preview = [
    ["Name", extracted?.full_name],
    ["Phone", extracted?.phone],
    ["Email", extracted?.email],
    ["Interest", [extracted?.interest, extracted?.property_type].filter(Boolean).join(" · ")],
    ["Area", [extracted?.preferred_area, extracted?.emirate].filter(Boolean).join(", ")],
    ["Budget", extracted?.budget ? formatAED(extracted.budget) : null],
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gold-light/60 p-2 text-gold"><Sparkles className="h-4 w-4" /></div>
        <div>
          <h2 className="font-heading text-2xl font-light">Portal enquiry import</h2>
          <p className="text-xs text-muted-foreground">Paste an enquiry from Property Finder, Bayut or Dubizzle — AI reads it and drafts the lead for you.</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {PORTALS.map((p) => (
            <button key={p} onClick={() => setPortal(p)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${portal === p ? "bg-ink text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
        <textarea
          value={text} onChange={(e) => setText(e.target.value)} rows={6}
          placeholder="Paste the enquiry message here — e.g. 'Hi, I'm looking for a 2BR apartment in Dubai Marina under AED 170k/year. My number is +971 55 123 4567…'"
          className="w-full rounded-xl border bg-white p-4 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
        <button onClick={extract} disabled={loading || !text.trim()} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Extract details
        </button>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {savedName && <p className="flex items-center gap-2 text-sm text-emerald-600"><CheckCircle2 className="h-4 w-4" /> {savedName} added to your leads.</p>}
      </div>

      {extracted && (
        <div className="mt-6 rounded-xl border bg-gold-light/15 p-5">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Review extracted lead</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            {preview.map(([k, v]) => v ? (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 text-sm">{v}</dd>
              </div>
            ) : null)}
          </dl>
          <div className="mt-5 flex gap-3">
            <button onClick={save} className="rounded-full bg-ink px-5 py-2 text-sm text-white transition hover:bg-ink/90">Add to leads</button>
            <button onClick={() => setExtracted(null)} className="rounded-full border px-5 py-2 text-sm transition hover:border-gold">Discard</button>
          </div>
        </div>
      )}
    </div>
  );
}