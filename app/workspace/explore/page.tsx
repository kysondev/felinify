import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { Search } from "lucide-react";
import { Input } from "components/ui/Input";
import { ExploreDeckCard } from "components/explore/ExploreDeckCard";
import { Deck } from "db/types/models.types";
import { getFeaturedDecks, getPopularDecks } from "services/deck.service";

export default async function Explore() {
    "use cache";
    const { data: featuredDecks} = await getFeaturedDecks();
    const { data: popularDecks} = await getPopularDecks();
  return (
    <div className="container max-w-[1200px] mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Explore Flashcard Decks
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Discover popular flashcard decks created by the community
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search for decks by topic, subject, or creator..." 
            className="pl-10 py-6"
          />
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="w-full max-w-full md:max-w-[400px] grid grid-cols-2">
            <TabsTrigger value="featured" className="flex-1">
              Featured
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex-1">
              Popular
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">
                Featured Decks
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredDecks.map((deck) => (
                <ExploreDeckCard key={deck.id} deck={deck as Deck} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">
                Popular Decks
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularDecks.map((deck) => (
                <ExploreDeckCard key={deck.id} deck={deck} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}