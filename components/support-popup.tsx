"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Coffee, ExternalLink, X } from "lucide-react";
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
      className="sp-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sp-modal-heading"
    >
      <div className="sp-modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="sp-modal-close" aria-label="Close popup">
          <X size={18} />
        </button>

        <div className="sp-modal-header-banner">
          <div className="sp-modal-illustration-wrap">
            <Image
              src="/assets/chai-illustration.png"
              alt="Steaming Chai"
              width={96}
              height={96}
              className="sp-modal-illustration"
            />
          </div>
        </div>

        <div className="sp-modal-body">
          <h2 id="sp-modal-heading" className="sp-modal-title">
            <T en="Support Vakku!" ml="വാക്കിനെ പിന്തുണയ്ക്കൂ!" />
          </h2>

          <p className="sp-modal-subtitle">
            <T
              en="Help keep Kerala's promise tracker running & ad-free"
              ml="വാക്ക് പബ്ലിക് ട്രാക്കറിനെ പരസ്യരഹിതമായി നിലനിർത്താൻ സഹായിക്കൂ"
            />
          </p>

          <p className="sp-modal-note">
            <T
              en="Vakku tracks 1,286 Kerala government promises with verified public evidence. Reader contributions cover hosting, data verification, and research."
              ml="കേരള സർക്കാരിന്റെ 1,286 വാഗ്ദാനങ്ങൾ തെളിവുകളോടെ നിരീക്ഷിക്കുന്ന നിഷ്പക്ഷ പ്ലാറ്റ്‌ഫോമാണ് വാക്ക്. ഹോസ്റ്റിംഗും റീസർച്ചും തുടരാൻ നിങ്ങളുടെ പിന്തുണ നൽകൂ."
            />
          </p>

          <div className="sp-modal-cta-wrap">
            <a
              href={CHAI_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="sp-modal-submit-btn"
            >
              <Coffee size={18} />
              <span><T en="Buy Us A Chai ☕" ml="ഒരു ചായ വാങ്ങി നൽകാം ☕" /></span>
              <ExternalLink size={14} />
            </a>

            <button onClick={handleClose} className="sp-modal-dismiss-btn">
              <T en="Maybe later" ml="പിന്നീടാകാം" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
