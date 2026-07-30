"use client";

import {
  ClipboardCheck,
  Flame,
  Layers,
  MessagesSquare,
  RotateCcw,
  SearchX,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import { KpiCard } from "@/components/kpi-card";
import { ThemeCard } from "@/components/theme-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { parseData } from "@/lib/csv-parser";
import {
  assinarSessao,
  HIDRATANDO,
  lerSessao,
  limparSessao,
  snapshotServidor,
} from "@/lib/session";
import {
  URGENCIA_LABEL,
  URGENCIA_PESO,
  URGENCIAS,
  type Acao,
  type Mensagem,
  type SessaoAnalise,
  type Urgencia,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const PERIODOS = {
  tudo: "Todo o período",
  "7": "Últimos 7 dias",
  "15": "Últimos 15 dias",
  "30": "Últimos 30 dias",
} as const;

type PeriodoChave = keyof typeof PERIODOS;

export function DashboardClient() {
  const router = useRouter();
  const [planos, setPlanos] = useState<Record<string, Acao[]>>({});

  const [urgencia, setUrgencia] = useState<"todas" | Urgencia>("todas");
  const [canal, setCanal] = useState("todos");
  const [periodo, setPeriodo] = useState<PeriodoChave>("tudo");

  // O sessionStorage só existe no browser: durante a hidratação exibimos o esqueleto.
  const snapshot = useSyncExternalStore<SessaoAnalise | null | typeof HIDRATANDO>(
    assinarSessao,
    lerSessao,
    snapshotServidor
  );
  const carregando = snapshot === HIDRATANDO;
  const sessao = carregando ? null : snapshot;

  const mensagensPorId = useMemo(() => {
    const mapa = new Map<number, Mensagem>();
    sessao?.mensagens.forEach((m) => mapa.set(m.id, m));
    return mapa;
  }, [sessao]);

  const canais = useMemo(() => {
    const unicos = new Set<string>();
    sessao?.mensagens.forEach((m) => unicos.add(m.canal));
    return Array.from(unicos).sort();
  }, [sessao]);

  /** Data mais recente do dataset — o filtro de período é relativo a ela, não a hoje. */
  const dataReferencia = useMemo(() => {
    let maior = 0;
    sessao?.mensagens.forEach((m) => {
      const data = parseData(m.data);
      if (data) maior = Math.max(maior, data.getTime());
    });
    return maior || null;
  }, [sessao]);

  const temasVisiveis = useMemo(() => {
    if (!sessao) return [];

    const limite =
      periodo === "tudo" || !dataReferencia
        ? null
        : dataReferencia - Number(periodo) * 24 * 60 * 60 * 1000;

    return sessao.resultado.temas
      .filter((tema) => urgencia === "todas" || tema.urgencia === urgencia)
      .map((tema) => {
        const mensagens = tema.mensagens_ids
          .map((id) => mensagensPorId.get(id))
          .filter((m): m is Mensagem => Boolean(m))
          .filter((m) => canal === "todos" || m.canal === canal)
          .filter((m) => {
            if (limite === null) return true;
            const data = parseData(m.data);
            return data ? data.getTime() >= limite : false;
          });

        return { tema, mensagens };
      })
      .filter(({ mensagens }) => mensagens.length > 0)
      .sort(
        (a, b) =>
          URGENCIA_PESO[b.tema.urgencia] - URGENCIA_PESO[a.tema.urgencia] ||
          b.mensagens.length - a.mensagens.length
      );
  }, [sessao, urgencia, canal, periodo, dataReferencia, mensagensPorId]);

  const kpis = useMemo(() => {
    const totalMensagens = temasVisiveis.reduce((soma, item) => soma + item.mensagens.length, 0);
    const criticos = temasVisiveis.filter(
      ({ tema }) => tema.urgencia === "critica" || tema.urgencia === "alta"
    ).length;
    const comPlano = temasVisiveis.filter(({ tema }) => planos[tema.id]?.length).length;
    return { totalMensagens, temas: temasVisiveis.length, criticos, comPlano };
  }, [temasVisiveis, planos]);

  const filtroAtivo = urgencia !== "todas" || canal !== "todos" || periodo !== "tudo";

  function novaAnalise() {
    limparSessao();
    router.push("/upload");
  }

  if (carregando) {
    return (
      <div className="container-page py-14">
        <Skeleton className="h-9 w-72" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!sessao) {
    return (
      <div className="container-page flex max-w-xl flex-col items-center py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand-text">
          <Upload className="size-7" />
        </span>
        <h1 className="mt-6 font-heading text-2xl font-semibold tracking-tight">
          Nenhuma análise nesta sessão
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Os resultados vivem apenas na memória do navegador. Envie um CSV de interações — ou use o
          dataset de exemplo — para gerar os insights.
        </p>
        <Link href="/upload" className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-6")}>
          <Upload />
          Enviar interações
        </Link>
      </div>
    );
  }

  const { meta } = sessao.resultado;

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="secondary" className="h-7 px-3">
            Passo 2 de 2
          </Badge>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Insights do atendimento
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {meta.total_analisadas} interações analisadas ·{" "}
            <span className="font-mono text-xs">{meta.modelo}</span> ·{" "}
            {new Date(meta.gerado_em).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <Button variant="outline" size="lg" className="h-10" onClick={novaAnalise}>
          <RotateCcw />
          Nova análise
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          rotulo="Mensagens analisadas"
          valor={kpis.totalMensagens}
          descricao={filtroAtivo ? "dentro dos filtros ativos" : "no arquivo enviado"}
          icon={MessagesSquare}
          tom="brand"
        />
        <KpiCard
          rotulo="Temas identificados"
          valor={kpis.temas}
          descricao="agrupados pela IA"
          icon={Layers}
          tom="neutro"
        />
        <KpiCard
          rotulo="Urgência alta ou crítica"
          valor={kpis.criticos}
          descricao="exigem ação prioritária"
          icon={Flame}
          tom="perigo"
        />
        <KpiCard
          rotulo="Temas com plano de ação"
          valor={kpis.comPlano}
          descricao={kpis.comPlano === 0 ? "gere o primeiro abaixo" : "prontos para executar"}
          icon={ClipboardCheck}
          tom="sucesso"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">Temas críticos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ordenados por urgência e volume de interações.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={urgencia}
            onValueChange={(valor) => setUrgencia(valor as "todas" | Urgencia)}
            items={{
              todas: "Todas as urgências",
              ...Object.fromEntries(URGENCIAS.map((u) => [u, URGENCIA_LABEL[u]])),
            }}
          >
            <SelectTrigger className="h-9 w-44" aria-label="Filtrar por urgência">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as urgências</SelectItem>
              {URGENCIAS.map((u) => (
                <SelectItem key={u} value={u}>
                  {URGENCIA_LABEL[u]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={canal}
            onValueChange={(valor) => setCanal(valor as string)}
            items={{
              todos: "Todos os canais",
              ...Object.fromEntries(canais.map((c) => [c, c])),
            }}
          >
            <SelectTrigger className="h-9 w-40 capitalize" aria-label="Filtrar por canal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os canais</SelectItem>
              {canais.map((c) => (
                <SelectItem key={c} value={c} className="capitalize">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={periodo}
            onValueChange={(valor) => setPeriodo(valor as PeriodoChave)}
            items={PERIODOS}
          >
            <SelectTrigger className="h-9 w-44" aria-label="Filtrar por período">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PERIODOS).map(([chave, rotulo]) => (
                <SelectItem key={chave} value={chave}>
                  {rotulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {temasVisiveis.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-14 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <SearchX className="size-6" />
              </span>
              <p className="mt-4 font-heading text-base font-medium">
                Nenhum tema com esses filtros
              </p>
              <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                Ajuste urgência, canal ou período para voltar a ver os insights da análise.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="mt-6 h-9"
                onClick={() => {
                  setUrgencia("todas");
                  setCanal("todos");
                  setPeriodo("tudo");
                }}
              >
                Limpar filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          temasVisiveis.map(({ tema, mensagens }, indice) => (
            <ThemeCard
              key={tema.id}
              tema={tema}
              posicao={indice + 1}
              mensagens={mensagens}
              plano={planos[tema.id]}
              onPlano={(temaId, acoes) => setPlanos((atual) => ({ ...atual, [temaId]: acoes }))}
            />
          ))
        )}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Os resultados são gerados por IA e podem conter imprecisões. Valide antes de decidir. Nada é
        armazenado em servidor — a análise vive apenas nesta sessão do navegador.
      </p>
    </div>
  );
}
