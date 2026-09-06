"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useDeliveryTrend } from "@/hooks/use-dashboard";

const TOOLTIP_STYLE = {
  backgroundColor: "hsl(222 40% 6%)",
  border: "1px solid hsl(221 26% 15%)",
  borderRadius: 2,
  fontSize: 11,
  color: "hsl(210 25% 96%)",
} as const;

export function DeliveryAnalytics() {
  const trend = useDeliveryTrend();

  return (
    <section
      aria-label="Delivery analytics"
      className="flex h-full flex-col rounded-sm border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="micro-label text-foreground">Delivery analytics — 14 days</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-primary/70" /> avg delay (min)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-3 rounded-full bg-emerald-400" /> on-time %
          </span>
        </div>
      </div>

      <div className="h-56 flex-1 p-2 pr-3">
        {trend.data && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trend.data} margin={{ top: 8, right: 0, bottom: 0, left: -14 }}>
              <CartesianGrid stroke="hsl(221 26% 14%)" strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 9, fill: "hsl(217 14% 55%)", fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "hsl(221 26% 15%)" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="delay"
                tick={{ fontSize: 9, fill: "hsl(217 14% 55%)", fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <YAxis
                yAxisId="ontime"
                orientation="right"
                domain={[75, 95]}
                tick={{ fontSize: 9, fill: "hsl(217 14% 55%)", fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                width={34}
              />
              <ReTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
              <Legend wrapperStyle={{ display: "none" }} />
              <Bar
                yAxisId="delay"
                dataKey="avgDelayMin"
                name="Avg delay (min)"
                fill="hsl(217 91% 60%)"
                fillOpacity={0.55}
                maxBarSize={12}
              />
              <Line
                yAxisId="ontime"
                type="monotone"
                dataKey="onTimePct"
                name="On-time %"
                stroke="#34D399"
                strokeWidth={1.8}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="num grid grid-cols-3 divide-x divide-border border-t border-border font-mono text-[10px] text-muted-foreground">
        <div className="px-3 py-2">
          <p className="micro-label">7-day avg delay</p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {trend.data
              ? Math.round(
                  trend.data.slice(-7).reduce((s, d) => s + d.avgDelayMin, 0) /
                    Math.min(7, trend.data.length),
                )
              : "—"}{" "}
            min
          </p>
        </div>
        <div className="px-3 py-2">
          <p className="micro-label">On-time trend</p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {trend.data ? `${trend.data[trend.data.length - 1].onTimePct}%` : "—"}
          </p>
        </div>
        <div className="px-3 py-2">
          <p className="micro-label">Deliveries today</p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {trend.data ? trend.data[trend.data.length - 1].deliveries : "—"}
          </p>
        </div>
      </div>
    </section>
  );
}
