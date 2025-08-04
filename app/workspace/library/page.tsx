import { Button } from "components/ui/Button";
import { PlusCircle, Library } from "lucide-react";
import { getDecksByUserId } from "services/deck.service";
import { getUser, getUserSubscription } from "services/user.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { CreateDeckForm } from "components/library/CreateDeckForm";
import { Subscription, User } from "db/types/models.types";
import { Metadata } from "next";
import JsonLd from "components/SEO/JsonLd";
import { LibraryTabs } from "components/library/LibraryTabs";

export const metadata: Metadata = {
  title: "My Library | Clami",
  description:
    "Create, organize, and track your progress across all your flashcard decks.",
  keywords: [
    "flashcards",
    "study library",
    "personal decks",
    "learning progress",
  ],
  alternates: {
    canonical: "/workspace/library",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LibraryPage() {
  const { data: user } = await getUser();
  const { data: decks } = await getDecksByUserId(user?.id as string);
  const { data: subscription } = await getUserSubscription(user?.id as string);

  const librarySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "My Flashcard Library",
    description: "Personal collection of flashcard decks for studying",
    itemListElement:
      decks?.map((deck, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: deck.name,
          description: deck.description || "Flashcard deck for studying",
          author: {
            "@type": "Person",
            name: user?.name || "Clami User",
          },
          dateCreated: deck.createdAt,
        },
      })) || [],
  };

  const totalCards =
    decks?.reduce((sum, deck) => sum + (deck.flashcards?.length || 0), 0) || 0;
  const totalSessions =
    decks?.reduce(
      (sum, deck) => sum + (deck.progress?.completedSessions || 0),
      0
    ) || 0;
  const averageMastery =
    decks?.length > 0
      ? Math.round(
          decks.reduce((sum, deck) => sum + (deck.progress?.mastery || 0), 0) /
            decks.length
        )
      : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getUserFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={librarySchema} />
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/90 p-6 mb-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 -left-4 w-16 h-16 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Library className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90 font-medium text-sm">
                  Personal Library
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {getGreeting()}, {getUserFirstName(user?.name || "")}
              </h1>

              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
                Ready to expand your knowledge? Your learning journey continues
                here with{" "}
                <span className="font-semibold text-white">
                  {decks?.length || 0} decks
                </span>{" "}
                and{" "}
                <span className="font-semibold text-white">
                  {totalCards} cards
                </span>{" "}
                waiting for you.
              </p>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="default"
                      variant="secondary"
                      className="gap-2 px-6 py-2 font-semibold rounded-xl bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Create Deck
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-4 sm:p-6 rounded-2xl">
                    <DialogHeader className="pb-3">
                      <DialogTitle>Create New Flashcard Deck</DialogTitle>
                      <DialogDescription>
                        Create a new deck to organize your flashcards.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-1">
                      <CreateDeckForm
                        user={user as User}
                        subscription={subscription as Subscription}
                        decks={decks}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm w-[160px] h-[160px] shadow-inner">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="relative mb-3">
                  <svg
                    className="w-16 h-16 transform -rotate-90"
                    viewBox="0 0 64 64"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - averageMastery / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {averageMastery}%
                    </span>
                  </div>
                </div>

                <div className="text-white font-medium text-xs text-center mb-2">
                  Average Mastery
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${averageMastery}%` }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-white/70 font-medium">
                  {averageMastery >= 80
                    ? "Expert"
                    : averageMastery >= 60
                      ? "Advanced"
                      : averageMastery >= 40
                        ? "Intermediate"
                        : averageMastery >= 20
                          ? "Beginner"
                          : "Novice"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <LibraryTabs
          decks={decks}
          user={user as User}
          subscription={subscription as Subscription}
          averageMastery={averageMastery}
        />
      </div>
    </div>
  );
}
