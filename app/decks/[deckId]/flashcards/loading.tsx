import { Skeleton } from "components/ui/skeleton";
import { ChevronRight, ArrowLeft, Compass, Search, Plus } from "lucide-react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/Input";
import Link from "next/link";

export default function FlashcardsLoading() {
  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-6 sm:mt-12">
      <nav className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-y-2">
        <Link
          href="/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-16" />
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-24" />
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Flashcards</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ellipsis overflow-hidden">
            Manage Flashcards
          </h1>
          <Skeleton className="h-5 w-48 mt-1" />
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href="#">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/40 rounded-lg p-4 border">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flashcards..."
              className="pl-9 pr-9 bg-white dark:bg-slate-900"
              disabled
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <Skeleton className="h-4 w-24" />
            <Button className="shrink-0" disabled>
              <Plus className="h-4 w-4 mr-1" />
              Add Flashcard
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border rounded-lg p-4 h-[245px]">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="pt-2 border-t">
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <span className="text-muted-foreground text-sm">of</span>
            <Skeleton className="h-4 w-4" />
          </div>

          <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <Skeleton className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

