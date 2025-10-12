import { notFound } from "next/navigation";
import { ExploreDeckCard } from "components/explore/explore-deck-card";
import { Deck } from "db/types/models.types";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "components/SEO/json-ld";
import { PREDEFINED_TAGS } from "@explore/config/tags.config";
import { getDecksByTag } from "@deck/services/deck-query.service";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

interface TagPageProps {
  params: Promise<{ tagName: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tagName } = await params;

  return {
    title: `${tagName} Flashcard Decks | Felinify`,
    description: `Discover high-quality ${tagName.toLowerCase()} flashcard decks created by students, educators, and professionals worldwide.`,
    keywords: [
      `${tagName.toLowerCase()}`,
      "flashcards",
      "study decks",
      "educational resources",
      "learning materials",
    ],
    alternates: {
      canonical: `/explore/tag/${tagName}`,
    },
    openGraph: {
      title: `${tagName} Flashcard Decks | Felinify`,
      description: `Discover high-quality ${tagName.toLowerCase()} flashcard decks created by students, educators, and professionals worldwide.`,
      url: `https://felinify.com/explore/tag/${tagName}`,
      type: "website",
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tagName } = await params;

  if (!PREDEFINED_TAGS.includes(tagName)) {
    notFound();
  }

  const { data: decks } = await getDecksByTag(tagName);

  const tagPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${tagName} Flashcard Decks`,
    description: `Discover high-quality ${tagName.toLowerCase()} flashcard decks created by students, educators, and professionals worldwide.`,
    url: `https://felinify.com/explore/tag/${tagName}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Felinify",
      url: "https://felinify.com",
    },
    about: {
      "@type": "Thing",
      name: `${tagName} flashcards`,
      description: `Digital flashcards for studying ${tagName.toLowerCase()}`,
    },
    keywords: `${tagName.toLowerCase()}, flashcards, study decks, educational resources, learning materials`,
  };

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <JsonLd data={tagPageSchema} />

      <div className="mb-6">
        <Link href="/explore">
          <Button variant="ghost" className="group hover:bg-muted">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          {tagName}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {tagName} Flashcard Decks
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Discover high-quality {tagName.toLowerCase()} flashcard decks created
          by students, educators, and professionals worldwide
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {decks.length} {decks.length === 1 ? "Deck" : "Decks"} Found
            </h2>
            <p className="text-muted-foreground">
              {tagName} flashcard decks for your studies
            </p>
          </div>
        </div>

        {decks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {decks.map((deck) => (
              <ExploreDeckCard key={deck.id} deck={deck as Deck} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CardsIcon size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No {tagName} Decks Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              No flashcard decks found for the {tagName.toLowerCase()} category
              yet. Be the first to create one!
            </p>
          </div>
        )}
      </div>

      {decks.length > 0 && (
        <div className="mt-16">
          <Card className="bg-primary text-primary-foreground border-primary">
            <CardContent className="p-8">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-primary-foreground/90 mb-6">
                  Create your own {tagName.toLowerCase()} flashcard deck and
                  share it with the community. Help others learn while building
                  your own knowledge.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Your Own Deck
                  </Button>
                  <Link href="/explore">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-primary hover:bg-white hover:text-primary"
                    >
                      Browse All Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

