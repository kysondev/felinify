import { Button } from "components/ui/Button";
import { Card, CardContent } from "components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { PlusCircle, Library, BarChart3, Search, Filter, Home, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Skeleton } from "components/ui/Skeleton";
import { Input } from "components/ui/Input";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background mt-2">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6">
        <nav className="flex items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <ChevronRight className="h-4 w-4 mx-2" />
          <div className="flex items-center">
            <Library className="h-4 w-4 mr-1" />
            <Skeleton className="h-4 w-16" />
          </div>
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
                <Skeleton className="h-8 w-48 bg-white/20" />
              </h1>

              <div className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
                Ready to expand your knowledge? Your learning journey continues
                here with{" "}
                <span className="font-semibold text-white">
                  <Skeleton className="inline-block h-4 w-8 bg-white/20" />
                </span>{" "}
                decks and{" "}
                <span className="font-semibold text-white">
                  <Skeleton className="inline-block h-4 w-12 bg-white/20" />
                </span>{" "}
                cards waiting for you.
              </div>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="default"
                      variant="secondary"
                      className="gap-2 px-6 py-2 font-semibold rounded-xl bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Create Deck
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-4 sm:p-6 rounded-2xl">
                    <DialogHeader className="pb-3">
                      <DialogTitle>Create New Flashcard Deck</DialogTitle>
                      <DialogDescription>
                        Create a new deck to organize your flashcards.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-1">
                      <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                      strokeDashoffset={`${2 * Math.PI * 28 * 0.3}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-6 w-8 bg-white/20 rounded" />
                  </div>
                </div>

                <div className="text-white font-medium text-xs text-center mb-2">
                  Average Mastery
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <div className="mt-1.5 text-xs text-white/70 font-medium">
                  Intermediate
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="decks" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <TabsList className="w-full max-w-full lg:max-w-[300px] grid grid-cols-2">
              <TabsTrigger value="decks" className="flex-1">
                <CardsIcon size={16} />
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
                  className="pl-10 w-full lg:w-64 bg-white"
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
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    
                    <div className="mb-4">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                          <Skeleton className="h-7 w-7 rounded-md" />
                        </div>
                        <Skeleton className="h-3 w-8 mx-auto" />
                        <Skeleton className="h-3 w-10 mx-auto mt-1" />
                      </div>

                      <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                          <Skeleton className="h-7 w-7 rounded-md" />
                        </div>
                        <Skeleton className="h-3 w-8 mx-auto" />
                        <Skeleton className="h-3 w-16 mx-auto mt-1" />
                      </div>

                      <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                          <Skeleton className="h-7 w-7 rounded-md" />
                        </div>
                        <Skeleton className="h-3 w-8 mx-auto" />
                        <Skeleton className="h-3 w-12 mx-auto mt-1" />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border/60 bg-muted/50 mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-5 w-8" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>

                    <div className="flex gap-3">
                      <Skeleton className="h-9 w-full" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Dialog>
                <DialogTrigger asChild>
                  <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                    <CardContent className="flex flex-col items-center justify-center p-8 min-h-[400px] text-center">
                      <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <PlusCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Create New Deck
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Start building your knowledge with a new flashcard
                        deck
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                  <DialogHeader className="pb-3">
                    <DialogTitle>Create New Flashcard Deck</DialogTitle>
                    <DialogDescription>
                      Create a new deck to organize your flashcards.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border border-border/50">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-32" />
                        <div className="text-right">
                          <Skeleton className="h-8 w-16 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border/50">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="flex-1 min-w-0">
                              <Skeleton className="h-4 w-32 mb-1" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                            <div className="flex items-center gap-3">
                              <Skeleton className="w-20 h-2 rounded-full" />
                              <Skeleton className="h-4 w-12" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border border-border/50 h-fit">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <Skeleton className="h-6 w-28" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                          <div className="flex items-center gap-3 mb-2">
                            <Skeleton className="h-6 w-6 rounded-lg" />
                            <div>
                              <Skeleton className="h-4 w-20 mb-1" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                          </div>
                          <Skeleton className="h-3 w-24" />
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-border/50">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <Skeleton className="h-6 w-8 mx-auto mb-1" />
                          <Skeleton className="h-3 w-16 mx-auto" />
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <Skeleton className="h-6 w-8 mx-auto mb-1" />
                          <Skeleton className="h-3 w-20 mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
