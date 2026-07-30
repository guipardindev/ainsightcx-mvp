"use client";

import {
  AlertCircle,
  ChevronDown,
  Loader2,
  MessageSquareText,
  RefreshCw,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { UrgencyBadge } from "@/components/urgency-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatarData } from "@/lib/csv-parser";
import { PRAZO_LABEL, type Acao, type Mensagem, type Tema } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  tema: Tema;
  posicao: number;
  mensagens: Mensagem[];
  plano: Acao[] | undefined;
  onPlano: (temaId: string, acoes: Acao[]) => void;
}

const PRAZO_ESTILO: Record<string, string> = {
  imediato: "bg-danger/12 text-danger-text ring-1 ring-danger/30",
  semana: "bg-warning/15 text-warning-text ring-1 ring-warning/35",
  mes: "bg-brand/10 text-brand-text ring-1 ring-brand-accent/30",
};

export function ThemeCard({ tema, posicao, mensagens, plano, onPlano }: Props) {
  const [expandido, setExpandido] = useState(false);
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function gerarPlano() {
    setGerando(true);
    setErro(null);

    try {
      const resposta = await fetch("/api/action-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, mensagens }),
      });

      const dados = (await resposta.json().catch(() => null)) as
        | { acoes?: Acao[]; error?: string }
        | null;

      if (!resposta.ok || !dados?.acoes) {
        throw new Error(dados?.error ?? "Não foi possível gerar o plano de ação.");
      }

      onPlano(tema.id, dados.acoes);
      toast.success(`Plano de ação gerado para "${tema.nome}".`);
    } catch (falha) {
      const mensagem = falha instanceof Error ? falha.message : "Erro inesperado ao gerar o plano.";
      setErro(mensagem);
      toast.error(mensagem);
    } finally {
      setGerando(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-xs text-muted-foreground">
              {posicao}
            </span>
            <div className="min-w-0">
              <CardTitle className="text-base">{tema.nome}</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {tema.volume} {tema.volume === 1 ? "interação" : "interações"} agrupadas
              </p>
            </div>
          </div>
          <UrgencyBadge urgencia={tema.urgencia} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{tema.resumo}</p>

        {tema.principais_queixas.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tema.principais_queixas.map((queixa) => (
              <Badge key={queixa} variant="secondary" className="font-normal">
                {queixa}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="lg"
            className="h-9"
            aria-expanded={expandido}
            onClick={() => setExpandido((v) => !v)}
          >
            <MessageSquareText />
            {expandido ? "Ocultar mensagens" : "Ver mensagens"}
            <ChevronDown className={cn("transition-transform", expandido && "rotate-180")} />
          </Button>

          <Button
            size="lg"
            variant={plano ? "outline" : "default"}
            className="h-9"
            disabled={gerando}
            onClick={() => void gerarPlano()}
          >
            {gerando ? <Loader2 className="animate-spin" /> : plano ? <RefreshCw /> : <Sparkles />}
            {gerando ? "Gerando plano…" : plano ? "Gerar novamente" : "Gerar plano de ação"}
          </Button>
        </div>

        {erro && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Falha ao gerar o plano</AlertTitle>
            <AlertDescription>{erro}</AlertDescription>
          </Alert>
        )}

        {expandido && (
          <div className="space-y-2 rounded-lg bg-muted/50 p-3">
            {mensagens.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhuma mensagem original foi vinculada a este tema.
              </p>
            )}
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className="rounded-md bg-background p-3 ring-1 ring-foreground/5"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="capitalize">
                    {mensagem.canal}
                  </Badge>
                  <span>{formatarData(mensagem.data)}</span>
                  {mensagem.cliente_id && (
                    <span className="font-mono">· {mensagem.cliente_id}</span>
                  )}
                </div>
                <p className="mt-2 text-sm">{mensagem.mensagem}</p>
              </div>
            ))}
          </div>
        )}

        {plano && plano.length > 0 && (
          <div className="rounded-lg bg-accent/50 p-4 ring-1 ring-brand-accent/20">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand-text" />
              <h4 className="font-heading text-sm font-medium">Plano de ação sugerido pela IA</h4>
            </div>

            <Separator className="my-3" />

            <ol className="space-y-4">
              {plano.map((acao, indice) => (
                <li key={`${acao.titulo}-${indice}`} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-brand-foreground">
                    {indice + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{acao.titulo}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{acao.descricao}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="ghost"
                        className={cn("font-medium", PRAZO_ESTILO[acao.prazo])}
                      >
                        {PRAZO_LABEL[acao.prazo]}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <UserRound className="size-3" />
                        {acao.responsavel}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
