import { Skeleton } from "@ui/skeleton";
import { Card, CardContent } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { Button } from "@ui/button";
import { Input } from "@ui/Input";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  Library,
  PlusCircle,
  BarChart3,
  Filter,
  Search,
} from "lucide-react";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export default function LibraryLoading() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

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
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Library className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90 font-medium text-sm">
                  Personal Library
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {getGreeting()},{" "}
                <span className="inline-block h-7 w-24 bg-white/20 rounded animate-pulse"></span>
              </h1>

              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
                Ready to expand your knowledge? Your learning journey continues
                here with{" "}
                <span className="font-semibold text-white">
                  <span className="inline-block h-4 w-8 bg-white/20 rounded animate-pulse"></span>{" "}
                  decks
                </span>{" "}
                and{" "}
                <span className="font-semibold text-white">
                  <span className="inline-block h-4 w-8 bg-white/20 rounded animate-pulse"></span>{" "}
                  cards
                </span>{" "}
                waiting for you.
              </p>

              <div className="mt-4">
                <Button
                  size="default"
                  variant="secondary"
                  className="gap-2 px-6 py-2 font-semibold bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled
                >
                  <PlusCircle className="h-4 w-4" />
                  Create Deck
                </Button>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm w-[160px] h-[160px] shadow-inner">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="relative mb-3">
                  <svg
                    className="w-16 h-16 transform -rotate-90"
                    viewBox="0 0 64 64"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * 0.5}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">50%</span>
                  </div>
                </div>

                <div className="text-white font-medium text-xs text-center mb-2">
                  Average Mastery
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-white/70 font-medium">
                  Intermediate
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <TabsList className="w-full max-w-full lg:max-w-[300px] grid grid-cols-2">
              <TabsTrigger value="decks" className="flex-1">
                <CardsIcon size={16} className="mr-2" />
                Decks
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search your decks..."
                  className="pl-10 w-full lg:w-64 bg-white rounded-full"
                  disabled
                />
              </div>

              <Button variant="outline" size="sm" className="bg-white" disabled>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="decks" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
