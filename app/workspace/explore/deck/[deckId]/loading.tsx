import { Button } from "components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { BookOpen, ChevronRight, Clock, Home, Star, User, Compass } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "components/ui/Card";
import { Avatar, AvatarFallback } from "components/ui/Avatar";
import { Skeleton } from "components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <nav className="flex items-center text-sm text-muted-foreground mt-16">
        <Link
          href="/workspace"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          <span>Workspace</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href="/workspace/explore"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span>Explore</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-32" />
      </nav>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b pb-6">
        <div className="flex-1">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full mt-3" />
          <Skeleton className="h-4 w-5/6 mt-2" />
          
          <div className="flex items-center mt-4 gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback><Skeleton className="h-full w-full" /></AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24 mt-1" />
              </div>
            </div>
            
            <div className="text-sm">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <Skeleton className="h-4 w-24" />
            </span>
            <span className="flex items-center gap-1 text-sm">
              <User className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <BookOpen className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-8">
          <TabsTrigger value="preview" className="text-sm">
            Preview
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-sm">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="preview"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Flashcard Preview</h2>
              <span className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-40 inline-block" />
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full mt-2" />
                    </div>
                    <div className="p-4 bg-muted/20">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="reviews"
          className="mt-0 animate-in fade-in-50 duration-300"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">User Reviews</h2>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
            
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="relative mb-6">
                  <Skeleton className="h-20 w-20 rounded-full" />
                </div>
                
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-5/6 max-w-md mt-1" />
                <Skeleton className="h-4 w-2/3 max-w-md mt-1 mb-6" />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}