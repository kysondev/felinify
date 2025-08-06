import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import {
  Search,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  BookOpen,
} from "lucide-react";
import { Button } from "components/ui/Button";
import { Badge } from "components/ui/Badge";
import { ExploreDeckCard } from "components/explore/ExploreDeckCard";
import { SearchForm } from "components/explore/SearchForm";
import { Deck } from "db/types/models.types";
import { getFeaturedDecks, getPopularDecks } from "services/deck.service";
import { Card, CardContent } from "components/ui/Card";
import { Metadata } from "next";
import JsonLd from "components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Explore Flashcard Decks | Clami",
  description:
    "Discover thousands of high-quality flashcard decks created by students, educators, and professionals worldwide.",
  keywords: [
    "flashcards",
    "study decks",
    "educational resources",
    "learning materials",
  ],
  alternates: {
    canonical: "/workspace/explore",
  },
  openGraph: {
    title: "Explore Flashcard Decks | Clami",
    description:
      "Discover thousands of high-quality flashcard decks created by students, educators, and professionals worldwide.",
    url: "https://clami.app/workspace/explore",
    type: "website",
  },
};

export default async function Explore() {
  "use cache";
  const { data: featuredDecks } = await getFeaturedDecks();
  const { data: popularDecks } = await getPopularDecks();

  const categories = [
    "All",
    "Science",
    "Mathematics",
    "History",
    "Language",
    "Technology",
    "Medicine",
    "Business",
    "Arts",
  ];

  const explorePageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Explore Flashcard Decks",
    description:
      "Discover thousands of high-quality flashcard decks created by students, educators, and professionals worldwide.",
    url: "https://clami.app/workspace/explore",
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
    keywords:
      "flashcards, study decks, educational resources, learning materials",
  };

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <JsonLd data={explorePageSchema} />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Discover Amazing Decks
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Explore Flashcard Decks
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Discover thousands of high-quality flashcard decks created by
          students, educators, and professionals worldwide
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchForm className="flex-1" />
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Featured Decks
            </h2>
            <p className="text-muted-foreground">
              Curated collections of the best flashcard decks
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All Featured
          </Button>
        </div>

        {featuredDecks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredDecks.slice(0, 4).map((deck) => (
              <ExploreDeckCard key={deck.id} deck={deck as Deck} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Featured Decks</h3>
            <p className="text-muted-foreground">
              Check back later for featured content
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Popular Decks
            </h2>
            <p className="text-muted-foreground">
              Most studied and highly rated flashcard decks
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All Popular
          </Button>
        </div>

        {popularDecks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularDecks.slice(0, 4).map((deck) => (
              <ExploreDeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Popular Decks</h3>
            <p className="text-muted-foreground">
              Start studying to see popular decks
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Recently Added
            </h2>
            <p className="text-muted-foreground">
              Fresh flashcard decks added to the community
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All Recent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDecks.slice(0, 4).map((deck) => (
            <ExploreDeckCard key={deck.id} deck={deck as Deck} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-primary text-primary-foreground border-primary">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
              Create your own flashcard deck and share it with the community.
              Help others learn while building your own knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Create Your Own Deck
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-primary hover:bg-white hover:text-primary"
              >
                Browse All Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
