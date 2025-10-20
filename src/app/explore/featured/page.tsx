import { ExploreDeckCard } from "@components/explore/explore-deck-card";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Deck } from "db/types/models.types";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "@components/SEO/json-ld";
import { getFeaturedDecks } from "@deck/services/deck-read.service";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Featured Decks | Felinify",
  description: "Curated collections of the best flashcard decks on Felinify.",
  alternates: { canonical: "/explore/featured" },
  openGraph: {
    title: "Featured Decks | Felinify",
    description: "Curated collections of the best flashcard decks on Felinify.",
    url: "https://felinify.com/explore/featured",
    type: "website",
  },
};

export default async function FeaturedDecksPage() {
  const { data: decks } = await getFeaturedDecks();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Featured Decks",
    description: "Curated collections of the best flashcard decks on Felinify.",
    url: "https://felinify.com/explore/featured",
  };

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <JsonLd data={schema} />

      <div className="mb-8">
        <Link href="/explore">
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
            <Sparkles className="w-4 h-4" />
            Featured Decks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Decks
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover curated collections of top-quality flashcard decks.
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
            <CardsIcon size={16} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-3">No Featured Decks</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Check back later for featured content.
          </p>
        </div>
      )}
    </div>
  );
}

