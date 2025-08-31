import { CardsIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";
import { Library, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center bg-background">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-0 md:mt-0">
        <div className="flex flex-col items-center justify-center py-16 text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <Skeleton className="w-[90px] h-[90px] rounded-lg mx-auto" />
          </div>

          <Skeleton className="h-12 w-80 mb-5" />

          <Skeleton className="h-6 w-96 mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            <Card className="border border-border shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Library className="h-5 w-5 text-primary" />
                </div>
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CardsIcon size={20} className="text-primary" />
                </div>
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-4 w-28" />
              </CardContent>
            </Card>
          </div>

          <div className="w-full mb-8">
            <Skeleton className="h-6 w-40 mb-4 ml-0" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <Card
                  key={index}
                  className="border border-border/50 bg-card/30"
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CardsIcon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mx-auto">
            <Button
              size="lg"
              variant="default"
              className="w-full gap-3 py-6 font-semibold rounded-lg shadow"
              disabled
            >
              <Library className="h-5 w-5" />
              <Skeleton className="h-5 w-20 bg-white/20" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full gap-3 py-6 font-semibold rounded-lg"
              disabled
            >
              <CardsIcon size={20} className="text-primary" />
              <Skeleton className="h-5 w-24 bg-muted" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
