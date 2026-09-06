// Minimal GeoJSON feature types used by the GIS layer builders.

import type { LngLat } from "@/data/road-geometry";

export interface PointFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: Record<string, unknown>;
}
export interface LineFeature {
  type: "Feature";
  geometry: { type: "LineString"; coordinates: LngLat[] };
  properties: Record<string, unknown>;
}
export interface PolygonFeature {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: LngLat[][] };
  properties: Record<string, unknown>;
}
