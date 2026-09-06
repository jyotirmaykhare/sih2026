"use client";

import { AlertTriangle, ChevronRight, Droplets, MapPin, Mountain, Ship, TrafficCone, Wrench, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAgo } from "@/lib/format";
import { SeverityBadge } from "@/components/shared/status-badge";
import type { Incident, IncidentType } from "@/types";

const TYPE_ICON: Record<IncidentType, React.ComponentType<{ className?: string }>> = {
  LANDSLIDE: Mountain,
  FLOOD: Droplets,
  ROAD_DAMAGE: Wrench,
  BRIDGE_ISSUE: HelpCircle,
  TRAFFIC: TrafficCone,
  OTHER: AlertTriangle,
};

export function IncidentTypeIcon({ type, className }: { type: IncidentType; className?: string }) {
  const Icon = TYPE_ICON[type];
  return <Icon className={className} />;
}

const BORDER_BY_SEVERITY: Record<Incident["severity"], string> = {
  CRITICAL: "border-l-red-500",
  HIGH: "border-l-orange-500",
  MEDIUM: "border-l-amber-500",
  LOW: "border-l-sky-500",
};

export function AlertCard({
  incident,
  onViewOnMap,
  onViewDetails,
  compact = false,
  className,
}: {
  incident: Incident;
  onViewOnMap?: (incident: Incident) => void;
  onViewDetails?: (incident: Incident) => void;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-sm border border-border border-l-2 bg-card p-3 transition-colors hover:border-muted-foreground/40 hover:border-l-2",
        BORDER_BY_SEVERITY[incident.severity],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary">
            <IncidentTypeIcon type={incident.type} className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold leading-tight">{incident.title}</p>
            <p className="num mt-1 truncate font-mono text-[11px] text-muted-foreground">
              {incident.location}
            </p>
          </div>
        </div>
        <SeverityBadge severity={incident.severity} className="shrink-0" />
      </div>

      {!compact && (
        <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
          {incident.cause}
        </p>
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        <span className="num">{incident.affectedVehicles} vehicles affected</span>
        <span className="text-border">|</span>
        <span>
          AI probability <span className="num font-medium text-foreground">{incident.aiProbability}%</span>
        </span>
        <span className="text-border">|</span>
        <span>{formatAgo(incident.reportedAt)}</span>
      </div>

      {(onViewOnMap || onViewDetails) && (
        <div className="mt-2.5 flex items-center gap-1.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(incident)}
              className="inline-flex items-center gap-1 rounded-sm px-1.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <MapPin className="h-3 w-3" /> View on map
            </button>
          )}
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(incident)}
              className="inline-flex items-center gap-1 rounded-sm px-1.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Details <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function AlertCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-sm border border-border bg-card p-3", className)}>
      <div className="flex justify-between gap-2">
        <div className="h-3 w-2/3 rounded-sm bg-muted/70" />
        <div className="h-4 w-14 rounded-sm bg-muted/70" />
      </div>
      <div className="mt-3 h-2.5 w-1/2 rounded-sm bg-muted/70" />
      <div className="mt-3 h-2.5 w-3/4 rounded-sm bg-muted/50" />
    </div>
  );
}
