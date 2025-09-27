import { Skeleton } from "components/ui/skeleton";
import { ChevronRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback } from "components/ui/avatar";

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
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
          <Skeleton className="h-5 w-64 mt-1" />
        </div>
        <Button variant="outline" className="shrink-0 opacity-50 pointer-events-none">
          Back to Deck
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              <Skeleton className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
          <div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24 mt-1" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm">
        <div className="p-4 lg:p-6">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border shadow-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-40" />
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <div className="flex items-end gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-16 mb-1" />
                  </div>
                  <Skeleton className="h-3 w-full mt-2 rounded-full" />
                </div>

                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <div className="flex items-end gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-4 w-16 mb-1" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/40 px-3 py-1.5">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-baseline gap-1">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-3 w-32 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-lg">
              <div className="p-3 border-b">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="p-4 space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-40 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
