"use client";
import { useEffect, useState } from "react";
import { PlusCircle, Filter, Search, X } from "lucide-react";
import { Deck, Subscription, User } from "db/types/models.types";
import { DeckList } from "./deck-list";
import { Button } from "@ui/button";
import { Input } from "@ui/Input";
import { Badge } from "@ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { PREDEFINED_TAGS } from "@explore/config/tags.config";
import { CreateDeckForm } from "./create-deck-form";

export const LibraryTabs = ({
  decks,
  recentDecks,
  user,
  subscription,
}: {
  decks: Deck[];
  recentDecks: Deck[];
  user: User;
  subscription: Subscription;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayedDecks, setDisplayedDecks] = useState<Deck[]>(decks);

  useEffect(() => {
    let filteredDecks = decks;

    if (searchQuery.trim()) {
      filteredDecks = filteredDecks.filter((deck) =>
        deck.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filteredDecks = filteredDecks.filter((deck) => {
        if (!deck.tags || deck.tags.length === 0) return false;
        return selectedTags.some((selectedTag) =>
          deck.tags!.some((tag) => tag.name === selectedTag)
        );
      });
    }

    setDisplayedDecks(filteredDecks);
  }, [decks, searchQuery, selectedTags]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="w-full lg:max-w-[420px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your decks..."
              className="pl-10 w-full bg-white rounded-full"
              value={searchQuery}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-stretch gap-2 sm:gap-3 flex-wrap w-full lg:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white h-10 px-2.5 sm:px-4 w-full sm:w-auto justify-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span className="mr-0">Filter</span>
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PREDEFINED_TAGS.length > 0 ? (
                PREDEFINED_TAGS.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{tag}</span>
                      {selectedTags.includes(tag) && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No tags available</DropdownMenuItem>
              )}
              {selectedTags.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearFilters}
                    className="cursor-pointer text-destructive"
                  >
                    Clear all filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 px-2.5 sm:px-4 w-full sm:w-auto justify-center">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Create</span>
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
                <CreateDeckForm
                  user={user as User}
                  subscription={subscription as Subscription}
                  decks={decks}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 px-2 py-1">
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {searchQuery.trim() && (
            <Badge variant="secondary" className="gap-1 px-2 py-1">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <DeckList
        decks={displayedDecks}
        allDecks={decks}
        recentDecks={recentDecks}
        user={user as User}
        subscription={subscription as Subscription}
        searchQuery={searchQuery}
      />
    </div>
  );
};
