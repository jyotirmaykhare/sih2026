// Map service — builds GeoJSON layers for the NER GIS map.
// Backend swap: each getter maps 1:1 to an API endpoint (e.g. /api/map/roads).

import { BRIDGES } from "@/data/bridges";
import { EVACUATION_ROUTES, HAZARD_ZONES, WEATHER_STATIONS } from "@/data/geo";
import { INCIDENTS } from "@/data/incidents";
import { ROAD_GEOMETRY } from "@/data/road-geometry";
import { ROADS } from "@/data/roads";
import { mockFetch } from "@/services/client";
import { fetchVehicleFeatures, fetchVehicleById } from "@/services/fleet-sim";
import type { LineFeature, PointFeature, PolygonFeature } from "@/services/geo-types";
import type { RoadInfo, RoadStatus, Vehicle } from "@/types";

export { fetchVehicleFeatures, fetchVehicleById };

const STATUS_ORDER: RoadStatus[] = ["OPEN", "PARTIAL", "BLOCKED", "HIGH_RISK", "EMERGENCY"];

export function getRoadFeatures(): LineFeature[] {
  return ROADS.map((road) => ({
    type: "Feature" as const,
    geometry: { type: "LineString" as const, coordinates: ROAD_GEOMETRY[road.id] ?? [] },
    properties: {
      roadId: road.id,
      routeNumber: road.routeNumber,
      name: road.name,
      corridor: road.corridor,
      status: road.status,
      statusOrder: STATUS_ORDER.indexOf(road.status),
      riskPct: road.riskPct,
      estimatedDelayMin: road.estimatedDelayMin,
      trafficLevel: road.trafficLevel,
    },
  }));
}

export async function fetchRoadFeatures(): Promise<LineFeature[]> {
  return mockFetch(getRoadFeatures, { latency: [200, 500] });
}

export async function fetchRoadById(id: string): Promise<RoadInfo | null> {
  return mockFetch(() => ROADS.find((r) => r.id === id) ?? null, { latency: [150, 350] });
}

export async function fetchBridgeFeatures(): Promise<PointFeature[]> {
  return mockFetch(
    () =>
      BRIDGES.map((b) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [b.position.lng, b.position.lat] as [number, number],
        },
        properties: { bridgeId: b.id, name: b.name, status: b.status, carries: b.carries },
      })),
    { latency: [200, 450] },
  );
}

export async function fetchZoneFeatures(): Promise<PolygonFeature[]> {
  return mockFetch(
    () =>
      HAZARD_ZONES.map((z) => ({
        type: "Feature" as const,
        geometry: { type: "Polygon" as const, coordinates: z.rings },
        properties: { kind: z.kind, name: z.name, riskPct: z.riskPct, level: z.level },
      })),
    { latency: [200, 450] },
  );
}

export async function fetchIncidentFeatures(): Promise<PointFeature[]> {
  return mockFetch(
    () =>
      INCIDENTS.filter((i) => i.status !== "RESOLVED").map((i) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [i.position.lng, i.position.lat] as [number, number],
        },
        properties: { incidentId: i.id, severity: i.severity, type: i.type, title: i.title },
      })),
    { latency: [200, 450] },
  );
}

export async function fetchWeatherFeatures(): Promise<PointFeature[]> {
  return mockFetch(
    () =>
      WEATHER_STATIONS.map((w) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: w.position },
        properties: {
          stationId: w.id,
          station: w.station,
          condition: w.condition,
          rainfallMm: w.rainfallMm,
        },
      })),
    { latency: [200, 450] },
  );
}

export async function fetchCorridorFeatures(): Promise<LineFeature[]> {
  return mockFetch(() => getRoadFeatures().filter((f) => f.properties.status === "EMERGENCY"), {
    latency: [200, 450],
  });
}

export async function fetchEvacuationFeatures(): Promise<LineFeature[]> {
  return mockFetch(
    () =>
      EVACUATION_ROUTES.map((e) => ({
        type: "Feature" as const,
        geometry: { type: "LineString" as const, coordinates: e.path },
        properties: { name: e.name },
      })),
    { latency: [200, 450] },
  );
}
