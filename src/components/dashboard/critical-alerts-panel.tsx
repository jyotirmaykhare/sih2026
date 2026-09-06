"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { AlertCard, AlertCardSkeleton } from "@/components/shared/alert-card";
import { ErrorState } from "@/components/shared/error-state";
import { useCriticalAlerts } from "@/hooks/use-dashboard";
import { useUiStore } from "@/store/ui.store";

export function CriticalAlertsPanel({ max = 4 }: { max?: number }) {
  const router = useRouter();
  const alerts = useCriticalAlerts();
  const setSelectedRoadId = useUiStore((s) => s.setSelectedRoadId);
  const setSelectedVehicleId = useUiStore((s) => s.setSelectedVehicleId);

  const incidents = (alerts.data ?? []).slice(0, max);

  function viewOnMap() {
    setSelectedRoadId(null);
    setSelectedVehicleId(null);
    router.push("/live-map");
  }

  return (
    <section
      aria-label="Critical alerts"
      className="flex h-full flex-col rounded-sm border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-red-400" />
          <span className="micro-label text-foreground">Critical alerts</span>
          {(alerts.data ?? []).length > 0 && (
            <span className="num rounded-sm border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-red-400">
              {(alerts.data ?? []).length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={viewOnMap}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Live map <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin p-3">
        {alerts.isLoading &&
          Array.from({ length: 3 }).map((_, i) => <AlertCardSkeleton key={i} />)}
        {alerts.isError && (
          <ErrorState
            title="Alert feed unavailable"
            description="Could not load the incident feed."
            onRetry={() => alerts.refetch()}
          />
        )}
        {alerts.data &&
          incidents.map((incident) => (
            <AlertCard
              key={incident.id}
              incident={incident}
              compact
              onViewOnMap={viewOnMap}
              onViewDetails={viewOnMap}
            />
          ))}
        {alerts.data && incidents.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">
            No active alerts. All corridors nominal.
          </p>
        )}
      </div>
    </section>
  );
}
