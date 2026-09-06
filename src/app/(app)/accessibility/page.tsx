"use client";

import { Accessibility } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function AccessibilityPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Accessibility"
        description="District and corridor accessibility scoring across the region"
      />
      <ModulePlaceholder
        icon={Accessibility}
        title="Accessibility Intelligence"
        description="How reachable each district and settlement is right now — combining road status, bridge capacity and hazard exposure. The headline accessibility KPI on the Command Center already derives from this model."
        features={[
          "District accessibility scorecard (0–100)",
          "Last-mile reachability for health & supply centres",
          "Seasonal degradation modelling (monsoon / winter)",
          "Equity view — population vs. connectivity loss",
        ]}
      />
    </div>
  );
}
