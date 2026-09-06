"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Radio } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useAuthStore } from "@/store/auth.store";
import { ROLE_LABELS } from "@/types";

export function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  if (!user) return null;

  function signOut() {
    logout();
    toast.info("Session ended", {
      description: "You have been signed out of NER COMMANDGRID.",
    });
    router.replace("/login");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-sm border border-border bg-background/50 py-1 pl-1 pr-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label="User menu"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">{user.initials}</AvatarFallback>
            </Avatar>
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-medium leading-tight">{user.name}</span>
              <span className="block text-[10px] leading-tight text-muted-foreground">
                {ROLE_LABELS[user.role]}
              </span>
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="num mt-0.5 font-mono text-[11px] text-muted-foreground">
              {user.officialId} · {user.designation}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{user.region}</p>
            <Badge variant="info" className="mt-2">
              {ROLE_LABELS[user.role]}
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 text-muted-foreground" disabled>
            <Radio className="h-3.5 w-3.5" /> Demo session — no password change
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400"
            onSelect={(e) => {
              e.preventDefault();
              setConfirmSignOut(true);
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmSignOut}
        onOpenChange={setConfirmSignOut}
        title="End session?"
        description="You will need to re-authenticate to access the platform."
        confirmLabel="Sign out"
        destructive
        onConfirm={signOut}
      />
    </>
  );
}
