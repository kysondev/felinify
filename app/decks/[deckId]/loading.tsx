import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { ChevronRight, Clock, Star, User, Compass, Target, Edit3, Play, Copy } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "components/ui/card";
import { Avatar, AvatarFallback } from "components/ui/avatar";
import { Skeleton } from "components/ui/skeleton";
import { Button } from "components/ui/button";
import { Progress } from "components/ui/progress";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <nav className="flex items-center text-sm text-muted-foreground mt-12">
        <Link
          href="/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-20" />
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-32" />
      </nav>

      <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-6 border-b pb-6 mt-12">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
              <Skeleton className="h-9 w-3/4" />
                <Skeleton className="h-5 w-full mt-2" />
              </div>
              <Button variant="outline" size="sm" className="shrink-0" disabled>
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center mt-4 gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Skeleton className="h-full w-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div>Created by</div>
                  <Skeleton className="h-4 w-20 mt-1" />
                </div>
              </div>

              <div className="text-sm">
                <div>Last updated</div>
                <Skeleton className="h-4 w-24 mt-1" />
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
                <Skeleton className="h-6 w-12" />
                <p className="text-xs text-muted-foreground">
                  Sign in to track
                </p>
              </div>
            </div>

            <Progress value={0} className="w-full h-2" />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[200px] h-full">
          <div className="p-4 rounded-lg border border-border/60 bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Deck Statistics
              </h3>
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Rating
                </span>
                <Skeleton className="h-4 w-8" />
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  Studies
                </span>
                <Skeleton className="h-4 w-8" />
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CardsIcon size={16} />
                  Flashcards
                </span>
                <Skeleton className="h-4 w-8" />
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Study Time
                </span>
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" disabled>
              <Play className="h-4 w-4 mr-2" />
              Study Deck
            </Button>
            <Button variant="outline" size="sm" className="px-3" disabled>
              <Copy className="h-4 w-4" />
            </Button>
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
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <Skeleton className="inline-block h-4 w-4" /> of{" "}
                  <Skeleton className="inline-block h-4 w-4" /> cards
                </span>
                <Button variant="outline" size="sm" className="whitespace-nowrap" disabled>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0 h-[235px]">
                    <div className="p-4 border-b">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full mt-2" />
                    </div>
                    <div className="p-4 bg-muted/20">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </div>
                  </CardContent>
                </Card>
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
                <Skeleton className="h-5 w-8" />
                <span className="text-muted-foreground">(0 reviews)</span>
              </div>
            </div>

            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="relative mb-6">
                  <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Be the first to share your thoughts about this deck and help others discover great content.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="gap-2" disabled>
                    <Star className="h-4 w-4" />
                    Write Review
                  </Button>
                  <Button variant="outline" disabled>
                    Study First
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
