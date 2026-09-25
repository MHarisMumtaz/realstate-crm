import React from "react";
import { Plus } from "lucide-react";

export default function AddButton({ label, onClick }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg shadow-ink/10 transition-all duration-300 hover:shadow-xl hover:shadow-ink/20 hover:-translate-y-0.5">
      <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" /> {label}
    </button>
  );
}