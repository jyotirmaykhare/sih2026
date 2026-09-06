"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarContent } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAuthStore } from "@/store/auth.store";
import { useUiStore } from "@/store/ui.store";
import { useHydrated } from "@/hooks/use-hydration";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const hydrated = useHydrated();
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const isCollapsed = hydrated && collapsed;

  // Client-side auth guard — persisted session only.
  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="num animate-pulse font-mono text-xs text-muted-foreground">
          INITIALISING COMMANDGRID…
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 border-r border-border bg-card transition-[width] duration-200 lg:block",
          isCollapsed ? "w-[64px]" : "w-[264px]",
        )}
      >
        <SidebarContent user={user as User} />
      </aside>

      {/* main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
          <div className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
