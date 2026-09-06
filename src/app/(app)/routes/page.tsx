"use client";

import { Route } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function RoutesPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Routes"
        description="Corridor registry, alternative-route planning and route-level risk summaries"
      />
      <ModulePlaceholder
        icon={Route}
        title="Route Management"
        description="Full corridor registry with route planning, closure simulation and alternative-route comparison. Route metadata, geometry and live status already power the Live Map in this build."
        features={[
          "Searchable registry of all monitored NH/SH corridors",
          "Alternative-route comparison with delay & risk deltas",
          "Closure scenario planning against live AI forecasts",
          "Corridor history — incidents, recoveries and works",
        ]}
      />
    </div>
  );
}
