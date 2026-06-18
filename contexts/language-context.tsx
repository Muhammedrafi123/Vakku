"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  overlayDone: boolean;
  dismissOverlay: (chosen: Lang) => void;
}

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  overlayDone: true,
  dismissOverlay: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [overlayDone, setOverlayDone] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const saved = localStorage.getItem("udf-lang") as Lang | null;
    const hasSavedLang = saved === "en" || saved === "ml";

    queueMicrotask(() => {
      if (cancelled) return;
      if (hasSavedLang) setLangState(saved);
      setOverlayDone(hasSavedLang);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("udf-lang", l);
  }

  function dismissOverlay(chosen: Lang) {
    setLang(chosen);
    setOverlayDone(true);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, overlayDone, dismissOverlay }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
