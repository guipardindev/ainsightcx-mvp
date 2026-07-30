import type { Metadata } from "next";

import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard de insights",
  description:
    "Temas críticos, resumos executivos e planos de ação gerados a partir das suas interações de atendimento.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
