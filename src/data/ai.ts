// Mock AI insights — explainable model output for the AI Intelligence module.

import { minutesAgo } from "@/lib/format";
import type { AIInsight } from "@/types";

export const PRIMARY_INSIGHT: AIInsight = {
  id: "ai-ls-001",
  title: "Landslide disruption — NH-2 Kohima sector",
  type: "LANDSLIDE",
  riskScore: 78,
  confidence: 91,
  predictedWindow: "Next 18–42 hours",
  peakWindow: "04:00–09:00 IST tomorrow",
  affectedRouteIds: ["nh2-kohima-imphal", "ec-02-dimapur-imphal", "nh44-silchar-aizawl"],
  factors: [
    {
      label: "Rainfall",
      detail: "Cumulative rainfall vs. saturation threshold",
      contribution: 32,
      display: "214 mm / 72 h",
    },
    {
      label: "Terrain",
      detail: "Slope angle, aspect & weathered rock at cut faces",
      contribution: 26,
      display: "41° slope · schist",
    },
    {
      label: "Road history",
      detail: "Prior incidents on this alignment (24-month window)",
      contribution: 16,
      display: "4 events / 24 mo",
    },
    {
      label: "Traffic load",
      detail: "Frequency & axle weight of active convoys",
      contribution: 14,
      display: "38 heavy/day",
    },
    {
      label: "Road condition",
      detail: "Shoulder erosion and drainage state from last survey",
      contribution: 12,
      display: "Shoulder erosion",
    },
  ],
  recommendation:
    "Reroute heavy freight via EC-02 before 22:00. Pre-position two clearance teams at Mao Gate staging and hold 72 h of medical stock at Dimapur railhead.",
  model: { name: "CGRID-Vision", version: "v2.3.1", updatedAt: minutesAgo(6).toISOString() },
  summary:
    "Slope-saturation model projects a high-probability landslide on the NH-2 Kohima–Imphal sector within the next 18–42 hours. Rainfall is the dominant driver, compounded by historic instability along the same cut.",
};

export const SECONDARY_INSIGHTS: AIInsight[] = [
  {
    id: "ai-fl-002",
    title: "Flood exposure — Nagaon / Kolong lowline",
    type: "FLOOD",
    riskScore: 54,
    confidence: 84,
    predictedWindow: "Next 24–36 hours",
    peakWindow: "Late evening today",
    affectedRouteIds: ["nh37-guwahati-nagaon", "nh15-guwahati-itanagar"],
    factors: [
      { label: "River level", detail: "Kolong at 3-day rising trend", contribution: 30, display: "+0.6 m / 72 h" },
      { label: "Catchment rainfall", detail: "Upstream Kaziranga belt", contribution: 27, display: "96 mm / 24 h" },
      { label: "Drainage state", detail: "Culvert capacity from survey", contribution: 23, display: "71% capacity" },
      { label: "Embankment age", detail: "Time since last reinforcement", contribution: 20, display: "6 yrs" },
    ],
    recommendation:
      "Keep PDS convoys on NH-37 for now; prepare a diversion plan via NH-37 bypass if the river rises another 0.4 m.",
    model: { name: "CGRID-Hydro", version: "v1.8.0", updatedAt: minutesAgo(22).toISOString() },
    summary: "Rising Kolong levels create a moderate risk of waterlogging on the Guwahati–Nagaon corridor within a day.",
  },
  {
    id: "ai-wx-003",
    title: "Visibility risk — NH-10 Teesta valley fog",
    type: "WEATHER",
    riskScore: 38,
    confidence: 79,
    predictedWindow: "Early morning, next 2 days",
    peakWindow: "05:00–08:00 IST",
    affectedRouteIds: ["nh10-sevoke-gangtok"],
    factors: [
      { label: "Humidity", detail: "Valley moisture trapping", contribution: 34, display: "94% RH" },
      { label: "Temperature spread", detail: "Dew-point depression", contribution: 29, display: "2.1 °C" },
      { label: "Wind", detail: "Near-calm valley winds", contribution: 22, display: "3 km/h" },
      { label: "Historic fog days", detail: "Same-month fog frequency", contribution: 15, display: "9 days/mo" },
    ],
    recommendation:
      "Shift convoy departures to post-08:00 during the fog window; enforce 40 km/h limits through the Teesta bends.",
    model: { name: "CGRID-Weather", version: "v1.4.2", updatedAt: minutesAgo(35).toISOString() },
    summary: "Radiation fog is likely to cut visibility on the Sevoke–Rangpo stretch over the next two mornings.",
  },
];

export function getInsight(id: string): AIInsight | undefined {
  return [PRIMARY_INSIGHT, ...SECONDARY_INSIGHTS].find((i) => i.id === id);
}
