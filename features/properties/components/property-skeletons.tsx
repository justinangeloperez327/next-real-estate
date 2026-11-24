import { Skeleton } from "@/components/ui/skeleton";

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-3 rounded-xl border p-0">
          <Skeleton className="aspect-[4/3] w-full rounded-b-none rounded-t-xl" />
          <div className="space-y-2 p-5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}
