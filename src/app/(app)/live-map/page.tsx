"use client";

import { useEffect } from "react";
import { MapPanel } from "@/components/map/map-panel";
import { MapLegend } from "@/components/map/map-legend";
import { MapLayerControl } from "@/components/map/map-layer-control";
import { RoadDetailPanel } from "@/components/map/road-detail-panel";
import { VehiclePanel } from "@/components/shared/vehicle-panel";
import { useRoadDetail, useVehicleDetail } from "@/hooks/use-map-data";
import { useUiStore } from "@/store/ui.store";

export default function LiveMapPage() {
  const {
    mapLayers,
    selectedRoadId,
    setSelectedRoadId,
    selectedVehicleId,
    setSelectedVehicleId,
  } = useUiStore();

  const roadDetail = useRoadDetail(selectedRoadId);
  const vehicleDetail = useVehicleDetail(selectedVehicleId);

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
    <div className="relative h-[calc(100vh-3.5rem-1.5rem)] min-h-[520px] lg:-m-5 lg:h-[calc(100vh-3.5rem)]">
      <MapPanel
        layerVisibility={mapLayers}
        selectedRoadId={selectedRoadId}
        selectedVehicleId={selectedVehicleId}
        onSelectRoad={setSelectedRoadId}
        onSelectVehicle={setSelectedVehicleId}
        className="absolute inset-0 h-full lg:rounded-none lg:border-0"
      />

      {/* layer control */}
      <div className="absolute left-3 top-12 z-10 w-64 md:top-3 md:left-[128px]">
        <MapLayerControl />
      </div>

      {/* legend */}
      <div className="absolute bottom-3 left-3 z-10 hidden sm:block">
        <MapLegend />
      </div>

      {/* road detail panel */}
      {selectedRoadId && (
        <div className="absolute inset-x-3 bottom-3 top-14 z-20 animate-slide-in-right overflow-hidden rounded-sm border border-border bg-card shadow-overlay md:inset-x-auto md:bottom-3 md:right-3 md:top-3 md:w-[350px]">
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
        <div className="absolute inset-x-3 bottom-3 top-14 z-20 animate-slide-in-right overflow-y-auto scrollbar-thin rounded-sm border border-border bg-card shadow-overlay md:inset-x-auto md:bottom-3 md:right-3 md:top-3 md:w-[350px]">
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
  );
}
