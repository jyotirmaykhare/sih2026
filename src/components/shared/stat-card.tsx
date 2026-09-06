"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { Kpi } from "@/types";

const HINT_COLOR: Record<Kpi["hint"], string> = {
  good: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-red-400",
  neutral: "text-muted-foreground",
};

const SPARK_COLOR: Record<Kpi["hint"], string> = {
  good: "#22C55E",
  warn: "#F59E0B",
  bad: "#EF4444",
  neutral: "#64748B",
};

function formatValue(kpi: Kpi): string {
  if (kpi.format === "PCT") return `${kpi.value.toFixed(1)}%`;
  if (kpi.format === "DEC") return kpi.value.toFixed(1);
  return kpi.value.toLocaleString("en-IN");
}

export function StatCard({ kpi, className }: { kpi: Kpi; className?: string }) {
  const up = kpi.deltaPct >= 0;
  const good = kpi.lowerIsBetter ? !up : up;
  const DeltaIcon = up ? TrendingUp : TrendingDown;
  const data = kpi.trend.map((v, i) => ({ i, v }));

  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30",
        className,
      )}
    >
      <p className="micro-label">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="num font-mono text-[26px] font-semibold leading-none tracking-tight">
            {formatValue(kpi)}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[11px] font-medium",
                good ? "text-emerald-400" : "text-red-400",
              )}
            >
              <DeltaIcon className="h-3 w-3" />
              {up ? "+" : ""}
              {kpi.deltaPct.toFixed(1)}%
            </span>
            <span className="text-[11px] text-muted-foreground">{kpi.caption}</span>
          </div>
        </div>
        <div className="h-10 w-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <Area
                type="monotone"
                dataKey="v"
                stroke={SPARK_COLOR[kpi.hint]}
                strokeWidth={1.5}
                fill={SPARK_COLOR[kpi.hint]}
                fillOpacity={0.12}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-sm border border-border bg-card p-4", className)}>
      <Skeleton className="h-2.5 w-24" />
      <Skeleton className="mt-3 h-7 w-28" />
      <Skeleton className="mt-3 h-3 w-40" />
    </div>
  );
}
