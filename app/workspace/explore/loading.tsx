import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { Search } from "lucide-react";
import { Input } from "components/ui/Input";
import { Card, CardContent } from "components/ui/Card";
import { Skeleton } from "components/ui/Skeleton";

export default function Loading() {
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
            disabled
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
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="mb-4">
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
                        <Skeleton className="h-3 w-10 mx-auto mt-1" />
                      </div>
                      
                      <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                          <Skeleton className="h-7 w-7 rounded-md" />
                        </div>
                        <Skeleton className="h-3 w-8 mx-auto" />
                        <Skeleton className="h-3 w-10 mx-auto mt-1" />
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-border/60 bg-muted/50 mb-5">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}