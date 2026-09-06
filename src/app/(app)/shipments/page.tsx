"use client";

import { Package } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";

export default function ShipmentsPage() {
  return (
    <div className="space-y-3">
      <PageHeader
        title="Shipments"
        description="Consignment registry, priority classification and delivery pipelines"
      />
      <ModulePlaceholder
        icon={Package}
        title="Shipment Management"
        description="End-to-end consignment tracking across the region — from staging yard to proof of delivery. Shipment records are already linked to vehicles in the fleet model."
        features={[
          "Consignment registry with priority classification",
          "Milestone tracking (staged → in transit → delivered)",
          "Essential-commodity pipeline monitoring",
          "Automatic delay attribution from corridor status",
        ]}
      />
    </div>
  );
}
