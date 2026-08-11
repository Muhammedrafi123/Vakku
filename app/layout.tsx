import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { LangOverlay } from "@/components/lang-overlay";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { LanguageProvider } from "@/contexts/language-context";
import { brand } from "@/lib/brand";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";
import { SupportPopup } from "@/components/support-popup";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const malabar = localFont({
  src: [
    { path: "../fonts/FSLMALABAR-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/FSLMALABAR-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-malabar",
  display: "swap",
});

const padmanabha = localFont({
  src: [{ path: "../fonts/FML-Padmanabha-Bold.ttf", weight: "700", style: "normal" }],
  variable: "--font-padmanabha",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? brand.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} - ${brand.productName}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "UDF manifesto",
    "Kerala UDF manifesto",
    "UDF promises",
    "Kerala election promises",
    "UDF manifesto tracker",
    "Kerala promise tracker",
    "Kerala political tracker",
    "UDF project tracker",
    "Kerala development tracker",
    "UDF status checker",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "446x446" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "446x446", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${brand.name} - ${brand.productName}`,
    description: brand.description,
    url: "/",
    siteName: brand.name,
    type: "website",
    images: [{ url: brand.appIcon, width: 446, height: 446, alt: brand.name }],
  },
  twitter: {
    card: "summary",
    title: `${brand.name} - ${brand.productName}`,
    description: brand.description,
    images: [brand.appIcon],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${malabar.variable} ${padmanabha.variable}`}>
      <body className="antialiased">
        <SeoJsonLd data={graph([organizationSchema(), websiteSchema()])} />
        <LanguageProvider>
          <LangOverlay />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileNav />
          <SupportPopup />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
