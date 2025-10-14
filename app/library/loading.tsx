import { Skeleton } from "components/ui/skeleton";
import { Card, CardContent } from "components/ui/card";
import { Tabs } from "components/ui/tabs";
import Link from "next/link";
import { ChevronRight, Home, Library } from "lucide-react";

export default function LibraryLoading() {
  return (
    <div className="min-h-screen bg-background mt-2">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6">
        <nav className="flex items-center text-sm text-muted-foreground mb-4">
          <Link
            href="/home"
            className="flex items-center hover:text-foreground transition-colors"
          >
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

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/90 p-6 mb-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 -left-4 w-16 h-16 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-8 w-8 rounded-xl bg-white/20" />
                <Skeleton className="h-4 w-32 bg-white/20" />
              </div>

              <Skeleton className="h-8 w-64 mb-2 bg-white/20" />
              <Skeleton className="h-6 w-96 mb-4 bg-white/20" />

              <div className="mt-4">
                <Skeleton className="h-10 w-32 bg-white/20 rounded-xl" />
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm w-[160px] h-[160px] shadow-inner">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="relative mb-3">
                  <Skeleton className="w-16 h-16 rounded-full bg-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-6 w-12 bg-white/20" />
                  </div>
                </div>
                <Skeleton className="h-3 w-24 mb-2 bg-white/20" />
                <Skeleton className="w-full h-1.5 bg-white/20 rounded-full" />
                <Skeleton className="h-3 w-16 mt-1.5 bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        <Tabs className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="w-full max-w-full lg:max-w-[300px] grid grid-cols-2 gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Skeleton className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <Skeleton className="h-10 w-full lg:w-64 pl-10" />
              </div>

              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 cursor-default">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <div className="min-w-0">
                        <Skeleton className="h-6 w-8 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <div className="min-w-0">
                        <Skeleton className="h-6 w-8 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-muted/40 via-muted/20 to-transparent border border-border/40 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-lg" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-6 w-12 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="w-full h-2 rounded-full" />
                  </div>

                  <div className="flex gap-3">
                    <Skeleton className="flex-1 h-9 rounded-xl" />
                    <Skeleton className="flex-1 h-9 rounded-xl" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}

