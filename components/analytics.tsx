"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const GA_MEASUREMENT_ID = "G-12Y6XEMR0E";
const CLARITY_PROJECT_ID = "wxszxy2v9j";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    __vakkuGaInitialized?: boolean;
    __vakkuClarityInitialized?: boolean;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function AnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedUrl.current === pagePath) return;
    lastTrackedUrl.current = pagePath;

    ensureGtag();
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <>
      <Script
        id="vakku-ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="vakku-ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          if (!window.__vakkuGaInitialized) {
            window.__vakkuGaInitialized = true;
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          }
        `}
      </Script>
      <Script id="vakku-clarity-init" strategy="afterInteractive">
        {`
          if (!window.__vakkuClarityInitialized) {
            window.__vakkuClarityInitialized = true;
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          }
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsPageViews />
      </Suspense>
    </>
  );
}
