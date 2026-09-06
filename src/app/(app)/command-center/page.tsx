"use client";

import { useEffect } from "react";
import { CalendarClock, Radio } from "lucide-react";
import { StatCard, StatCardSkeleton } from "@/components/shared/stat-card";
import { ErrorState } from "@/components/shared/error-state";
import { PageHeader } from "@/components/shared/page-header";
import { AIInsightCard } from "@/components/shared/ai-insight-card";
import { MapPanel } from "@/components/map/map-panel";
import { MapLegend } from "@/components/map/map-legend";
import { MapLayerControl } from "@/components/map/map-layer-control";
import { RoadDetailPanel } from "@/components/map/road-detail-panel";
import { VehiclePanel } from "@/components/shared/vehicle-panel";
import { CriticalAlertsPanel } from "@/components/dashboard/critical-alerts-panel";
import { DeliveryAnalytics } from "@/components/dashboard/delivery-analytics";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { useKpis } from "@/hooks/use-dashboard";
import { usePrimaryInsight, useRoadDetail, useVehicleDetail } from "@/hooks/use-map-data";
import { useClock } from "@/hooks/use-clock";
import { useUiStore } from "@/store/ui.store";

export default function CommandCenterPage() {
  const kpis = useKpis();
  const primary = usePrimaryInsight();
  const { timeLabel, dateLabel } = useClock();

  const {
    mapLayers,
    selectedRoadId,
    setSelectedRoadId,
    selectedVehicleId,
    setSelectedVehicleId,
  } = useUiStore();

  const roadDetail = useRoadDetail(selectedRoadId);
  const vehicleDetail = useVehicleDetail(selectedVehicleId);

  // Escape closes any open map detail panel
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedRoadId(null);
        setSelectedVehicleId(null);
      }
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [setSelectedRoadId, setSelectedVehicleId]);

  return (
    <div className="space-y-3">
      {/* header */}
      <PageHeader
        title="Command Center"
        description="What is happening with logistics across NER right now"
        actions={
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1.5 text-[11px] text-muted-foreground sm:flex">
              <CalendarClock className="h-3.5 w-3.5" />
              {dateLabel} · <span className="num font-mono">{timeLabel}</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1.5 text-[11px] font-medium text-emerald-400">
              <Radio className="h-3.5 w-3.5" />
              LIVE
            </span>
          </div>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.isLoading && Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        {kpis.isError && (
          <ErrorState
            title="KPI feed unavailable"
            onRetry={() => kpis.refetch()}
            className="sm:col-span-2 xl:col-span-4"
          />
        )}
        {kpis.data?.map((kpi) => (
          <StatCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* map + alerts */}
      <div className="grid gap-3 xl:grid-cols-3">
        <div className="relative xl:col-span-2">
          <MapPanel
            layerVisibility={mapLayers}
            selectedRoadId={selectedRoadId}
            selectedVehicleId={selectedVehicleId}
            onSelectRoad={setSelectedRoadId}
            onSelectVehicle={setSelectedVehicleId}
            className="h-[420px] sm:h-[480px] xl:h-[560px]"
          />

          {/* layer control + legend overlays */}
          <div className="absolute left-3 top-12 z-10 hidden md:block">
            <MapLayerControl className="w-64" />
          </div>
          <div className="absolute bottom-3 left-3 z-10 hidden lg:block">
            <MapLegend />
          </div>

          {/* road detail panel (desktop: right rail · mobile: bottom sheet) */}
          {selectedRoadId && (
            <div className="absolute inset-x-3 bottom-3 top-14 z-20 animate-slide-in-right overflow-hidden rounded-sm border border-border bg-card shadow-overlay sm:inset-x-auto sm:bottom-3 sm:right-3 sm:w-[340px]">
              <RoadDetailPanel
                road={roadDetail.data ?? undefined}
                loading={roadDetail.isLoading}
                onClose={() => setSelectedRoadId(null)}
                onViewAlternative={(road) => {
                  if (road.alternativeRouteId) setSelectedRoadId(road.alternativeRouteId);
                }}
              />
            </div>
          )}

          {/* vehicle panel */}
          {selectedVehicleId && (
            <div className="absolute inset-x-3 bottom-3 top-14 z-20 animate-slide-in-right overflow-y-auto scrollbar-thin rounded-sm border border-border bg-card shadow-overlay sm:inset-x-auto sm:bottom-3 sm:right-3 sm:w-[340px]">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <p className="micro-label text-foreground">Vehicle detail</p>
                <button
                  type="button"
                  onClick={() => setSelectedVehicleId(null)}
                  aria-label="Close vehicle detail"
                  className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  ✕
                </button>
              </div>
              <VehiclePanel vehicle={vehicleDetail.data ?? undefined} />
            </div>
          )}
        </div>

        <div className="h-[420px] sm:h-[480px] xl:h-[560px]">
          <CriticalAlertsPanel max={5} />
        </div>
      </div>

      {/* AI intelligence */}
      <AIInsightCard insight={primary.data} loading={primary.isLoading} />

      {/* analytics + activity */}
      <div className="grid gap-3 lg:grid-cols-2">
        <DeliveryAnalytics />
        <RecentActivity max={6} />
      </div>
    </div>
  );
}

