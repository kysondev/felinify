import { getDeckById } from "@deck/services/deck.service";
import { getUser } from "@user/services/user.service";
import { DeckEditForm } from "components/library/deck-edit-form";
import { DeckVisibilityToggle } from "components/library/deck-visibility-toggle";
import { DeckTagManager } from "components/library/deck-tag-manager";
import { Deck } from "db/types/models.types";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Compass, Edit3 } from "lucide-react";
import { Button } from "components/ui/button";
import { redirect } from "next/navigation";

export default async function DeckEditPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const { data: user } = await getUser();
  const { data: deck } = await getDeckById(deckId, user?.id as string);

  const primaryTag = deck?.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

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
    <div className="container max-w-6xl mx-auto px-4 py-8">
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
        <span className="text-foreground font-medium">Edit</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Deck
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Deck Information</h2>
              <DeckEditForm
                deck={deck as unknown as Deck}
                userId={user?.id as string}
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Flashcards</h2>
                  <p className="text-muted-foreground mt-1">
                    This deck contains {deck.flashcards?.length || 0} flashcards
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <Link href={`/workspace/deck/${deck.id}/flashcards`}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Manage Flashcards
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Tags</h2>
              <DeckTagManager
                deckId={deck.id}
                userId={user?.id as string}
                tags={(deck as any).tags || []}
              />
            </div>
          </div>


          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Visibility</h2>
              <DeckVisibilityToggle
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