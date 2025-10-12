import { getDeckById } from "@deck/services/deck.service";
import { getUser, getUserWithId } from "@user/services/user.service";
import { DeckStats } from "components/library/deck-stats";
import { Deck } from "db/types/models.types";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Compass, BarChart2 } from "lucide-react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";

export default async function DeckStatsPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const { data: user } = await getUser();
  const { data: deck } = await getDeckById(deckId, user?.id as string);
  
  if (!deck) {
    return (
      <div className="text-muted-foreground w-full h-screen flex flex-col items-center justify-center">
        Deck not found.
        <Button asChild variant="default" className="mt-4">
          <Link href="/library">Return to library</Link>
        </Button>
      </div>
    );
  }

  const primaryTag = deck?.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";
  const { data: deckOwner } = await getUserWithId(deck?.userId as string);

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-8">
      <nav className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-y-2">
        <Link
          href="/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={primaryTag === "General" ? "/explore" : `/explore/tag/${encodeURIComponent(primaryTag)}`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <span>{primaryTag}</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={`/decks/${deckId}`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <span className="truncate max-w-[120px] sm:max-w-[200px]">{deck.name}</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Statistics</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-ellipsis overflow-hidden">
              Deck Statistics
            </h1>
            <BarChart2 className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground mt-1">
            Detailed performance metrics for {deck.name}
          </p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href={`/decks/${deckId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={deckOwner?.image || ""} />
            <AvatarFallback>{deckOwner?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{deckOwner?.name}</p>
            <p className="text-xs text-muted-foreground">Created {new Date(deck.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm">
        <div className="p-4 lg:p-6">
          <DeckStats deck={deck as unknown as Deck} />
        </div>
      </div>
    </div>
  );
}

