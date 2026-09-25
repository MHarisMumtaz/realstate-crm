import { EMIRATES, SOURCES, PROPERTY_TYPES, LEAD_STATUSES, PROPERTY_STATUSES, DEAL_STAGES, VIEWING_STATUSES } from "@/lib/constants";

export const leadFields = [
  { name: "full_name", label: "Full name", required: true },
  { name: "phone", label: "Phone", placeholder: "+971 50 000 0000" },
  { name: "email", label: "Email", type: "email" },
  { name: "nationality", label: "Nationality" },
  { name: "interest", label: "Interest", type: "select", options: ["Buy", "Rent", "Invest"] },
  { name: "property_type", label: "Property type", type: "select", options: PROPERTY_TYPES },
  { name: "emirate", label: "Emirate", type: "select", options: EMIRATES },
  { name: "preferred_area", label: "Preferred area", placeholder: "e.g. Dubai Marina" },
  { name: "budget", label: "Budget (AED)", type: "number" },
  { name: "source", label: "Source", type: "select", options: SOURCES },
  { name: "status", label: "Status", type: "select", options: LEAD_STATUSES },
  { name: "assigned_agent", label: "Assigned agent" },
  { name: "notes", label: "Notes", type: "textarea", full: true },
];

export const propertyFields = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "reference", label: "Reference no." },
  { name: "listing", label: "Listing", type: "select", options: ["Sale", "Rent"] },
  { name: "property_type", label: "Type", type: "select", options: PROPERTY_TYPES },
  { name: "emirate", label: "Emirate", type: "select", options: EMIRATES },
  { name: "community", label: "Community", placeholder: "e.g. Palm Jumeirah" },
  { name: "price", label: "Price (AED)", type: "number", required: true },
  { name: "bedrooms", label: "Bedrooms", type: "number" },
  { name: "bathrooms", label: "Bathrooms", type: "number" },
  { name: "area_sqft", label: "Area (sq ft)", type: "number" },
  { name: "status", label: "Status", type: "select", options: PROPERTY_STATUSES },
  { name: "image_url", label: "Image URL", full: true },
  { name: "description", label: "Description", type: "textarea", full: true },
];

export const dealFields = (leads, properties) => [
  { name: "title", label: "Deal title", required: true, full: true },
  { name: "lead_name", label: "Client", type: "select", options: leads.map((l) => l.full_name) },
  { name: "property_title", label: "Property", type: "select", options: properties.map((p) => p.title) },
  { name: "value", label: "Deal value (AED)", type: "number" },
  { name: "stage", label: "Stage", type: "select", options: DEAL_STAGES },
  { name: "commission_pct", label: "Commission (%)", type: "number" },
  { name: "expected_close", label: "Expected close", type: "date" },
  { name: "agent", label: "Agent" },
  { name: "notes", label: "Notes", type: "textarea", full: true },
];

export const viewingFields = (leads, properties) => [
  { name: "lead_name", label: "Client", type: "select", options: leads.map((l) => l.full_name), required: true },
  { name: "property_title", label: "Property", type: "select", options: properties.map((p) => p.title) },
  { name: "agent", label: "Agent" },
  { name: "viewing_date", label: "Date & time", type: "datetime-local" },
  { name: "status", label: "Status", type: "select", options: VIEWING_STATUSES },
  { name: "notes", label: "Notes", type: "textarea", full: true },
];