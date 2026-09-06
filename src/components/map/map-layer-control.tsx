"use client";

import { Layers } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LAYER_DEFS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";
import type { LayerId } from "@/types";

const GROUPS: { key: "TRANSPORT" | "HAZARD" | "EMERGENCY"; label: string }[] = [
  { key: "TRANSPORT", label: "Transport" },
  { key: "HAZARD", label: "Hazard" },
  { key: "EMERGENCY", label: "Emergency" },
];

export function MapLayerControl({ className }: { className?: string }) {
  const { mapLayers, setMapLayer } = useUiStore();

  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-background/90 shadow-panel backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Layers className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="micro-label text-foreground">Map layers</span>
      </div>
      <div className="max-h-[46vh] space-y-3 overflow-y-auto scrollbar-thin px-3 py-2.5">
        {GROUPS.map((group) => (
          <div key={group.key}>
            <p className="micro-label">{group.label}</p>
            <div className="mt-1.5 space-y-1.5">
              {LAYER_DEFS.filter((d) => d.group === group.key).map((def) => (
                <div key={def.id} className="flex items-start justify-between gap-3">
                  <Label
                    htmlFor={`layer-${def.id}`}
                    className="flex-1 cursor-pointer leading-tight"
                  >
                    <span className="text-xs font-medium text-foreground">{def.label}</span>
                    <span className="mt-0.5 block text-[10px] text-muted-foreground">
                      {def.description}
                    </span>
                  </Label>
                  <Switch
                    id={`layer-${def.id}`}
                    checked={mapLayers[def.id as LayerId]}
                    onCheckedChange={(v) => setMapLayer(def.id as LayerId, v)}
                    aria-label={`Toggle ${def.label} layer`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

