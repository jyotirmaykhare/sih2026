"use client";

import { RadioTower } from "lucide-react";
import { EmergencyModule } from "@/components/emergency/emergency-module";

export default function EmergencyBroadcastPage() {
  return (
    <EmergencyModule
      title="Broadcast Center"
      description="Authoritative advisories to field teams, transporters and the public during active emergencies."
      icon={RadioTower}
      features={[
        "Targeted advisories by district, corridor and user role",
        "Template-based public alerts with approval workflow",
        "Delivery acknowledgement tracking for field units",
        "Integration with the field-reporting offline queue",
      ]}
    />
  );
}
