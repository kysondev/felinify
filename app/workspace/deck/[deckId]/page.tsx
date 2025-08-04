import { getDeckById } from "services/deck.service";
import { getUser } from "services/user.service";
import { DeckEditForm } from "components/library/DeckEditForm";
import { FlashcardList } from "components/library/FlashcardList";
import { DeckStats } from "components/library/DeckStats";
import { DeckVisibilityToggle } from "components/library/DeckVisibilityToggle";
import { Deck, User } from "db/types/models.types";
import Link from "next/link";
import { ChevronRight, Home, Library } from "lucide-react";
import { Button } from "components/ui/Button";
import { DeckStudy } from "components/library/DeckStudy";
import { redirect } from "next/navigation";

export default async function DeckEditPage({
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

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-10">
      <nav className="flex items-center text-sm text-muted-foreground mb-4">
        <Link
          href="/workspace"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          <span>Workspace</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href="/workspace/library"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Library className="h-4 w-4 mr-1" />
          <span>Library</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {deck.name}
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="md:max-w-[70%] w-full">
          <h1 className="text-3xl font-bold text-ellipsis overflow-hidden">
            {deck.name}
          </h1>
          <p className="text-muted-foreground mt-1 line-clamp-2 break-words">
            {deck.description || "No description provided"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm mt-2 md:mt-0 shrink-0">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
            {deck.flashcards?.length || 0} cards
          </div>
          <div className="bg-secondary/50 px-3 py-1 rounded-full whitespace-nowrap">
            {deck.progress?.mastery?.toFixed(1) || 0}% mastery
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <DeckEditForm
            deck={deck as unknown as Deck}
            userId={user?.id as string}
          />
          <DeckVisibilityToggle
            deck={deck as unknown as Deck}
            userId={user?.id as string}
          />
          <DeckStudy
            deck={deck as unknown as Deck}
            user={user as unknown as User}
          />
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm mb-4">
            <div className="p-4 lg:p-6">
              <h2 className="text-xl font-semibold mb-4">Deck Statistics</h2>
              <DeckStats deck={deck as unknown as Deck} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm">
            <div className="p-4 lg:p-6">
              <FlashcardList
                deck={deck as unknown as Deck}
                userId={user?.id as string}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
