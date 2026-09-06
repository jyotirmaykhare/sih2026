// Mock hazard geography — flood / landslide polygons, weather stations,
// and hazard watch points ([lng, lat] coordinates).

export type Ring = [number, number][];

export const HAZARD_ZONES: {
  id: string;
  kind: "FLOOD" | "LANDSLIDE";
  name: string;
  riskPct: number;
  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  rings: Ring[];
}[] = [
  {
    id: "hz-kohima",
    kind: "LANDSLIDE",
    name: "Kohima–Mao slope complex",
    riskPct: 78,
    level: "CRITICAL",
    rings: [
      [
        [93.95, 25.35],
        [94.25, 25.4],
        [94.22, 25.75],
        [94.02, 25.9],
        [93.9, 25.6],
      ],
    ],
  },
  {
    id: "hz-nagaon",
    kind: "FLOOD",
    name: "Kolong–Kapili lowline",
    riskPct: 54,
    level: "HIGH",
    rings: [
      [
        [92.3, 26.05],
        [92.85, 26.12],
        [92.95, 26.45],
        [92.55, 26.55],
        [92.3, 26.35],
      ],
    ],
  },
  {
    id: "hz-jowai",
    kind: "LANDSLIDE",
    name: "Jaintia scarp (Sonapur belt)",
    riskPct: 61,
    level: "HIGH",
    rings: [
      [
        [92.05, 25.05],
        [92.5, 25.08],
        [92.48, 25.42],
        [92.1, 25.38],
      ],
    ],
  },
  {
    id: "hz-teesta",
    kind: "LANDSLIDE",
    name: "Teesta valley cut slopes",
    riskPct: 66,
    level: "HIGH",
    rings: [
      [
        [88.38, 26.7],
        [88.7, 26.78],
        [88.72, 27.3],
        [88.45, 27.25],
      ],
    ],
  },
  {
    id: "hz-dhemaji",
    kind: "FLOOD",
    name: "Dhemaji floodplain",
    riskPct: 47,
    level: "MEDIUM",
    rings: [
      [
        [94.3, 27.35],
        [95.1, 27.4],
        [95.15, 27.95],
        [94.4, 27.9],
      ],
    ],
  },
  {
    id: "hz-sela",
    kind: "LANDSLIDE",
    name: "Sela ridge avalanche zone",
    riskPct: 72,
    level: "CRITICAL",
    rings: [
      [
        [91.85, 27.4],
        [92.25, 27.42],
        [92.2, 27.7],
        [91.9, 27.68],
      ],
    ],
  },
];

export const WEATHER_STATIONS: {
  id: string;
  station: string;
  condition: "HEAVY_RAIN" | "RAIN" | "STORM" | "FOG" | "CLEAR";
  rainfallMm: number;
  position: [number, number];
}[] = [
  { id: "ws-guw", station: "Guwahati IMD", condition: "RAIN", rainfallMm: 12, position: [91.75, 26.14] },
  { id: "ws-shl", station: "Shillong IMD", condition: "HEAVY_RAIN", rainfallMm: 48, position: [91.88, 25.58] },
  { id: "ws-koh", station: "Kohima AWS", condition: "HEAVY_RAIN", rainfallMm: 71, position: [94.11, 25.67] },
  { id: "ws-ixs", station: "Silchar AWS", condition: "STORM", rainfallMm: 93, position: [92.8, 24.83] },
  { id: "ws-ixl", station: "Aizawl AWS", condition: "RAIN", rainfallMm: 34, position: [92.72, 23.73] },
  { id: "ws-ixa", station: "Agartala IMD", condition: "RAIN", rainfallMm: 26, position: [91.28, 23.83] },
  { id: "ws-hgi", station: "Itanagar AWS", condition: "RAIN", rainfallMm: 19, position: [93.62, 27.08] },
  { id: "ws-ggt", station: "Gangtok IMD", condition: "FOG", rainfallMm: 8, position: [88.6, 27.33] },
  { id: "ws-dib", station: "Dibrugarh AWS", condition: "CLEAR", rainfallMm: 0, position: [94.9, 27.47] },
  { id: "ws-imf", station: "Imphal AWS", condition: "HEAVY_RAIN", rainfallMm: 62, position: [93.94, 24.82] },
];

export const EVACUATION_ROUTES: { id: string; name: string; path: LngLatPair[] }[] = [
  {
    id: "ev-shillong-umiam",
    name: "Shillong → Umiam relief camp",
    path: [
      [91.88, 25.58],
      [91.86, 25.7],
      [91.84, 25.83],
      [91.82, 25.96],
    ],
  },
  {
    id: "ev-jiribam-silchar",
    name: "Jiribam → Silchar shelters",
    path: [
      [93.17, 24.92],
      [92.98, 24.88],
      [92.8, 24.83],
    ],
  },
  {
    id: "ev-dhemaji-borighat",
    name: "Dhemaji → Borighat high ground",
    path: [
      [94.58, 27.55],
      [94.72, 27.68],
      [94.9, 27.82],
    ],
  },
];

type LngLatPair = [number, number];
