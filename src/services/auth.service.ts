// Authentication service — simulated against the demo directory.
// Swap `authenticate` with the real API call when the backend exists.

import { DEMO_ACCOUNTS } from "@/data/users";
import { mockFetch } from "@/services/client";
import type { User } from "@/types";

export async function authenticate(officialId: string, password: string): Promise<User | null> {
  return mockFetch(() => {
    const id = officialId.trim().toUpperCase();
    const account = DEMO_ACCOUNTS.find((a) => a.user.officialId.toUpperCase() === id);
    if (!account || account.password !== password) return null;
    return account.user;
  });
}

export async function fetchDemoAccounts(): Promise<User[]> {
  return mockFetch(() => DEMO_ACCOUNTS.map((a) => a.user), { latency: [150, 300] });
}
