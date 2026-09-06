// MapLibre style + paint constants for the NER command map.
// Uses a keyless CARTO dark raster basemap over a navy background so the map
// still renders (own GeoJSON only) if external tiles are unavailable.

import type { LngLat } from "@/data/road-geometry";

export const NER_BASE_STYLE = {
  version: 8 as const,
  sources: {
    basemap: {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    { id: "bg", type: "background" as const, paint: { "background-color": "#070C15" } },
    {
      id: "carto-dark",
      type: "raster" as const,
      source: "basemap",
      paint: { "raster-opacity": 0.85 },
    },
  ],
};

export const ROAD_COLOR_EXPR = [
  "match",
  ["get", "status"],
  "OPEN",
  "#22C55E",
  "PARTIAL",
  "#F59E0B",
  "BLOCKED",
  "#EF4444",
  "HIGH_RISK",
  "#F97316",
  "EMERGENCY",
  "#3B82F6",
  "#64748B",
] as unknown as maplibregl.ExpressionSpecification;

export const VEHICLE_COLOR_EXPR = [
  "match",
  ["get", "status"],
  "MOVING",
  "#22C55E",
  "DELAYED",
  "#F59E0B",
  "STOPPED",
  "#EF4444",
  "DELIVERED",
  "#3B82F6",
  "#64748B",
] as unknown as maplibregl.ExpressionSpecification;

export const SEVERITY_COLOR_EXPR = [
  "match",
  ["get", "severity"],
  "CRITICAL",
  "#EF4444",
  "HIGH",
  "#F97316",
  "MEDIUM",
  "#F59E0B",
  "LOW",
  "#38BDF8",
  "#64748B",
] as unknown as maplibregl.ExpressionSpecification;

export const ZONE_FILL_COLOR_EXPR = [
  "match",
  ["get", "kind"],
  "FLOOD",
  "#38BDF8",
  "LANDSLIDE",
  "#F97316",
  "#64748B",
] as unknown as maplibregl.ExpressionSpecification;

export const ZONE_FILL_OPACITY_EXPR = [
  "match",
  ["get", "level"],
  "CRITICAL",
  0.22,
  "HIGH",
  0.16,
  "MEDIUM",
  0.1,
  "LOW",
  0.06,
  0.08,
] as unknown as maplibregl.ExpressionSpecification;

export const BRIDGE_COLOR_EXPR = [
  "match",
  ["get", "status"],
  "OPEN",
  "#94A3B8",
  "RESTRICTED",
  "#F59E0B",
  "CLOSED",
  "#EF4444",
  "#64748B",
] as unknown as maplibregl.ExpressionSpecification;

export const WEATHER_COLOR_EXPR = [
  "match",
  ["get", "condition"],
  "HEAVY_RAIN",
  "#38BDF8",
  "RAIN",
  "#60A5FA",
  "STORM",
  "#818CF8",
  "FOG",
  "#CBD5E1",
  "CLEAR",
  "#22C55E",
  "#64748B",
] as unknown as maplibregl.ExpressionSpecification;

export const ROAD_WIDTH_EXPR = [
  "interpolate",
  ["linear"],
  ["zoom"],
  4,
  1,
  6,
  1.8,
  9,
  3.2,
  12,
  5,
] as unknown as maplibregl.ExpressionSpecification;

export type LngLatPair = LngLat;
