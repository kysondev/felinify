import { MetadataRoute } from "next";
import { Deck } from "db/types/models.types";
import { getAllDecks } from "@deck/services/deck-read.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://felinify.com";

  const landingPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const publicPages = [
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore/all`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/explore/featured`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/explore/popular`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Get public decks for sitemap
  const { data: publicDecks } = await getAllDecks(1, 1000);
  const deckPages = publicDecks?.map((deck: Deck) => ({
    url: `${baseUrl}/decks/${deck.id}`,
    lastModified: new Date(deck.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })) || [];

  const routes = [...landingPages, ...publicPages, ...deckPages];

  return routes;
}
