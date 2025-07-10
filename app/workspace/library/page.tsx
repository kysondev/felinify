import { Tabs, TabsList, TabsTrigger } from "components/ui/Tabs";

export default async function LibraryPage() {
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
          </Tabs>
        </div>
      </div>
    </>
  );
}
