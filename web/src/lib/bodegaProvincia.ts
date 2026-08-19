// Ported verbatim from index.html (BODEGA_PROVINCIA_MAP)
const BODEGA_PROVINCIA_MAP: Record<string, string> = {
  "Viñas en Flor": "Salta",
  "The Llama": "Salta",
  "Bodega Yacochuya": "Salta",
  Coquena: "Salta",
  "Agustín Lanús Wines": "Salta",
  "Agustin Lanus Wines": "Salta",
  "Bodega Fernando Dupont": "Jujuy",
  "Nido del Tigre": "San Juan",
  "Paso a Paso": "Mendoza",
  "Paso a Paso Wines": "Mendoza",
  "Huentala Wines": "Mendoza",
  "Colosso Wines": "Mendoza",
  "Coloso Wines": "Mendoza",
  "Buenos Aires": "Mendoza",
  "Bodega del Desierto": "Patagonia",
};

export const getProvinciaBodega = (bodega: string): string =>
  BODEGA_PROVINCIA_MAP[bodega] || "Desconocida";

// Ported verbatim from index.html renderCatalog (hardcoded out-of-stock names)
const NO_STOCK_NAMES = ["Pasacana", "Orange", "Bonarda"];
export const isOutOfStock = (name: string): boolean =>
  NO_STOCK_NAMES.some((n) => name.includes(n));
