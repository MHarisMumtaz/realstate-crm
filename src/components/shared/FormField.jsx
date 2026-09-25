import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormField({ field, value, onChange }) {
  const { name, label, type = "text", options, required, placeholder, full } = field;
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={name} className="text-xs text-muted-foreground font-normal">
        {label}{required && <span className="text-gold"> *</span>}
      </Label>
      {type === "select" ? (
        <Select value={value ?? ""} onValueChange={onChange}>
          <SelectTrigger id={name} className="h-10 bg-white"><SelectValue placeholder="Select…" /></SelectTrigger>
          <SelectContent>
            {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      ) : type === "textarea" ? (
        <Textarea id={name} value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={3} className="bg-white" />
      ) : (
        <Input id={name} type={type} value={value ?? ""} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-10 bg-white" />
      )}
    </div>
  );
}