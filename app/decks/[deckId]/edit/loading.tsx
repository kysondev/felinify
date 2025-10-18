import { Skeleton } from "components/ui/skeleton";
import { ChevronRight, ArrowLeft, Compass, Edit3 } from "lucide-react";
import { Button } from "components/ui/button";
import Link from "next/link";

export default function EditLoading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <nav className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-y-2 mt-6 sm:mt-12">
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
        <span className="text-foreground font-medium">Edit</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Deck
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  Deck Information
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Update your deck details
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-3 w-64" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between items-center mt-6">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Flashcards</h2>
                  <Skeleton className="h-4 w-40 mt-1" />
                </div>
                <Button asChild className="shrink-0">
                  <Link href="#">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Manage Flashcards
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  Tags
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a category tag for your deck
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-16" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  Visibility
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Control who can see and access your deck
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-6 w-11" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-64" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

