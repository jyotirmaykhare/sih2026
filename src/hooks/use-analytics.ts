"use client";

import { useQuery } from "@tanstack/react-query";
import * as analyticsService from "@/services/analytics.service";

export function useAccessibilityTrend() {
  return useQuery({ queryKey: ["analytics", "accessibility"], queryFn: analyticsService.fetchAccessibilityTrend });
}
export function useDeliveryDelay() {
  return useQuery({ queryKey: ["analytics", "delivery-delay"], queryFn: analyticsService.fetchDeliveryTrend });
}
export function useDisruptionsSeries() {
  return useQuery({ queryKey: ["analytics", "district-impact"], queryFn: analyticsService.fetchDistrictImpact });
}
export function useRecoveryTime() {
  return useQuery({ queryKey: ["analytics", "recovery"], queryFn: analyticsService.fetchRecoveryTime });
}
export function useSupplyShortages() {
  return useQuery({ queryKey: ["analytics", "shortages"], queryFn: analyticsService.fetchSupplyShortages });
}
export function useVehicleUtilization() {
  return useQuery({ queryKey: ["analytics", "utilization"], queryFn: analyticsService.fetchVehicleUtilization });
}
export function useWeatherDisruptions() {
  return useQuery({ queryKey: ["analytics", "weather"], queryFn: analyticsService.fetchWeatherDisruptions });
}
