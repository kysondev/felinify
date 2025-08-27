"use client";
import { Button } from "components/ui/Button";
import { Input } from "components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import {
  BarChart3,
  Filter,
  Package,
  Search,
  Target,
  TrendingUp,
  Zap,
  X,
} from "lucide-react";
import { DeckList } from "./DeckList";
import { Deck, Subscription, User } from "db/types/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card";
import { Progress } from "components/ui/Progress";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "components/ui/Dropdown-menu";
import { Badge } from "components/ui/Badge";
import { PREDEFINED_TAGS } from "@explore/config/tags.config";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

export const LibraryTabs = ({
  decks,
  user,
  subscription,
  averageMastery,
}: {
  decks: Deck[];
  user: User;
  subscription: Subscription;
  averageMastery: number;
}) => {
  const [activeTab, setActiveTab] = useState("decks");
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
    setActiveTab("decks");
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
    setActiveTab("decks");
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              className="pl-10 w-full lg:w-64 bg-white"
              value={searchQuery}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Filter
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
                <DropdownMenuItem disabled>
                  No tags available
                </DropdownMenuItem>
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
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 px-2 py-1"
            >
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
        user={user as User}
        subscription={subscription as Subscription}
        searchQuery={searchQuery}
      />

      <TabsContent value="analytics" className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Learning Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    Overall Progress
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {averageMastery}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mastery Average
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Progress value={averageMastery} className="h-4" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Master</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    Deck Performance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Top 5 decks by mastery
                  </p>
                </div>

                <div className="space-y-3">
                  {decks
                    ?.sort(
                      (a, b) =>
                        (b.progress?.mastery || 0) - (a.progress?.mastery || 0)
                    )
                    .slice(0, 5)
                    .map((deck, index) => (
                      <div
                        key={deck.id}
                        className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {deck.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {deck.flashcards?.length || 0} cards •{" "}
                            {deck.progress?.completedSessions || 0} sessions
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${deck.progress?.mastery || 0}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold w-12 text-right">
                            {deck.progress?.mastery || 0}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                Study Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-muted rounded-lg">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Most Studied
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(decks.length > 0 &&
                          decks?.reduce((max, deck) =>
                            (deck.progress?.completedSessions || 0) >
                            (max.progress?.completedSessions || 0)
                              ? deck
                              : max
                          )?.name) ||
                          "No data"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(decks.length > 0 &&
                      decks?.reduce((max, deck) =>
                        (deck.progress?.completedSessions || 0) >
                        (max.progress?.completedSessions || 0)
                          ? deck
                          : max
                      )?.progress?.completedSessions) ||
                      0}{" "}
                    sessions completed
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-muted rounded-lg">
                      <Target className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Highest Mastery
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(decks.length > 0 &&
                          decks?.reduce((max, deck) =>
                            (deck.progress?.mastery || 0) >
                            (max.progress?.mastery || 0)
                              ? deck
                              : max
                          )?.name) ||
                          "No data"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(decks.length > 0 &&
                      decks?.reduce((max, deck) =>
                        (deck.progress?.mastery || 0) >
                        (max.progress?.mastery || 0)
                          ? deck
                          : max
                      )?.progress?.mastery) ||
                      0}
                    % mastery achieved
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-muted rounded-lg">
                      <Package className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Largest Deck
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(decks.length > 0 &&
                          decks?.reduce((max, deck) =>
                            (deck.flashcards?.length || 0) >
                            (max.flashcards?.length || 0)
                              ? deck
                              : max
                          )?.name) ||
                          "No data"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(decks.length > 0 &&
                      decks?.reduce((max, deck) =>
                        (deck.flashcards?.length || 0) >
                        (max.flashcards?.length || 0)
                          ? deck
                          : max
                      )?.flashcards?.length) ||
                      0}{" "}
                    cards total
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50">
                <h4 className="font-semibold text-sm text-foreground mb-3">
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold text-primary">
                      {decks?.filter((d) => (d.progress?.mastery || 0) >= 80)
                        .length || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Mastered</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold text-orange-500">
                      {decks?.filter((d) => (d.progress?.mastery || 0) < 50)
                        .length || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Needs Work</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};
