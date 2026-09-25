const full = new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-AE", { notation: "compact", maximumFractionDigits: 1 });

export const formatAED = (n) => (n || n === 0 ? `AED ${full.format(n)}` : "—");
export const formatAEDCompact = (n) => `AED ${compact.format(n || 0)}`;