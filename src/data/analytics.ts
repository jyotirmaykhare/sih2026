// Mock analytics series — Regional Analytics module (Recharts-ready).

import type {
  AccessibilityPoint,
  DeliveryDayPoint,
  DistrictImpact,
  RecoveryPoint,
  ShortagePoint,
  UtilizationPoint,
  WeatherDisruptionPoint,
} from "@/types";

export const DELIVERY_TREND: DeliveryDayPoint[] = [
  { day: "24 Aug", onTimePct: 91.2, avgDelayMin: 42, deliveries: 128 },
  { day: "25 Aug", onTimePct: 90.4, avgDelayMin: 45, deliveries: 134 },
  { day: "26 Aug", onTimePct: 88.1, avgDelayMin: 58, deliveries: 121 },
  { day: "27 Aug", onTimePct: 86.7, avgDelayMin: 66, deliveries: 117 },
  { day: "28 Aug", onTimePct: 89.0, avgDelayMin: 51, deliveries: 139 },
  { day: "29 Aug", onTimePct: 90.3, avgDelayMin: 47, deliveries: 142 },
  { day: "30 Aug", onTimePct: 87.6, avgDelayMin: 62, deliveries: 126 },
  { day: "31 Aug", onTimePct: 85.9, avgDelayMin: 71, deliveries: 119 },
  { day: "01 Sep", onTimePct: 84.2, avgDelayMin: 79, deliveries: 108 },
  { day: "02 Sep", onTimePct: 86.8, avgDelayMin: 64, deliveries: 131 },
  { day: "03 Sep", onTimePct: 88.5, avgDelayMin: 55, deliveries: 137 },
  { day: "04 Sep", onTimePct: 89.4, avgDelayMin: 49, deliveries: 141 },
  { day: "05 Sep", onTimePct: 88.1, avgDelayMin: 58, deliveries: 133 },
  { day: "06 Sep", onTimePct: 87.5, avgDelayMin: 61, deliveries: 127 },
];

export const ACCESSIBILITY_TREND: AccessibilityPoint[] = [
  { day: "Wk 23", accessibilityPct: 92.1, disruptions: 9 },
  { day: "Wk 24", accessibilityPct: 91.4, disruptions: 11 },
  { day: "Wk 25", accessibilityPct: 89.0, disruptions: 14 },
  { day: "Wk 26", accessibilityPct: 86.2, disruptions: 19 },
  { day: "Wk 27", accessibilityPct: 82.7, disruptions: 24 },
  { day: "Wk 28", accessibilityPct: 80.9, disruptions: 28 },
  { day: "Wk 29", accessibilityPct: 79.8, disruptions: 26 },
  { day: "Wk 30", accessibilityPct: 81.5, disruptions: 22 },
  { day: "Wk 31", accessibilityPct: 83.4, disruptions: 18 },
  { day: "Wk 32", accessibilityPct: 84.0, disruptions: 16 },
  { day: "Wk 33", accessibilityPct: 83.2, disruptions: 17 },
  { day: "Wk 34", accessibilityPct: 84.2, disruptions: 14 },
];

export const DISTRICT_IMPACT: DistrictImpact[] = [
  { district: "Senapati", state: "Manipur", disruptionDays: 11, avgDelayMin: 240 },
  { district: "Cachar", state: "Assam", disruptionDays: 9, avgDelayMin: 132 },
  { district: "East Jaintia Hills", state: "Meghalaya", disruptionDays: 8, avgDelayMin: 97 },
  { district: "Tawang", state: "Arunachal Pradesh", disruptionDays: 7, avgDelayMin: 185 },
  { district: "Kolasib", state: "Mizoram", disruptionDays: 6, avgDelayMin: 88 },
  { district: "Dhalai", state: "Tripura", disruptionDays: 5, avgDelayMin: 64 },
  { district: "East Sikkim", state: "Sikkim", disruptionDays: 5, avgDelayMin: 79 },
  { district: "Kamrup", state: "Assam", disruptionDays: 4, avgDelayMin: 42 },
];

export const RECOVERY_TIME: RecoveryPoint[] = [
  { severity: "LOW", avgHours: 3.2, targetHours: 4 },
  { severity: "MEDIUM", avgHours: 7.8, targetHours: 8 },
  { severity: "HIGH", avgHours: 19.4, targetHours: 16 },
  { severity: "CRITICAL", avgHours: 41.6, targetHours: 24 },
];

export const SUPPLY_SHORTAGES: ShortagePoint[] = [
  { month: "Oct", incidents: 3 },
  { month: "Nov", incidents: 2 },
  { month: "Dec", incidents: 5 },
  { month: "Jan", incidents: 4 },
  { month: "Feb", incidents: 3 },
  { month: "Mar", incidents: 4 },
  { month: "Apr", incidents: 6 },
  { month: "May", incidents: 7 },
  { month: "Jun", incidents: 9 },
  { month: "Jul", incidents: 12 },
  { month: "Aug", incidents: 11 },
  { month: "Sep", incidents: 8 },
];

export const VEHICLE_UTILIZATION: UtilizationPoint[] = [
  { category: "Trucks", utilizationPct: 78.4, fleet: 236 },
  { category: "Trailers", utilizationPct: 71.2, fleet: 58 },
  { category: "Tankers", utilizationPct: 83.6, fleet: 71 },
  { category: "LGVs", utilizationPct: 64.9, fleet: 47 },
];

export const WEATHER_VS_DISRUPTIONS: WeatherDisruptionPoint[] = [
  { condition: "Heavy rain", disruptions: 42, roadClosures: 11 },
  { condition: "Moderate rain", disruptions: 27, roadClosures: 5 },
  { condition: "Fog", disruptions: 16, roadClosures: 2 },
  { condition: "Heat wave", disruptions: 6, roadClosures: 1 },
  { condition: "Storm", disruptions: 13, roadClosures: 4 },
  { condition: "Snow", disruptions: 9, roadClosures: 5 },
];
