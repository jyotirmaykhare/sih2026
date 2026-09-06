"use client";

import { useEffect, useState } from "react";
import { formatDateIST, formatTimeIST } from "@/lib/format";

/** Live IST clock — re-renders once per second. */
export function useClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return {
    now,
    dateLabel: now ? formatDateIST(now) : "—",
    timeLabel: now ? `${formatTimeIST(now)} IST` : "—:—:— IST",
  };
}
