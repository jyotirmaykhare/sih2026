"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "@/components/layout/nav-config";
import { useUiStore } from "@/store/ui.store";
import { useHydrated } from "@/hooks/use-hydration";
import type { User } from "@/types";

export function SidebarContent({ user, onNavigate }: { user: User; onNavigate?: () => void }) {
  const pathname = usePathname();
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const hydrated = useHydrated();
  const isCollapsed = hydrated && collapsed;
  const canEmergency =
    user.role === "EMERGENCY_COMMANDER" || user.role === "ADMINISTRATOR";

  return (
    <div className="flex h-full flex-col">
      {/* brand */}
      <div className={cn("flex h-14 items-center border-b border-border", isCollapsed ? "justify-center px-0" : "px-4")}>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-primary/40 bg-primary/15">
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        {!isCollapsed && (
          <div className="ml-2.5 min-w-0">
            <p className="truncate text-xs font-bold tracking-[0.08em]">NER COMMANDGRID</p>
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Logistics Intelligence
            </p>
          </div>
        )}
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3" aria-label="Primary">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-4">
            {!isCollapsed ? (
              <p className="micro-label px-4 pb-1.5">{section.label}</p>
            ) : (
              <div className="mx-auto mb-1.5 h-px w-6 bg-border" />
            )}
            <ul className="space-y-0.5 px-2">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const locked = item.emergency && !canEmergency;
                const link = (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center rounded-sm px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      isCollapsed && "justify-center px-0",
                      active
                        ? "border-l-2 border-primary bg-primary/10 text-foreground"
                        : "border-l-2 border-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
                      locked && "text-muted-foreground/60 hover:text-muted-foreground",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                        locked && "text-muted-foreground/50",
                      )}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="ml-2.5 flex-1 truncate">{item.label}</span>
                        {locked && <Lock className="h-3 w-3 shrink-0 text-muted-foreground/60" />}
                      </>
                    )}
                  </Link>
                );
                return (
                  <li key={item.href}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{link}</TooltipTrigger>
                        <TooltipContent side="right" className="flex items-center gap-1.5">
                          {item.label}
                          {locked && <Lock className="h-3 w-3" />}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      link
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* system status footer */}
      <div className={cn("border-t border-border py-3", isCollapsed ? "px-2" : "px-4")}>
        <div className={cn("rounded-sm border border-border bg-background/40", isCollapsed ? "p-2" : "p-2.5")}>
          {isCollapsed ? (
            <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-label="Systems operational" />
          ) : (
            <>
              <p className="flex items-center justify-between">
                <span className="micro-label">System status</span>
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
              </p>
              <p className="num mt-1.5 font-mono text-[10px] text-muted-foreground">
                OPERATIONAL · UPTIME 99.97%
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
