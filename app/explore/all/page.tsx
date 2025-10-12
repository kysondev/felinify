import { ExploreDeckCard } from "components/explore/explore-deck-card";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Deck } from "db/types/models.types";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "components/SEO/json-ld";
import { getAllDecks } from "@deck/services/deck.service";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "All Decks | Felinify",
  description:
    "Browse all available flashcard decks created by students, educators, and professionals worldwide.",
  alternates: { canonical: "/explore/all" },
  openGraph: {
    title: "All Decks | Felinify",
    description:
      "Browse all available flashcard decks created by students, educators, and professionals worldwide.",
    url: "https://felinify.com/explore/all",
    type: "website",
  },
};

interface AllDecksPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AllDecksPage({
  searchParams,
}: AllDecksPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10);
  const { data: decks, pagination } = await getAllDecks(page, 12);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Decks",
    description:
      "Browse all available flashcard decks created by students, educators, and professionals worldwide.",
    url: "https://felinify.com/explore/all",
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
            All Decks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Decks
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse all available flashcard decks created by students, educators,
            and professionals worldwide.
          </p>
        </div>
      </div>

      {decks.length > 0 ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Decks ({pagination?.total || decks.length})
            </h2>
            <Badge variant="secondary" className="px-3 py-1">
              {pagination?.total || decks.length} result
              {(pagination?.total || decks.length) !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {decks.map((deck) => (
              <ExploreDeckCard key={deck.id} deck={deck as Deck} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Link
                href={`/explore/all?page=${Math.max(1, page - 1)}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                  page <= 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "hover:bg-muted"
                }`}
              >
                Previous
              </Link>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Link
                        key={pageNum}
                        href={`/explore/all?page=${pageNum}`}
                        className={`px-3 py-2 rounded-md border transition-colors ${
                          page === pageNum
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  }
                )}
              </div>

              <Link
                href={`/explore/all?page=${Math.min(pagination.totalPages, page + 1)}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                  page >= pagination.totalPages
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "hover:bg-muted"
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <CardsIcon size={16} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-3">No Decks Found</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            No decks are currently available. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}

