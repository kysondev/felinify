import { Button } from "components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import {
  PlusCircle,
  BookOpen,
  Target,
  TrendingUp,
  Search,
  Filter,
  BarChart3,
  Zap,
  Package,
  CreditCard,
  Container,
} from "lucide-react";
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
import { DeckCard } from "components/library/DeckCard";
import { Subscription, User } from "db/types/models.types";
import { Input } from "components/ui/Input";
import { Progress } from "components/ui/Progress";
import { Metadata } from "next";
import JsonLd from "components/SEO/JsonLd";
import { DeckList } from "components/library/DeckList";
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

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={librarySchema} />
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Library
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Create, organize, and track your progress across all your
                flashcard decks.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 px-6">
                  <PlusCircle className="h-5 w-5" />
                  Create Deck
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-4 sm:p-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Decks
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {decks?.length || 0}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <Container className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Cards
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalCards}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <CreditCard className="h-5 w-5 text-primary rotate-180" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Study Sessions
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalSessions}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Mastery
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {averageMastery}%
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <Target className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
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
