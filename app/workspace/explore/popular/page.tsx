import { ExploreDeckCard } from "components/explore/ExploreDeckCard";
import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { Deck } from "db/types/models.types";
import { TrendingUp, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "components/SEO/JsonLd";
import { getPopularDecks } from "@deck/services/deck-query.service";

export const metadata: Metadata = {
  title: "Popular Decks | Clami",
  description: "Most studied and highly rated flashcard decks on Clami.",
  alternates: { canonical: "/workspace/explore/popular" },
  openGraph: {
    title: "Popular Decks | Clami",
    description: "Most studied and highly rated flashcard decks on Clami.",
    url: "https://clami.app/workspace/explore/popular",
    type: "website",
  },
};

export default async function PopularDecksPage() {
  const { data: decks } = await getPopularDecks();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Popular Decks",
    description: "Most studied and highly rated flashcard decks on Clami.",
    url: "https://clami.app/workspace/explore/popular",
  };

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <JsonLd data={schema} />

      <div className="mb-8">
        <Link href="/workspace/explore">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Button>
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm mb-4">
            <TrendingUp className="w-4 h-4" />
            Popular Decks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Decks
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the most studied and highly rated decks from the community.
          </p>
        </div>
      </div>

      {decks.length > 0 ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Decks ({decks.length})
            </h2>
            <Badge variant="secondary" className="px-3 py-1">
              {decks.length} result{decks.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {decks.map((deck) => (
              <ExploreDeckCard key={deck.id} deck={deck as Deck} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-3">No Popular Decks</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start studying to see popular decks.
          </p>
        </div>
      )}
    </div>
  );
}
