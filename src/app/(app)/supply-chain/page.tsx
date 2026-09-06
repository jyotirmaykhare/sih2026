"use client";

import { Container } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function SupplyChainPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Supply Chain"
        description="Essential-commodity flows and pipeline health across the region"
      />
      <ModulePlaceholder
        icon={Container}
        title="Supply Chain Analytics"
        description="Commodity flow intelligence — from FCI grain movements and fuel pipelines to medical cold-chain coverage. Shortage-incident trends already stream into Regional Analytics."
        features={[
          "Commodity-flow maps (grain, fuel, medical, PDS)",
          "Pipeline health by corridor with delay attribution",
          "Stock-out early warning linked to AI forecasts",
          "Supplier and depot performance scorecards",
        ]}
      />
    </div>
  );
}
