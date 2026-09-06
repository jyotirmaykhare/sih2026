"use client";

import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function DisruptionsPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Disruption Center"
        description="Alert management across criticality tiers — the live feed already powers the Command Center alert panel"
      />
      <ModulePlaceholder
        icon={AlertTriangle}
        title="Disruption Center"
        description="Full alert management workspace: tiered queues, acknowledgement workflows and impact attribution. Incident data is already streaming through the incidents service."
        features={[
          "Criticality-tiered queues (critical / high / medium / low)",
          "Acknowledgement and resolution workflows with audit trail",
          "Affected-vehicle attribution per disruption",
          "View-on-map deep links from every alert",
        ]}
      />
    </div>
  );
}
