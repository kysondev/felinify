import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@ui/card";
import { Skeleton } from "@ui/skeleton";

export default function OTPSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            <Skeleton className="mx-auto h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="mx-auto mt-2 h-4 w-64" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-md" />
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        <Skeleton className="mx-auto h-3 w-60" />
      </div>
    </div>
  );
}
