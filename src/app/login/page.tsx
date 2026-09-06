"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Activity,
  BrainCircuit,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  LogIn,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/services/auth.service";
import { DEMO_ACCOUNTS } from "@/data/users";
import { DEMO_PASSWORD } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { ROLE_LABELS } from "@/types";

const BRAND_POINTS = [
  {
    icon: MapPinned,
    title: "Multi-hazard road intelligence",
    detail: "Live status of every trunk corridor across the eight NER states.",
  },
  {
    icon: BrainCircuit,
    title: "AI disruption forecasting",
    detail: "Explainable landslide, flood and congestion risk models.",
  },
  {
    icon: Activity,
    title: "24/7 emergency command",
    detail: "Relief corridors, evacuation routing and resource command.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setAuthenticating, status } = useAuthStore();
  const [officialId, setOfficialId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = status === "authenticating";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!officialId.trim() || !password) {
      setError("Enter your Official ID and password.");
      return;
    }
    setAuthenticating(true);
    try {
      const user = await authenticate(officialId, password);
      if (!user) {
        setError("Authentication failed — check your credentials.");
        toast.error("Authentication failed", {
          description: "Invalid Official ID or password.",
        });
        return;
      }
      setUser(user);
      toast.success("Authentication successful", {
        description: `Welcome back, ${user.name} — ${ROLE_LABELS[user.role]}.`,
      });
      router.replace("/command-center");
    } finally {
      setAuthenticating(false);
    }
  }

  function quickFill(id: string) {
    setOfficialId(id);
    setPassword(DEMO_PASSWORD);
    setError(null);
  }

  return (
    <div className="flex min-h-screen">
      {/* brand panel */}
      <aside className="relative hidden flex-1 flex-col justify-between overflow-hidden border-r border-border bg-card p-10 lg:flex">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/15">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.12em]">NER COMMANDGRID</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                North Eastern Region
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-lg">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              Logistics &amp; Accessibility
              <br />
              <span className="text-primary">Intelligence Platform</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Unified monitoring of transport corridors, disruptions, weather risk and
              emergency response across Assam, Arunachal Pradesh, Manipur, Meghalaya,
              Mizoram, Nagaland, Sikkim and Tripura.
            </p>

            <ul className="mt-10 space-y-5">
              {BRAND_POINTS.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-secondary">
                    <p.icon className="h-4 w-4 text-primary" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{p.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{p.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <p className="flex items-center gap-2 text-xs font-semibold text-amber-400/90">
            <LockKeyhole className="h-3.5 w-3.5" />
            AUTHORIZED PERSONNEL ONLY
          </p>
          <p className="num mt-1.5 font-mono text-[10px] text-muted-foreground">
            System use is monitored and logged · Prototype build · SIH 2026
          </p>
        </div>
      </aside>

      <AuthPanel
        officialId={officialId}
        password={password}
        showPassword={showPassword}
        error={error}
        busy={busy}
        setOfficialId={setOfficialId}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        onSubmit={handleSubmit}
        onQuickFill={quickFill}
      />
    </div>
  );
}

function AuthPanel(props: {
  officialId: string;
  password: string;
  showPassword: boolean;
  error: string | null;
  busy: boolean;
  setOfficialId: (v: string) => void;
  setPassword: (v: string) => void;
  setShowPassword: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onQuickFill: (id: string) => void;
}) {
  const {
    officialId,
    password,
    showPassword,
    error,
    busy,
    setOfficialId,
    setPassword,
    setShowPassword,
    onSubmit,
    onQuickFill,
  } = props;

  return (
    <main className="flex flex-1 items-center justify-center bg-background px-4 py-10 sm:px-8">
      <div className="w-full max-w-sm">
        {/* compact brand for mobile */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary/40 bg-primary/15">
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm font-bold tracking-[0.1em]">NER COMMANDGRID</p>
        </div>

        <h2 className="text-lg font-semibold tracking-tight">Officer authentication</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Sign in with your issued credentials to access the command platform.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="officialId">Official ID</Label>
            <Input
              id="officialId"
              value={officialId}
              onChange={(e) => setOfficialId(e.target.value)}
              placeholder="LO-2047"
              className="num font-mono"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-9"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="border border-red-500/30 bg-red-500/10 px-2.5 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" size="xl" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <LogIn />}
            {busy ? "Authenticating…" : "Authenticate"}
          </Button>
        </form>

        {/* demo accounts */}
        <div className="mt-8">
          <p className="micro-label">Demo access — select a role</p>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.user.id}
                type="button"
                onClick={() => onQuickFill(a.user.officialId)}
                className="rounded-sm border border-border bg-card px-2.5 py-2 text-left transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <span className="block text-xs font-medium">{ROLE_LABELS[a.user.role]}</span>
                <span className="num mt-0.5 block font-mono text-[10px] text-muted-foreground">
                  {a.user.officialId}
                </span>
              </button>
            ))}
          </div>
          <p className="num mt-3 text-center font-mono text-[10px] text-muted-foreground/80">
            All demo accounts use password: {DEMO_PASSWORD}
          </p>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-[10px] text-muted-foreground/70 lg:hidden">
          <LockKeyhole className="h-3 w-3" /> Authorized personnel only
        </p>
      </div>
    </main>
  );
}


