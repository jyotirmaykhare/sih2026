"use client";

import { cn } from "@/lib/utils";
import type { RoadStatus, Severity, Vehicle } from "@/types";

const SEVERITY_STYLE: Record<Severity, { dot: string; text: string; bg: string }> = {
  CRITICAL: { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  HIGH: { dot: "bg-orange-500", text: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
  MEDIUM: { dot: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  LOW: { dot: "bg-sky-500", text: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/30" },
};

const ROAD_STYLE: Record<RoadStatus, { dot: string; text: string; bg: string; label: string }> = {
  OPEN: { dot: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", label: "Open" },
  PARTIAL: { dot: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", label: "Partial" },
  BLOCKED: { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10 border-red-500/30", label: "Blocked" },
  HIGH_RISK: { dot: "bg-orange-500", text: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30", label: "High risk" },
  EMERGENCY: { dot: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", label: "Emergency" },
};

const VEHICLE_STYLE: Record<Vehicle["status"], { dot: string; text: string; bg: string; label: string }> = {
  MOVING: { dot: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", label: "Moving" },
  DELAYED: { dot: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", label: "Delayed" },
  STOPPED: { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10 border-red-500/30", label: "Stopped" },
  DELIVERED: { dot: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", label: "Delivered" },
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const s = SEVERITY_STYLE[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        s.bg,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {severity}
    </span>
  );
}

export function RoadStatusBadge({ status, className }: { status: RoadStatus; className?: string }) {
  const s = ROAD_STYLE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        s.bg,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function VehicleStatusBadge({
  status,
  className,
}: {
  status: Vehicle["status"];
  className?: string;
}) {
  const s = VEHICLE_STYLE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        s.bg,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/** Status dot only — for dense contexts like tables and legends. */
export function StatusDot({ className }: { className?: string }) {
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full", className)} />;
}
