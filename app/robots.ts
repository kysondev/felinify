import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/explore", "/decks/", "/terms", "/privacy"],
      disallow: ["/api/", "/auth/", "/home", "/study/", "/library", "/decks/*/edit", "/decks/*/flashcards", "/decks/*/stats"],
    },
    sitemap: "https://felinify.com/sitemap.xml",
  };
}
