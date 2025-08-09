import { ExploreDeckCard } from "components/explore/ExploreDeckCard";
import { Deck } from "db/types/models.types";
import { getDecksBySearch } from "@deck/services/deck.service";
import { Card, CardContent } from "components/ui/Card";
import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { Search, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import JsonLd from "components/SEO/JsonLd";

interface SearchPageProps {
  params: Promise<{ searchQuery: string }>;
}

export async function generateMetadata({ params }: SearchPageProps) {
  const { searchQuery } = await params;
  const decodedQuery = decodeURIComponent(searchQuery);

  return {
    title: `"${decodedQuery}" | Clami`,
    description: `Search results for "${decodedQuery}" - Discover flashcard decks on Clami`,
    keywords: [decodedQuery, "flashcards", "study decks", "search results"],
    alternates: {
      canonical: `/workspace/explore/search/${searchQuery}`,
    },
    openGraph: {
      title: `"${decodedQuery}" | Clami`,
      description: `Search results for "${decodedQuery}" - Discover flashcard decks on Clami`,
      url: `https://clami.app/workspace/explore/search/${searchQuery}`,
      type: "website",
    },
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { searchQuery } = await params;
  const decodedQuery = decodeURIComponent(searchQuery);
  const { data: searchResults } = await getDecksBySearch(decodedQuery);

  const searchPageSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search Results for "${decodedQuery}"`,
    description: `Search results for "${decodedQuery}" - Discover flashcard decks on Clami`,
    url: `https://clami.app/workspace/explore/search/${searchQuery}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Clami",
      url: "https://clami.app",
    },
    about: {
      "@type": "Thing",
      name: "Educational flashcards",
      description: "Digital flashcards for studying various subjects",
    },
    keywords: `${decodedQuery}, flashcards, study decks, educational resources`,
  };

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <JsonLd data={searchPageSchema} />

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
            <Search className="w-4 h-4" />
            Search Results
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Search Results for "{decodedQuery}"
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {searchResults.length > 0
              ? `Found ${searchResults.length} deck${searchResults.length !== 1 ? "s" : ""}`
              : `No decks found for "${decodedQuery}"`}
          </p>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Decks ({searchResults.length})
            </h2>
            <Badge variant="secondary" className="px-3 py-1">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((deck) => (
              <ExploreDeckCard key={deck.id} deck={deck as Deck} />
            ))}
          </div>

          <Card className="bg-muted/50 border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Search Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Try using different keywords or synonyms</li>
                <li>• Check your spelling</li>
                <li>• Use broader terms to find more results</li>
                <li>• Browse categories to discover related content</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-3">No Results Found</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We couldn't find any decks matching "{decodedQuery}". Try different
            keywords or browse our categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/workspace/explore">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Explore
              </Button>
            </Link>
            <Link href="/workspace/library">
              <Button>
                <BookOpen className="w-4 h-4 mr-2" />
                Create Your Own Deck
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
