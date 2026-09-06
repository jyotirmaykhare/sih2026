"use client";

import { Siren } from "lucide-react";
import { EmergencyModule } from "@/components/emergency/emergency-module";

export default function EmergencyOperationsPage() {
  return (
    <EmergencyModule
      title="Emergency Operations"
      description="Central emergency command board — active events, response posture and coordinated logistics directives across the region."
      icon={Siren}
      features={[
        "Live emergency event board with district-level impact overlays",
        "Response posture control (standby / active / contained)",
        "Cross-agency task assignment and status tracking",
        "Direct linkage between incidents and activated corridors",
      ]}
    />
  );
}
