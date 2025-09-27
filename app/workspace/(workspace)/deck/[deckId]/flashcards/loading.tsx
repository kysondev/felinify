import { Skeleton } from "components/ui/skeleton";
import { ChevronRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "components/ui/button";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-8">
      <nav className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-y-2">
        <Link
          href="/workspace/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-24" />
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-32" />
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-20" />
      </nav>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-48 mt-1" />
        </div>
        <Button variant="outline" className="shrink-0 opacity-50 pointer-events-none">
          Back to Deck
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm">
        <div className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/40 rounded-lg p-4 border mb-6">
            <Skeleton className="h-10 w-full sm:w-80" />
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                  </div>
                </div>
                <div className="p-3 bg-muted/20 border-t">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Skeleton className="h-9 w-24" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
