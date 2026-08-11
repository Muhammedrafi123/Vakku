"use client";

import { useEffect, useState } from "react";
import { Coffee, ExternalLink, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { T } from "@/components/t";

const CHAI_URL = "https://buymeachai.in/vellmont";
const POPUP_DELAY_MS = 30000; // 30 seconds

export function SupportPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, POPUP_DELAY_MS);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="sp-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sp-title"
    >
      <div className="sp-card" onClick={(e) => e.stopPropagation()}>
        <div className="sp-header">
          <div className="sp-brand">
            <BrandMark size={24} />
            <span className="sp-brand-name">Vakku</span>
            <span className="sp-brand-divider">/</span>
            <span className="sp-brand-tag">
              <T en="Civic Tech" ml="പൊതുസേവനം" />
            </span>
          </div>
          <button onClick={handleClose} className="sp-close" aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="sp-content">
          <h2 id="sp-title" className="sp-title">
            <T
              en="Keep Kerala's promise tracker independent & ad-free"
              ml="വാക്ക് പബ്ലിക് ട്രാക്കറിനെ പരസ്യരഹിതമായി നിലനിർത്താൻ സഹായിക്കൂ"
            />
          </h2>
          <p className="sp-desc">
            <T
              en="Vakku tracks 1,286 Kerala manifesto promises with verified public evidence. We rely on voluntary reader contributions to keep hosting, research, and data verification running."
              ml="കേരള സർക്കാരിന്റെ 1,286 വാഗ്ദാനങ്ങൾ തെളിവുകളോടെ നിരീക്ഷിക്കുന്ന പബ്ലിക് പ്ലാറ്റ്‌ഫോമാണ് വാക്ക്. സർവർ വെരിഫിക്കേഷൻ ചെലവുകൾക്കായി നിങ്ങളുടെ സഹായം അഭ്യർത്ഥിക്കുന്നു."
            />
          </p>
        </div>

        <div className="sp-footer">
          <a
            href={CHAI_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="sp-btn-primary"
          >
            <Coffee size={15} />
            <span><T en="Buy us a chai" ml="ഒരു ചായ നൽകാം" /></span>
            <ExternalLink size={13} className="sp-ext-icon" />
          </a>
          <button onClick={handleClose} className="sp-btn-secondary">
            <T en="Maybe later" ml="പിന്നീടാകാം" />
          </button>
        </div>
      </div>
    </div>
  );
}
