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

export default async function LibraryPage() {
  const { data: user } = await getUser();
  const { data: decks } = await getDecksByUserId(user?.id as string);
  const { data: subscription } = await getUserSubscription(user?.id as string);

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

        <Tabs defaultValue="decks" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <TabsList className="w-full max-w-full lg:max-w-[300px] grid grid-cols-2">
              <TabsTrigger value="decks" className="flex-1">
                <BookOpen className="h-4 w-4 mr-2" />
                My Decks
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search your decks..."
                  className="pl-10 w-full lg:w-64 bg-white"
                />
              </div>
              <Button variant="outline" size="sm" className="bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="decks" className="space-y-6">
            {decks && decks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {decks.map((deck) => (
                  <DeckCard deck={deck} key={deck.id} user={user as User} />
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                      <CardContent className="flex flex-col items-center justify-center p-8 min-h-[400px] text-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                          <PlusCircle className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Create New Deck
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Start building your knowledge with a new flashcard
                          deck
                        </p>
                      </CardContent>
                    </Card>
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
            ) : (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No decks yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start your learning journey by creating your first flashcard
                    deck. Organize your knowledge and track your progress.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="gap-2">
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
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    Learning Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-foreground">
                        Overall Progress
                      </h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {averageMastery}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mastery Average
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <Progress value={averageMastery} className="h-4" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Learner</span>
                          <span>Intermediate</span>
                          <span>Master</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        Deck Performance
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Top 5 decks by mastery
                      </p>
                    </div>

                    <div className="space-y-3">
                      {decks
                        ?.sort(
                          (a, b) =>
                            (b.progress?.mastery || 0) -
                            (a.progress?.mastery || 0)
                        )
                        .slice(0, 5)
                        .map((deck, index) => (
                          <div
                            key={deck.id}
                            className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {deck.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {deck.flashcards?.length || 0} cards •{" "}
                                {deck.progress?.completedSessions || 0} sessions
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${deck.progress?.mastery || 0}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-semibold w-12 text-right">
                                {deck.progress?.mastery || 0}%
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    Study Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 bg-muted rounded-lg">
                          <Zap className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            Most Studied
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(decks.length > 0 &&
                              decks?.reduce((max, deck) =>
                                (deck.progress?.completedSessions || 0) >
                                (max.progress?.completedSessions || 0)
                                  ? deck
                                  : max
                              )?.name) ||
                              "No data"}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(decks.length > 0 &&
                          decks?.reduce((max, deck) =>
                            (deck.progress?.completedSessions || 0) >
                            (max.progress?.completedSessions || 0)
                              ? deck
                              : max
                          )?.progress?.completedSessions) ||
                          0}{" "}
                        sessions completed
                      </div>
                    </div>

                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 bg-muted rounded-lg">
                          <Target className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            Highest Mastery
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(decks.length > 0 &&
                              decks?.reduce((max, deck) =>
                                (deck.progress?.mastery || 0) >
                                (max.progress?.mastery || 0)
                                  ? deck
                                  : max
                              )?.name) ||
                              "No data"}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(decks.length > 0 &&
                          decks?.reduce((max, deck) =>
                            (deck.progress?.mastery || 0) >
                            (max.progress?.mastery || 0)
                              ? deck
                              : max
                          )?.progress?.mastery) ||
                          0}
                        % mastery achieved
                      </div>
                    </div>

                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 bg-muted rounded-lg">
                          <Package className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            Largest Deck
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(decks.length > 0 &&
                              decks?.reduce((max, deck) =>
                                (deck.flashcards?.length || 0) >
                                (max.flashcards?.length || 0)
                                  ? deck
                                  : max
                              )?.name) ||
                              "No data"}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(decks.length > 0 &&
                          decks?.reduce((max, deck) =>
                            (deck.flashcards?.length || 0) >
                            (max.flashcards?.length || 0)
                              ? deck
                              : max
                          )?.flashcards?.length) ||
                          0}{" "}
                        cards total
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <h4 className="font-semibold text-sm text-foreground mb-3">
                      Quick Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-lg font-bold text-primary">
                          {decks?.filter(
                            (d) => (d.progress?.mastery || 0) >= 80
                          ).length || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Mastered
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-lg font-bold text-orange-500">
                          {decks?.filter((d) => (d.progress?.mastery || 0) < 50)
                            .length || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Needs Work
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
