"use client";

import { Warehouse } from "lucide-react";
import { EmergencyModule } from "@/components/emergency/emergency-module";

export default function ResourceCommandPage() {
  return (
    <EmergencyModule
      title="Resource Command"
      description="Regional stockpile visibility and directed deployment of relief resources — medical, food, water, fuel and equipment."
      icon={Warehouse}
      features={[
        "Live stockpile levels across regional warehouses",
        "Directed deployment orders with vehicle assignment",
        "Shortage forecasting linked to AI supply insights",
        "Inter-district mutual aid coordination",
      ]}
    />
  );
}
