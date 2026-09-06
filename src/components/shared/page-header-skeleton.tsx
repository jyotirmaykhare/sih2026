import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div>
      <Skeleton className="h-5 w-56" />
      <Skeleton className="mt-2 h-3 w-80" />
    </div>
  );
}
