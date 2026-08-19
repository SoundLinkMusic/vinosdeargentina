"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

export type Locale = "es" | "en";
const messagesByLocale = { es, en };
const LOCALE_STORAGE_KEY = "deAlturaLang";

interface LocaleSwitchContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LocaleSwitchContext = createContext<LocaleSwitchContextValue | null>(null);

// Client-side locale toggle (no routing) — mirrors the original site's
// behaviour of a single URL with a JS class switch, using next-intl for
// message resolution/formatting instead of hand-rolled dictionaries.
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read persisted locale once after mount to avoid SSR/client hydration mismatch
    if (saved === "es" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, l);
  };

  return (
    <LocaleSwitchContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleSwitchContext.Provider>
  );
}

export function useLocaleSwitch() {
  const ctx = useContext(LocaleSwitchContext);
  if (!ctx) throw new Error("useLocaleSwitch must be used within I18nProvider");
  return ctx;
}
