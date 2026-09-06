// Formatting helpers — all times are presented in IST (Asia/Kolkata).

const IST_TZ = "Asia/Kolkata";

export function formatTimeIST(date: Date | string | number, withSeconds = true): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hour12: false,
    timeZone: IST_TZ,
  }).format(d);
}

export function formatDateIST(date: Date | string | number): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: IST_TZ,
  }).format(d);
}

export function formatDateTimeIST(date: Date | string | number): string {
  return `${formatDateIST(date)} · ${formatTimeIST(date, false)} IST`;
}

/** Relative time for activity feeds / alerts, e.g. "12 min ago". */
export function formatAgo(date: Date | string | number, now: Date = new Date()): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  const diffSec = Math.max(0, Math.floor((now.getTime() - d.getTime()) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} d ago`;
  return formatDateIST(d);
}

export function formatNumber(n: number, digits = 0): string {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

export function formatDelay(minutes: number): string {
  if (minutes <= 0) return "No delay";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function minutesAgo(minutes: number, from: Date = new Date()): Date {
  return new Date(from.getTime() - minutes * 60_000);
}
