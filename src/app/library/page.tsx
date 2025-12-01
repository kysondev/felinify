import { Library, Home, ChevronRight } from "lucide-react";
import { getUserDecks } from "@deck/services/deck-read.service";
import { getUser, getUserSubscription } from "@user/services/user.service";
import { Deck, Subscription, User } from "db/types/models.types";
import { Metadata } from "next";
import JsonLd from "@components/SEO/json-ld";
import { LibraryTabs } from "@components/library/library-tabs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Library | Felinify",
  description:
    "Create, organize, and track your progress across all your flashcard decks.",
  keywords: [
    "flashcards",
    "study library",
    "personal decks",
    "learning progress",
  ],
  alternates: {
    canonical: "/library",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LibraryPage() {
  const { data: user } = await getUser();
  const { data: decks } = await getUserDecks(user?.id as string);
  const { data: subscription } = await getUserSubscription(user?.id as string);
  const safeDecks = decks || [];

  const librarySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "My Flashcard Library",
    description: "Personal collection of flashcard decks for studying",
    itemListElement:
      safeDecks.map((deck, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: deck.name,
          description: deck.description || "Flashcard deck for studying",
          author: {
            "@type": "Person",
            name: user?.name || "Felinify User",
          },
          dateCreated: deck.createdAt,
        },
      })) || [],
  };

  const totalCards =
    safeDecks.reduce((sum, deck) => sum + (deck.flashcards?.length || 0), 0) ||
    0;

  const getUserFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const getDeckActivityDate = (deck: Deck) =>
    deck.progress?.lastStudied || deck.updatedAt || deck.createdAt;

  const getTimestamp = (value: Date | string | null | undefined) => {
    if (!value) return 0;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
  };

  const recentDecks = [...safeDecks]
    .sort(
      (a, b) =>
        getTimestamp(getDeckActivityDate(b)) -
        getTimestamp(getDeckActivityDate(a))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background mt-2">
      <JsonLd data={librarySchema} />
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6">
        <div className="mb-8">
          <nav className="flex items-center text-sm text-muted-foreground mb-6">
            <Link
              href="/home"
              className="flex items-center hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href="/library"
              className="flex items-center hover:text-foreground transition-colors font-medium text-foreground"
            >
              <Library className="h-4 w-4 mr-1" />
              <span>Library</span>
            </Link>
          </nav>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2.5">
              Personal Deck Library
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Your personal library has{" "}
              <span className="font-semibold text-foreground">
                {decks?.length || 0} decks
              </span>{" "}
              and{" "}
              <span className="font-semibold text-foreground">
                {totalCards} cards
              </span>
              .
            </p>
          </div>
        </div>

        <LibraryTabs
          decks={safeDecks}
          recentDecks={recentDecks}
          user={user as User}
          subscription={subscription as Subscription}
        />
      </div>
    </div>
  );
}
