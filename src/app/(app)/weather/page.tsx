"use client";

import { CloudRain } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function WeatherPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Weather"
        description="IMD observations and precipitation risk across the eight states"
      />
      <ModulePlaceholder
        icon={CloudRain}
        title="Weather Monitoring"
        description="Consolidated weather picture for logistics decisions. Station observations already render as a Live Map layer; this module adds the full forecast workspace."
        features={[
          "IMD station feed with rainfall, fog and storm alerts",
          "72-hour corridor-level precipitation outlook",
          "River & flood gauge monitoring for valley routes",
          "Weather-to-corridor impact mapping",
        ]}
      />
    </div>
  );
}
