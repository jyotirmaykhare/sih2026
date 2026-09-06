// Live fleet simulation — advances the mock fleet each tick so the map and
// tracking views feel live. Backend swap: the vehicle position stream comes
// from the GPS ingestion API instead.

import { FLEET } from "@/data/fleet";
import { mockFetch } from "@/services/client";
import type { PointFeature } from "@/services/geo-types";
import { clamp } from "@/lib/format";
import type { Vehicle } from "@/types";

let lastTick = 0;

function tickFleet(): Vehicle[] {
  const now = Date.now();
  if (now - lastTick >= 4000) {
    lastTick = now;
    for (const v of FLEET) {
      if (v.status === "DELIVERED") continue;
      if (v.status === "MOVING") {
        const rad = (v.headingDeg * Math.PI) / 180;
        const stepKm = (v.speedKph * 4) / 3600; // 4 s of simulated travel
        const dLat = (stepKm / 111) * Math.cos(rad);
        const dLng =
          (stepKm / (111 * Math.cos((v.position.lat * Math.PI) / 180))) * Math.sin(rad);
        v.position.lat = clamp(v.position.lat + dLat, 21.9, 28.6);
        v.position.lng = clamp(v.position.lng + dLng, 88.2, 97.5);
        v.speedKph = clamp(v.speedKph + (Math.random() - 0.5) * 6, 8, 65);
        v.headingDeg = (v.headingDeg + (Math.random() - 0.5) * 24 + 360) % 360;
        v.distanceCoveredKm = Math.round((v.distanceCoveredKm + stepKm) * 10) / 10;
        if (Math.random() < 0.01) v.status = "DELAYED";
      } else if (v.status === "DELAYED" && Math.random() < 0.05) {
        v.status = "MOVING";
      }
      v.lastGpsUpdate = new Date().toISOString();
    }
  }
  return FLEET;
}

export function currentFleet(): Vehicle[] {
  return tickFleet();
}

export async function fetchVehicleFeatures(): Promise<PointFeature[]> {
  return mockFetch(
    () =>
      tickFleet()
        .filter((v) => v.status !== "DELIVERED")
        .map((v) => ({
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [v.position.lng, v.position.lat] as [number, number],
          },
          properties: {
            vehicleId: v.id,
            registration: v.registration,
            status: v.status,
            speedKph: v.speedKph,
            etaStatus: v.etaStatus,
            riskScore: v.riskScore,
          },
        })),
    { latency: [120, 300] },
  );
}

export async function fetchVehicleById(id: string): Promise<Vehicle | null> {
  return mockFetch(() => tickFleet().find((v) => v.id === id) ?? null, { latency: [150, 350] });
}
