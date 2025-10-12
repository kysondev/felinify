import { Skeleton } from "components/ui/skeleton";

export default function EditLoading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center text-sm mb-6 gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex justify-between items-center gap-4 mb-8 border-b pb-6">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

