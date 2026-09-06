// Analytics service — regional analytics module. Backend swap:
// GET /api/analytics/:series.

import {
  ACCESSIBILITY_TREND,
  DELIVERY_TREND,
  DISTRICT_IMPACT,
  RECOVERY_TIME,
  SUPPLY_SHORTAGES,
  VEHICLE_UTILIZATION,
  WEATHER_VS_DISRUPTIONS,
} from "@/data/analytics";
import { mockFetch } from "@/services/client";
import type {
  AccessibilityPoint,
  DeliveryDayPoint,
  DistrictImpact,
  RecoveryPoint,
  ShortagePoint,
  UtilizationPoint,
  WeatherDisruptionPoint,
} from "@/types";

export async function fetchDeliveryTrend(): Promise<DeliveryDayPoint[]> {
  return mockFetch(() => [...DELIVERY_TREND], { latency: [300, 700] });
}
export async function fetchAccessibilityTrend(): Promise<AccessibilityPoint[]> {
  return mockFetch(() => [...ACCESSIBILITY_TREND], { latency: [300, 700] });
}
export async function fetchDistrictImpact(): Promise<DistrictImpact[]> {
  return mockFetch(
    () => [...DISTRICT_IMPACT].sort((a, b) => b.disruptionDays - a.disruptionDays),
    { latency: [300, 700] },
  );
}
export async function fetchRecoveryTime(): Promise<RecoveryPoint[]> {
  return mockFetch(() => [...RECOVERY_TIME], { latency: [300, 700] });
}
export async function fetchSupplyShortages(): Promise<ShortagePoint[]> {
  return mockFetch(() => [...SUPPLY_SHORTAGES], { latency: [300, 700] });
}
export async function fetchVehicleUtilization(): Promise<UtilizationPoint[]> {
  return mockFetch(() => [...VEHICLE_UTILIZATION], { latency: [300, 700] });
}
export async function fetchWeatherDisruptions(): Promise<WeatherDisruptionPoint[]> {
  return mockFetch(() => [...WEATHER_VS_DISRUPTIONS], { latency: [300, 700] });
}
