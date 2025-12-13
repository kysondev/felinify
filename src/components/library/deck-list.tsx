import { Deck, Subscription, User } from "db/types/models.types";
import { DeckCard } from "./deck-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Card, CardContent } from "@ui/card";
import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { CreateDeckForm } from "./create-deck-form";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@ui/badge";
import Link from "next/link";
import formatActivityDate from "@deck/utils/format-activity-date.utils";
import getDeckActivityDate from "@deck/utils/get-deck-activity-date.utils";

export const DeckList = ({
  decks,
  allDecks,
  user,
  subscription,
  searchQuery,
  recentDecks,
}: {
  decks: Deck[];
  allDecks: Deck[];
  user: User;
  subscription: Subscription;
  searchQuery: string | null;
  recentDecks: Deck[];
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const decksPerPage = 8;
  const safeRecentDecks = recentDecks || [];

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  const refreshData = () => {
    router.refresh();
  };

  const filteredDecks = decks || [];
  const fullDecks = allDecks || [];
  const totalDecks = filteredDecks.length;
  const hasFullLastPage = totalDecks % decksPerPage === 0 && totalDecks > 0;
  const totalPages =
    Math.ceil(totalDecks / decksPerPage) + (hasFullLastPage ? 1 : 0);
  const recentToShow = safeRecentDecks.slice(0, 3);
  const suggestedDecks = fullDecks.slice(0, 3);

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

  const noResults = searchQuery && filteredDecks.length === 0;
  return (
    <div className="space-y-6">
      {!searchQuery && recentToShow.length > 0 && (
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Recent decks
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              Jump back into your studies
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentToShow.map((deck) => (
              <DeckCard key={deck.id} deck={deck} variant="secondary" />
            ))}
          </div>
          <div className="border-t border-border" />
        </div>
      )}

      {filteredDecks && filteredDecks.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                All decks
              </p>
              <h2 className="text-xl font-semibold text-foreground">
                Your collection ({filteredDecks.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentDecks.map((deck) => (
              <DeckCard deck={deck} key={deck.id} />
            ))}

            {isLastPage && (
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                    <CardContent className="flex flex-col items-center justify-center p-8 min-h-[292px] text-center">
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
      ) : noResults ? (
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

      {suggestedDecks.length > 0 && (
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Suggested decks
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              Explore these picks
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {suggestedDecks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} variant="secondary" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
