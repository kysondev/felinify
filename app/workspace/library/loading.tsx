import { Button } from "components/ui/Button";
import { Card, CardContent } from "components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { PlusCircle, BookOpen, BarChart3, Search, Filter } from "lucide-react";
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

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Library
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Create, organize, and track your progress across all your
                flashcard decks.
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 px-6">
                  <PlusCircle className="h-5 w-5" />
                  Create Deck
                </Button>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Skeleton className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="decks" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <TabsList className="w-full max-w-full lg:max-w-[300px] grid grid-cols-2">
              <TabsTrigger value="decks" className="flex-1">
                <BookOpen className="h-4 w-4 mr-2" />
                My Decks
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
                  className="pl-10 w-full lg:w-64"
                  disabled
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="decks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="mb-2">
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-4/5 mt-2" />
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-8 w-12 mx-auto mb-2" />
                        <Skeleton className="h-3 w-20 mx-auto" />
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-8 w-12 mx-auto mb-2" />
                        <Skeleton className="h-3 w-20 mx-auto" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
