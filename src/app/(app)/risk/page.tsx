"use client";

import { Radar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function RiskPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Risk Analysis"
        description="Composite corridor risk from terrain, weather, history and traffic"
      />
      <ModulePlaceholder
        icon={Radar}
        title="Risk Analysis"
        description="Corridor-level composite risk scoring with drill-downs into every contributing factor. The explainable factor model already powers the AI Intelligence panel."
        features={[
          "Composite risk index per corridor and district",
          "Scenario stress-testing (rainfall, closure, surge)",
          "Historical risk validation against actual events",
          "Risk-based convoy clearance recommendations",
        ]}
      />
    </div>
  );
}
