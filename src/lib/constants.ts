import type { LayerId, RoadStatus, Severity, Vehicle } from "@/types";

// ------------------------------ Map geometry --------------------------------

/** Bounding box covering the eight North Eastern Region states. */
export const NER_BOUNDS: [[number, number], [number, number]] = [
  [88.1, 21.9],
  [97.6, 28.7],
];

export const NER_CENTER: [number, number] = [92.9, 25.6];

export const MAP_MAX_BOUNDS: [[number, number], [number, number]] = [
  [85.5, 20.0],
  [99.5, 30.5],
];

// --------------------------------- Palette ----------------------------------

export const ROAD_STATUS_COLORS: Record<RoadStatus, string> = {
  OPEN: "#22C55E",
  PARTIAL: "#F59E0B",
  BLOCKED: "#EF4444",
  HIGH_RISK: "#F97316",
  EMERGENCY: "#3B82F6",
};

export const SEVERITY_COLORS: Record<Severity, string> = {
  CRITICAL: "#EF4444",
  HIGH: "#F97316",
  MEDIUM: "#F59E0B",
  LOW: "#38BDF8",
};

export const VEHICLE_STATUS_COLORS: Record<Vehicle["status"], string> = {
  MOVING: "#22C55E",
  DELAYED: "#F59E0B",
  STOPPED: "#EF4444",
  DELIVERED: "#3B82F6",
};

// ------------------------------ Map layer registry ---------------------------

export interface LayerDef {
  id: LayerId;
  label: string;
  group: "TRANSPORT" | "HAZARD" | "EMERGENCY";
  description: string;
  defaultOn: boolean;
}

export const LAYER_DEFS: LayerDef[] = [
  {
    id: "roads",
    label: "Road Network",
    group: "TRANSPORT",
    description: "National & state highways, status-coloured",
    defaultOn: true,
  },
  {
    id: "bridges",
    label: "Bridges",
    group: "TRANSPORT",
    description: "Major bridge assets & inspection state",
    defaultOn: true,
  },
  {
    id: "vehicles",
    label: "Vehicles",
    group: "TRANSPORT",
    description: "Live fleet positions (GPS feed)",
    defaultOn: true,
  },
  {
    id: "traffic",
    label: "Traffic Density",
    group: "TRANSPORT",
    description: "Congestion heat overlay on corridors",
    defaultOn: false,
  },
  {
    id: "weather",
    label: "Weather Stations",
    group: "HAZARD",
    description: "IMD station observations & rainfall",
    defaultOn: true,
  },
  {
    id: "floodRisk",
    label: "Flood Risk",
    group: "HAZARD",
    description: "Modelled flood-prone zones",
    defaultOn: true,
  },
  {
    id: "landslideRisk",
    label: "Landslide Risk",
    group: "HAZARD",
    description: "Terrain susceptibility polygons",
    defaultOn: true,
  },
  {
    id: "incidents",
    label: "Incident Reports",
    group: "HAZARD",
    description: "Field-reported & verified incidents",
    defaultOn: true,
  },
  {
    id: "emergencyCorridors",
    label: "Emergency Corridors",
    group: "EMERGENCY",
    description: "Priority relief & evacuation corridors",
    defaultOn: true,
  },
  {
    id: "evacuationRoutes",
    label: "Evacuation Routes",
    group: "EMERGENCY",
    description: "Designated evacuation alignments",
    defaultOn: false,
  },
];

export function defaultLayerVisibility(): Record<LayerId, boolean> {
  const out = {} as Record<LayerId, boolean>;
  for (const def of LAYER_DEFS) out[def.id] = def.defaultOn;
  return out;
}

// --------------------------------- Misc -------------------------------------

export const DEMO_PASSWORD = "grid2026";
export const QUERY_STALE_MS = 30_000;
