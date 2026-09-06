"use client";

import { useQuery } from "@tanstack/react-query";
import * as dashboardService from "@/services/dashboard.service";

export const queryKeys = {
  kpis: ["dashboard", "kpis"] as const,
  alerts: ["dashboard", "alerts"] as const,
  activity: ["dashboard", "activity"] as const,
  deliveryTrend: ["dashboard", "delivery-trend"] as const,
  notifications: ["dashboard", "notifications"] as const,
  roads: ["map", "roads"] as const,
  bridges: ["map", "bridges"] as const,
  vehicles: ["map", "vehicles"] as const,
  zones: ["map", "zones"] as const,
  incidents: ["map", "incidents"] as const,
  weather: ["map", "weather"] as const,
  corridors: ["map", "corridors"] as const,
  evacuations: ["map", "evacuations"] as const,
  primaryInsight: ["ai", "primary"] as const,
  secondaryInsights: ["ai", "secondary"] as const,
  vehicle: (id: string) => ["vehicles", id] as const,
  road: (id: string) => ["roads", id] as const,
};

export function useKpis() {
  return useQuery({
    queryKey: queryKeys.kpis,
    queryFn: dashboardService.fetchKpis,
    refetchInterval: 12_000,
  });
}

export function useCriticalAlerts() {
  return useQuery({
    queryKey: queryKeys.alerts,
    queryFn: dashboardService.fetchCriticalAlerts,
    refetchInterval: 20_000,
  });
}

export function useActivity() {
  return useQuery({
    queryKey: queryKeys.activity,
    queryFn: dashboardService.fetchActivity,
    refetchInterval: 30_000,
  });
}

export function useDeliveryTrend() {
  return useQuery({
    queryKey: queryKeys.deliveryTrend,
    queryFn: dashboardService.fetchDeliveryTrend,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: dashboardService.fetchNotifications,
  });
}
