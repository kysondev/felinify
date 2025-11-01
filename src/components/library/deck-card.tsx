import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Deck } from "db/types/models.types";
import { CardsIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Badge } from "@ui/badge";
import { Progress } from "@ui/progress";
import { ArrowRight, Lock, Globe } from "lucide-react";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const deckTag =
    deck.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

  const visibilityText = deck.visibility === "public" ? "Public" : "Private";

  const flashcardCount = deck.flashcards?.length || 0;

  return (
    <Card className="group relative overflow-hidden w-full h-full flex flex-col rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div
        className="relative h-32 bg-muted/40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: deck.imageUrl ? `url(${deck.imageUrl})` : undefined,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-transparent" />

        <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 bg-background/70 backdrop-blur text-xs font-medium shadow-sm">
          <CardsIcon size={12} className="text-primary" />
          <span className="text-foreground/80">{flashcardCount}</span>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col gap-3 flex-1">
        <Link href={`/decks/${deck.id}`} className="block">
          <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-2 transition-colors group-hover:text-primary">
            {deck.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground truncate">
          {deck.description || "No description available"}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex gap-1.5">
            <Badge
              variant="secondary"
              className="text-[11px] px-2 py-0.5 rounded-md"
            >
              {deckTag}
            </Badge>
            <Badge
              variant="secondary"
              className="text-[11px] px-2 py-0.5 rounded-md inline-flex items-center gap-1.5"
            >
              {deck.visibility === "public" ? (
                <Globe className="h-3 w-3 text-primary" />
              ) : (
                <Lock className="h-3 w-3 text-muted-foreground" />
              )}
              {visibilityText}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-full max-w-[60%]">
              <Progress value={deck.progress?.mastery || 0} className="h-1.5" />
              <div className="mt-1 text-xs text-muted-foreground">
                {deck.progress?.mastery || 0}% Mastery
              </div>
            </div>

            <Link href={`/decks/${deck.id}`} passHref>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs font-medium rounded-full border-border hover:border-primary hover:text-primary"
              >
                <span className="flex items-center gap-1">
                  View <ArrowRight className="h-3 w-3" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
