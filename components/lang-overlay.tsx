"use client";

import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { useLang } from "@/contexts/language-context";
import { brand } from "@/lib/brand";
import type { Lang } from "@/lib/i18n";

export function LangOverlay() {
  const { overlayDone, dismissOverlay } = useLang();
  const [selected, setSelected] = useState<Lang>("en");
  const [leaving, setLeaving] = useState(false);

  if (overlayDone) return null;

  function handleContinue() {
    setLeaving(true);
    setTimeout(() => dismissOverlay(selected), 480);
  }

  return (
    <div className={`lo-root${leaving ? " lo-root--leaving" : ""}`} role="dialog" aria-modal aria-label="Choose language">
      {/* Blurred radial glow */}
      <div className="lo-glow" aria-hidden />

      <div className="lo-card">
        {/* Logo mark */}
        <div className="lo-logo" aria-hidden>
          <span className="lo-logo-sq">
            <BrandMark size={34} />
          </span>
          <div className="lo-logo-text">
            <span className="lo-logo-udf">{brand.name}</span>
            <span className="lo-logo-sub">PROMISE TRACKER</span>
          </div>
        </div>

        <h1 className="lo-headline malayalam">ഭാഷ തിരഞ്ഞെടുക്കുക</h1>
        <p className="lo-sub">Choose your language / ഭാഷ തിരഞ്ഞെടുക്കുക</p>

        <div className="lo-options">
          {/* English */}
          <button
            type="button"
            className={`lo-opt${selected === "en" ? " lo-opt--active" : ""}`}
            onClick={() => setSelected("en")}
            aria-pressed={selected === "en"}
          >
            <span className="lo-opt-flag" aria-hidden>🇬🇧</span>
            <span className="lo-opt-name">English</span>
            <span className="lo-opt-desc">Browse in English</span>
            <span className="lo-opt-check" aria-hidden>✓</span>
          </button>

          {/* Malayalam */}
          <button
            type="button"
            className={`lo-opt${selected === "ml" ? " lo-opt--active" : ""}`}
            onClick={() => setSelected("ml")}
            aria-pressed={selected === "ml"}
          >
            <span className="lo-opt-flag" aria-hidden>🇮🇳</span>
            <span className="lo-opt-name malayalam">മലയാളം</span>
            <span className="lo-opt-desc malayalam">മലയാളത്തിൽ കാണുക</span>
            <span className="lo-opt-check" aria-hidden>✓</span>
          </button>
        </div>

        <button
          type="button"
          className="lo-continue"
          onClick={handleContinue}
        >
          {selected === "ml" ? (
            <span className="malayalam">തുടരുക</span>
          ) : (
            "Continue"
          )}
          <span className="lo-continue-arrow" aria-hidden>→</span>
        </button>

        <p className="lo-change-hint">
          {selected === "ml"
            ? <span className="malayalam">ക്രമീകരണങ്ങളിൽ ഭാഷ മാറ്റാം</span>
            : "You can change language anytime in settings"}
        </p>
      </div>
    </div>
  );
}
