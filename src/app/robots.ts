import { MetadataRoute } from "next";
import { SITE_URL } from "@common/config/app.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/explore", "/pricing", "/decks/", "/terms", "/privacy"],
      disallow: [
        "/api/",
        "/auth/",
        "/home",
        "/study/",
        "/library",
        "/decks/*/edit",
        "/decks/*/flashcards",
        "/decks/*/stats",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
