import {
  Accessibility,
  AlertTriangle,
  Ambulance,
  BarChart3,
  BrainCircuit,
  ClipboardList,
  CloudRain,
  Container,
  History,
  LayoutDashboard,
  Map,
  Package,
  Radar,
  RadioTower,
  Route,
  Siren,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  emergency?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Command Center", href: "/command-center", icon: LayoutDashboard },
      { label: "Live Map", href: "/live-map", icon: Map },
      { label: "AI Intelligence", href: "/intelligence", icon: BrainCircuit },
    ],
  },
  {
    label: "Logistics",
    items: [
      { label: "Routes", href: "/routes", icon: Route },
      { label: "Vehicles", href: "/vehicles", icon: Truck },
      { label: "Shipments", href: "/shipments", icon: Package },
      { label: "Accessibility", href: "/accessibility", icon: Accessibility },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Disruptions", href: "/disruptions", icon: AlertTriangle },
      { label: "Weather", href: "/weather", icon: CloudRain },
      { label: "Risk Analysis", href: "/risk", icon: Radar },
      { label: "Field Reports", href: "/field-reports", icon: ClipboardList },
    ],
  },
  {
    label: "Emergency",
    items: [
      { label: "Emergency Operations", href: "/emergency/operations", icon: Siren, emergency: true },
      { label: "Emergency Routes", href: "/emergency/routes", icon: Ambulance, emergency: true },
      { label: "Resource Command", href: "/emergency/resource-command", icon: Warehouse, emergency: true },
      { label: "Broadcast Center", href: "/emergency/broadcast", icon: RadioTower, emergency: true },
    ],
  },
  {
    label: "Analytics",
    items: [
      { label: "Regional Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Supply Chain", href: "/supply-chain", icon: Container },
      { label: "Historical Data", href: "/historical", icon: History },
    ],
  },
];

export function findNavItem(pathname: string): NavItem | undefined {
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (pathname === item.href) return item;
    }
  }
  return undefined;
}
