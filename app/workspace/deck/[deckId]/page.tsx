import { getDeckById } from "services/deck.service";
import { getUser } from "services/user.service";
import { DeckEditForm } from "components/library/DeckEditForm";
import { FlashcardList } from "components/library/FlashcardList";
import { DeckStats } from "components/library/DeckStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { Deck } from "db/types/models.types";
import Link from "next/link";
import { ChevronRight, Compass, Home } from "lucide-react";
import { Button } from "components/ui/Button";

export default async function DeckEditPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const { data: user } = await getUser();
  const { data: deck } = await getDeckById(deckId, user?.id as string);

  if (!deck || deck.userId !== user?.id) {
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
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <nav className="flex items-center text-sm text-muted-foreground mt-16">
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
          <Compass className="h-4 w-4 mr-1" />
          <span>Library</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {deck.name}
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">{deck.name}</h1>
          <p className="text-muted-foreground mt-1">
            {deck.description || "No description provided"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            {deck.flashcards?.length || 0} cards
          </div>
          <div className="bg-secondary/50 px-3 py-1 rounded-full">
            {deck.progress?.mastery?.toFixed(1) || 0}% mastery
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-8">
          <TabsTrigger value="details" className="text-sm">
            Deck Details
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="text-sm">
            Flashcards ({deck.flashcards?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-sm">
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="details"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <DeckEditForm
            deck={deck as unknown as Deck}
            userId={user?.id as string}
          />
        </TabsContent>

        <TabsContent
          value="flashcards"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <FlashcardList
            deck={deck as unknown as Deck}
            userId={user?.id as string}
          />
        </TabsContent>

        <TabsContent
          value="stats"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <DeckStats deck={deck as unknown as Deck} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
