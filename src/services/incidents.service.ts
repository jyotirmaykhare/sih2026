// Incident / alert service — shared by the Critical Alerts panel, map
// incident markers and (in a later phase) the Disruption Center.
// Backend swap: GET /api/incidents, POST /api/reports.

import { INCIDENTS } from "@/data/incidents";
import { mockFetch } from "@/services/client";
import type { Incident, Severity } from "@/types";

export async function fetchIncidents(): Promise<Incident[]> {
  return mockFetch(() => [...INCIDENTS], { latency: [250, 600] });
}

export async function fetchIncidentsBySeverity(severity: Severity): Promise<Incident[]> {
  return mockFetch(() => INCIDENTS.filter((i) => i.severity === severity), {
    latency: [200, 450],
  });
}

export async function fetchIncidentById(id: string): Promise<Incident | null> {
  return mockFetch(() => INCIDENTS.find((i) => i.id === id) ?? null, { latency: [150, 350] });
}
