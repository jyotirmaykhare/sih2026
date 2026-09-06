// Mock dashboard data — KPIs (with light live jitter), recent activity,
// and notification feed.

import { minutesAgo } from "@/lib/format";
import type { ActivityItem, Kpi, NotificationItem } from "@/types";

interface KpiSeed extends Kpi {
  jitter: number; // max random step per refresh (live feel)
}

const KPI_SEEDS: KpiSeed[] = [
  {
    id: "road-accessibility",
    label: "Road Accessibility",
    value: 84.2,
    format: "PCT",
    deltaPct: 2.1,
    hint: "good",
    caption: "of trunk network fully open",
    trend: [78, 79.5, 81, 80, 82.5, 83, 84.2],
    jitter: 0.3,
  },
  {
    id: "active-disruptions",
    label: "Active Disruptions",
    value: 14,
    format: "INT",
    deltaPct: -12.5,
    lowerIsBetter: true,
    hint: "warn",
    caption: "2 critical · 4 high · 8 monitored",
    trend: [19, 18, 17, 16, 15, 16, 14],
    jitter: 0.4,
  },
  {
    id: "vehicles-in-transit",
    label: "Vehicles in Transit",
    value: 412,
    format: "INT",
    deltaPct: 4.6,
    hint: "good",
    caption: "31 flagged at-risk · 2 holding",
    trend: [384, 391, 388, 402, 407, 409, 412],
    jitter: 3,
  },
  {
    id: "on-time-deliveries",
    label: "On-Time Deliveries",
    value: 87.5,
    format: "PCT",
    deltaPct: -0.8,
    lowerIsBetter: false,
    hint: "warn",
    caption: "trailing 24 h across all corridors",
    trend: [90.2, 89.5, 89.1, 88.4, 88.8, 88.1, 87.5],
    jitter: 0.2,
  },
];

/** Returns KPIs with a small random walk applied — simulates live refresh. */
export function getKpiSnapshot(): Kpi[] {
  return KPI_SEEDS.map((seed) => {
    const step = (Math.random() - 0.45) * seed.jitter;
    const value =
      seed.format === "INT"
        ? Math.max(0, Math.round(seed.value + step * 10) )
        : Math.round((seed.value + step) * 10) / 10;
    const trend = [...seed.trend.slice(1), value];
    const prev = seed.trend[seed.trend.length - 2] ?? seed.value;
    const deltaPct = prev === 0 ? seed.deltaPct : Math.round(((value - prev) / prev) * 1000) / 10;
    return { ...seed, value, trend, deltaPct };
  });
}

export const ACTIVITY: ActivityItem[] = [
  {
    id: "act-01",
    type: "REPORT_FILED",
    title: "Field report verified — NH-13 km 118",
    detail: "Fresh shoulder crack, 2.1 m, photographed by BRO team. Escalated to HIGH.",
    timestamp: minutesAgo(12).toISOString(),
    actor: "Field team NER-11",
  },
  {
    id: "act-02",
    type: "AI_FORECAST",
    title: "New landslide forecast issued",
    detail: "CGRID-Vision projects 78% disruption probability on NH-2 Kohima sector within 18–42 h.",
    timestamp: minutesAgo(19).toISOString(),
    actor: "AI Intelligence",
  },
  {
    id: "act-03",
    type: "ROAD_REOPENED",
    title: "NH-8 Churaibari waterlogging receding",
    detail: "Standing water down to 0.2 m; 9 t weight restriction remains in force.",
    timestamp: minutesAgo(34).toISOString(),
    actor: "Tripura transport cell",
  },
  {
    id: "act-04",
    type: "VEHICLE_DELIVERED",
    title: "SHP-9168 delivered at Itanagar Retail Hub",
    detail: "Vehicle AS-23-F-7712 arrived on schedule. POD captured.",
    timestamp: minutesAgo(52).toISOString(),
    actor: "Fleet telemetry",
  },
  {
    id: "act-05",
    type: "ALERT_ESCALATED",
    title: "Barak Bridge II elevated to HIGH",
    detail: "Scour inspection extended; old-bridge detour load-limited to 12 t.",
    timestamp: minutesAgo(75).toISOString(),
    actor: "NHIDCL bridge division",
  },
  {
    id: "act-06",
    type: "SYNC_COMPLETED",
    title: "4 field reports synced from offline queue",
    detail: "Reports from Jaintia Hills unit reached the platform after connectivity resumed.",
    timestamp: minutesAgo(96).toISOString(),
    actor: "Field reporting",
  },
  {
    id: "act-07",
    type: "REPORT_FILED",
    title: "Citizen corridor report — NH-27 Sonapur",
    detail: "Debris reported on carriageway; corroborated by NHIDCL patrol imagery.",
    timestamp: minutesAgo(128).toISOString(),
    actor: "Corridor watcher net",
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "ntf-01",
    title: "NH-2 blocked at Mao Gate",
    body: "Landslide confirmed. 23 vehicles affected. Reroute via EC-02.",
    severity: "CRITICAL",
    time: minutesAgo(14).toISOString(),
    read: false,
  },
  {
    id: "ntf-02",
    title: "Imphal–Jiribam link severed",
    body: "Flash flood at Barak crossing. Air-bridge logistics recommended.",
    severity: "CRITICAL",
    time: minutesAgo(26).toISOString(),
    read: false,
  },
  {
    id: "ntf-03",
    title: "Landslide risk raised to 78%",
    body: "CGRID-Vision window opens in 18 h on the Kohima sector.",
    severity: "HIGH",
    time: minutesAgo(19).toISOString(),
    read: false,
  },
  {
    id: "ntf-04",
    title: "Sela sector convoy window",
    body: "NH-13 restricted to 06:00–11:00 transits until further notice.",
    severity: "MEDIUM",
    time: minutesAgo(95).toISOString(),
    read: true,
  },
  {
    id: "ntf-05",
    title: "Weekly regional digest ready",
    body: "NER logistics performance summary is available in Analytics.",
    severity: "INFO",
    time: minutesAgo(240).toISOString(),
    read: true,
  },
];
