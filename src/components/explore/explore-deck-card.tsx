import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Deck } from "db/types/models.types";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getUserWithId } from "@user/services/user.service";
import { ArrowRight, Globe, Lock } from "lucide-react";

export const ExploreDeckCard = async ({ deck }: { deck: Deck }) => {
  const { data: user } = await getUserWithId(deck.userId);

  const deckTag =
    deck.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";
  const visibilityText = deck.visibility === "public" ? "Public" : "Private";
  const flashcardCount = deck.flashcards?.length || 0;

  return (
    <Card className="group relative overflow-hidden w-full h-full min-h-[292px] flex flex-col rounded-xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="pointer-events-none absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-primary/15 to-transparent opacity-70 blur-2xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
      <div
        className="relative h-28 bg-muted/40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: deck.imageUrl ? `url('${deck.imageUrl}')` : undefined }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 bg-background/70 backdrop-blur text-[11px] font-medium shadow-sm">
          <CardsIcon size={12} className="text-primary" />
          <span>{flashcardCount}</span>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col gap-3 flex-1">
        <Link href={`/decks/${deck.id}`} className="block">
          <h3 className="font-semibold text-lg text-foreground mb-1 truncate transition-colors group-hover:text-primary">
            {deck.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground truncate">
          {deck.description || "No description available"}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex gap-1.5">
            <Badge variant="secondary" className="text-[11px] px-2 py-0.5 rounded-md">
              {deckTag}
            </Badge>
            <Badge variant="secondary" className="text-[11px] px-2 py-0.5 rounded-md inline-flex items-center gap-1.5">
              {deck.visibility === "public" ? (
                <Globe className="h-3 w-3 text-primary" />
              ) : (
                <Lock className="h-3 w-3 text-muted-foreground" />
              )}
              {visibilityText}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground truncate">
              {user?.name ? `@${user.name}` : ""}
            </div>
            <Link href={`/decks/${deck.id}`} passHref>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs font-medium rounded-full border-border hover:border-primary hover:text-primary"
              >
                <span className="flex items-center gap-1">View <ArrowRight className="h-3 w-3" /></span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
