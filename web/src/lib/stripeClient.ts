import { loadStripe } from "@stripe/stripe-js";

// TEMPORAL - solo para probar el flujo de pago con Stripe test mode.
// Revertir antes de mergear a main: volver a NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// y NEXT_PUBLIC_STRIPE_EDGE_FUNCTION_URL (sin _TEST).
const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(PUBLISHABLE_KEY);
  }
  return stripePromise;
}

// TEMPORAL - solo para probar el flujo de pago con Stripe test mode.
// Revertir antes de mergear a main.
export const EDGE_FUNCTION_URL =
  process.env.NEXT_PUBLIC_STRIPE_EDGE_FUNCTION_URL_TEST || process.env.NEXT_PUBLIC_STRIPE_EDGE_FUNCTION_URL!;
