import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultLayerVisibility } from "@/lib/constants";
import type { LayerId } from "@/types";

interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  mapLayers: Record<LayerId, boolean>;
  setMapLayer: (id: LayerId, on: boolean) => void;
  toggleMapLayer: (id: LayerId) => void;
  selectedRoadId: string | null;
  setSelectedRoadId: (id: string | null) => void;
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  notificationsReadAt: number;
  markNotificationsRead: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
      mapLayers: defaultLayerVisibility(),
      setMapLayer: (id, on) => set((s) => ({ mapLayers: { ...s.mapLayers, [id]: on } })),
      toggleMapLayer: (id) => set((s) => ({ mapLayers: { ...s.mapLayers, [id]: !s.mapLayers[id] } })),
      selectedRoadId: null,
      setSelectedRoadId: (id) => set({ selectedRoadId: id }),
      selectedVehicleId: null,
      setSelectedVehicleId: (id) => set({ selectedVehicleId: id }),
      notificationsReadAt: 0,
      markNotificationsRead: () => set({ notificationsReadAt: Date.now() }),
    }),
    {
      name: "cgrid-ui",
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        mapLayers: s.mapLayers,
        notificationsReadAt: s.notificationsReadAt,
      }),
    },
  ),
);
