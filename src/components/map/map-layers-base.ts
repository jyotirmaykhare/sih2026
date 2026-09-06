// MapLibre base layers — sources + zones/evacuation/corridors/roads/traffic.

import {
  ROAD_COLOR_EXPR,
  ROAD_WIDTH_EXPR,
  ZONE_FILL_COLOR_EXPR,
  ZONE_FILL_OPACITY_EXPR,
} from "@/components/map/map-style";
import { srcId } from "@/components/map/map-layers-core";
import type { Map as MlMap } from "maplibre-gl";

export const GEOJSON_SOURCE_NAMES = [
  "roads",
  "bridges",
  "vehicles",
  "zones",
  "incidents",
  "weather",
  "corridors",
  "evacuations",
] as const;

export function addBaseLayers(map: MlMap) {
  for (const name of GEOJSON_SOURCE_NAMES) {
    map.addSource(srcId(name), {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] } as never,
    });
  }

  // hazard zones
  map.addLayer({
    id: "zones-fill",
    type: "fill",
    source: srcId("zones"),
    paint: { "fill-color": ZONE_FILL_COLOR_EXPR, "fill-opacity": ZONE_FILL_OPACITY_EXPR },
  });
  map.addLayer({
    id: "zones-outline",
    type: "line",
    source: srcId("zones"),
    paint: {
      "line-color": ZONE_FILL_COLOR_EXPR,
      "line-opacity": 0.65,
      "line-width": 1,
      "line-dasharray": [3, 2],
    },
  });

  // evacuation routes
  map.addLayer({
    id: "evacuations-line",
    type: "line",
    source: srcId("evacuations"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": "#2DD4BF",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1.6, 9, 2.8],
      "line-dasharray": [3, 1.6],
    },
  });

  // emergency corridors
  map.addLayer({
    id: "corridors-glow",
    type: "line",
    source: srcId("corridors"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": "#3B82F6",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 5, 9, 9],
      "line-opacity": 0.25,
      "line-blur": 2,
    },
  });
  map.addLayer({
    id: "corridors-line",
    type: "line",
    source: srcId("corridors"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#3B82F6", "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.2, 9, 3.6] },
  });

  // roads
  map.addLayer({
    id: "roads-casing",
    type: "line",
    source: srcId("roads"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": "#0B1220",
      "line-opacity": 0.7,
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2, 6, 3.2, 9, 5, 12, 7.5],
    },
  });
  map.addLayer({
    id: "roads-line",
    type: "line",
    source: srcId("roads"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": ROAD_COLOR_EXPR, "line-width": ROAD_WIDTH_EXPR },
  });

  // traffic congestion overlay (toggleable)
  map.addLayer({
    id: "traffic-line",
    type: "line",
    source: srcId("roads"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": "#FB923C",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 3, 9, 5.5],
      "line-opacity": [
        "case",
        [">=", ["get", "trafficLevel"], 5],
        0.5,
        ["==", ["get", "trafficLevel"], 4],
        0.32,
        0,
      ],
    },
  });

  // selected road highlight
  map.addLayer({
    id: "roads-selected",
    type: "line",
    source: srcId("roads"),
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": "#FFFFFF",
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 2.6, 9, 4.4],
      "line-opacity": 0.9,
    },
    filter: ["==", ["get", "roadId"], "__none__"],
  });
}
