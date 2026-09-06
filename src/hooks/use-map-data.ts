"use client";

import { useQuery } from "@tanstack/react-query";
import * as mapService from "@/services/map.service";
import { queryKeys } from "@/hooks/use-dashboard";
import * as aiService from "@/services/ai.service";
import { fetchRoadById } from "@/services/map.service";

export function useRoadFeatures() {
  return useQuery({ queryKey: queryKeys.roads, queryFn: mapService.fetchRoadFeatures });
}
export function useBridgeFeatures() {
  return useQuery({ queryKey: queryKeys.bridges, queryFn: mapService.fetchBridgeFeatures });
}
export function useVehicleFeatures() {
  return useQuery({
    queryKey: queryKeys.vehicles,
    queryFn: mapService.fetchVehicleFeatures,
    refetchInterval: 6_000,
  });
}
export function useZoneFeatures() {
  return useQuery({ queryKey: queryKeys.zones, queryFn: mapService.fetchZoneFeatures });
}
export function useIncidentFeatures() {
  return useQuery({ queryKey: queryKeys.incidents, queryFn: mapService.fetchIncidentFeatures });
}
export function useWeatherFeatures() {
  return useQuery({ queryKey: queryKeys.weather, queryFn: mapService.fetchWeatherFeatures });
}
export function useCorridorFeatures() {
  return useQuery({ queryKey: queryKeys.corridors, queryFn: mapService.fetchCorridorFeatures });
}
export function useEvacuationFeatures() {
  return useQuery({
    queryKey: queryKeys.evacuations,
    queryFn: mapService.fetchEvacuationFeatures,
  });
}

export function useVehicleDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.vehicle(id ?? "none"),
    queryFn: () => mapService.fetchVehicleById(id!),
    enabled: !!id,
    refetchInterval: 6_000,
  });
}

export function useRoadDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.road(id ?? "none"),
    queryFn: () => fetchRoadById(id!),
    enabled: !!id,
  });
}

export function usePrimaryInsight() {
  return useQuery({ queryKey: queryKeys.primaryInsight, queryFn: aiService.fetchPrimaryInsight });
}

export function useSecondaryInsights() {
  return useQuery({
    queryKey: queryKeys.secondaryInsights,
    queryFn: aiService.fetchSecondaryInsights,
  });
}
