import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  status: "idle" | "authenticating" | "authenticated";
  setUser: (user: User | null) => void;
  setAuthenticating: (busy: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: "idle",
      setUser: (user) => set({ user, status: user ? "authenticated" : "idle" }),
      setAuthenticating: (busy) => set({ status: busy ? "authenticating" : "idle" }),
      logout: () => set({ user: null, status: "idle" }),
    }),
    {
      name: "cgrid-auth",
      partialize: (s) => ({ user: s.user }),
    },
  ),
);
