export default function SubscriptionTabSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="h-6 bg-muted animate-pulse rounded w-40 mb-2"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-64"></div>
            </div>
            <div className="h-6 bg-muted animate-pulse rounded w-24"></div>
          </div>

          <div className="h-px bg-muted animate-pulse"></div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-28"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted animate-pulse rounded w-36"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted animate-pulse rounded w-28"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-36"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted animate-pulse rounded w-36"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-32"></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-end mt-2">
            <div className="h-9 bg-muted animate-pulse rounded w-40"></div>
            <div className="h-9 bg-muted animate-pulse rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

