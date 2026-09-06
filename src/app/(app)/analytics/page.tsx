"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Accessibility,
  AlarmClock,
  BarChart3,
  Building2,
  Clock4,
  CloudRainWind,
  Gauge,
  PackageX,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  AXIS_TICK,
  ChartCard,
  GRID_STROKE,
  TOOLTIP_STYLE,
} from "@/components/analytics/chart-card";
import {
  useAccessibilityTrend,
  useDeliveryDelay,
  useDisruptionsSeries,
  useRecoveryTime,
  useSupplyShortages,
  useVehicleUtilization,
  useWeatherDisruptions,
} from "@/hooks/use-analytics";

const SEVERITY_ORDER = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function AnalyticsPage() {
  const accessibility = useAccessibilityTrend();
  const delivery = useDeliveryDelay();
  const districts = useDisruptionsSeries();
  const recovery = useRecoveryTime();
  const shortages = useSupplyShortages();
  const utilization = useVehicleUtilization();
  const weather = useWeatherDisruptions();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Regional Analytics"
        description="Twelve-week operational picture across the NER corridor network"
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartCard
          title="Road accessibility trend"
          caption="12 weeks"
          icon={Accessibility}
          loading={accessibility.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={accessibility.data ?? []} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis domain={[75, 95]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: GRID_STROKE }} />
              <Area
                type="monotone"
                dataKey="accessibilityPct"
                name="Accessibility %"
                stroke="hsl(217 91% 60%)"
                strokeWidth={1.8}
                fill="url(#accGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Average delivery delay"
          caption="14 days · minutes"
          icon={Clock4}
          loading={delivery.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={delivery.data ?? []} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <Bar dataKey="avgDelayMin" name="Avg delay (min)" fill="hsl(217 91% 60%)" fillOpacity={0.75} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Number of disruptions"
          caption="per week"
          icon={BarChart3}
          loading={accessibility.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accessibility.data ?? []} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <Bar dataKey="disruptions" name="Disruptions" fill="#F97316" fillOpacity={0.75} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Most affected districts"
          caption="disruption days"
          icon={Building2}
          loading={districts.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districts.data ?? []} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 28 }}>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" horizontal={false} />
              <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="district"
                width={110}
                tick={{ ...AXIS_TICK, fontSize: 9.5 }}
                axisLine={false}
                tickLine={false}
              />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <Bar dataKey="disruptionDays" name="Disruption days" fill="#EF4444" fillOpacity={0.75} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Route recovery time"
          caption="avg vs target hours"
          icon={AlarmClock}
          loading={recovery.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={(recovery.data ?? [])
                .slice()
                .sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity))}
              margin={{ top: 8, right: 4, bottom: 0, left: -18 }}
            >
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="severity" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <ReferenceLine
                y={24}
                stroke="#64748B"
                strokeDasharray="4 3"
                label={{ value: "target", fontSize: 9, fill: "hsl(217 14% 55%)", position: "right" }}
              />
              <Bar dataKey="avgHours" name="Avg recovery (h)" fill="#22C55E" fillOpacity={0.7} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Supply shortage incidents"
          caption="12 months"
          icon={PackageX}
          loading={shortages.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={shortages.data ?? []} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="shortGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="month" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: GRID_STROKE }} />
              <Area type="monotone" dataKey="incidents" name="Incidents" stroke="#F59E0B" strokeWidth={1.8} fill="url(#shortGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Vehicle utilization"
          caption="by category"
          icon={Gauge}
          loading={utilization.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={utilization.data ?? []} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="category" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <Bar dataKey="utilizationPct" name="Utilization %" fill="#38BDF8" fillOpacity={0.75} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Weather vs road disruptions"
          caption="trailing quarter"
          icon={CloudRainWind}
          loading={weather.isLoading}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={weather.data ?? []} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="condition" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <Bar dataKey="disruptions" name="Disruptions" fill="hsl(217 91% 60%)" fillOpacity={0.7} maxBarSize={22} />
              <Bar dataKey="roadClosures" name="Closures" fill="#EF4444" fillOpacity={0.75} maxBarSize={12} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}


