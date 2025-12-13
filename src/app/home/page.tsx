import { getUserDecks } from "@deck/services/deck-read.service";
import { getUser } from "@user/services/user.service";
import type { Metadata } from "next";
import Link from "next/link";
import type { Deck } from "db/types/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import {
  ArrowRight,
  Send,
  Sparkles,
  Clock,
  Wand2,
  NotebookPen,
  PlusCircle,
} from "lucide-react";
import formatActivityDate from "@deck/utils/format-activity-date.utils";
import getDeckActivityDate from "@deck/utils/get-deck-activity-date.utils";

export const metadata: Metadata = {
  title: "Home | Felinify",
  description:
    "Your study HQ with quick access to decks, suggestions, and the Felinify assistant.",
  alternates: {
    canonical: "/home",
  },
  robots: { index: false, follow: true },
};

const assistantSuggestions = [
  "Turn my class notes into flashcards",
  "List key points about photosynthesis",
  "Summarize and generate flashcards for this PDF",
  "Create a deck to prep for my midterm this week",
];

export default async function HomePage() {
  const { data: user } = await getUser();
  const { data: decks } = await getUserDecks(user?.id as string);

  const recentDecks =
    decks
      ?.filter((deck) => deck.progress?.lastStudied)
      ?.sort(
        (a, b) =>
          new Date(b.progress!.lastStudied!).getTime() -
          new Date(a.progress!.lastStudied!).getTime()
      )
      ?.slice(0, 4) || [];

  const suggestedDecks =
    decks
      ?.filter((deck) => !recentDecks.find((r) => r.id === deck.id))
      ?.sort(
        (a, b) => (b.flashcards?.length || 0) - (a.flashcards?.length || 0)
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
        new Date(deck.progress.lastStudied) > sevenDaysAgo
    ).length || 0;

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  const firstName = user?.name?.split(" ")[0] || "there";

  const renderDeckPreview = (deck: Deck, badgeLabel?: string) => (
    <Card
      key={`${badgeLabel ?? "deck"}-${deck.id}`}
      className="overflow-hidden h-full rounded-xl border border-border bg-card hover:shadow-md transition-all"
    >
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
              {badgeLabel && (
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5 rounded-md"
                >
                  {badgeLabel}
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="text-[11px] px-2 py-0.5 rounded-md"
              >
                {(deck.tags && deck.tags[0]?.name) || "General"}
              </Badge>
              <Badge
                variant="secondary"
                className="text-[11px] px-2 py-0.5 rounded-md"
              >
                {deck.flashcards?.length || 0} cards
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

        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-lg font-semibold">Ask Felin</CardTitle>
            <Badge className="!mt-0">
              <Sparkles className="h-4 w-4" />
              AI
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1.35fr,1fr]">
              <div className="space-y-3">
                <form action="/assistant" className="space-y-2">
                  <div className="relative">
                    <textarea
                      name="prompt"
                      rows={5}
                      placeholder="Paste notes, drop a topic, or ask for a quiz/summary..."
                      className="w-full rounded-lg border border-border bg-card p-4 pr-32 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      autoComplete="off"
                      required
                    />
                    <Button
                      type="submit"
                      className="absolute right-3 bottom-3 h-11 px-5 gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </form>
                <div className="flex flex-wrap gap-2">
                  {assistantSuggestions.map((prompt) => (
                    <Link
                      key={prompt}
                      href={`/assistant?prompt=${encodeURIComponent(prompt)}`}
                      className="text-sm"
                    >
                      <Button type="button" variant="secondary" size="sm">
                        {prompt}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-border/70 bg-muted/40 p-3 space-y-2">
                <p className="text-xs font-semibold text-foreground/80">
                  Quick actions
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2"
                  >
                    <Wand2 className="h-4 w-4 text-primary" />
                    Quiz my last deck
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2"
                  >
                    <NotebookPen className="h-4 w-4 text-primary" />
                    Turn notes into cards
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    Make a 3-day study plan
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2"
                  >
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Explain this topic simply
                  </Button>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Tip: paste notes or a URL and ask for flashcards, summaries,
                  or a timed quiz. Press Ctrl + Enter to send.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                {recentDecks.map((deck) => renderDeckPreview(deck, "Recent"))}
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
                {suggestedDecks.map((deck) =>
                  renderDeckPreview(deck, "Suggested")
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
