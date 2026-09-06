// AI intelligence service — explainable insights from the CGRID model suite.
// Backend swap: GET /api/ai/insights.

import { PRIMARY_INSIGHT, SECONDARY_INSIGHTS } from "@/data/ai";
import { mockFetch } from "@/services/client";
import type { AIInsight } from "@/types";

export async function fetchPrimaryInsight(): Promise<AIInsight> {
  return mockFetch(() => ({ ...PRIMARY_INSIGHT }), { latency: [350, 800] });
}

export async function fetchSecondaryInsights(): Promise<AIInsight[]> {
  return mockFetch(() => SECONDARY_INSIGHTS.map((i) => ({ ...i })), { latency: [350, 800] });
}
