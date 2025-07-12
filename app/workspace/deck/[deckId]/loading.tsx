import { Skeleton } from "components/ui/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { ChevronRight, Compass, Home } from "lucide-react";
import Link from "next/link";

export default function Loading() {
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
          href="/workspace/library"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Library</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-32" />
      </nav>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-8">
          <TabsTrigger value="details" className="text-sm">
            Deck Details
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="text-sm">
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-sm">
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="details"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-6">
            <div className="border-muted-foreground/20 border rounded-lg">
              <div className="p-6 pb-4 flex flex-row items-center justify-between border-b">
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-4 w-40 mt-1" />
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-72" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              
              <div className="p-6 border-t flex justify-between">
                <Skeleton className="h-10 w-20" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="flashcards"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-9 w-32" />
            </div>
            
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <Skeleton className="h-5 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="stats"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
            
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="h-[200px] w-full bg-muted/20 rounded-md" />
            </div>
            
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <div className="w-full max-w-[200px]">
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <Skeleton className="h-full w-2/3 rounded-full" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
