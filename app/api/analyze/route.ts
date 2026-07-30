import { NextResponse } from "next/server";

import { LIMITE_ANALISE } from "@/lib/csv-parser";
import { chamarGroqJSON, GROQ_MODEL, GroqError } from "@/lib/groq";
import { promptAnalise, SYSTEM_ANALISE } from "@/lib/prompts";
import {
  slug,
  URGENCIAS,
  type AnalyzeResult,
  type Mensagem,
  type Tema,
  type Urgencia,
} from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

interface TemaBruto {
  nome?: unknown;
  urgencia?: unknown;
  volume?: unknown;
  resumo?: unknown;
  principais_queixas?: unknown;
  mensagens_ids?: unknown;
}

export async function POST(request: Request) {
  let corpo: { mensagens?: unknown };
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const mensagens = validarMensagens(corpo.mensagens);
  if (!mensagens) {
    return NextResponse.json(
      { error: "Envie um array de mensagens com os campos data, canal e mensagem." },
      { status: 400 }
    );
  }

  const recorte = mensagens.slice(0, LIMITE_ANALISE);

  try {
    const bruto = await chamarGroqJSON<{ temas?: TemaBruto[] }>({
      system: SYSTEM_ANALISE,
      user: promptAnalise(recorte),
      maxTokens: 4096,
    });

    const temas = normalizarTemas(bruto?.temas, recorte);

    if (temas.length === 0) {
      return NextResponse.json(
        { error: "A IA não conseguiu identificar temas nessas mensagens. Tente novamente." },
        { status: 502 }
      );
    }

    const resultado: AnalyzeResult = {
      temas,
      meta: {
        total_mensagens: mensagens.length,
        total_analisadas: recorte.length,
        modelo: GROQ_MODEL,
        gerado_em: new Date().toISOString(),
      },
    };

    return NextResponse.json(resultado);
  } catch (erro) {
    if (erro instanceof GroqError) {
      console.error("[analyze] Groq falhou:", erro.message);
      return NextResponse.json({ error: erro.userMessage }, { status: erro.status });
    }
    console.error("[analyze] Erro inesperado:", erro);
    return NextResponse.json(
      { error: "Erro inesperado ao analisar as mensagens. Tente novamente." },
      { status: 500 }
    );
  }
}

function validarMensagens(valor: unknown): Mensagem[] | null {
  if (!Array.isArray(valor) || valor.length === 0) return null;

  const mensagens: Mensagem[] = [];
  for (const item of valor) {
    if (typeof item !== "object" || item === null) return null;
    const registro = item as Record<string, unknown>;
    const texto = typeof registro.mensagem === "string" ? registro.mensagem.trim() : "";
    if (!texto) continue;

    mensagens.push({
      id: typeof registro.id === "number" ? registro.id : mensagens.length + 1,
      data: typeof registro.data === "string" ? registro.data : "",
      canal: typeof registro.canal === "string" && registro.canal ? registro.canal : "não informado",
      mensagem: texto.slice(0, 1200),
      cliente_id: typeof registro.cliente_id === "string" ? registro.cliente_id : undefined,
    });
  }

  return mensagens.length > 0 ? mensagens : null;
}

/** Converte o que a IA devolveu em Temas confiáveis (a IA erra formato de vez em quando). */
function normalizarTemas(bruto: unknown, mensagens: Mensagem[]): Tema[] {
  if (!Array.isArray(bruto)) return [];

  const idsValidos = new Set(mensagens.map((m) => m.id));
  const usados = new Set<number>();

  const temas: Tema[] = [];

  bruto.forEach((item: TemaBruto, indice) => {
    if (typeof item !== "object" || item === null) return;

    const nome = typeof item.nome === "string" ? item.nome.trim() : "";
    if (!nome) return;

    const ids = Array.isArray(item.mensagens_ids)
      ? item.mensagens_ids
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && idsValidos.has(id) && !usados.has(id))
      : [];
    ids.forEach((id) => usados.add(id));

    const queixas = Array.isArray(item.principais_queixas)
      ? item.principais_queixas
          .filter((q): q is string => typeof q === "string" && q.trim().length > 0)
          .map((q) => q.trim())
          .slice(0, 4)
      : [];

    temas.push({
      id: `tema-${indice + 1}`,
      nome,
      urgencia: normalizarUrgencia(item.urgencia),
      volume: ids.length || Math.max(0, Number(item.volume) || 0),
      resumo:
        typeof item.resumo === "string" && item.resumo.trim()
          ? item.resumo.trim()
          : "Resumo não disponível para este tema.",
      principais_queixas: queixas,
      mensagens_ids: ids,
    });
  });

  // Mensagens que a IA esqueceu de atribuir viram um tema residual — nada some do relatório.
  const orfas = mensagens.filter((m) => !usados.has(m.id));
  if (orfas.length > 0 && temas.length > 0) {
    temas.push({
      id: `tema-${temas.length + 1}`,
      nome: "Outros assuntos",
      urgencia: "baixa",
      volume: orfas.length,
      resumo:
        "Interações que não se encaixaram nos temas principais identificados pela IA. Vale uma leitura manual para checar se há sinal relevante.",
      principais_queixas: [],
      mensagens_ids: orfas.map((m) => m.id),
    });
  }

  return temas.filter((t) => t.volume > 0);
}

function normalizarUrgencia(valor: unknown): Urgencia {
  const normalizado = typeof valor === "string" ? slug(valor) : "";
  const encontrado = URGENCIAS.find((u) => u === normalizado);
  if (encontrado) return encontrado;
  if (normalizado.startsWith("cri")) return "critica";
  if (normalizado.startsWith("alt") || normalizado.startsWith("hig")) return "alta";
  if (normalizado.startsWith("bai") || normalizado.startsWith("low")) return "baixa";
  return "media";
}
