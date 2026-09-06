# NER COMMANDGRID

**North Eastern Region — Logistics & Accessibility Intelligence Platform**

A government-grade operations command center for monitoring transportation
accessibility, logistics movement, road disruptions, weather risks, AI
predictions and emergency response across the eight North Eastern Region
states of India.

> Frontend-first prototype (SIH 2026). All data is realistic mock data served
> through a clean service-abstraction layer, ready to be swapped for real APIs
> without redesigning the UI.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) + React 18 + TypeScript |
| Styling | Tailwind CSS (custom dark-navy command theme) + shadcn-style UI kit |
| Map | MapLibre GL JS (Mapbox-compatible), CARTO dark basemap (keyless) |
| Charts | Recharts |
| State | Zustand (persisted auth / UI / emergency stores) |
| Data | TanStack Query over `src/services/*` mock adapters |
| Icons | Lucide |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Demo accounts

All demo accounts use the password **`grid2026`**.

| Role | Official ID | Emergency access |
| --- | --- | --- |
| Logistics Officer | `LO-2047` | ✗ |
| District Officer | `DO-1186` | ✗ |
| Emergency Commander | `EC-0031` | ✓ |
| Administrator | `AD-0001` | ✓ |

Emergency authorization (demo PIN: **`260926`**) unlocks the four emergency
modules; unauthorized roles see a restricted-access screen and no controls.

## Architecture

```
src/
  app/                 # App Router pages
    login/             #   authentication (simulated)
    (app)/             #   authenticated shell + all modules
  components/
    ui/                # shadcn-style primitives (button, card, sheet, …)
    shared/            # StatCard, AlertCard, StatusBadge, DataTable,
                       # RouteCard, AIInsightCard, VehiclePanel,
                       # PermissionGuard, EmergencyAccessGate, EmptyState, …
    map/               # MapLibre engine, layer registry, legend, panels
    layout/            # sidebar / topbar / shell
    dashboard/         # command-center widgets
    analytics/         # chart cards
  data/                # realistic NER mock datasets (roads, fleet, incidents…)
  services/            # API abstraction — swap mockFetch for HTTP later
  store/               # zustand stores (auth, ui, emergency)
  hooks/               # TanStack Query hooks + clock/hydration helpers
  types/               # domain interfaces (User, Vehicle, Route, Incident,
                       #   Alert, Shipment, EmergencyEvent, Resource, AIInsight…)
```

### Key patterns

- **Service abstraction** — every data read goes through `src/services/*`.
  Each function currently wraps `mockFetch` (latency-simulated); replacing a
  body with `fetch('/api/…')` requires no UI changes.
- **Map layer registry** (`src/lib/constants.ts` + `components/map/`) — adding
  a GIS layer means adding a `LayerDef` + layer definition, the control and
  legend update automatically.
- **Persistence** — auth session, sidebar state, map-layer toggles and
  emergency activation survive reloads via zustand `persist`.
- **Live simulation** — the fleet advances every 4 s (`services/fleet-sim.ts`);
  KPIs random-walk on refetch; vehicle feed refetches every 6 s.

## Build phases

- ✅ **Phase 1 (this build)** — foundation, auth, responsive shell, role
  system, Command Center (KPIs, critical alerts, AI intelligence, delivery
  analytics, activity), full GIS map with layer control + road/vehicle detail
  panels, AI Intelligence page, Regional Analytics, emergency access gates,
  early vehicle register preview, phase-2 module outlines.
- 🔜 **Phase 2** — full vehicle tracking, Disruption Center, mobile-first
  field reporting with offline sync, emergency command modules, supply-chain
  views, historical archive.
