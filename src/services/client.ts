// Mock API adapter.
//
// All services resolve data through `mockFetch` to simulate network latency.
// When the real backend is ready, swap each service's body for a real call,
// e.g.:
//   return httpGet<User>(`/api/auth/session`);
// No component or store needs to change — they only consume services.

export interface MockOptions {
  /** latency range in ms [min, max] */
  latency?: [number, number];
  /** force a rejection to exercise UI error states */
  fail?: boolean;
}

export class ApiError extends Error {
  constructor(message: string, readonly status = 0) {
    super(message);
    this.name = "ApiError";
  }
}

export async function mockFetch<T>(resolver: () => T, opts: MockOptions = {}): Promise<T> {
  const [min, max] = opts.latency ?? [280, 720];
  const delay = min + Math.random() * (max - min);
  await new Promise((resolve) => setTimeout(resolve, delay));
  if (opts.fail) {
    throw new ApiError("Simulated upstream failure");
  }
  return resolver();
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
