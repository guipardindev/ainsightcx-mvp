import { AlertTriangle, ArrowUp, Flame, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { URGENCIA_LABEL, type Urgencia } from "@/lib/types";
import { cn } from "@/lib/utils";

const ESTILO: Record<Urgencia, { classe: string; icon: typeof Flame }> = {
  critica: { classe: "bg-danger/12 text-danger-text ring-1 ring-danger/30", icon: Flame },
  alta: { classe: "bg-warning/15 text-warning-text ring-1 ring-warning/35", icon: AlertTriangle },
  media: { classe: "bg-brand/10 text-brand-text ring-1 ring-brand-accent/30", icon: ArrowUp },
  baixa: { classe: "bg-success/12 text-success-text ring-1 ring-success/30", icon: Minus },
};

export function UrgencyBadge({
  urgencia,
  className,
}: {
  urgencia: Urgencia;
  className?: string;
}) {
  const { classe, icon: Icone } = ESTILO[urgencia];

  return (
    <Badge variant="ghost" className={cn("gap-1 pl-1.5 font-medium", classe, className)}>
      <Icone aria-hidden />
      {URGENCIA_LABEL[urgencia]}
    </Badge>
  );
}
