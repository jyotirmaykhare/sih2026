"use client";

import dynamic from "next/dynamic";
import { Satellite } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMapBundle } from "@/hooks/use-map-bundle";
import type { LayerId } from "@/types";

const NerMap = dynamic(() => import("@/components/map/ner-map"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background/40">
      <div className="w-full max-w-sm space-y-3 p-6">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <p className="pt-1 text-center text-[11px] text-muted-foreground">
          Initialising regional GIS layers…
        </p>
      </div>
    </div>
  );
}

export function MapPanel({
  layerVisibility,
  selectedRoadId,
  selectedVehicleId,
  onSelectRoad,
  onSelectVehicle,
  className,
  ariaLabel = "NER regional map",
}: {
  layerVisibility: Record<LayerId, boolean>;
  selectedRoadId: string | null;
  selectedVehicleId: string | null;
  onSelectRoad: (roadId: string) => void;
  onSelectVehicle: (vehicleId: string) => void;
  className?: string;
  ariaLabel?: string;
}) {
  const bundle = useMapBundle();

  return (
    <div
      className={cn("relative overflow-hidden rounded-sm border border-border bg-background/40", className)}
      aria-label={ariaLabel}
    >
      <NerMap
        data={bundle}
        layerVisibility={layerVisibility}
        selectedRoadId={selectedRoadId}
        selectedVehicleId={selectedVehicleId}
        onSelectRoad={onSelectRoad}
        onSelectVehicle={onSelectVehicle}
        className="absolute inset-0"
      />

      {/* live indicator */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-sm border border-border bg-background/85 px-2.5 py-1.5 shadow-panel backdrop-blur-sm">
        <Satellite className="h-3.5 w-3.5 text-emerald-400" />
        <span className="micro-label text-foreground">
          Live GIS feed
        </span>
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}
