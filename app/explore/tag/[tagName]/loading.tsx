import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { Skeleton } from "components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TagPageLoading() {
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
      <div className="mb-6">
        <Link href="/explore">
          <Button variant="ghost" className="group hover:bg-muted">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm mb-4">
          <Skeleton className="h-4 w-24 bg-primary" />
        </div>
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-2xl mx-auto" />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <div className="flex justify-between items-center pt-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

