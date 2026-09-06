"use client";

import type { LucideIcon } from "lucide-react";
import { Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Placeholder shell for modules arriving in a later build phase.
 * Shows a real roadmap — no lorem, no dead ends.
 */
export function ModulePlaceholder({
  icon: Icon,
  title,
  phase = "Phase 2 build",
  description,
  features,
  className,
}: {
  icon: LucideIcon;
  title: string;
  phase?: string;
  description: string;
  features: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-card px-6 py-8 sm:px-10 sm:py-12",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" /> {phase}
            </Badge>
          </div>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground">{description}</p>

          <p className="micro-label mt-6">Planned capabilities</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-1.5 text-[11px] text-muted-foreground/80">
            <Lock className="h-3 w-3" />
            Foundation, service interfaces and types for this module already exist in the codebase.
          </p>
        </div>
      </div>
    </div>
  );
}
