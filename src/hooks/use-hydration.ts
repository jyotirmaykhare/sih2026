"use client";

import { useEffect, useState } from "react";

/**
 * Returns true after client hydration. Use to gate persisted-store-dependent
 * UI so server and client render identically on first paint.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
