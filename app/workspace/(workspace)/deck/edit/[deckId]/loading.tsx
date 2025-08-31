import { Skeleton } from "components/ui/skeleton";
import { ChevronRight, Home, Library } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center text-sm text-muted-foreground mb-4">
        <Link
          href="/workspace"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          <span>Workspace</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href="/workspace/library"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Library className="h-4 w-4 mr-1" />
          <span>Library</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Skeleton className="h-4 w-32" />
      </nav>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="md:max-w-[70%] w-full">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-full max-w-md" />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm mt-2 md:mt-0 shrink-0">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="border-muted-foreground/20 border rounded-lg">
            <div className="p-4 pb-3 flex flex-row items-center justify-between border-b">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-4 w-40 mt-1" />
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-72" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>

            <div className="p-4 border-t flex justify-between">
              <Skeleton className="h-10 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded" />
                <Skeleton className="h-9 w-28" />
              </div>
            </div>
          </div>
          <div className="border-muted-foreground/20 border rounded-lg">
            <div className="p-4 pb-3 flex flex-row items-center justify-between border-b">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-4 w-64 mt-1" />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-6 w-10 rounded-full" />
              </div>

              <div className="mt-4 space-y-1">
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm mb-4">
            <div className="p-4 lg:p-6">
              <Skeleton className="h-7 w-32 mb-4" />

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="bg-muted/40 px-3 py-1.5">
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="p-3">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-3 w-24 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg">
                  <div className="p-3 border-b">
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="p-4 space-y-3">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border rounded-lg shadow-sm">
            <div className="p-4 lg:p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-9 w-32" />
                </div>

                <Skeleton className="h-10 w-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
