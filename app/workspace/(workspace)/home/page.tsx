import { getDecksByUserId } from "@deck/services/deck.service";
import { getUser } from "@user/services/user.service";
import { Metadata } from "next";
import JsonLd from "components/SEO/json-ld";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { Clock, Library, Sparkles } from "lucide-react";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home | Felinify",
  description:
    "Create, organize, and track your progress across all your flashcard decks.",
  keywords: [
    "flashcards",
    "study library",
    "personal decks",
    "learning progress",
  ],
  alternates: {
    canonical: "/workspace/home",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function HomePage() {
  const { data: user } = await getUser();
  const { data: decks } = await getDecksByUserId(user?.id as string);

  const totalDecks = decks?.length || 0;
  const totalCards =
    decks?.reduce((sum, deck) => sum + (deck.flashcards?.length || 0), 0) || 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentlyStudiedCount =
    decks?.filter(
      (deck) =>
        deck.progress?.lastStudied &&
        new Date(deck.progress.lastStudied) > sevenDaysAgo
    ).length || 0;

  const librarySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Home Page",
    description: "Home page of the workspace",
    itemListElement: [],
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getUserFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const recentDecks =
    decks
      ?.filter((deck) => deck.progress?.lastStudied)
      ?.sort(
        (a, b) =>
          new Date(b.progress!.lastStudied!).getTime() -
          new Date(a.progress!.lastStudied!).getTime()
      )
      ?.slice(0, 2) || [];

  return (
    <div className="flex justify-center items-center bg-background">
      <JsonLd data={librarySchema} />
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-0 md:mt-0">
        <div className="flex flex-col items-center justify-center py-16 text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <Image
              src="/felinify.png"
              alt="Felinify Logo"
              width={90}
              height={90}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">
            {getGreeting()}, {getUserFirstName(user?.name || "")}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl">
            Welcome to your personal flashcard workspace
          </p>

          {totalDecks > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                <Card className="border border-border shadow-sm hover:shadow transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Library className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{totalDecks}</h3>
                    <p className="text-sm text-muted-foreground">
                      Decks in Library
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-border shadow-sm hover:shadow transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CardsIcon size={20} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{totalCards}</h3>
                    <p className="text-sm text-muted-foreground">Total Cards</p>
                  </CardContent>
                </Card>

                <Card className="border border-border shadow-sm hover:shadow transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">
                      {recentlyStudiedCount}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Recently Studied
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card className="w-full mb-12 border border-dashed border-primary/30 bg-primary/5">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Library className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Create Your First Deck
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start your learning journey by creating your first flashcard
                  deck or explore our collection of ready-made decks.
                </p>
                <Link href="/workspace/library">
                  <Button variant="default" className="gap-2" size="lg">
                    <Library className="h-4 w-4" />
                    Create a Deck
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {recentDecks.length > 0 && (
            <div className="w-full mb-8">
              <h2 className="text-lg font-semibold mb-4 text-left">
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentDecks.map((deck, index) => (
                  <Link href={`/workspace/explore/deck/${deck.id}`} key={deck.id}>
                    <Card
                      key={deck.id}
                      className="group border cursor-pointer border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:border-primary/30"
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <CardsIcon size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-sm truncate">
                            {deck.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {deck.flashcards?.length || 0} cards
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {new Date(
                              deck.progress!.lastStudied!
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mx-auto">
            <Link href="/workspace/library" className="w-full sm:w-1/2">
              <Button
                size="lg"
                variant="default"
                className="w-full gap-3 py-6 font-semibold rounded-lg shadow hover:shadow-md transition-all duration-300"
              >
                <Library className="h-5 w-5" />
                My Library
              </Button>
            </Link>

            <Link href="/workspace/explore" className="w-full sm:w-1/2">
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-3 py-6 font-semibold rounded-lg hover:bg-muted/30 transition-all duration-300"
              >
                <CardsIcon size={20} className="text-primary" />
                Explore Decks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
