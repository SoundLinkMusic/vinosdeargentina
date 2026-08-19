"use client";

import { useLocaleSwitch } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useLocaleSwitch();

  return (
    <div className="fixed top-6 right-6 z-[110] flex bg-white/90 backdrop-blur-md p-1 rounded-full shadow-lg border border-stone-200">
      <button
        onClick={() => setLocale("es")}
        className={
          locale === "es"
            ? "px-4 py-1.5 text-xs font-bold rounded-full bg-wine-900 text-white transition-all shadow-sm"
            : "px-4 py-1.5 text-xs font-bold rounded-full text-stone-500 hover:text-wine-900 transition-all"
        }
      >
        ES
      </button>
      <button
        onClick={() => setLocale("en")}
        className={
          locale === "en"
            ? "px-4 py-1.5 text-xs font-bold rounded-full bg-wine-900 text-white transition-all shadow-sm"
            : "px-4 py-1.5 text-xs font-bold rounded-full text-stone-500 hover:text-wine-900 transition-all"
        }
      >
        EN
      </button>
    </div>
  );
}
