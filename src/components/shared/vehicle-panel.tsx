"use client";

import { Phone, Route as RouteIcon, Satellite, Truck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleStatusBadge } from "@/components/shared/status-badge";
import { Separator } from "@/components/ui/separator";
import { formatAgo, formatDelay } from "@/lib/format";
import type { Vehicle } from "@/types";

const ETA_COLOR: Record<Vehicle["etaStatus"], string> = {
  ON_TIME: "text-emerald-400",
  AT_RISK: "text-amber-400",
  LATE: "text-red-400",
};

function Row({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className={`text-xs font-medium ${mono ? "num font-mono" : ""}`}>{value}</span>
    </div>
  );
}

export function VehiclePanel({ vehicle }: { vehicle: Vehicle | null | undefined }) {
  if (!vehicle) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const riskVariant =
    vehicle.riskScore >= 70 ? "text-red-400" : vehicle.riskScore >= 45 ? "text-amber-400" : "text-emerald-400";

  return (
    <div className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="num font-mono text-sm font-semibold tracking-tight">{vehicle.registration}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {vehicle.type} · {vehicle.origin.code} → {vehicle.destination.code}
          </p>
        </div>
        <VehicleStatusBadge status={vehicle.status} />
      </div>

      <div className="mt-3 rounded-sm border border-border bg-background/50 p-3">
        <div className="flex items-start gap-2.5">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-xs font-medium">{vehicle.cargo}</p>
            <p className="num mt-0.5 font-mono text-[11px] text-muted-foreground">
              {vehicle.weightTonnes} t
              {vehicle.shipmentRef ? ` · ${vehicle.shipmentRef}` : ""}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-3" />

      <p className="micro-label">Driver</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium">{vehicle.driver.name}</p>
        <a
          href={`tel:${vehicle.driver.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10"
        >
          <Phone className="h-3 w-3" /> {vehicle.driver.phone}
        </a>
      </div>
      <Row label="Licence" value={vehicle.driver.license} mono />

      <Separator className="my-3" />

      <p className="micro-label">Telemetry</p>
      <div className="mt-1.5 divide-y divide-border/60">
        <Row label="Origin" value={vehicle.origin.name} />
        <Row label="Destination" value={vehicle.destination.name} />
        <Row label="Speed" value={`${vehicle.speedKph} km/h`} mono />
        <Row label="Distance covered" value={`${vehicle.distanceCoveredKm} km`} mono />
        <Row
          label="ETA"
          value={<span className={ETA_COLOR[vehicle.etaStatus]}>{vehicle.etaTime}</span>}
          mono
        />
        <Row label="Route" value={vehicle.routeId.toUpperCase()} mono />
        <Row
          label="Risk score"
          value={<span className={riskVariant}>{vehicle.riskScore}/100</span>}
          mono
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5 rounded-sm border border-border bg-background/50 px-2.5 py-2 text-[11px] text-muted-foreground">
        <Satellite className="h-3.5 w-3.5" />
        Last GPS update {formatAgo(vehicle.lastGpsUpdate)}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-sm border border-primary/25 bg-primary/5 px-2.5 py-2 text-[11px] leading-relaxed text-muted-foreground">
        <RouteIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
        {vehicle.status === "STOPPED"
          ? "Vehicle is stationary on a monitored corridor. Check corridor status before advising the driver."
          : vehicle.etaStatus === "ON_TIME"
            ? `Running on schedule. Current corridor delay model: ${formatDelay(0)} impact.`
            : "ETA is at risk due to corridor conditions. Consider alternative routing in the AI panel."}
      </div>
    </div>
  );
}
