import React from "react";
import { MessageCircle, Phone, Mail, Globe2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import PortalImporter from "@/components/integrations/PortalImporter";

const MOBILE = [
  { icon: MessageCircle, title: "WhatsApp", text: "One tap opens a chat with the client, with a pre-written follow-up message." },
  { icon: Phone, title: "Phone call", text: "Dial the client straight from their lead profile." },
  { icon: Mail, title: "Email", text: "Open a new email addressed to the client in one tap." },
];

export default function Integrations() {
  return (
    <>
      <PageHeader eyebrow="Connect" title="Integrations" subtitle="Bring in portal enquiries automatically, and reach clients on the apps they use every day." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><PortalImporter /></div>
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Mobile quick actions</p>
            <div className="mt-5 space-y-5">
              {MOBILE.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <div className="rounded-full bg-gold-light/60 p-2 text-gold"><Icon className="h-4 w-4" strokeWidth={1.6} /></div>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">Open any lead's profile to use these — they open the native apps on your phone.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground"><Globe2 className="h-3.5 w-3.5" /> Portals supported</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Property Finder", "Bayut", "Dubizzle", "Website", "Referral"].map((p) => (
                <span key={p} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}