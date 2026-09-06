"use client";

import { cn } from "@/lib/utils";

const ITEMS: { color: string; label: string }[] = [
  { color: "#22C55E", label: "Open" },
  { color: "#F59E0B", label: "Partially affected" },
  { color: "#EF4444", label: "Blocked" },
  { color: "#F97316", label: "High risk" },
  { color: "#3B82F6", label: "Emergency route" },
];

export function MapLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-background/85 p-2.5 shadow-panel backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label="Map legend"
    >
      <p className="micro-label mb-1.5">Road status</p>
      <ul className="space-y-1">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
