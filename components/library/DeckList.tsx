import { Deck, Subscription, User } from "db/types/models.types";
import { DeckCard } from "./DeckCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Card, CardContent } from "components/ui/Card";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { CreateDeckForm } from "./CreateDeckForm";
import { TabsContent } from "components/ui/Tabs";
import { Button } from "components/ui/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export const DeckList = ({
  decks,
  user,
  subscription,
  searchQuery,
}: {
  decks: Deck[];
  user: User;
  subscription: Subscription;
  searchQuery: string | null;
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const decksPerPage = 6;

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  const refreshData = () => {
    router.refresh();
  };

  const filteredDecks = decks || [];
  const totalDecks = filteredDecks.length;
  const hasFullLastPage = totalDecks % decksPerPage === 0 && totalDecks > 0;
  const totalPages =
    Math.ceil(totalDecks / decksPerPage) + (hasFullLastPage ? 1 : 0);

  const isLastPage = currentPage === totalPages - 1;
  const isExtraCreatePage = hasFullLastPage && isLastPage;

  const currentDecks = isExtraCreatePage
    ? []
    : filteredDecks.slice(
        currentPage * decksPerPage,
        (currentPage + 1) * decksPerPage
      );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (searchQuery && decks.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <CardsIcon size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No decks Found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            No decks found for the search query "{searchQuery}".
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <TabsContent value="decks" className="space-y-6">
      {decks && decks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentDecks.map((deck) => (
              <DeckCard deck={deck} key={deck.id} user={user as User} />
            ))}

            {isLastPage && (
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
                        Start building your knowledge with a new flashcard deck
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-4 sm:p-6">
                  <DialogHeader className="pb-3">
                    <DialogTitle>Create New Flashcard Deck</DialogTitle>
                    <DialogDescription>
                      Create a new deck to organize your flashcards.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-1">
                    <CreateDeckForm
                      user={user as User}
                      subscription={subscription as Subscription}
                      decks={decks}
                      onSuccess={refreshData}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center pt-4 border-t mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <p className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card className="text-center py-16">
          <CardContent>
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <CardsIcon size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No decks yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your learning journey by creating your first flashcard deck.
              Organize your knowledge and track your progress.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create Deck
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-4 sm:p-6">
                <DialogHeader className="pb-3">
                  <DialogTitle>Create New Flashcard Deck</DialogTitle>
                  <DialogDescription>
                    Create a new deck to organize your flashcards.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-1">
                  <CreateDeckForm
                    user={user as User}
                    subscription={subscription as Subscription}
                    decks={decks}
                    onSuccess={refreshData}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
};
