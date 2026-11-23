import { Skeleton } from "@/components/ui/skeleton";

export function PropertyGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="mx-4 space-y-4 lg:mx-0">
          <Skeleton className="h-96 w-full rounded-lg" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-6 px-4 xl:px-0">
      <Skeleton className="aspect-video w-full" />
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
