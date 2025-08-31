"use client";
import { Button } from "components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-8xl font-bold tracking-tighter text-primary">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="max-w-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or try going back.
        </p>
        <Button
          onClick={() => router.back()}
          size="lg"
          className="gap-2 flex items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Go Back
        </Button>
      </div>
    </section>
  );
}
