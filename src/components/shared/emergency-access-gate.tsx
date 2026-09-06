"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Fingerprint, KeyRound, Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INCIDENTS } from "@/data/incidents";
import { useEmergencyStore } from "@/store/emergency.store";
import { DefaultRestrictedScreen } from "@/components/shared/permission-guard";
import type { Role, User } from "@/types";

const AUTHORIZED_ROLES: Role[] = ["EMERGENCY_COMMANDER", "ADMINISTRATOR"];
// Demo-only activation PIN (frontend simulation — enforced server-side later).
const DEMO_PIN = "260926";

/**
 * Emergency access gate.
 * - Unauthorized roles → restricted screen (controls never revealed).
 * - Authorized roles → simulated activation workflow before any emergency UI.
 */
export function EmergencyAccessGate({
  user,
  children,
}: {
  user: User;
  children?: React.ReactNode;
}) {
  if (!AUTHORIZED_ROLES.includes(user.role)) {
    return <DefaultRestrictedScreen />;
  }
  return <ActivationWorkflow user={user}>{children}</ActivationWorkflow>;
}

function ActivationWorkflow({ user, children }: { user: User; children?: React.ReactNode }) {
  const { activation, activate } = useEmergencyStore();

  if (activation) {
    return <>{children}</>;
  }

  return <ActivationForm user={user} onActivate={activate} />;
}

function ActivationForm({
  user,
  onActivate,
}: {
  user: User;
  onActivate: (p: { officialId: string; reason: string; incidentRef: string }) => void;
}) {
  const [officialId, setOfficialId] = useState(user.officialId);
  const [pin, setPin] = useState("");
  const [reason, setReason] = useState("");
  const [incidentRef, setIncidentRef] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function verify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!officialId.trim()) return setError("Official ID is required.");
    if (pin.length !== 6) return setError("Authorization PIN must be 6 digits.");
    if (reason.trim().length < 12)
      return setError("Provide a brief emergency reason (min 12 characters).");
    if (!incidentRef) return setError("Select an incident reference.");
    setBusy(true);
    setTimeout(() => {
      if (pin !== DEMO_PIN) {
        setBusy(false);
        setError("Authorization PIN rejected. Attempt logged.");
        toast.error("Verification failed", {
          description: "Invalid authorization PIN. Demo PIN is 260926.",
        });
        return;
      }
      setBusy(false);
      toast.success("Emergency authorization verified", {
        description: "Emergency command privileges are now active for this session.",
      });
      onActivate({ officialId: officialId.trim(), reason: reason.trim(), incidentRef });
    }, 900);
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <form
        onSubmit={verify}
        className="w-full max-w-md rounded-sm border border-amber-500/30 bg-card p-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-amber-500/30 bg-amber-500/10">
            <TriangleAlert className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="micro-label text-amber-400">Two-step authorization</p>
            <h2 className="mt-1 text-base font-semibold tracking-tight">
              Activate emergency access
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Emergency command operations are protected. Verification is simulated in
              this prototype; every attempt is recorded.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="eg-id">Official ID</Label>
            <Input
              id="eg-id"
              value={officialId}
              onChange={(e) => setOfficialId(e.target.value)}
              className="num font-mono"
              autoComplete="off"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="eg-pin">Authorization PIN (6 digits)</Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="eg-pin"
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className="num pl-8 font-mono tracking-[0.4em]"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="eg-reason">Emergency reason</Label>
            <Textarea
              id="eg-reason"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Imphal valley supply line cut — activating relief corridor command"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="eg-inc">Incident reference</Label>
            <Select value={incidentRef} onValueChange={setIncidentRef}>
              <SelectTrigger id="eg-inc">
                <SelectValue placeholder="Select the governing incident" />
              </SelectTrigger>
              <SelectContent>
                {INCIDENTS.filter((i) => i.status === "ACTIVE").map((i) => (
                  <SelectItem key={i.id} value={i.id}>
                    <span className="num font-mono text-[11px]">{i.id.toUpperCase()}</span>
                    <span className="ml-2 text-muted-foreground">{i.title}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 border border-red-500/30 bg-red-500/10 px-2.5 py-2 text-xs text-red-400"
          >
            {error}
          </p>
        )}

        <Button type="submit" size="xl" className="mt-5 w-full" disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : <Fingerprint />}
          {busy ? "Verifying…" : "Verify"}
        </Button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground/80">
          Demo environment — authorization PIN is 260926
        </p>
      </form>
    </div>
  );
}

