import { Skeleton } from "components/ui/skeleton";
import { ChevronRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "components/ui/button";

export default function Loading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
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
        <Skeleton className="h-4 w-10" />
      </nav>


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-6">
        <div>
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-5 w-48 mt-1" />
        </div>
        <Button variant="outline" className="shrink-0 opacity-50 pointer-events-none">
          Back to Deck
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-7 w-40 mb-6" />
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-5 w-48 mt-1" />
                </div>
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">

          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-7 w-16 mb-6" />
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-20 rounded-full" />
                  ))}
                </div>
                
                <div className="mt-4">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-white dark:bg-slate-900 border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-7 w-24 mb-6" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}