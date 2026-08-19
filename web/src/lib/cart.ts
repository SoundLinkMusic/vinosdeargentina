import { Cart } from "./types";

export const CART_STORAGE_KEY = "deAlturaCart";

export function loadCart(): Cart {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Cart) : {};
  } catch {
    return {};
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
