import React from "react";
import { Users, Building2, TrendingUp, Trophy } from "lucide-react";
import useEntityCrud from "@/hooks/useEntityCrud";
import HeroBanner from "@/components/dashboard/HeroBanner";
import StatCard from "@/components/dashboard/StatCard";
import PipelineChart from "@/components/dashboard/PipelineChart";
import RecentLeads from "@/components/dashboard/RecentLeads";
import { formatAEDCompact } from "@/lib/format";

export default function Dashboard() {
  const { items: leads } = useEntityCrud("Lead");
  const { items: properties } = useEntityCrud("Property");
  const { items: deals } = useEntityCrud("Deal");

  const open = deals.filter((d) => !d.stage?.startsWith("Closed"));
  const won = deals.filter((d) => d.stage === "Closed Won");
  const sum = (arr) => arr.reduce((s, d) => s + (d.value || 0), 0);
  return (
    <>
      <HeroBanner />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leads" value={leads.length} hint={`${leads.filter((l) => l.status === "New").length} new to contact`} icon={Users} />
        <StatCard label="Active listings" value={properties.filter((p) => p.status === "Available").length} hint={`${properties.length} total properties`} icon={Building2} />
        <StatCard label="Pipeline" value={formatAEDCompact(sum(open))} hint={`${open.length} open deals`} icon={TrendingUp} />
        <StatCard label="Closed won" value={formatAEDCompact(sum(won))} hint={`${won.length} deals completed`} icon={Trophy} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <PipelineChart deals={deals} />
        <RecentLeads leads={leads} />
      </div>
    </>
  );
}