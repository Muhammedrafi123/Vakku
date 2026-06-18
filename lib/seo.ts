import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { categoryOptions, statusOptions, type Category, type PromiseItem, type Status } from "@/lib/types";
import { statusConfig } from "@/lib/utils";

export const seoKeywords = [
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
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, brand.siteUrl).toString();
}

export function truncateMeta(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3).replace(/\s+\S*$/, "")}...`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const categorySlugMap = new Map(categoryOptions.map((category) => [slugify(category), category]));
export const statusSlugMap = new Map(statusOptions.map((status) => [status.replace(/_/g, "-"), status]));

export function categoryToSlug(category: Category) {
  return slugify(category);
}

export function slugToCategory(slug: string) {
  return categorySlugMap.get(slug);
}

export function statusToSlug(status: Status) {
  return status.replace(/_/g, "-");
}

export function slugToStatus(slug: string) {
  return statusSlugMap.get(slug);
}

export function buildSeoMetadata({
  title,
  description,
  path,
  keywords = [],
  image = brand.appIcon,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description: truncateMeta(description),
    keywords: [...seoKeywords, ...keywords],
    alternates: { canonical },
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
    openGraph: {
      title,
      description: truncateMeta(description),
      url: canonical,
      siteName: brand.name,
      type,
      images: [{ url: imageUrl, width: 446, height: 446, alt: brand.name }],
    },
    twitter: {
      card: "summary",
      title,
      description: truncateMeta(description),
      images: [imageUrl],
    },
  };
}

export function graph(items: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: brand.name,
    url: brand.siteUrl,
    logo: absoluteUrl(brand.appIcon),
    description: brand.description,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: brand.name,
    alternateName: brand.productName,
    url: brand.siteUrl,
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/promises")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function datasetSchema(totalPromises: number, lastChecked: string) {
  return {
    "@type": "Dataset",
    "@id": absoluteUrl("/#dataset"),
    name: `${brand.name} ${brand.productName} Dataset`,
    description: brand.description,
    url: brand.siteUrl,
    dateModified: lastChecked,
    keywords: seoKeywords.join(", "),
    creator: { "@id": absoluteUrl("/#organization") },
    license: absoluteUrl("/about"),
    variableMeasured: [
      "Manifesto promise",
      "Promise status",
      "Progress percentage",
      "Department",
      "Minister",
      "Evidence timeline",
    ],
    size: totalPromises,
  };
}

export function collectionPageSchema({
  name,
  description,
  path,
  itemCount,
}: {
  name: string;
  description: string;
  path: string;
  itemCount: number;
}) {
  return {
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: ["Kerala election promises", "UDF manifesto", "public accountability"],
    numberOfItems: itemCount,
  };
}

export function promiseArticleSchema(promise: PromiseItem) {
  return {
    "@type": "Article",
    headline: `${promise.id}: ${promise.promise_en}`,
    description: truncateMeta(promise.simple_explanation, 240),
    url: absoluteUrl(`/promise/${promise.id}`),
    dateModified: promise.last_updated,
    articleSection: promise.category,
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/promise/${promise.id}`),
    about: [
      promise.category,
      promise.department,
      promise.minister,
      "UDF manifesto promise",
      `${statusConfig[promise.status].label} promise`,
    ].filter(Boolean),
    citation: `UDF Manifesto 2026, page ${promise.source_pages.join(", ")}`,
  };
}
