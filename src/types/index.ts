// ============================================================================
// NER COMMANDGRID — Core domain types
// All module data flows through these interfaces. Replace mock services with
// real API responses shaped to these types (see src/services/client.ts).
// ============================================================================

// ---------------------------------- Auth -----------------------------------

export type Role =
  | "LOGISTICS_OFFICER"
  | "DISTRICT_OFFICER"
  | "EMERGENCY_COMMANDER"
  | "ADMINISTRATOR";

export interface User {
  id: string;
  officialId: string;
  name: string;
  role: Role;
  designation: string;
  region: string;
  initials: string;
}

export const EMERGENCY_ROLES: Role[] = ["EMERGENCY_COMMANDER", "ADMINISTRATOR"];
export const ROLE_LABELS: Record<Role, string> = {
  LOGISTICS_OFFICER: "Logistics Officer",
  DISTRICT_OFFICER: "District Officer",
  EMERGENCY_COMMANDER: "Emergency Commander",
  ADMINISTRATOR: "Administrator",
};

// --------------------------------- Map / roads ------------------------------

export type RoadStatus = "OPEN" | "PARTIAL" | "BLOCKED" | "HIGH_RISK" | "EMERGENCY";

export const ROAD_STATUS_LABELS: Record<RoadStatus, string> = {
  OPEN: "Open",
  PARTIAL: "Partially affected",
  BLOCKED: "Blocked",
  HIGH_RISK: "High risk",
  EMERGENCY: "Emergency route",
};

export interface RoadInfo {
  id: string;
  routeNumber: string;
  name: string;
  corridor: string;
  status: RoadStatus;
  cause: string | null;
  riskPct: number;
  weatherRisk: string;
  condition: string;
  estimatedDelayMin: number;
  aiRecommendation: string;
  lastUpdated: string;
  alternativeRouteId: string | null;
  trafficLevel: 1 | 2 | 3 | 4 | 5;
}

export interface BridgeInfo {
  id: string;
  name: string;
  carries: string;
  river: string;
  status: "OPEN" | "RESTRICTED" | "CLOSED";
  lastInspected: string;
  position: { lat: number; lng: number };
}

export interface Vehicle {
  id: string;
  registration: string;
  type: "TRUCK" | "TRAILER" | "TANKER" | "LGV";
  cargo: string;
  weightTonnes: number;
  driver: { name: string; phone: string; license: string };
  origin: { name: string; code: string };
  destination: { name: string; code: string };
  position: { lat: number; lng: number };
  speedKph: number;
  headingDeg: number;
  distanceCoveredKm: number;
  etaTime: string;
  etaStatus: "ON_TIME" | "AT_RISK" | "LATE";
  status: "MOVING" | "DELAYED" | "STOPPED" | "DELIVERED";
  riskScore: number;
  lastGpsUpdate: string;
  routeId: string;
  shipmentRef: string | null;
}

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type IncidentType =
  | "LANDSLIDE"
  | "FLOOD"
  | "ROAD_DAMAGE"
  | "BRIDGE_ISSUE"
  | "TRAFFIC"
  | "OTHER";

export const INCIDENT_TYPE_LABELS: Record<IncidentType, string> = {
  LANDSLIDE: "Landslide",
  FLOOD: "Flood",
  ROAD_DAMAGE: "Road Damage",
  BRIDGE_ISSUE: "Bridge Issue",
  TRAFFIC: "Traffic",
  OTHER: "Other",
};

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  location: string;
  district: string;
  severity: Severity;
  cause: string;
  affectedVehicles: number;
  predictedImpact: string;
  aiProbability: number;
  reportedAt: string;
  reportedBy: string;
  status: "ACTIVE" | "MONITORING" | "RESOLVED";
  position: { lat: number; lng: number };
}

// Aliased per spec — the disruption/alert domain model
export type Alert = Incident;
export interface AlertItem extends Incident {}

// ------------------------------- Logistics ---------------------------------

export interface Shipment {
  id: string;
  ref: string;
  contents: string;
  category: "ESSENTIAL" | "MEDICAL" | "FUEL" | "CONSTRUCTION" | "PERISHABLE";
  vehicleId: string;
  origin: string;
  destination: string;
  status: "IN_TRANSIT" | "DELAYED" | "DELIVERED" | "HELD";
  eta: string;
  priority: "ROUTINE" | "PRIORITY" | "CRITICAL";
  weightTonnes: number;
}

export interface EmergencyEvent {
  id: string;
  title: string;
  type: "NATURAL_DISASTER" | "INFRASTRUCTURE" | "SECURITY" | "PUBLIC_HEALTH";
  startedAt: string;
  status: "STANDBY" | "ACTIVE" | "CONTAINED" | "CLOSED";
  affectedDistricts: string[];
  responseTeams: number;
}

export interface Resource {
  id: string;
  category: "MEDICAL" | "FOOD" | "WATER" | "FUEL" | "SHELTER" | "EQUIPMENT";
  name: string;
  quantity: number;
  unit: string;
  location: string;
  status: "AVAILABLE" | "DEPLOYED" | "COMMITTED";
}

// ----------------------------------- AI -------------------------------------

export interface AiFactor {
  label: string;
  detail: string;
  contribution: number; // points contributed to the risk score (0-100 scale)
  display: string; // human-readable measurement e.g. "214 mm / 72 h"
}

export interface AIInsight {
  id: string;
  title: string;
  type: "LANDSLIDE" | "FLOOD" | "CONGESTION" | "SUPPLY" | "WEATHER";
  riskScore: number;
  confidence: number;
  predictedWindow: string;
  peakWindow: string;
  affectedRouteIds: string[];
  factors: AiFactor[];
  recommendation: string;
  model: { name: string; version: string; updatedAt: string };
  summary: string;
}

// -------------------------------- Dashboard ---------------------------------

export interface Kpi {
  id: string;
  label: string;
  value: number;
  format: "PCT" | "INT" | "DEC";
  deltaPct: number;
  /** lower value is better (e.g. disruptions) — flips the delta colour */
  lowerIsBetter?: boolean;
  hint: "good" | "warn" | "bad" | "neutral";
  caption: string;
  trend: number[];
}

export interface ActivityItem {
  id: string;
  type:
    | "REPORT_FILED"
    | "ROAD_REOPENED"
    | "VEHICLE_DELIVERED"
    | "ALERT_ESCALATED"
    | "AI_FORECAST"
    | "SYNC_COMPLETED";
  title: string;
  detail: string;
  timestamp: string;
  actor: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  severity: Severity | "INFO";
  time: string;
  read: boolean;
}

// ------------------------------- Analytics ----------------------------------

export interface DeliveryDayPoint {
  day: string;
  onTimePct: number;
  avgDelayMin: number;
  deliveries: number;
}

export interface AccessibilityPoint {
  day: string;
  accessibilityPct: number;
  disruptions: number;
}

export interface DistrictImpact {
  district: string;
  state: string;
  disruptionDays: number;
  avgDelayMin: number;
}

export interface RecoveryPoint {
  severity: Severity;
  avgHours: number;
  targetHours: number;
}

export interface ShortagePoint {
  month: string;
  incidents: number;
}

export interface UtilizationPoint {
  category: string;
  utilizationPct: number;
  fleet: number;
}

export interface WeatherDisruptionPoint {
  condition: string;
  disruptions: number;
  roadClosures: number;
}

// ------------------------------- Navigation ---------------------------------

export type LayerId =
  | "roads"
  | "bridges"
  | "vehicles"
  | "traffic"
  | "weather"
  | "floodRisk"
  | "landslideRisk"
  | "incidents"
  | "emergencyCorridors"
  | "evacuationRoutes";

