"use client";

import {
  CloudUpload,
  FileText,
  ListChecks,
  Radio,
  TrendingUp,
  Truck,
  Waypoints,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivity } from "@/hooks/use-dashboard";
import { formatAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/types";

const ICONS: Record<ActivityItem["type"], React.ComponentType<{ className?: string }>> = {
  REPORT_FILED: FileText,
  ROAD_REOPENED: Waypoints,
  VEHICLE_DELIVERED: Truck,
  ALERT_ESCALATED: TrendingUp,
  AI_FORECAST: Radio,
  SYNC_COMPLETED: CloudUpload,
};

const TONE: Record<ActivityItem["type"], string> = {
  REPORT_FILED: "text-sky-400",
  ROAD_REOPENED: "text-emerald-400",
  VEHICLE_DELIVERED: "text-blue-400",
  ALERT_ESCALATED: "text-orange-400",
  AI_FORECAST: "text-violet-400",
  SYNC_COMPLETED: "text-teal-400",
};

export function RecentActivity({ max = 6 }: { max?: number }) {
  const activity = useActivity();
  const items = (activity.data ?? []).slice(0, max);

  return (
    <section
      aria-label="Recent activity"
      className="flex h-full flex-col rounded-sm border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-muted-foreground" />
          <span className="micro-label text-foreground">Recent activity</span>
        </div>
        <span className="num font-mono text-[10px] text-muted-foreground">
          {activity.data ? `${activity.data.length} events` : ""}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-3">
        {activity.isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-7 w-7 rounded-sm" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2.5 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}
        {activity.isError && (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Activity feed temporarily unavailable.
          </p>
        )}
        <ol className="relative space-y-3.5 before:absolute before:bottom-1 before:left-[13px] before:top-1 before:w-px before:bg-border">
          {items.map((item) => {
            const Icon = ICONS[item.type];
            return (
              <li key={item.id} className="relative flex gap-3">
                <span
                  className={cn(
                    "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary",
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", TONE[item.type])} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-xs font-medium">{item.title}</p>
                    <span className="num shrink-0 font-mono text-[10px] text-muted-foreground">
                      {formatAgo(item.timestamp)}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                    {item.detail}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/70">{item.actor}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
