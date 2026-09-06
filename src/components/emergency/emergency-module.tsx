"use client";

import type { LucideIcon } from "lucide-react";
import { EmergencyAccessGate } from "@/components/shared/emergency-access-gate";
import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";
import { useAuthStore } from "@/store/auth.store";
import { useEmergencyStore } from "@/store/emergency.store";
import { useHydrated } from "@/hooks/use-hydration";
import type { Role } from "@/types";

/**
 * Shared shell for the four emergency modules:
 * - Unauthorized roles → restricted screen (no controls revealed).
 * - Authorized roles → activation gate, then the phase-2 module outline.
 */
export function EmergencyModule({
  title,
  description,
  icon,
  features,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}) {
  const user = useAuthStore((s) => s.user);
  const activation = useEmergencyStore((s) => s.activation);
  const hydrated = useHydrated();

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="num animate-pulse font-mono text-xs text-muted-foreground">
          VERIFYING CLEARANCE…
        </p>
      </div>
    );
  }

  const activated = Boolean(activation);

  return (
    <EmergencyAccessGate user={user}>
      <div className="space-y-3">
        <PageHeader
          title={title}
          description={description}
          actions={
            activated ? (
              <span className="flex items-center gap-1.5 rounded-sm border border-blue-500/40 bg-blue-500/10 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-blue-400">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-400" />
                Emergency authorized
              </span>
            ) : undefined
          }
        />
        {activated ? (
          <ModulePlaceholder
            icon={icon}
            title={title}
            phase="Phase 2 build — authorization already active"
            description={description}
            features={features}
          />
        ) : null}
      </div>
    </EmergencyAccessGate>
  );
}
