import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SearchPageLoading() {
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <div className="mb-8">
        <Link href="/workspace/explore">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Button>
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full font-medium text-sm mb-4 animate-pulse">
            <div className="w-4 h-4 bg-muted-foreground/20 rounded"></div>
            <div className="w-24 h-4 bg-muted-foreground/20 rounded"></div>
          </div>

          <div className="mb-4">
            <div className="h-12 md:h-16 bg-muted rounded-lg mx-auto max-w-2xl mb-2 animate-pulse"></div>
            <div className="h-6 bg-muted rounded mx-auto max-w-md animate-pulse"></div>
          </div>

          <div className="h-6 bg-muted rounded mx-auto max-w-xs animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-0">
                <div className="h-32 bg-muted rounded-t-lg"></div>

                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <div className="h-5 w-12 bg-muted rounded-full"></div>
                    <div className="h-5 w-16 bg-muted rounded-full"></div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="h-4 w-20 bg-muted rounded"></div>
                    <div className="h-4 w-16 bg-muted rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/50 border-border/50">
          <CardContent className="p-6">
            <div className="h-6 w-24 bg-muted rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
