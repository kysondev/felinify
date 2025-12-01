import { Skeleton } from "@ui/skeleton";
import { Card, CardContent } from "@ui/card";
import { Button } from "@ui/button";
import Link from "next/link";
import { ChevronRight, Home, Library, Search, Filter, PlusCircle } from "lucide-react";

export default function LibraryLoading() {
  return (
    <div className="min-h-screen bg-background mt-2">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6">
        <nav className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/home" className="flex items-center hover:text-foreground transition-colors">
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link
            href="/library"
            className="flex items-center hover:text-foreground transition-colors font-medium text-foreground"
          >
            <Library className="h-4 w-4 mr-1" />
            <span>Library</span>
          </Link>
        </nav>

        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-64" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="w-full lg:max-w-[420px]">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4">
                <Search className="h-4 w-4" />
              </div>
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>

          <div className="flex items-stretch gap-2 sm:gap-3 flex-wrap w-full lg:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="bg-white h-10 px-2.5 sm:px-4 w-full sm:w-auto justify-center"
              disabled
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 px-2.5 sm:px-4 w-full sm:w-auto justify-center" disabled>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Create</span>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Recent decks</p>
              <h2 className="text-xl font-semibold text-foreground">Jump back into your studies</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={`recent-skel-${i}`} className="overflow-hidden h-full rounded-xl border border-border bg-card">
                  <CardContent className="p-0 h-full">
                    <div className="flex h-full items-stretch min-h-[96px]">
                      <Skeleton className="w-24 sm:w-28 h-full min-h-[96px]" />
                      <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Skeleton className="h-5 w-14 rounded-md" />
                          <Skeleton className="h-5 w-16 rounded-md" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-auto text-xs text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="border-t border-border" />
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">All decks</p>
              <h2 className="text-xl font-semibold text-foreground">Your collection</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={`deck-skel-${i}`} className="rounded-xl border border-border">
                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-full rounded-full" />
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <Skeleton className="h-9 w-24 rounded-md" />
                      <Skeleton className="h-9 w-20 rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Suggested decks</p>
              <h2 className="text-xl font-semibold text-foreground">Explore these picks</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={`suggested-skel-${i}`} className="overflow-hidden h-full rounded-xl border border-border bg-card">
                  <CardContent className="p-0 h-full">
                    <div className="flex h-full items-stretch min-h-[96px]">
                      <Skeleton className="w-24 sm:w-28 h-full min-h-[96px]" />
                      <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Skeleton className="h-5 w-16 rounded-md" />
                          <Skeleton className="h-5 w-16 rounded-md" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-auto text-xs text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
