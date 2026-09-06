"use client";

import { BrainCircuit, Database, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { AIInsightCard } from "@/components/shared/ai-insight-card";
import { RouteCard, RouteCardSkeleton } from "@/components/shared/route-card";
import { usePrimaryInsight, useSecondaryInsights } from "@/hooks/use-map-data";
import { useUiStore } from "@/store/ui.store";
import { Badge } from "@/components/ui/badge";
import { formatDateTimeIST } from "@/lib/format";

export default function IntelligencePage() {
  const primary = usePrimaryInsight();
  const secondary = useSecondaryInsights();
  const setSelectedRoadId = useUiStore((s) => s.setSelectedRoadId);

  const insight = primary.data;

  return (
    <div className="space-y-3">
      <PageHeader
        title="AI Intelligence"
        description="Explainable disruption forecasting across the NER corridor network"
        actions={
          <Badge variant="default" className="gap-1 px-2 py-1 text-[10px]">
            <BrainCircuit className="h-3 w-3" />
            CGRID model suite
          </Badge>
        }
      />

      {/* primary insight — full detail */}
      <AIInsightCard
        insight={insight}
        loading={primary.isLoading}
        onViewAffectedRoutes={() => {
          if (insight?.affectedRouteIds[0]) setSelectedRoadId(insight.affectedRouteIds[0]);
        }}
        onViewAlternative={() => setSelectedRoadId("ec-02-dimapur-imphal")}
      />

      <div className="grid gap-3 lg:grid-cols-3">
        {/* secondary insights */}
        <div className="space-y-3 lg:col-span-2">
          {(secondary.data ?? []).map((s) => (
            <AIInsightCard
              key={s.id}
              insight={s}
              loading={secondary.isLoading}
              onViewAffectedRoutes={() => setSelectedRoadId(s.affectedRouteIds[0] ?? null)}
              onViewAlternative={() => setSelectedRoadId("ec-01-guw-shillong")}
            />
          ))}
          {secondary.isLoading &&
            Array.from({ length: 2 }).map((_, i) => <RouteCardSkeleton key={i} />)}
        </div>

        {/* model provenance */}
        <aside className="h-fit rounded-sm border border-border bg-card" aria-label="Model provenance">
          <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span className="micro-label text-foreground">Model &amp; data provenance</span>
          </div>
          <dl className="divide-y divide-border/60 p-3.5 text-xs">
            <div className="flex justify-between gap-3 py-1.5">
              <dt className="text-muted-foreground">Model family</dt>
              <dd className="num font-mono">CGRID-Vision / Hydro / Weather</dd>
            </div>
            <div className="flex justify-between gap-3 py-1.5">
              <dt className="text-muted-foreground">Rainfall feed</dt>
              <dd className="flex items-center gap-1.5">
                IMD gauge network <RefreshCw className="h-3 w-3 text-emerald-400" />
              </dd>
            </div>
            <div className="flex justify-between gap-3 py-1.5">
              <dt className="text-muted-foreground">Terrain data</dt>
              <dd>Landscape LiDAR + SRTM</dd>
            </div>
            <div className="flex justify-between gap-3 py-1.5">
              <dt className="text-muted-foreground">Incident history</dt>
              <dd className="num font-mono">24 months</dd>
            </div>
            <div className="flex justify-between gap-3 py-1.5">
              <dt className="text-muted-foreground">Last retrain</dt>
              <dd className="num font-mono">02 Sep 2026, 03:00 IST</dd>
            </div>
            {insight && (
              <div className="flex justify-between gap-3 py-1.5">
                <dt className="text-muted-foreground">Latest inference</dt>
                <dd className="num font-mono">{formatDateTimeIST(insight.model.updatedAt)}</dd>
              </div>
            )}
          </dl>
          <p className="border-t border-border px-3.5 py-3 text-[10px] leading-relaxed text-muted-foreground">
            All forecasts are advisory decision-support outputs. Operational routing
            decisions remain with the on-duty logistics officer and district control room.
          </p>
        </aside>
      </div>
    </div>
  );
}
