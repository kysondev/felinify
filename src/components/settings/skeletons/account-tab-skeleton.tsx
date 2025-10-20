export default function AccountTabSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted animate-pulse rounded w-16"></div>
          <div className="h-8 bg-muted animate-pulse rounded w-16"></div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex flex-col items-center gap-2 mx-auto md:mx-0">
            <div className="h-20 w-20 md:h-24 md:w-24 bg-muted animate-pulse rounded-full"></div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="h-8 bg-muted animate-pulse rounded flex-1 md:w-24"></div>
              <div className="h-8 bg-muted animate-pulse rounded w-8"></div>
            </div>
          </div>
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="h-4 bg-muted animate-pulse rounded w-16"></div>
                <div className="h-9 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="grid gap-2">
                <div className="h-4 bg-muted animate-pulse rounded w-12"></div>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <div className="h-9 bg-muted animate-pulse rounded w-full"></div>
                  <div className="flex gap-2 items-center">
                    <div className="h-5 bg-muted animate-pulse rounded w-16"></div>
                    <div className="h-5 bg-muted animate-pulse rounded w-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6">
        <div className="h-6 bg-muted animate-pulse rounded w-16 mb-4"></div>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="h-4 bg-muted animate-pulse rounded w-28"></div>
              <div className="h-9 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="grid gap-2">
              <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
              <div className="h-9 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="grid gap-2">
              <div className="h-4 bg-muted animate-pulse rounded w-32"></div>
              <div className="h-9 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="h-9 bg-muted animate-pulse rounded w-32"></div>
          </div>

          <div className="h-px bg-muted animate-pulse"></div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="space-y-1">
              <div className="h-4 bg-muted animate-pulse rounded w-48"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-64"></div>
            </div>
            <div className="h-6 bg-muted animate-pulse rounded w-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
