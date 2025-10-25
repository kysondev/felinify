import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Deck } from "db/types/models.types";
import { CardsIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Badge } from "@ui/badge";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const deckTag =
    deck.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

  const visibilityText = deck.visibility === "public" ? "Public" : "Private";

  const flashcardCount = deck.flashcards?.length || 0;

  return (
    <Card className="overflow-hidden w-full hover:shadow-lg transition-all duration-300 group border border-border bg-white h-full flex flex-col">
      <div
        className="relative h-32 bg-gradient-to-br from-blue-50 to-indigo-100 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${deck.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium shadow-sm">
          <CardsIcon size={12} className="text-primary" />
          <span>{flashcardCount}</span>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col gap-3 flex-1">
        <Link href={`/decks/${deck.id}`} className="block">
          <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-2 hover:text-primary transition-colors group-hover:text-primary">
            {deck.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {deck.description || "No description available"}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex gap-1.5">
            <Badge
              variant="secondary"
              className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border-blue-200"
            >
              {deckTag}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border-gray-200"
            >
              {visibilityText}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-full max-w-[60%]">
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${deck.progress?.mastery || 0}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {deck.progress?.mastery || 0}% Mastery
              </div>
            </div>

            <Link href={`/decks/${deck.id}`} passHref>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs font-medium rounded-md border-gray-200 hover:border-primary hover:text-primary transition-colors"
              >
                View
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
