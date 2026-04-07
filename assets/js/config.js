// Configuración global de APIs y endpoints
const API_CONFIG = {
  // Variables de entorno (fallback a placeholders si no existen)
  SUPABASE_URL: import.meta?.env?.VITE_SUPABASE_URL || '',
  SUPABASE_KEY: import.meta?.env?.VITE_SUPABASE_KEY || '',
  STRIPE_PUBLIC: import.meta?.env?.VITE_STRIPE_PUBLIC || '',
  WINES_DATA: '/assets/data/wines.json',

  // Configuración de rutas locales
  PATHS: {
    WINES: '/assets/data/wines.json',
    LOGIN: '/public/login.html',
    MARKETPLACE: '/public/marketplace.html',
    CHECKOUT: '/public/checkout.html',
    CRM: '/public/crm.html'
  },

  // Configuración de impuestos y márgenes
  TAXES: {
    AIEM_DEFAULT: 0.15,      // 15% por defecto
    IGIC_CANARIAS: 0.07,     // IGIC Canarias 7%
    HORECA_DISCOUNT: 0.20    // 20% descuento mayorista
  }
};

// Exportar para ES modules y CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
