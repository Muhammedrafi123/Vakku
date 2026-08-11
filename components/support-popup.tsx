"use client";

import { useEffect, useState } from "react";
import { Coffee, ExternalLink, ShieldCheck, Heart, X, Sparkles } from "lucide-react";
import { T } from "@/components/t";

const CHAI_URL = "https://buymeachai.in/vellmont";
const POPUP_DELAY_MS = 30000; // 30 seconds

export function SupportPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, POPUP_DELAY_MS);

    // Escape key handling
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
      className="chai-overlay-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chai-modal-title"
    >
      <div
        className="chai-modal-card"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
      >
        <button
          onClick={handleClose}
          className="chai-modal-close"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="chai-modal-header">
          <div className="chai-modal-tag">
            <ShieldCheck size={14} className="chai-tag-icon" />
            <span><T en="Independent Civic Tech" ml="സ്വതന്ത്ര പൊതുജന സംരംഭം" /></span>
          </div>
        </div>

        <div className="chai-modal-hero">
          <div className="chai-hero-icon-wrap">
            <Coffee size={28} className="chai-hero-icon" />
            <Sparkles size={16} className="chai-hero-sparkle" />
          </div>
          <h2 id="chai-modal-title" className="chai-modal-title">
            <T
              en="Help Keep Kerala's Promise Tracker Independent"
              ml="വാക്ക് ട്രാക്കറിനെ സ്വതന്ത്രമായി നിലനിർത്താൻ സഹായിക്കൂ"
            />
          </h2>
        </div>

        <div className="chai-modal-body">
          <p className="chai-modal-text">
            <T
              en="Vakku is an ad-free, community-driven civic platform tracking 1,286 Kerala UDF manifesto promises with verified public evidence. We rely on citizen support to cover hosting & research costs."
              ml="കേരള യു.ഡി.എഫ് സർക്കാറിന്റെ 1,286 വാഗ്ദാനങ്ങൾ തെളിവുകളോടെ നിരീക്ഷിക്കുന്ന പരസ്യരഹിത സംരംഭമാണ് വാക്ക്. ഹോസ്റ്റിംഗും റീസർച്ചും തുടരാൻ നിങ്ങളുടെ സഹായം അഭ്യർത്ഥിക്കുന്നു."
            />
          </p>

          <div className="chai-trust-pills">
            <div className="chai-pill-item">
              <span className="chai-pill-dot green" />
              <T en="100% Ad-Free" ml="100% പരസ്യരഹിതം" />
            </div>
            <div className="chai-pill-item">
              <span className="chai-pill-dot amber" />
              <T en="Verified Sources" ml="സ്ഥിരീകരിച്ച തെളിവുകൾ" />
            </div>
            <div className="chai-pill-item">
              <span className="chai-pill-dot blue" />
              <T en="Open Public Data" ml="സുതാര്യമായ വിവരങ്ങൾ" />
            </div>
          </div>
        </div>

        <div className="chai-modal-actions">
          <a
            href={CHAI_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="chai-modal-primary-btn"
          >
            <Coffee size={18} />
            <span><T en="Buy us a chai ☕" ml="ഒരു ചായ വാങ്ങി നൽകാം ☕" /></span>
            <ExternalLink size={14} className="chai-btn-arrow" />
          </a>

          <button onClick={handleClose} className="chai-modal-secondary-btn">
            <T en="Continue reading" ml="വായന തുടരുക" />
          </button>
        </div>

        <div className="chai-modal-footer">
          <Heart size={12} className="chai-footer-heart" />
          <span><T en="Made for the citizens of Kerala" ml="കേരള ജനതയ്ക്കായി നിർമ്മിച്ചത്" /></span>
        </div>
      </div>
    </div>
  );
}
