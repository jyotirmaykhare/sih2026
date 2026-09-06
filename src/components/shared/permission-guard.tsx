"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

/**
 * Role-based access guard. Renders children only for allowed roles;
 * otherwise renders the supplied fallback (or the default restricted screen).
 */
export function PermissionGuard({
  allowedRoles,
  role,
  fallback,
  children,
}: {
  allowedRoles: Role[];
  role: Role;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  if (allowedRoles.includes(role)) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return <DefaultRestrictedScreen />;
}

export function DefaultRestrictedScreen() {
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-sm border border-red-500/30 bg-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm border border-red-500/30 bg-red-500/10">
          <ShieldAlert className="h-5 w-5 text-red-400" />
        </div>
        <p className="micro-label mt-5 text-red-400/90">Restricted access</p>
        <h2 className="mt-2 text-base font-semibold tracking-tight">
          You do not have permission to access emergency command operations.
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Emergency command interfaces are limited to authorised emergency response
          roles. This access attempt has been logged against your session.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => router.push("/command-center")}>
          Return to Command Center
        </Button>
      </div>
    </div>
  );
}
