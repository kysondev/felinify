import { getUser } from "@user/services/user.service";
import { FlashcardManagement } from "components/flashcard/flashcard-management";
import { Deck } from "db/types/models.types";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Compass } from "lucide-react";
import { Button } from "components/ui/button";
import { redirect } from "next/navigation";
import { getUserDeckById } from "@deck/services/deck-read.service";

export default async function FlashcardManagementPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const deckIdNumber = parseInt(deckId, 10);
  const { data: user } = await getUser();
  const { data: deck } = await getUserDeckById(deckIdNumber, user?.id as string);

  if (!deck || deck.userId !== user?.id) {
    if (deck?.visibility === "public") {
      return redirect(`/decks/${deckId}`);
    }
    return (
      <div className="text-muted-foreground w-full h-screen flex flex-col items-center justify-center">
        Deck not found or you do not have permission to view it.
        <Button asChild variant="default" className="mt-4">
          <Link href="/library">Return to library</Link>
        </Button>
      </div>
    );
  }

  const primaryTag = deck?.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-6 sm:mt-12">
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
          <Link href={`/decks/${deckId}`}>
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

