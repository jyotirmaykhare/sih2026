"use client";

import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  caption,
  icon: Icon,
  height = 220,
  loading = false,
  children,
  className,
}: {
  title: string;
  caption?: string;
  icon: LucideIcon;
  height?: number;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-sm border border-border bg-card", className)}>
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="micro-label text-foreground">{title}</span>
        </div>
        {caption && <span className="text-[10px] text-muted-foreground">{caption}</span>}
      </div>
      <div className="p-3" style={{ height: height + 24 }}>
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <div style={{ height }}>{children}</div>
        )}
      </div>
    </section>
  );
}

export const TOOLTIP_STYLE = {
  backgroundColor: "hsl(222 40% 6%)",
  border: "1px solid hsl(221 26% 15%)",
  borderRadius: 2,
  fontSize: 11,
  color: "hsl(210 25% 96%)",
} as const;

export const AXIS_TICK = {
  fontSize: 9,
  fill: "hsl(217 14% 55%)",
  fontFamily: "var(--font-mono)",
} as const;

export const GRID_STROKE = "hsl(221 26% 14%)";
