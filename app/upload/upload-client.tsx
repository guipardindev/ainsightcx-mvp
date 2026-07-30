"use client";

import { AlertCircle, ArrowRight, Info, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CsvUploader, type ArquivoCarregado } from "@/components/csv-uploader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatarData, LIMITE_ANALISE } from "@/lib/csv-parser";
import { limparSessao, salvarSessao } from "@/lib/session";
import type { AnalyzeResult } from "@/lib/types";

const FASES = [
  "Enviando as interações para a IA",
  "Agrupando mensagens por tema",
  "Classificando a urgência de cada tema",
  "Escrevendo os resumos executivos",
];

export function UploadClient() {
  const router = useRouter();
  const [arquivo, setArquivo] = useState<ArquivoCarregado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [analisando, setAnalisando] = useState(false);
  const [fase, setFase] = useState(0);
  const [progresso, setProgresso] = useState(0);

  // Feedback de progresso enquanto a IA processa o lote inteiro.
  useEffect(() => {
    if (!analisando) return;

    const inicio = Date.now();
    const timer = window.setInterval(() => {
      const decorrido = (Date.now() - inicio) / 1000;
      // Curva assintótica: nunca chega a 100% antes da resposta real.
      setProgresso(Math.min(94, Math.round(100 * (1 - Math.exp(-decorrido / 9)))));
      setFase(Math.min(FASES.length - 1, Math.floor(decorrido / 4)));
    }, 300);

    return () => window.clearInterval(timer);
  }, [analisando]);

  function aoCarregar(carregado: ArquivoCarregado) {
    setErro(null);
    setArquivo(carregado);
    limparSessao();
  }

  async function analisar() {
    if (!arquivo) return;

    setAnalisando(true);
    setErro(null);
    setProgresso(0);
    setFase(0);

    const recorte = arquivo.mensagens.slice(0, LIMITE_ANALISE);

    try {
      const resposta = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagens: recorte }),
      });

      const dados = (await resposta.json().catch(() => null)) as
        | (AnalyzeResult & { error?: string })
        | null;

      if (!resposta.ok || !dados || !dados.temas) {
        throw new Error(dados?.error ?? "Não foi possível concluir a análise. Tente novamente.");
      }

      setProgresso(100);
      salvarSessao({ mensagens: recorte, resultado: dados });
      toast.success(`Análise concluída: ${dados.temas.length} temas identificados.`);
      router.push("/dashboard");
    } catch (falha) {
      const mensagem =
        falha instanceof Error ? falha.message : "Erro inesperado ao falar com a IA.";
      setErro(mensagem);
      toast.error(mensagem);
      setAnalisando(false);
      setProgresso(0);
    }
  }

  const total = arquivo?.mensagens.length ?? 0;
  const excedente = Math.max(0, total - LIMITE_ANALISE);
  const analisadas = Math.min(total, LIMITE_ANALISE);

  return (
    <div className="container-page max-w-4xl py-14 sm:py-20">
      <div className="text-center">
        <Badge variant="secondary" className="h-7 px-3">
          Passo 1 de 2
        </Badge>
        <h1 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Envie suas interações de atendimento
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
          Um CSV com as conversas de suporte já basta. Se quiser apenas ver o produto rodando, use o
          dataset de exemplo.
        </p>
      </div>

      <div className="mt-10 space-y-5">
        {!analisando && (
          <CsvUploader
            onCarregado={aoCarregar}
            onErro={(mensagem) => {
              setErro(mensagem);
              setArquivo(null);
            }}
          />
        )}

        {erro && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Não deu para seguir</AlertTitle>
            <AlertDescription>{erro}</AlertDescription>
          </Alert>
        )}

        {analisando && (
          <Card>
            <CardContent className="py-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
                <Loader2 className="size-6 animate-spin" />
              </span>
              <p className="mt-4 font-heading text-base font-medium">
                Processando {analisadas} {analisadas === 1 ? "mensagem" : "mensagens"} com IA
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{FASES[fase]}…</p>

              <Progress value={progresso} className="mx-auto mt-6 max-w-md" />

              <p className="mt-3 text-xs text-muted-foreground">
                A análise é feita em um único lote para ficar mais rápida e barata. Costuma levar
                entre 10 e 30 segundos.
              </p>
            </CardContent>
          </Card>
        )}

        {arquivo && !analisando && (
          <>
            {arquivo.avisos.map((aviso) => (
              <Alert key={aviso}>
                <Info />
                <AlertTitle>Atenção ao arquivo</AlertTitle>
                <AlertDescription>{aviso}</AlertDescription>
              </Alert>
            ))}

            {excedente > 0 && (
              <Alert>
                <Info />
                <AlertTitle>Limite desta demonstração</AlertTitle>
                <AlertDescription>
                  Seu arquivo tem {total} mensagens. Nesta versão gratuita analisamos as primeiras{" "}
                  {LIMITE_ANALISE} — as outras {excedente} ficam de fora.
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader className="border-b">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="font-mono text-sm">{arquivo.nome}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {total} {total === 1 ? "interação válida" : "interações válidas"} ·
                      pré-visualização das {Math.min(10, total)} primeiras
                    </p>
                  </div>
                  {arquivo.exemplo && <Badge variant="secondary">Dados de exemplo</Badge>}
                </div>
              </CardHeader>

              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-14">#</TableHead>
                        <TableHead className="w-28">Data</TableHead>
                        <TableHead className="w-28">Canal</TableHead>
                        <TableHead className="min-w-[22rem]">Mensagem</TableHead>
                        <TableHead className="w-28">Cliente</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {arquivo.mensagens.slice(0, 10).map((mensagem) => (
                        <TableRow key={mensagem.id}>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {mensagem.id}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-xs">
                            {formatarData(mensagem.data)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {mensagem.canal}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <span className="line-clamp-2 text-muted-foreground">
                              {mensagem.mensagem}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {mensagem.cliente_id ?? "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="lg"
                className="h-11"
                onClick={() => {
                  setArquivo(null);
                  setErro(null);
                }}
              >
                <RotateCcw />
                Trocar arquivo
              </Button>
              <Button size="lg" className="h-11 px-6" onClick={() => void analisar()}>
                <Sparkles />
                Analisar com IA
                <ArrowRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
