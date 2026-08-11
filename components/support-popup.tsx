"use client";

import { useEffect, useState } from "react";
import { Coffee, ExternalLink, X, Shield, Sparkles, Heart } from "lucide-react";
import { T } from "@/components/t";

const CHAI_URL = "https://buymeachai.in/vellmont";
const POPUP_DELAY_MS = 15000; // 15 seconds initial delay
const DISMISS_STORAGE_KEY = "vakku_chai_popup_dismissed";

export function SupportPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = typeof window !== "undefined" && sessionStorage.getItem(DISMISS_STORAGE_KEY);
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, POPUP_DELAY_MS);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(DISMISS_STORAGE_KEY, "true");
      }
    }, 250);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`sp-modal-backdrop ${isClosing ? "sp-modal-exit" : ""}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sp-modal-heading"
    >
      <div 
        className={`sp-modal-card ${isClosing ? "sp-card-exit" : ""}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow effects */}
        <div className="sp-card-ambient-glow" aria-hidden="true" />
        
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="sp-modal-close" 
          aria-label="Close popup"
        >
          <X size={16} />
        </button>

        <div className="sp-modal-inner">
          {/* Top Pill Tag */}
          <div className="sp-pill-badge">
            <span className="sp-pulse-dot" />
            <Sparkles size={12} className="sp-pill-icon" />
            <span><T en="Independent Civic Tracker" ml="സ്വതന്ത്ര പൊതു ട്രാക്കർ" /></span>
          </div>

          {/* Animated SVG Chai Illustration */}
          <div className="sp-illustration-container">
            <div className="sp-chai-halo" />
            <svg 
              className="sp-chai-svg" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cupGrad" x1="20" y1="40" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="teaGrad" x1="30" y1="50" x2="90" y2="80" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="saucerGrad" x1="15" y1="95" x2="105" y2="105" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Steam animations */}
              <g className="sp-steam-group">
                <path className="sp-steam-path steam-1" d="M 45 42 Q 40 30 50 20 T 45 5" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
                <path className="sp-steam-path steam-2" d="M 60 40 Q 67 28 58 18 T 62 4" stroke="#fde047" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
                <path className="sp-steam-path steam-3" d="M 75 42 Q 70 30 80 20 T 75 5" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
              </g>

              {/* Saucer */}
              <ellipse cx="60" cy="96" rx="42" ry="7" fill="url(#saucerGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Chai Cup Body */}
              <path d="M 32 48 L 38 88 C 39 93 45 96 60 96 C 75 96 81 93 82 88 L 88 48 Z" fill="url(#cupGrad)" />
              
              {/* Cup Lip Accent */}
              <ellipse cx="60" cy="48" rx="28" ry="6" fill="#fbbf24" opacity="0.9" />
              <ellipse cx="60" cy="48" rx="25" ry="4.5" fill="url(#teaGrad)" />

              {/* Handle */}
              <path d="M 85 54 C 98 54 99 76 82 78" stroke="url(#cupGrad)" strokeWidth="5.5" strokeLinecap="round" fill="none" />

              {/* Heart Stamp on Cup */}
              <path d="M 60 74 L 56.5 70.5 C 53 67.5 53 64.5 55.5 62.5 C 57.5 61 59.5 62 60 63.5 C 60.5 62 62.5 61 64.5 62.5 C 67 64.5 67 67.5 63.5 70.5 Z" fill="#ffffff" opacity="0.85" />
            </svg>
          </div>

          {/* Heading & Subtitle */}
          <h2 id="sp-modal-heading" className="sp-modal-title">
            <T en="Support Vakku" ml="വാക്കിനെ പിന്തുണയ്ക്കൂ!" />
          </h2>

          <p className="sp-modal-subtitle">
            <T
              en="Help keep Kerala's public promise tracker ad-free & independent."
              ml="കേരളത്തിലെ പൊതു വാഗ്ദാന ട്രാക്കർ പരസ്യരഹിതമായി നിലനിർത്താൻ സഹായിക്കൂ."
            />
          </p>

          {/* Impact Stats Strip */}
          <div className="sp-impact-grid">
            <div className="sp-impact-card">
              <span className="sp-impact-val">1,286</span>
              <span className="sp-impact-lbl"><T en="Promises" ml="വാഗ്ദാനങ്ങൾ" /></span>
            </div>
            <div className="sp-impact-card">
              <span className="sp-impact-val">100%</span>
              <span className="sp-impact-lbl"><T en="Verified" ml="സ്ഥിരീകരിച്ചവ" /></span>
            </div>
            <div className="sp-impact-card">
              <span className="sp-impact-val">0</span>
              <span className="sp-impact-lbl"><T en="Ads / Trackers" ml="പരസ്യങ്ങൾ" /></span>
            </div>
          </div>

          {/* Description */}
          <p className="sp-modal-note">
            <T
              en="Reader contributions cover hosting, verification research, and keeping democratic accountability accessible to everyone."
              ml="നിങ്ങളുടെ ചെറിയ പിന്തുണയിലൂടെ മികച്ച റിസർച്ചും വിവരശേഖരണവും മുന്നോട്ട് കൊണ്ടുപോകാൻ സഹായിക്കും."
            />
          </p>

          {/* Actions */}
          <div className="sp-modal-cta-wrap">
            <a
              href={CHAI_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="sp-modal-submit-btn"
            >
              <Coffee size={18} className="sp-btn-icon" />
              <span><T en="Buy Us A Chai" ml="ഒരു ചായ വാങ്ങി നൽകാം" /></span>
              <ExternalLink size={14} className="sp-btn-arrow" />
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

