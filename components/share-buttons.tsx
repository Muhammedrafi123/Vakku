"use client";

import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function openShare(target: "whatsapp" | "x") {
    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);
    const href =
      target === "whatsapp"
        ? `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        : `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => openShare("whatsapp")}
        className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-4 py-2 text-sm font-semibold hover:border-[#E8821A] hover:text-[#c46d12]"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={16} /> WhatsApp
      </button>
      <button
        type="button"
        onClick={() => openShare("x")}
        className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-4 py-2 text-sm font-semibold hover:border-[#E8821A] hover:text-[#c46d12]"
        aria-label="Share on X"
      >
        <Share2 size={16} /> X
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-4 py-2 text-sm font-semibold hover:border-[#E8821A] hover:text-[#c46d12]"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
