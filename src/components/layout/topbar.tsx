"use client";

import { usePathname } from "next/navigation";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useClock } from "@/hooks/use-clock";
import { SidebarContent } from "@/components/layout/sidebar";
import { findNavItem } from "@/components/layout/nav-config";
import { NotificationsMenu } from "@/components/layout/notifications-menu";
import { UserMenu } from "@/components/layout/user-menu";
import { useAuthStore } from "@/store/auth.store";
import { useUiStore } from "@/store/ui.store";

export function Topbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar, mobileNavOpen, setMobileNavOpen } = useUiStore();
  const { timeLabel, dateLabel } = useClock();

  const current = findNavItem(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-3 sm:px-4">
      {/* mobile nav */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {user && <SidebarContent user={user} onNavigate={() => setMobileNavOpen(false)} />}
        </SheetContent>
      </Sheet>

      {/* desktop collapse toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}</TooltipContent>
      </Tooltip>

      {/* page title */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold tracking-tight">
          {current?.label ?? "Command Center"}
        </p>
        <p className="hidden truncate text-[11px] text-muted-foreground sm:block">
          NER COMMANDGRID · Regional Logistics Status · {dateLabel}
        </p>
      </div>

      {/* system status */}
      <div className="hidden items-center gap-2 rounded-sm border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1.5 xl:flex">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
        <span className="num font-mono text-[10px] font-medium text-emerald-400">
          SYSTEMS OPERATIONAL
        </span>
      </div>

      {/* clock */}
      <div className="hidden md:block">
        <p className="num font-mono text-xs font-medium">{timeLabel}</p>
      </div>

      <NotificationsMenu />
      <UserMenu />
    </header>
  );
}
