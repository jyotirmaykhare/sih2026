import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/** Row-style skeleton used while a list/panel is loading. */
export function LoadingState({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)} aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-sm border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="mt-2 h-2.5 w-3/4" />
        </div>
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
