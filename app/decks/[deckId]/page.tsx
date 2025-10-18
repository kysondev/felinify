import { Button } from "components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import {
  ChevronRight,
  Clock,
  User,
  Compass,
  Target,
  AlertCircle,
  ArrowLeft,
  Star,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { getDeck, getDeckById } from "@deck/services/deck.service";
import { getUser, getUserWithId } from "@user/services/user.service";
import { Progress } from "components/ui/progress";
import ExploreDeckStudyOptions from "components/explore/explore-deck-study-options";
import ExploreFlashcardGrid from "components/explore/explore-flashcard-list";
import { ReviewSection } from "components/explore/review-section";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { getReviewsByDeckId } from "@review/services/review.service";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import { Review } from "db/types/models.types";

interface DeckPageProps {
  params: Promise<{ deckId: string }>;
}

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const { deckId } = await params;
  const deckIdNumber = parseInt(deckId, 10);
  const { data: deck } = await getDeck(deckIdNumber);
  const { data: deckOwner } = await getUserWithId(deck?.userId as string);
  
  if (!deck) {
    return {
      title: "Deck Not Found | Felinify",
      description: "The requested flashcard deck could not be found.",
    };
  }

  const primaryTag = deck.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";
  const flashcardCount = deck.flashcards?.length || 0;

  return {
    title: `${deck.name} | ${primaryTag} Flashcards | Felinify`,
    description: `${deck.description || `Study ${flashcardCount} ${primaryTag.toLowerCase()} flashcards with ${deck.name}. Created by ${deckOwner?.name || 'the community'}.`}`,
    keywords: [
      "flashcards",
      deck.name.toLowerCase(),
      primaryTag.toLowerCase(),
      "study deck",
      "learning",
      "education",
    ],
    alternates: {
      canonical: `/decks/${deckId}`,
    },
    openGraph: {
      title: `${deck.name} | ${primaryTag} Flashcards`,
      description: deck.description || `Study ${flashcardCount} ${primaryTag.toLowerCase()} flashcards`,
      type: "website",
      url: `/decks/${deckId}`,
      images: [
        {
          url: "/felinify.png",
          width: 1200,
          height: 630,
          alt: `${deck.name} - ${primaryTag} Flashcards`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${deck.name} | ${primaryTag} Flashcards`,
      description: deck.description || `Study ${flashcardCount} ${primaryTag.toLowerCase()} flashcards`,
      images: ["/felinify.png"],
    },
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { deckId } = await params;
  const deckIdNumber = parseInt(deckId, 10);
  const { data: user } = await getUser();
  const { data: deck } = await getDeckById(deckIdNumber, user?.id as string);
  const { data: deckOwner } = await getUserWithId(deck?.userId as string);
  const { data: reviews } = await getReviewsByDeckId(deckIdNumber);

  const primaryTag = deck?.tags && deck.tags.length > 0 ? deck.tags[0].name : "General";

  if (!deck || (deck.visibility === "private" && deck.userId !== user?.id)) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <nav className="flex items-center text-sm text-muted-foreground mt-16">
          <Link
            href="/explore"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Compass className="h-4 w-4 mr-1" />
            Explore
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            href={primaryTag === "General" ? "/explore" : `/explore/tag/${encodeURIComponent(primaryTag)}`}
            className="flex items-center hover:text-foreground transition-colors"
          >
            <span>{primaryTag}</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            Deck Details
          </span>
        </nav>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center mt-20">
          <div className="relative mb-8">
            <div className="p-6 bg-muted/50 rounded-full">
              <AlertCircle className="h-16 w-16 text-muted-foreground/60" />
            </div>
            <div className="absolute -top-2 -right-2 p-2 bg-destructive/10 rounded-full">
              <CardsIcon size={16} className="text-destructive" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Deck Not Found
          </h1>

          <p className="text-muted-foreground text-lg max-w-md leading-relaxed mb-8">
            {!deck
              ? "The deck you're looking for doesn't exist or may have been removed."
              : "This deck is private and you don't have permission to view it."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex items-center gap-2">
              <Link href="/explore">
                <ArrowLeft className="h-4 w-4" />
                Back to Explore
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/library">
                <CardsIcon size={16} className="text-primary" />
                Go to Library
              </Link>
            </Button>
          </div>

          <div className="mt-12 p-6 rounded-lg border border-border/60 bg-muted/30 max-w-md">
            <h3 className="font-semibold text-foreground mb-3">
              Looking for something specific?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Try searching for similar decks in our explore section, or create
              your own deck in the library.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const masteryProgress = deck.progress?.mastery || 0;

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <nav className="flex items-center text-sm text-muted-foreground mt-6 sm:mt-12 flex-wrap">
        <Link
          href="/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={primaryTag === "General" ? "/explore" : `/explore/tag/${encodeURIComponent(primaryTag)}`}
          className="flex items-center hover:text-foreground transition-colors"
        >
          <span>{primaryTag}</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {deck.name}
        </span>
      </nav>
      <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-6 border-b pb-6 mt-12">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{deck.name}</h1>
                <p className="text-muted-foreground mt-2">{deck.description || "No description"}</p>
              </div>
              {user?.id === deck.userId && (
                <Button asChild variant="outline" size="sm" className="shrink-0">
                  <Link href={`/decks/${deck.id}/edit`}>
                    <Edit3 className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="flex items-center mt-4 gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={deckOwner?.image || ""} />
                  <AvatarFallback>{deckOwner?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div>Created by</div>
                  <div className="font-medium">@{deckOwner?.name}</div>
                </div>
              </div>

              <div className="text-sm">
                <div>Last updated</div>
                <div className="font-medium">
                  {new Date(deck.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border/60 bg-muted/50 mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  Your Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-foreground">
                  {user ? masteryProgress : 0}%
                </span>
                {!user && (
                  <p className="text-xs text-muted-foreground">
                    <Link href="/auth/login" className="text-primary hover:underline">
                      Sign in
                    </Link>{" "}
                    to track
                  </p>
                )}
              </div>
            </div>

            <Progress value={user ? masteryProgress : 0} className="w-full h-2" />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[200px] h-full">
          <div className="p-4 rounded-lg border border-border/60 bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Deck Statistics
              </h3>
              {user?.id === deck.userId && (
                <Link 
                  href={`/decks/${deck.id}/stats`}
                  className="text-primary hover:text-primary/80 transition-colors"
                  title="View detailed statistics"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Rating
                </span>
                <span className="text-sm font-medium">
                  {deck.rating === 0 ? "N/A" : deck.rating}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  Studies
                </span>
                <span className="text-sm font-medium">{deck.studyCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CardsIcon size={16} />
                  Flashcards
                </span>
                <span className="text-sm font-medium">
                  {deck.flashcards?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Study Time
                </span>
                <span className="text-sm font-medium">{deck.studyHour}h</span>
              </div>
            </div>
          </div>

          <ExploreDeckStudyOptions deckId={deck.id} isAuthenticated={!!user} />
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-8">
          <TabsTrigger value="preview" className="text-sm">
            Preview
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-sm">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Flashcard Preview</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing {deck.flashcards?.length || 0} of{" "}
                  {deck.flashcards?.length || 0} cards
                </span>
                {user?.id === deck.userId && (
                  <Button asChild variant="outline" size="sm" className="whitespace-nowrap">
                    <Link href={`/decks/${deck.id}/flashcards`}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Manage
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <ExploreFlashcardGrid flashcards={(deck.flashcards || []) as any} />
          </div>
        </TabsContent>

        <TabsContent
          value="reviews"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">User Reviews</h2>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">
                  {deck.rating === 0 ? "N/A" : deck.rating}
                </span>
                <span className="text-muted-foreground">(0 reviews)</span>
              </div>
            </div>

            <ReviewSection
              reviews={reviews as Review[]}
              deckId={deckIdNumber}
              currentUserId={user?.id}
              deckOwnerId={deck.userId}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
