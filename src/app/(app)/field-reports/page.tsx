"use client";

import { ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function FieldReportsPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Field Reports"
        description="Mobile-first incident reporting from the corridor — works offline, syncs when connectivity returns"
      />
      <ModulePlaceholder
        icon={ClipboardList}
        title="Field Reporting Module"
        description="A mobile-first reporting interface for field teams: incident capture with GPS, photographs and severity grading, with a resilient offline queue for the region's connectivity gaps."
        features={[
          "Rapid incident capture (landslide, flood, road damage, bridge issue, traffic)",
          "GPS auto-tagging with manual correction",
          "Photograph upload with compression",
          "Offline queue with automatic sync on reconnect",
        ]}
      />
    </div>
  );
}
