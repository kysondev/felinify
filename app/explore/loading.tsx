import { Card, CardContent } from "components/ui/card";
import { Input } from "components/ui/Input";
import { Skeleton } from "components/ui/skeleton";
import { Search, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Discover Amazing Decks
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Explore Flashcard Decks
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Discover thousands of high-quality flashcard decks created by
          students, educators, and professionals worldwide
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for decks by topic, subject, or creator..."
              className="pl-12 py-3 text-base border-2 focus:border-primary transition-colors"
              disabled
            />
          </div>

          <Skeleton className="h-12 w-24 lg:w-auto" />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: 9 }, (_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Featured Decks
            </h2>
            <p className="text-muted-foreground">
              Curated collections of the best flashcard decks
            </p>
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={i}
              className="group border border-border bg-white transition-all duration-200 hover:shadow-lg h-full flex flex-col"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="p-4 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="mb-4">
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-4/5 mt-2" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>

                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>

                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Popular Decks
            </h2>
            <p className="text-muted-foreground">
              Most studied and highly rated flashcard decks
            </p>
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={i}
              className="group border border-border bg-white transition-all duration-200 hover:shadow-lg h-full flex flex-col"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="p-4 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="mb-4">
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-4/5 mt-2" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>

                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>

                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Recently Added
            </h2>
            <p className="text-muted-foreground">
              Fresh flashcard decks added to the community
            </p>
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Card
              key={i}
              className="group border border-border bg-white transition-all duration-200 hover:shadow-lg h-full flex flex-col"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="p-4 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="mb-4">
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-4/5 mt-2" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>

                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>

                    <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                      <Skeleton className="h-4 w-4 mx-auto mb-1" />
                      <Skeleton className="h-3 w-8 mx-auto" />
                      <Skeleton className="h-3 w-10 mx-auto mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Card className="bg-primary text-primary-foreground border-primary">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
              Create your own flashcard deck and share it with the community.
              Help others learn while building your own knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40 bg-white/20" />
              <Skeleton className="h-12 w-40 bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

