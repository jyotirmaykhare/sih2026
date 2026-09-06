// Mock bridge asset data across the NER.

import { minutesAgo } from "@/lib/format";
import type { BridgeInfo } from "@/types";

export const BRIDGES: BridgeInfo[] = [
  {
    id: "br-umiam",
    name: "Umiam Viaduct",
    carries: "NH-27",
    river: "Umiam",
    status: "OPEN",
    lastInspected: "2026-08-19",
    position: { lat: 25.66, lng: 91.89 },
  },
  {
    id: "br-barak",
    name: "Barak Bridge II",
    carries: "NH-37",
    river: "Barak",
    status: "CLOSED",
    lastInspected: minutesAgo(60 * 26).toISOString(),
    position: { lat: 24.86, lng: 92.98 },
  },
  {
    id: "br-mao",
    name: "Mao Gate Culvert",
    carries: "NH-2",
    river: "Barak headwater",
    status: "RESTRICTED",
    lastInspected: minutesAgo(60 * 40).toISOString(),
    position: { lat: 25.48, lng: 94.03 },
  },
  {
    id: "br-teesta",
    name: "Rangpo Bridge",
    carries: "NH-10",
    river: "Teesta",
    status: "RESTRICTED",
    lastInspected: "2026-08-28",
    position: { lat: 27.18, lng: 88.58 },
  },
  {
    id: "br-kolong",
    name: "Kolong Crossing",
    carries: "NH-37",
    river: "Kolong",
    status: "OPEN",
    lastInspected: "2026-07-30",
    position: { lat: 26.34, lng: 92.66 },
  },
  {
    id: "br-tlawng",
    name: "Tlawng Bridge",
    carries: "NH-44",
    river: "Tlawng",
    status: "OPEN",
    lastInspected: "2026-08-05",
    position: { lat: 23.96, lng: 92.71 },
  },
  {
    id: "br-sela",
    name: "Sela Chortenala Bridge",
    carries: "NH-13",
    river: "Tawang Chu",
    status: "RESTRICTED",
    lastInspected: "2026-09-01",
    position: { lat: 27.5, lng: 92.03 },
  },
];
