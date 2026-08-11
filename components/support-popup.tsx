"use client";

import { useEffect, useState } from "react";
import { Coffee, ExternalLink, Heart, X } from "lucide-react";
import { T } from "@/components/t";

const CHAI_URL = "https://buymeachai.in/vellmont";
const POPUP_DELAY_MS = 30000; // 30 seconds

export function SupportPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = typeof window !== "undefined" && sessionStorage.getItem("chai_popup_dismissed");
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chai_popup_dismissed", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="chai-popup-backdrop" role="dialog" aria-modal="true" aria-label="Support tracker">
      <div className="chai-popup-card">
        <button
          onClick={handleClose}
          className="chai-popup-close"
          aria-label="Close support popup"
        >
          <X size={18} />
        </button>

        <div className="chai-popup-header">
          <div className="chai-popup-badge">
            <Coffee size={18} className="chai-popup-cup" />
            <span><T en="Support Vakku" ml="വാക്കിനെ പിന്തുണയ്ക്കുക" /></span>
          </div>
          <Heart size={16} className="chai-popup-heart" />
        </div>

        <div className="chai-popup-body">
          <h3 className="chai-popup-title">
            <T en="Enjoying this public tracker?" ml="ഇഷ്ടപ്പെട്ടോ ഈ പബ്ലിക് ട്രാക്കർ?" />
          </h3>
          <p className="chai-popup-text">
            <T
              en="Vakku is 100% free & open for Kerala citizens. Help us keep server hosting, evidence verification, and updates running!"
              ml="വാക്ക് 100% സൗജന്യവും നിഷ്പക്ഷവുമാണ്. സർവർ ഹോസ്റ്റിംഗും വാർത്താ പരിശോധനയും തുടരാൻ സഹായിക്കൂ!"
            />
          </p>
        </div>

        <div className="chai-popup-actions">
          <a
            href={CHAI_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="chai-popup-cta"
          >
            <Coffee size={16} />
            <span><T en="Buy us a chai ☕" ml="ഒരു ചായ വാങ്ങി നൽകൂ ☕" /></span>
            <ExternalLink size={13} />
          </a>
          <button onClick={handleClose} className="chai-popup-dismiss">
            <T en="Maybe later" ml="പിന്നീടാകാം" />
          </button>
        </div>
      </div>
    </div>
  );
}
