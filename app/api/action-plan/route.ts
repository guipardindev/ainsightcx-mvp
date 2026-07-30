import { NextResponse } from "next/server";

import { chamarGroqJSON, GroqError } from "@/lib/groq";
import { promptPlano, SYSTEM_PLANO } from "@/lib/prompts";
import {
  PRAZOS,
  slug,
  type Acao,
  type ActionPlanResult,
  type Mensagem,
  type Prazo,
  type Tema,
} from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  let corpo: { tema?: unknown; mensagens?: unknown };
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const tema = validarTema(corpo.tema);
  if (!tema) {
    return NextResponse.json(
      { error: "Envie o tema (nome, urgência, volume e resumo) para gerar o plano." },
      { status: 400 }
    );
  }

  const mensagens = Array.isArray(corpo.mensagens)
    ? (corpo.mensagens as Mensagem[]).filter(
        (m) => m && typeof m.mensagem === "string" && m.mensagem.trim()
      )
    : [];

  try {
    const bruto = await chamarGroqJSON<{ acoes?: unknown }>({
      system: SYSTEM_PLANO,
      user: promptPlano(tema, mensagens),
      maxTokens: 1800,
    });

    const acoes = normalizarAcoes(bruto?.acoes);

    if (acoes.length === 0) {
      return NextResponse.json(
        { error: "A IA não devolveu ações válidas para este tema. Tente novamente." },
        { status: 502 }
      );
    }

    const resultado: ActionPlanResult = { acoes };
    return NextResponse.json(resultado);
  } catch (erro) {
    if (erro instanceof GroqError) {
      console.error("[action-plan] Groq falhou:", erro.message);
      return NextResponse.json({ error: erro.userMessage }, { status: erro.status });
    }
    console.error("[action-plan] Erro inesperado:", erro);
    return NextResponse.json(
      { error: "Erro inesperado ao gerar o plano de ação. Tente novamente." },
      { status: 500 }
    );
  }
}

function validarTema(valor: unknown): Tema | null {
  if (typeof valor !== "object" || valor === null) return null;
  const registro = valor as Record<string, unknown>;
  const nome = typeof registro.nome === "string" ? registro.nome.trim() : "";
  if (!nome) return null;

  return {
    id: typeof registro.id === "string" ? registro.id : "tema",
    nome,
    urgencia: (typeof registro.urgencia === "string" ? registro.urgencia : "media") as Tema["urgencia"],
    volume: Number(registro.volume) || 0,
    resumo: typeof registro.resumo === "string" ? registro.resumo : "",
    principais_queixas: Array.isArray(registro.principais_queixas)
      ? registro.principais_queixas.filter((q): q is string => typeof q === "string")
      : [],
    mensagens_ids: Array.isArray(registro.mensagens_ids)
      ? registro.mensagens_ids.map(Number).filter(Number.isInteger)
      : [],
  };
}

function normalizarAcoes(bruto: unknown): Acao[] {
  if (!Array.isArray(bruto)) return [];

  return bruto
    .map((item): Acao | null => {
      if (typeof item !== "object" || item === null) return null;
      const registro = item as Record<string, unknown>;
      const titulo = typeof registro.titulo === "string" ? registro.titulo.trim() : "";
      if (!titulo) return null;

      return {
        titulo,
        descricao:
          typeof registro.descricao === "string" && registro.descricao.trim()
            ? registro.descricao.trim()
            : "Sem descrição adicional.",
        prazo: normalizarPrazo(registro.prazo),
        responsavel:
          typeof registro.responsavel === "string" && registro.responsavel.trim()
            ? registro.responsavel.trim()
            : "A definir",
      };
    })
    .filter((a): a is Acao => a !== null)
    .slice(0, 5);
}

function normalizarPrazo(valor: unknown): Prazo {
  const normalizado = typeof valor === "string" ? slug(valor) : "";
  const encontrado = PRAZOS.find((p) => p === normalizado);
  if (encontrado) return encontrado;
  if (normalizado.includes("imediat") || normalizado.includes("urgen")) return "imediato";
  if (normalizado.includes("seman")) return "semana";
  return "mes";
}
