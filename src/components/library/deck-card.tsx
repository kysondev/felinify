import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Deck } from "db/types/models.types";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Badge } from "@ui/badge";
import { Progress } from "@ui/progress";
import { ArrowRight, Lock, Globe, Clock } from "lucide-react";
import formatActivityDate from "@deck/utils/format-activity-date.utils";
import getDeckActivityDate from "@deck/utils/get-deck-activity-date.utils";

type DeckCardProps = {
  deck: Deck;
  variant?: "default" | "secondary";
};

export const DeckCard = ({ deck, variant = "default" }: DeckCardProps) => {
  const deckTag =
    deck.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

  const visibilityText = deck.visibility === "public" ? "Public" : "Private";

  const flashcardCount = deck.flashcards?.length || 0;

  if (variant === "secondary") {
    return (
      <Card className="overflow-hidden h-full rounded-xl border border-border bg-card hover:shadow-md transition-all">
        <CardContent className="p-0 h-full">
          <div className="flex h-full items-stretch min-h-[110px]">
            <div
              className="w-28 sm:w-32 h-full min-h-[110px] bg-muted/60 bg-cover bg-center flex-shrink-0"
              style={{
                backgroundImage: deck.imageUrl
                  ? `url(${deck.imageUrl})`
                  : undefined,
              }}
            />
            <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-muted-foreground">
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5 rounded-md"
                >
                  {deckTag}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5 rounded-md"
                >
                  {flashcardCount} cards
                </Badge>
              </div>

              <div className="space-y-0.5">
                <h3
                  className="text-base font-semibold text-foreground truncate"
                  title={deck.name}
                >
                  {deck.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {deck.description || "No description yet."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 mt-auto text-xs text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatActivityDate(getDeckActivityDate(deck))}
                  </span>
                </div>

                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link
                    href={`/decks/${deck.id}`}
                    className="inline-flex items-center gap-1"
                  >
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden w-full h-full min-h-[268px] flex flex-col rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="pointer-events-none absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-primary/15 to-transparent opacity-70 blur-2xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
      <div
        className="relative h-28 bg-muted/40 bg-cover bg-center bg-no-repeat"
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

      <CardContent className="p-6 flex flex-col gap-2 flex-1">
        <Link href={`/decks/${deck.id}`} className="block">
          <h3
            className="font-semibold text-lg text-foreground mb-0.5 truncate transition-colors group-hover:text-primary"
            title={deck.name}
          >
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
