import type { MetadataRoute } from "next"

const SITE_URL = "https://sobatti.web.id"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-04-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
