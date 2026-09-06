// Dashboard service — KPI snapshot, critical alerts, activity feed,
// delivery analytics. Backend swap: GET /api/dashboard/*.

import { ACTIVITY, getKpiSnapshot, NOTIFICATIONS } from "@/data/dashboard";
import { INCIDENTS } from "@/data/incidents";
import { DELIVERY_TREND } from "@/data/analytics";
import { mockFetch } from "@/services/client";
import type { ActivityItem, DeliveryDayPoint, Kpi, NotificationItem } from "@/types";

export async function fetchKpis(): Promise<Kpi[]> {
  return mockFetch(getKpiSnapshot, { latency: [250, 600] });
}

export async function fetchCriticalAlerts() {
  return mockFetch(
    () =>
      [...INCIDENTS]
        .filter((i) => i.status !== "RESOLVED")
        .sort((a, b) => {
          const order = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 } as const;
          return order[a.severity] - order[b.severity] || b.reportedAt.localeCompare(a.reportedAt);
        }),
    { latency: [250, 600] },
  );
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  return mockFetch(() => [...ACTIVITY], { latency: [250, 600] });
}

export async function fetchDeliveryTrend(): Promise<DeliveryDayPoint[]> {
  return mockFetch(() => [...DELIVERY_TREND], { latency: [300, 700] });
}

export async function fetchNotifications(): Promise<NotificationItem[]> {
  return mockFetch(() => NOTIFICATIONS.map((n) => ({ ...n })), { latency: [150, 350] });
}
