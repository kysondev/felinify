import { Skeleton } from "@ui/skeleton";
import { Card, CardContent } from "@ui/card";
import Image from "next/image";

export default function HomeLoading() {
  return (
    <div className="flex justify-center items-center bg-background">
      <div className="container max-w-7xl mx-auto py-6 px-4 md:py-10 md:px-6 mt-0 md:mt-0">
        <div className="flex flex-col items-center justify-center py-16 text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <Image
              src="/felinify.png"
              alt="Felinify Logo"
              width={90}
              height={90}
              className="mx-auto"
            />
          </div>

          <Skeleton className="h-12 w-96 mx-auto mb-5" />
          <Skeleton className="h-6 w-80 mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border border-border">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Skeleton className="w-12 h-12 rounded-full mb-4" />
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mx-auto">
            <Skeleton className="h-14 w-full sm:w-1/2" />
            <Skeleton className="h-14 w-full sm:w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

