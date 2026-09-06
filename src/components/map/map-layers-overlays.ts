// MapLibre overlay layers — bridges, incidents, weather, vehicles.

import {
  BRIDGE_COLOR_EXPR,
  SEVERITY_COLOR_EXPR,
  VEHICLE_COLOR_EXPR,
  WEATHER_COLOR_EXPR,
} from "@/components/map/map-style";
import { srcId } from "@/components/map/map-layers-core";
import type { Map as MlMap } from "maplibre-gl";

export function addOverlayLayers(map: MlMap) {
  // bridges
  map.addLayer({
    id: "bridges-halo",
    type: "circle",
    source: srcId("bridges"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 4.4, 9, 7.5],
      "circle-color": BRIDGE_COLOR_EXPR,
      "circle-opacity": 0.25,
    },
  });
  map.addLayer({
    id: "bridges-dot",
    type: "circle",
    source: srcId("bridges"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 2.6, 9, 4.4],
      "circle-color": BRIDGE_COLOR_EXPR,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#0B1220",
    },
  });

  // incidents (pulse halo + dot)
  map.addLayer({
    id: "incidents-halo",
    type: "circle",
    source: srcId("incidents"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 7, 9, 12],
      "circle-color": SEVERITY_COLOR_EXPR,
      "circle-opacity": 0.18,
    },
  });
  map.addLayer({
    id: "incidents-dot",
    type: "circle",
    source: srcId("incidents"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 3, 9, 5.5],
      "circle-color": SEVERITY_COLOR_EXPR,
      "circle-stroke-width": 1.2,
      "circle-stroke-color": "#0B1220",
    },
  });

  // weather stations
  map.addLayer({
    id: "weather-dot",
    type: "circle",
    source: srcId("weather"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 2.4, 9, 4],
      "circle-color": WEATHER_COLOR_EXPR,
      "circle-opacity": 0.85,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#0B1220",
    },
  });

  // vehicles
  map.addLayer({
    id: "vehicles-halo",
    type: "circle",
    source: srcId("vehicles"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 6.5, 9, 11],
      "circle-color": VEHICLE_COLOR_EXPR,
      "circle-opacity": 0.2,
    },
  });
  map.addLayer({
    id: "vehicles-dot",
    type: "circle",
    source: srcId("vehicles"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 3.2, 9, 5.5],
      "circle-color": VEHICLE_COLOR_EXPR,
      "circle-stroke-width": 1.4,
      "circle-stroke-color": "#F8FAFC",
    },
  });
  map.addLayer({
    id: "vehicles-selected",
    type: "circle",
    source: srcId("vehicles"),
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 7, 9, 12],
      "circle-color": "transparent",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#FFFFFF",
      "circle-stroke-opacity": 0.95,
    },
    filter: ["==", ["get", "vehicleId"], "__none__"],
  });
}
