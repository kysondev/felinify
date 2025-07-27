import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { PlusCircle } from "lucide-react";
import { getDecksByUserId } from "services/deck.service";
import { getUser, getUserSubscription } from "services/user.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { CreateDeckForm } from "components/library/CreateDeckForm";
import { DeckCard } from "components/library/DeckCard";
import { Subscription, User } from "db/types/models.types";

export default async function LibraryPage() {
  const { data: user } = await getUser();
  const { data: decks } = await getDecksByUserId(user?.id as string);
  const { data: subscription } = await getUserSubscription(user?.id as string);

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
                  Your Flashcard Decks ({decks?.length || "0"})
                </h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="p-3 sm:p-4">
                      <PlusCircle className="h-4 w-4" />
                      <span className="hidden sm:block">Create Deck</span>
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
                      <CreateDeckForm
                        user={user as User}
                        subscription={subscription as Subscription}
                        decks={decks}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {decks?.map((deck) => (
                  <DeckCard deck={deck} key={deck.id} user={user as User} />
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="border-dashed flex flex-col items-center justify-center p-6 min-h-[380px] cursor-pointer hover:bg-accent/10 transition-colors">
                      <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground font-medium">
                        Create New Deck
                      </p>
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
                      <CreateDeckForm
                        user={user as User}
                        subscription={subscription as Subscription}
                        decks={decks}
                      />
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
