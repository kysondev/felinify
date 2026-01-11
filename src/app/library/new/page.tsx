import { ChevronRight, Home, Library, PlusCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { CreateDeckForm } from "@components/library/create-deck-form";
import { getUser, getUserSubscription } from "@user/services/user.service";
import { getUserDecks } from "@deck/services/deck-read.service";
import { Subscription, User } from "db/types/models.types";

export const metadata: Metadata = {
  title: "Create Deck | Felinify",
  description:
    "Start a new flashcard deck manually or with AI-generated cards.",
  alternates: {
    canonical: "/library/new",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function NewLibraryDeckPage() {
  const { data: user } = await getUser();
  const { data: decks } = await getUserDecks(user?.id as string);
  const { data: subscription } = await getUserSubscription(user?.id as string);

  return (
    <div className="min-h-screen bg-background mt-2">
      <div className="container max-w-4xl mx-auto py-6 px-4 md:py-10 md:px-6 space-y-8">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link
            href="/home"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            href="/library"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Library className="h-4 w-4 mr-1" />
            <span>Library</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="flex items-center text-foreground font-medium">
            <PlusCircle className="h-4 w-4 mr-1" />
            New deck
          </span>
        </nav>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Create a new deck
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Build a deck from scratch or let AI help you generate flashcards
              from your notes.
            </p>
          </div>

          <CreateDeckForm
            user={user as User}
            subscription={subscription as Subscription}
            decks={decks || []}
          />
        </div>
      </div>
    </div>
  );
}
