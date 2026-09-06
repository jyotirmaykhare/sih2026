"use client";

import { History } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function HistoricalPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Historical Data"
        description="Archived operations data, monsoon-season comparisons and post-event reviews"
      />
      <ModulePlaceholder
        icon={History}
        title="Historical Data Archive"
        description="Two seasons of archived operations data with side-by-side monsoon comparisons and structured post-event review reports. Weekly aggregate series already feed Regional Analytics."
        features={[
          "Season-over-season corridor comparisons",
          "Post-event review reports (landslide, flood closures)",
          "Exportable datasets for planning studies",
          "Recovery-time benchmark evolution",
        ]}
      />
    </div>
  );
}
