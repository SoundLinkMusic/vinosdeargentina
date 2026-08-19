"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Cart } from "@/lib/types";
import { saveCart } from "@/lib/cart";

interface Props {
  cart: Cart;
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ cart, open, onClose }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const keys = Object.keys(cart);

  let total = 0;
  keys.forEach((id) => {
    const item = cart[id];
    total += item.qty * item.price * 1.07 * item.box;
  });

  const processCheckout = () => {
    saveCart(cart);
    router.push("/checkout");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[105] transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        id="cart-drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[106] shadow-2xl flex flex-col transition-transform duration-400 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h3 className="text-2xl font-serif text-wine-900 font-bold">{t("cartTitle")}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-wine-900 text-2xl leading-none">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {keys.length === 0 ? (
            <p className="text-center text-stone-400 italic mt-10">{t("cartEmpty")}</p>
          ) : (
            keys.map((id) => {
              const item = cart[id];
              const itemTotal = item.qty * item.price * 1.07 * item.box;
              return (
                <div key={id} className="flex justify-between p-4 bg-white border rounded-lg shadow-sm mb-3">
                  <div>
                    <h5 className="text-sm font-bold text-wine-900">{item.name}</h5>
                    <div className="text-xs text-stone-500">
                      {item.qty} {t("boxesUnit")}
                    </div>
                  </div>
                  <div className="font-bold text-wine-900">{itemTotal.toFixed(2).replace(".", ",")} €</div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-6 border-t border-stone-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-stone-500 font-medium">{t("cartTotal")}</span>
            <div className="text-3xl font-serif text-wine-900 font-bold">
              {total.toFixed(2).replace(".", ",")} €
            </div>
          </div>
          <button
            onClick={processCheckout}
            disabled={keys.length === 0}
            className="w-full bg-wine-900 hover:bg-wine-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold h-12 rounded-lg text-xs uppercase tracking-widest transition-colors"
          >
            {t("checkout")}
          </button>
        </div>
      </aside>
    </>
  );
}
