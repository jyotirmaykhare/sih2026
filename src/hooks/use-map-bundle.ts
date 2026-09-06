"use client";

import { useMemo } from "react";
import {
  useBridgeFeatures,
  useCorridorFeatures,
  useEvacuationFeatures,
  useIncidentFeatures,
  useRoadFeatures,
  useVehicleFeatures,
  useWeatherFeatures,
  useZoneFeatures,
} from "@/hooks/use-map-data";
import type { MapDataBundle } from "@/components/map/map-state";

/**
 * Aggregates all GIS layer queries into a single bundle for the map engine.
 * Static layers stay cached; the vehicle layer refetches on a live interval.
 */
export function useMapBundle(): MapDataBundle {
  const roads = useRoadFeatures();
  const bridges = useBridgeFeatures();
  const vehicles = useVehicleFeatures();
  const zones = useZoneFeatures();
  const incidents = useIncidentFeatures();
  const weather = useWeatherFeatures();
  const corridors = useCorridorFeatures();
  const evacuations = useEvacuationFeatures();

  return useMemo(
    () => ({
      roads: roads.data ?? [],
      bridges: bridges.data ?? [],
      vehicles: vehicles.data ?? [],
      zones: zones.data ?? [],
      incidents: incidents.data ?? [],
      weather: weather.data ?? [],
      corridors: corridors.data ?? [],
      evacuations: evacuations.data ?? [],
    }),
    [
      roads.data,
      bridges.data,
      vehicles.data,
      zones.data,
      incidents.data,
      weather.data,
      corridors.data,
      evacuations.data,
    ],
  );
}
