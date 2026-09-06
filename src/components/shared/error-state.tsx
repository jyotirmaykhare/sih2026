"use client";

import { RefreshCw, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ErrorState({
  title = "Data unavailable",
  description = "The platform could not reach the data service. Retry in a moment.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-sm border border-dashed border-red-500/30 bg-red-500/5 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-red-500/30 bg-red-500/10">
        <ServerCrash className="h-4 w-4 text-red-400" />
      </div>
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </Button>
      )}
    </div>
  );
}
