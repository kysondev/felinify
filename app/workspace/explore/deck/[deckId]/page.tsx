import { Button } from "components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { BookOpen, ChevronRight, Clock, Home, PenTool, MessageSquare, Star, User, Compass } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/Avatar";
import { Flashcard } from "components/library/Flashcard";
import { getDeckById, getReviewsByDeckId } from "services/deck.service";
import { getUser } from "services/user.service";
import { Review } from "db/types/models.types";

export default async function DeckPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = await params;
  const { data: user } = await getUser();
  const { data: deck } = await getDeckById(deckId, user?.id as string);
  const { data: reviews } = await getReviewsByDeckId(deckId);
  
  if (!deck) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Deck not found</h1>
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
          href="/workspace/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {deck.name}
        </span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b pb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{deck.name}</h1>
          <p className="text-muted-foreground mt-2">
            {deck.description}
          </p>
          
          <div className="flex items-center mt-4 gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div>Created by</div>
                <div className="font-medium">@{user?.name}</div>
              </div>
            </div>
            
            <div className="text-sm">
              <div>Last updated</div>
              <div className="font-medium">{new Date(deck.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              {deck.rating === 0 ? "N/A" : deck.rating} (0 reviews)
            </span>
            <span className="flex items-center gap-1 text-sm">
              <User className="h-4 w-4" />
              {deck.studyCount} studies
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <BookOpen className="h-4 w-4" />
            <span>{deck.flashcards?.length || 0} flashcards</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            <span>{deck.studyHour} hours</span>
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button className="w-full">Study Deck</Button>
          </div>
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
              <span className="text-sm text-muted-foreground">
                Showing {deck.flashcards?.length || 0} of {deck.flashcards?.length || 0} cards
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deck.flashcards?.map((flashcard) => (
                <Flashcard
                  key={String(flashcard.id)}
                  id={String(flashcard.id)}
                  question={String(flashcard.question)}
                  answer={String(flashcard.answer)}
                />
              ))}
            </div>
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
                <span className="font-medium">{deck.rating === 0 ? "N/A" : deck.rating}</span>
                <span className="text-muted-foreground">(0 reviews)</span>
              </div>
            </div>
            
            <div className="space-y-4">
            {reviews?.length === 0 && (
                <Card className="border-dashed border-2 border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div className="relative mb-6">
                      <div className="p-4 bg-muted/50 rounded-full">
                        <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                      <div className="absolute -top-1 -right-1 p-1.5 bg-primary/10 rounded-full">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No reviews yet
                    </h3>
                    
                    <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-6">
                      This deck hasn't received any reviews yet. Be the first to share your experience and help other learners discover great content!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <PenTool className="h-4 w-4" />
                        Write a Review
                      </Button>
                      <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                        Study First
                      </Button>
                    </div>
                    
                    <div className="mt-8 flex items-center gap-8 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 text-muted-foreground/30"
                            />
                          ))}
                        </div>
                        <span>Rate this deck</span>
                      </div>
                      <span>•</span>
                      <span>Share your thoughts</span>
                      <span>•</span>
                      <span>Help others learn</span>
                    </div>
                  </CardContent>
                </Card>
              )}
              {reviews?.map((review: Review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review?.user?.image || ""} />
                          <AvatarFallback>{review?.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review?.user?.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}