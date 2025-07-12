import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Skeleton } from "components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="container max-w-[1200px] mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Flashcard Library
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Create and manage your flashcard decks to boost your learning.
            </p>
          </div>
          <Tabs defaultValue="decks" className="w-full">
            <TabsList className="w-full max-w-full md:max-w-[400px] grid grid-cols-2">
              <TabsTrigger value="decks" className="flex-1">
                My Decks
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="decks" className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">
                  <Skeleton className="h-7 w-64 inline-block" />
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="p-3 sm:p-4">
                      <PlusCircle className="h-4 w-4" />
                      <span className="hidden sm:block">Create Deck</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Flashcard Deck</DialogTitle>
                      <DialogDescription>
                        Create a new deck to organize your flashcards.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle>
                        <Skeleton className="h-6 w-3/4" />
                      </CardTitle>
                      <CardDescription>
                        <Skeleton className="h-4 w-full mt-2" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-12" />
                        </span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-16" />
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <Skeleton className="h-full w-1/3 rounded-full" />
                      </div>
                      <Skeleton className="h-3 w-16 mt-1" />
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Skeleton className="h-8 w-16 rounded" />
                      <Skeleton className="h-8 w-20 rounded" />
                    </CardFooter>
                  </Card>
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="border-dashed flex flex-col items-center justify-center p-6 min-h-[208px] cursor-pointer hover:bg-accent/10 transition-colors">
                      <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground font-medium">
                        Create New Deck
                      </p>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Flashcard Deck</DialogTitle>
                      <DialogDescription>
                        Create a new deck to organize your flashcards.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
