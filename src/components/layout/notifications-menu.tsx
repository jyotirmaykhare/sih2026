"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/use-dashboard";
import { formatAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Severity } from "@/types";

const SEV_DOT: Record<Severity | "INFO", string> = {
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-500",
  MEDIUM: "bg-amber-500",
  LOW: "bg-sky-500",
  INFO: "bg-slate-500",
};

export function NotificationsMenu() {
  const notifications = useNotifications();
  const unread = (notifications.data ?? []).filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
          className="relative"
        >
          <Bell />
          {unread > 0 && (
            <span className="num absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-background bg-red-500 px-1 font-mono text-[9px] font-bold text-white">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="micro-label text-foreground">Notifications</span>
          <span className="num font-mono text-[10px] text-muted-foreground">{unread} unread</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {(notifications.data ?? []).map((n) => (
            <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 py-2">
              <span className="flex w-full items-center gap-2">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", SEV_DOT[n.severity])} />
                <span className="flex-1 truncate text-xs font-medium">{n.title}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{formatAgo(n.time)}</span>
              </span>
              <span className="pl-3.5 text-[11px] leading-snug text-muted-foreground">{n.body}</span>
            </DropdownMenuItem>
          ))}
          {notifications.isLoading && (
            <p className="px-2 py-3 text-center text-[11px] text-muted-foreground">Loading…</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
