"use client";

import { Truck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { VehicleStatusBadge } from "@/components/shared/status-badge";
import { fetchVehicles } from "@/services/logistics.service";
import { useQuery } from "@tanstack/react-query";
import { formatAgo } from "@/lib/format";
import type { Vehicle } from "@/types";

const COLUMNS: DataTableColumn<Vehicle>[] = [
  {
    id: "vehicle",
    header: "Vehicle",
    cell: (v) => <span className="num font-mono text-xs">{v.registration}</span>,
  },
  { id: "cargo", header: "Cargo", cell: (v) => <span className="text-xs">{v.cargo}</span> },
  { id: "origin", header: "Origin", cell: (v) => <span className="text-xs text-muted-foreground">{v.origin.name}</span> },
  {
    id: "destination",
    header: "Destination",
    cell: (v) => <span className="text-xs text-muted-foreground">{v.destination.name}</span>,
  },
  { id: "status", header: "Status", cell: (v) => <VehicleStatusBadge status={v.status} /> },
  { id: "eta", header: "ETA", cell: (v) => <span className="num font-mono text-xs">{v.etaTime}</span> },
  {
    id: "risk",
    header: "Risk",
    cell: (v) => (
      <span
        className={`num font-mono text-xs font-semibold ${
          v.riskScore >= 70 ? "text-red-400" : v.riskScore >= 45 ? "text-amber-400" : "text-emerald-400"
        }`}
      >
        {v.riskScore}
      </span>
    ),
  },
  {
    id: "gps",
    header: "Last GPS",
    cell: (v) => <span className="num font-mono text-[11px] text-muted-foreground">{formatAgo(v.lastGpsUpdate)}</span>,
  },
];

export default function VehiclesPage() {
  const vehicles = useQuery({ queryKey: ["vehicles", "register"], queryFn: fetchVehicles });

  return (
    <div className="space-y-3">
      <PageHeader
        title="Vehicles"
        description="Live fleet register — full tracking module arrives in the next build phase"
      />
      <DataTable
        columns={COLUMNS}
        rows={vehicles.data ?? []}
        getKey={(v) => v.id}
        isLoading={vehicles.isLoading}
        emptyTitle="No vehicles in transit"
        emptyDescription="Vehicle telemetry will populate here once the fleet stream connects."
      />
      <ModulePlaceholder
        icon={Truck}
        title="Vehicle Tracking Module"
        description="The early preview above shows the live register from the tracking service. The complete module adds map-following, stop detection, driver messaging and delivery confirmation."
        features={[
          "Interactive vehicle map with corridor tracing",
          "Stop / hold detection with dwell-time alerts",
          "ETA recalculation from live road status",
          "Driver communication and delivery confirmation (POD)",
        ]}
      />
    </div>
  );
}
