// Map data / visibility / selection helpers for the NER map.

import { srcId } from "@/components/map/map-layers-core";
import type { Map as MlMap } from "maplibre-gl";
import type { LineFeature, PointFeature, PolygonFeature } from "@/services/geo-types";
import type { LayerId } from "@/types";

export interface MapDataBundle {
  roads: LineFeature[];
  bridges: PointFeature[];
  vehicles: PointFeature[];
  zones: PolygonFeature[];
  incidents: PointFeature[];
  weather: PointFeature[];
  corridors: LineFeature[];
  evacuations: LineFeature[];
}

function fc(features: unknown[]) {
  return { type: "FeatureCollection", features } as never;
}

export function applyData(map: MlMap, d: MapDataBundle) {
  for (const name of Object.keys(d) as (keyof MapDataBundle)[]) {
    const source = map.getSource(srcId(name)) as maplibregl.GeoJSONSource | undefined;
    source?.setData(fc(d[name]));
  }
}

export const VIS_MAP: Record<LayerId, string[]> = {
  roads: ["roads-casing", "roads-line", "roads-selected"],
  bridges: ["bridges-halo", "bridges-dot"],
  vehicles: ["vehicles-halo", "vehicles-dot", "vehicles-selected"],
  traffic: ["traffic-line"],
  weather: ["weather-dot"],
  floodRisk: ["zones-fill", "zones-outline"],
  landslideRisk: ["zones-fill", "zones-outline"],
  incidents: ["incidents-halo", "incidents-dot"],
  emergencyCorridors: ["corridors-glow", "corridors-line"],
  evacuationRoutes: ["evacuations-line"],
};

const ZONE_KIND_FILTER: Partial<Record<LayerId, unknown>> = {
  floodRisk: ["==", ["get", "kind"], "FLOOD"],
  landslideRisk: ["==", ["get", "kind"], "LANDSLIDE"],
};

export function applyVisibility(map: MlMap, vis: Record<LayerId, boolean>) {
  for (const [layerId, on] of Object.entries(vis)) {
    for (const mlLayer of VIS_MAP[layerId as LayerId] ?? []) {
      if (map.getLayer(mlLayer)) {
        map.setLayoutProperty(mlLayer, "visibility", on ? "visible" : "none");
      }
    }
    // zone polygons are shared by flood & landslide toggles — resolve filter
    if (layerId === "floodRisk" || layerId === "landslideRisk") {
      const otherKey = (layerId === "floodRisk" ? "landslideRisk" : "floodRisk") as LayerId;
      let filter: unknown;
      if (vis[layerId] && vis[otherKey]) filter = null;
      else if (vis[layerId]) filter = ZONE_KIND_FILTER[layerId];
      else if (vis[otherKey]) filter = ZONE_KIND_FILTER[otherKey];
      else filter = ["==", ["get", "kind"], "__none__"];
      for (const mlLayer of ["zones-fill", "zones-outline"]) {
        if (map.getLayer(mlLayer)) map.setFilter(mlLayer, filter as never);
      }
    }
  }
}

export function applySelection(map: MlMap, roadId: string | null, vehicleId: string | null) {
  if (map.getLayer("roads-selected")) {
    map.setFilter("roads-selected", ["==", ["get", "roadId"], roadId ?? "__none__"] as never);
  }
  if (map.getLayer("vehicles-selected")) {
    map.setFilter("vehicles-selected", ["==", ["get", "vehicleId"], vehicleId ?? "__none__"] as never);
  }
}
