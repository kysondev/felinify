import { getDeckById } from "@deck/services/deck.service";
import { getUser } from "@user/services/user.service";
import { FlashcardManagement } from "components/flashcard/flashcard-management";
import { Deck } from "db/types/models.types";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Compass } from "lucide-react";
import { Button } from "components/ui/button";
import { redirect } from "next/navigation";

export default async function FlashcardManagementPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const { data: user } = await getUser();
  const { data: deck } = await getDeckById(deckId, user?.id as string);

  if (!deck || deck.userId !== user?.id) {
    if (deck?.visibility === "public") {
      return redirect(`/workspace/explore/deck/${deckId}`);
    }
    return (
      <div className="text-muted-foreground w-full h-screen flex flex-col items-center justify-center">
        Deck not found or you do not have permission to view it.
        <Button asChild variant="default" className="mt-4">
          <Link href="/workspace/library">Return to library</Link>
        </Button>
      </div>
    );
  }

  const primaryTag = deck?.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-8">
      <nav className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-y-2">
        <Link
          href="/workspace/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={primaryTag === "General" ? "/workspace/explore" : `/workspace/explore/tag/${encodeURIComponent(primaryTag)}`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <span>{primaryTag}</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={`/workspace/explore/deck/${deckId}`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <span className="truncate max-w-[120px] sm:max-w-[200px]">{deck.name}</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Flashcards</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ellipsis overflow-hidden">
            Manage Flashcards
          </h1>
          <p className="text-muted-foreground mt-1">
            {deck.name}
          </p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href={`/workspace/explore/deck/${deckId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Link>
        </Button>
      </div>

      <FlashcardManagement 
        deck={deck as unknown as Deck}
        userId={user?.id as string}
      />
    </div>
  );
}