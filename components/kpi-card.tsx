import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  rotulo: string;
  valor: number | string;
  descricao?: string;
  icon: LucideIcon;
  /** Cor de destaque do ícone e do número. */
  tom?: "neutro" | "brand" | "sucesso" | "aviso" | "perigo";
}

const TONS = {
  neutro: { icone: "bg-muted text-muted-foreground", valor: "" },
  brand: { icone: "bg-brand/10 text-brand-text", valor: "" },
  sucesso: { icone: "bg-success/12 text-success-text", valor: "" },
  aviso: { icone: "bg-warning/15 text-warning-text", valor: "text-warning-text" },
  perigo: { icone: "bg-danger/12 text-danger-text", valor: "text-danger-text" },
} as const;

export function KpiCard({ rotulo, valor, descricao, icon: Icone, tom = "neutro" }: Props) {
  const estilo = TONS[tom];

  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-muted-foreground">{rotulo}</p>
          <span
            className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", estilo.icone)}
          >
            <Icone className="size-4" />
          </span>
        </div>
        <p
          className={cn(
            "mt-3 font-heading text-3xl font-semibold tracking-tight tabular-nums",
            estilo.valor
          )}
        >
          {valor}
        </p>
        {descricao && <p className="mt-1 text-xs text-muted-foreground">{descricao}</p>}
      </CardContent>
    </Card>
  );
}
