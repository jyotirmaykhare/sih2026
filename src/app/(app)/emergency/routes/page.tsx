"use client";

import { Ambulance } from "lucide-react";
import { EmergencyModule } from "@/components/emergency/emergency-module";

export default function EmergencyRoutesPage() {
  return (
    <EmergencyModule
      title="Emergency Routes"
      description="Activation and management of priority relief corridors and evacuation alignments, overriding normal traffic routing."
      icon={Ambulance}
      features={[
        "Activate / deactivate emergency corridors (EC-01, EC-02)",
        "Convoy window scheduling with NDRF and state police",
        "Evacuation route capacity and shelter routing",
        "Corridor clearance token issuance for priority convoys",
      ]}
    />
  );
}
