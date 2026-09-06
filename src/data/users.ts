// Demo users — simulated authentication directory (backend swap: see
// services/auth.service.ts).

import type { User } from "@/types";

export interface DemoAccount {
  user: User;
  password: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    user: {
      id: "u-lo",
      officialId: "LO-2047",
      name: "Anupam Baruah",
      role: "LOGISTICS_OFFICER",
      designation: "Regional Logistics Officer",
      region: "NER Regional Cell · Guwahati",
      initials: "AB",
    },
    password: "grid2026",
  },
  {
    user: {
      id: "u-do",
      officialId: "DO-1186",
      name: "Meera Hazarika",
      role: "DISTRICT_OFFICER",
      designation: "District Logistics Officer",
      region: "Kamrup District HQ",
      initials: "MH",
    },
    password: "grid2026",
  },
  {
    user: {
      id: "u-ec",
      officialId: "EC-0031",
      name: "V. K. Nair",
      role: "EMERGENCY_COMMANDER",
      designation: "Emergency Commander",
      region: "NER Emergency Response Command",
      initials: "VN",
    },
    password: "grid2026",
  },
  {
    user: {
      id: "u-ad",
      officialId: "AD-0001",
      name: "A. Choudhury",
      role: "ADMINISTRATOR",
      designation: "State Nodal Administrator",
      region: "NER Transport Directorate",
      initials: "AC",
    },
    password: "grid2026",
  },
];
