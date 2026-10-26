import { getUserDecks } from "@deck/services/deck-read.service";
import { requireUser } from "@auth/utils/session.utils";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import { ArrowRight, Sparkles, PlusCircle } from "lucide-react";
import { DeckCard } from "@components/library/deck-card";
import { AskFelinCard } from "@components/home/ask-felin-card";

export const metadata: Metadata = {
  title: "Home | Felinify",
  description:
    "Your study HQ with quick access to decks, suggestions, and the Felinify assistant.",
  alternates: {
    canonical: "/home",
  },
  robots: { index: false, follow: true },
};

export default async function HomePage() {
  const user = await requireUser();
  const { data: decks } = await getUserDecks(user.id);

  const recentDecks =
    decks
      ?.filter((deck) => deck.progress?.lastStudied)
      ?.sort(
        (a, b) =>
          new Date(b.progress!.lastStudied!).getTime() -
          new Date(a.progress!.lastStudied!).getTime(),
      )
      ?.slice(0, 4) || [];

  const suggestedDecks =
    decks
      ?.filter((deck) => !recentDecks.find((r) => r.id === deck.id))
      ?.sort(
        (a, b) => (b.flashcards?.length || 0) - (a.flashcards?.length || 0),
      )
      ?.slice(0, 3) || [];

  const totalDecks = decks?.length || 0;
  const totalCards =
    decks?.reduce((sum, deck) => sum + (deck.flashcards?.length || 0), 0) || 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const activeThisWeek =
    decks?.filter(
      (deck) =>
        deck.progress?.lastStudied &&
        new Date(deck.progress.lastStudied) > sevenDaysAgo,
    ).length || 0;

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12 space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {greeting}, {firstName}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Pick up where you left off.
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Recent decks, smart suggestions, and your AI study assistant all
              in one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/library">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                New deck
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" className="gap-2">
                Explore
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border border-border/70 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Decks</p>
                <p className="text-2xl font-semibold">{totalDecks}</p>
              </div>
              <Badge variant="secondary">Library</Badge>
            </CardContent>
          </Card>
          <Card className="border border-border/70 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Cards</p>
                <p className="text-2xl font-semibold">{totalCards}</p>
              </div>
              <Badge variant="secondary">Total</Badge>
            </CardContent>
          </Card>
          <Card className="border border-border/70 shadow-sm sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Active this week
                </p>
                <p className="text-2xl font-semibold">{activeThisWeek}</p>
              </div>
              <Badge variant="secondary">Streak</Badge>
            </CardContent>
          </Card>
        </div>

        <AskFelinCard />

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent decks
            </CardTitle>
            <Link
              href="/library"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDecks.length === 0 ? (
              <div className="border border-dashed border-primary/30 rounded-lg p-4 text-sm text-muted-foreground">
                No recent decks yet. Create one or explore to get started.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {recentDecks.map((deck) => (
                  <DeckCard
                    key={deck.id}
                    deck={deck}
                    variant="secondary"
                    badgeLabel="Recent"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Suggested for you
            </CardTitle>
            <Link
              href="/explore"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Browse more <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {suggestedDecks.length === 0 ? (
              <div className="text-sm text-muted-foreground border border-dashed border-primary/30 rounded-lg p-4">
                No suggestions yet. Create a deck or explore community decks to
                see recommendations here.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {suggestedDecks.map((deck) => (
                  <DeckCard
                    key={deck.id}
                    deck={deck}
                    variant="secondary"
                    badgeLabel="Suggested"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
