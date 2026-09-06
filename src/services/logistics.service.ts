// Logistics service — roads, vehicles, shipments, bridges.
// Backend swap: GET /api/roads, GET /api/vehicles, GET /api/shipments.

import { BRIDGES } from "@/data/bridges";
import { FLEET, getVehicle } from "@/data/fleet";
import { ROADS, getRoad } from "@/data/roads";
import { SHIPMENTS } from "@/data/shipments";
import { mockFetch } from "@/services/client";
import type { BridgeInfo, Shipment, Vehicle } from "@/types";

export async function fetchRoads() {
  return mockFetch(() => [...ROADS], { latency: [250, 600] });
}
export async function fetchRoadDetail(id: string) {
  return mockFetch(() => getRoad(id) ?? null, { latency: [150, 350] });
}
export async function fetchVehicles(): Promise<Vehicle[]> {
  return mockFetch(() => [...FLEET], { latency: [250, 600] });
}
export async function fetchVehicleDetail(id: string): Promise<Vehicle | null> {
  return mockFetch(() => getVehicle(id) ?? null, { latency: [150, 350] });
}
export async function fetchShipments(): Promise<Shipment[]> {
  return mockFetch(() => [...SHIPMENTS], { latency: [250, 600] });
}
export async function fetchBridges(): Promise<BridgeInfo[]> {
  return mockFetch(() => [...BRIDGES], { latency: [250, 600] });
}
