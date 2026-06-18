import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { meta, promises } from "@/lib/data";
import { getAllMinisterSlugs } from "@/lib/ministers";
import { categoryToSlug, statusToSlug } from "@/lib/seo";
import { categoryOptions, statusOptions } from "@/lib/types";

const staticRoutes = [
  "",
  "/promises",
  "/categories",
  "/ministers",
  "/timeline",
  "/about",
  "/manifesto/2026",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(meta.last_checked);

  return [
    ...staticRoutes.map((route) => ({
      url: `${brand.siteUrl}${route}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...getAllMinisterSlugs().map((slug) => ({
      url: `${brand.siteUrl}/ministers/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...categoryOptions.map((category) => ({
      url: `${brand.siteUrl}/category/${categoryToSlug(category)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.72,
    })),
    ...statusOptions.map((status) => ({
      url: `${brand.siteUrl}/status/${statusToSlug(status)}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...promises.map((promise) => ({
      url: `${brand.siteUrl}/promise/${promise.id}`,
      lastModified: new Date(promise.last_updated || meta.last_checked),
      changeFrequency: "weekly" as const,
      priority: 0.55,
    })),
  ];
}
