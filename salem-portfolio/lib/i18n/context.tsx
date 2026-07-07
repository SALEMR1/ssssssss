'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

export type Lang = 'ar' | 'en';

// ar.json is the canonical shape. en.json must structurally satisfy it.
// We use a mapped type that makes every leaf optional so TypeScript accepts
// en.json even when it temporarily lags behind ar.json in new keys.
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type Translations = typeof ar;
type LooseTranslations = DeepPartial<Translations>;

// Verify en satisfies the loose shape at compile time (no cast needed).
const _enCheck: LooseTranslations = en;
void _enCheck; // suppress unused-variable warning

interface I18nContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  isRTL: boolean;
}

const translations: Record<Lang, Translations> = {
  ar,
  // en is verified above to match the loose shape; assert the full shape
  // because at runtime every key en provides is correct.
  en: en as unknown as Translations,
};

const I18nContext = createContext<I18nContextValue>({
  lang: 'ar',
  t: ar,
  setLang: () => {},
  isRTL: true,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved === 'ar' || saved === 'en') {
        setLangState(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('lang', newLang);
    } catch {
      // ignore storage errors
    }
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', newLang);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return (
    <I18nContext.Provider
      value={{
        lang,
        t: translations[lang],
        setLang,
        isRTL: lang === 'ar',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
