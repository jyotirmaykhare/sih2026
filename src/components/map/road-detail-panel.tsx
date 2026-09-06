"use client";

import { ArrowRight, CloudRain, Route as RouteIcon, TriangleAlert, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RoadStatusBadge } from "@/components/shared/status-badge";
import { formatAgo, formatDelay } from "@/lib/format";
import type { RoadInfo } from "@/types";

function Field({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="shrink-0 text-[11px] text-muted-foreground">{label}</span>
      <span className={`text-right text-xs font-medium ${mono ? "num font-mono" : ""}`}>{value}</span>
    </div>
  );
}

export function RoadDetailPanel({
  road,
  loading = false,
  onClose,
  onViewAlternative,
}: {
  road: RoadInfo | null | undefined;
  loading?: boolean;
  onClose: () => void;
  onViewAlternative?: (road: RoadInfo) => void;
}) {
  if (loading || !road) {
    return (
      <div className="space-y-3 p-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const riskColor = road.riskPct >= 70 ? "text-red-400" : road.riskPct >= 40 ? "text-amber-400" : "text-emerald-400";

  return (
    <div className="flex max-h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <p className="micro-label text-foreground">Road detail</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close road detail"
          className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="num inline-flex h-5 items-center rounded-sm border border-border bg-secondary px-1.5 font-mono text-[10px] font-semibold text-muted-foreground">
                {road.routeNumber}
              </span>
              <h3 className="truncate text-sm font-semibold">{road.name}</h3>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{road.corridor}</p>
          </div>
          <RoadStatusBadge status={road.status} className="shrink-0" />
        </div>

        {road.cause && (
          <div className="mt-3 flex items-start gap-2 rounded-sm border-l-2 border-amber-500 bg-amber-500/5 px-2.5 py-2">
            {road.status === "BLOCKED" ? (
              <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
            ) : (
              <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
            )}
            <p className="text-[11px] leading-relaxed text-foreground/90">{road.cause}</p>
          </div>
        )}

        <div className="mt-3 divide-y divide-border/60">
          <Field
            label="Risk percentage"
            value={<span className={riskColor}>{road.riskPct}%</span>}
            mono
          />
          <Field label="Weather risk" value={road.weatherRisk} />
          <Field label="Road condition" value={road.condition} />
          <Field label="Estimated delay" value={formatDelay(road.estimatedDelayMin)} mono />
          <Field
            label="Last updated"
            value={formatAgo(road.lastUpdated)}
            mono
          />
        </div>

        <div className="mt-3 rounded-sm border border-primary/25 bg-primary/5 px-2.5 py-2">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/90">
            <CloudRain className="h-3 w-3" /> AI recommendation
          </p>
          <p className="mt-1 text-[11px] leading-relaxed">{road.aiRecommendation}</p>
        </div>
      </div>

      <div className="border-t border-border p-3">
        {road.alternativeRouteId && onViewAlternative ? (
          <Button size="sm" className="w-full" onClick={() => onViewAlternative(road)}>
            <RouteIcon /> View alternative route
          </Button>
        ) : road.alternativeRouteId ? (
          <Button size="sm" variant="outline" className="w-full" asChild>
            <span className="inline-flex items-center gap-2">
              <ArrowRight /> Alternative available: {road.alternativeRouteId.toUpperCase()}
            </span>
          </Button>
        ) : (
          <p className="text-center text-[11px] text-muted-foreground">
            No designated alternative for this corridor
          </p>
        )}
      </div>
    </div>
  );
}
