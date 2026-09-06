"use client";

import { Route } from "lucide-react";
import { formatDelay } from "@/lib/format";
import { cn } from "@/lib/utils";
import { RoadStatusBadge } from "@/components/shared/status-badge";
import type { RoadInfo } from "@/types";

export function RouteCard({
  road,
  selected = false,
  onSelect,
  className,
}: {
  road: RoadInfo;
  selected?: boolean;
  onSelect?: (road: RoadInfo) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect ? () => onSelect(road) : undefined}
      className={cn(
        "w-full rounded-sm border bg-card p-3 text-left transition-colors",
        selected
          ? "border-primary/60 bg-primary/5"
          : "border-border hover:border-muted-foreground/40",
        !onSelect && "cursor-default",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="num inline-flex h-5 shrink-0 items-center rounded-sm border border-border bg-secondary px-1.5 font-mono text-[10px] font-semibold text-muted-foreground">
            {road.routeNumber}
          </span>
          <p className="truncate text-xs font-medium">{road.name}</p>
        </div>
        <RoadStatusBadge status={road.status} className="shrink-0" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Route className="h-3 w-3" />
          {road.corridor}
        </span>
        <span className="text-border">|</span>
        <span>
          Risk <span className="num font-medium text-foreground">{road.riskPct}%</span>
        </span>
        <span className="text-border">|</span>
        <span>Delay {formatDelay(road.estimatedDelayMin)}</span>
      </div>
    </button>
  );
}

export function RouteCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-sm border border-border bg-card p-3", className)}>
      <div className="h-3.5 w-3/4 rounded-sm bg-muted/70" />
      <div className="mt-2.5 h-2.5 w-1/2 rounded-sm bg-muted/50" />
    </div>
  );
}
