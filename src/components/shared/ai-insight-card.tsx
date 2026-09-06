"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Clock, Crosshair, Gauge, Route, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RouteCard } from "@/components/shared/route-card";
import { getRoad } from "@/data/roads";
import { cn } from "@/lib/utils";
import type { AIInsight, RoadInfo } from "@/types";

const RISK_COLOR = (score: number) =>
  score >= 70 ? "#EF4444" : score >= 45 ? "#F97316" : score >= 25 ? "#F59E0B" : "#22C55E";

function RiskGauge({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const frac = Math.min(100, Math.max(0, score)) / 100;
  const color = RISK_COLOR(score);
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="hsl(221 26% 15%)" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="butt"
          strokeDasharray={`${circ * frac} ${circ}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="num font-mono text-3xl font-semibold leading-none tracking-tight">
          {score}
          <span className="text-base text-muted-foreground">%</span>
        </span>
        <span className="micro-label mt-1">risk score</span>
      </div>
    </div>
  );
}

function MetaCell({
  icon: Icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-background/40 p-2.5">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className={cn("num mt-1.5 text-xs font-semibold", valueClass)}>{value}</p>
    </div>
  );
}

export function AIInsightCard({
  insight,
  loading = false,
  onViewAffectedRoutes,
  onViewAlternative,
  showActions = true,
  className,
}: {
  insight: AIInsight | undefined;
  loading?: boolean;
  onViewAffectedRoutes?: (insight: AIInsight) => void;
  onViewAlternative?: (insight: AIInsight) => void;
  showActions?: boolean;
  className?: string;
}) {
  const [openFactors, setOpenFactors] = useState(true);
  const router = useRouter();

  if (loading || !insight) {
    return (
      <div className={cn("rounded-sm border border-border bg-card p-4", className)}>
        <div className="flex gap-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-2/3" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      </div>
    );
  }

  const affectedRoads = insight.affectedRouteIds
    .map((id) => getRoad(id))
    .filter((r): r is RoadInfo => Boolean(r));

  return (
    <div className={cn("rounded-sm border border-border bg-card", className)}>
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-primary" />
          <span className="micro-label text-foreground">AI Intelligence</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="num font-mono">
            {insight.model.name} {insight.model.version}
          </span>
          <span className="text-border">|</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
            live model feed
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          {/* left: gauge */}
          <div className="flex items-center gap-4">
            <RiskGauge score={insight.riskScore} />
            <div className="min-w-0">
              <p className="micro-label">
                {insight.type === "LANDSLIDE"
                  ? "Landslide risk"
                  : insight.type === "FLOOD"
                    ? "Flood risk"
                    : "Disruption risk"}
              </p>
              <h3 className="mt-1 text-sm font-semibold leading-snug">{insight.title}</h3>
              <p className="mt-1.5 max-w-md text-[11px] leading-relaxed text-muted-foreground">
                {insight.summary}
              </p>
            </div>
          </div>

          {/* right: meta grid */}
          <div className="grid flex-1 grid-cols-2 gap-2 xl:grid-cols-4">
            <MetaCell
              icon={Gauge}
              label="Confidence"
              value={`${insight.confidence}%`}
              valueClass="text-emerald-400"
            />
            <MetaCell icon={Clock} label="Predicted window" value={insight.predictedWindow} />
            <MetaCell icon={Target} label="Peak window" value={insight.peakWindow} />
            <MetaCell
              icon={Route}
              label="Affected routes"
              value={`${insight.affectedRouteIds.length} corridors`}
              valueClass="text-amber-400"
            />
          </div>
        </div>

        {/* explainability: factor contributions */}
        <div className="mt-5 rounded-sm border border-border bg-background/30">
          <button
            type="button"
            onClick={() => setOpenFactors((v) => !v)}
            className="flex w-full items-center justify-between px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-expanded={openFactors}
          >
            <span className="micro-label text-foreground">Why this score — contributing factors</span>
            <span className="text-[10px] text-muted-foreground">{openFactors ? "Hide" : "Show"}</span>
          </button>
          {openFactors && (
            <div className="space-y-2.5 px-3 pb-3">
              {insight.factors.map((f) => (
                <div key={f.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-medium">
                      {f.label}
                      <span className="ml-2 text-[10px] text-muted-foreground">{f.detail}</span>
                    </p>
                    <p className="num shrink-0 font-mono text-[11px] text-muted-foreground">
                      {f.display} ·{" "}
                      <span className="font-semibold text-foreground">+{f.contribution}</span>
                    </p>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-sm bg-muted">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${f.contribution}%`,
                        backgroundColor: RISK_COLOR(insight.riskScore),
                        opacity: 0.55 + 0.45 * (f.contribution / 100),
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="border-t border-border pt-2 text-[10px] leading-relaxed text-muted-foreground">
                Contributions are additive points explaining the {insight.riskScore}% composite
                risk score. Model output refreshed{" "}
                {new Date(insight.model.updatedAt).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                IST from IMD rainfall, terrain LiDAR and 24-month incident history.
              </p>
            </div>
          )}
        </div>

        {/* recommendation */}
        <div className="mt-3 rounded-sm border-l-2 border-primary bg-primary/5 px-3 py-2.5">
          <p className="micro-label text-primary/90">AI recommendation</p>
          <p className="mt-1 text-xs leading-relaxed">{insight.recommendation}</p>
        </div>

        {/* actions */}
        {showActions && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onViewAffectedRoutes ? onViewAffectedRoutes(insight) : router.push("/intelligence")
              }
            >
              <Route /> View affected routes
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onViewAlternative ? onViewAlternative(insight) : router.push("/intelligence")
              }
            >
              <Crosshair /> View alternative
            </Button>
          </div>
        )}
      </div>

      <AffectedRoutesList roads={affectedRoads} />
    </div>
  );
}

function AffectedRoutesList({ roads }: { roads: RoadInfo[] }) {
  const [show, setShow] = useState(false);
  const visible = useMemo(() => (show ? roads : []), [show, roads]);
  if (roads.length === 0) return null;
  return (
    <div className="border-t border-border px-4 py-3">
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="flex w-full items-center justify-between focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-expanded={show}
      >
        <span className="micro-label text-foreground">Affected corridors ({roads.length})</span>
        <span className="text-[10px] text-muted-foreground">{show ? "Collapse" : "Expand"}</span>
      </button>
      {show && (
        <div className="mt-3 grid gap-2 lg:grid-cols-3">
          {visible.map((road) => (
            <RouteCard key={road.id} road={road} />
          ))}
        </div>
      )}
    </div>
  );
}


