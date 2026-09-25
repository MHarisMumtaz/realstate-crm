import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LayoutDashboard, Users, Building2, Handshake, CalendarCheck, PlugZap, LogOut } from "lucide-react";
import { base44 } from "@/api/base44Client";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/viewings", label: "Viewings", icon: CalendarCheck },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/deals", label: "Deals", icon: Handshake },
  { to: "/integrations", label: "Integrations", icon: PlugZap },
];

export default function Sidebar({ onNavigate }) {
  const { data: user } = useQuery({ queryKey: ["me"], queryFn: () => base44.auth.me() });
  return (
    <div className="flex h-full flex-col bg-ink px-5 py-8 text-white/70">
      <div className="mb-14 px-3">
        <div className="font-heading text-3xl font-light text-white tracking-tight">Sahara<span className="text-gold">.</span></div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/40">Realty CRM · UAE</div>
      </div>
      <nav className="flex-1 space-y-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to} to={to} end={to === "/"} onClick={onNavigate}
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ${isActive ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"}`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.6} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 pt-5 px-3">
        <p className="text-sm text-white truncate">{user?.full_name || "Agent"}</p>
        <p className="text-xs text-white/40 truncate">{user?.email}</p>
        <button onClick={() => base44.auth.logout()} className="mt-4 flex items-center gap-2 text-xs text-white/50 transition hover:text-gold">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </div>
  );
}