import React from "react";
import { Search } from "lucide-react";

export default function Toolbar({ search, onSearch, options, value, onChange, placeholder }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mb-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${value === o ? "bg-ink text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="relative md:w-72">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.6} />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>
    </div>
  );
}