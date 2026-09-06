import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EmergencyActivation {
  activatedAt: string;
  officialId: string;
  reason: string;
  incidentRef: string;
}

interface EmergencyState {
  activation: EmergencyActivation | null;
  activate: (payload: Omit<EmergencyActivation, "activatedAt">) => void;
  deactivate: () => void;
}

export const useEmergencyStore = create<EmergencyState>()(
  persist(
    (set) => ({
      activation: null,
      activate: (payload) =>
        set({ activation: { ...payload, activatedAt: new Date().toISOString() } }),
      deactivate: () => set({ activation: null }),
    }),
    { name: "cgrid-emergency" },
  ),
);
