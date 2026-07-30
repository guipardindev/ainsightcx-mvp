/**
 * Tipos compartilhados entre client e server.
 * O MVP é stateless: nada aqui é persistido em banco.
 */

export const URGENCIAS = ["baixa", "media", "alta", "critica"] as const;
export type Urgencia = (typeof URGENCIAS)[number];

export const PRAZOS = ["imediato", "semana", "mes"] as const;
export type Prazo = (typeof PRAZOS)[number];

/** Uma linha do CSV enviado pelo usuário, já normalizada. */
export interface Mensagem {
  id: number;
  data: string;
  canal: string;
  mensagem: string;
  cliente_id?: string;
}

/** Um agrupamento temático devolvido pela IA. */
export interface Tema {
  id: string;
  nome: string;
  urgencia: Urgencia;
  volume: number;
  resumo: string;
  principais_queixas: string[];
  mensagens_ids: number[];
}

export interface AnalyzeResult {
  temas: Tema[];
  meta: {
    total_mensagens: number;
    total_analisadas: number;
    modelo: string;
    gerado_em: string;
  };
}

export interface Acao {
  titulo: string;
  descricao: string;
  prazo: Prazo;
  responsavel: string;
}

export interface ActionPlanResult {
  acoes: Acao[];
}

/** Payload guardado em sessionStorage entre /upload e /dashboard. */
export interface SessaoAnalise {
  mensagens: Mensagem[];
  resultado: AnalyzeResult;
}

export const URGENCIA_LABEL: Record<Urgencia, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
  critica: "Crítica",
};

export const URGENCIA_PESO: Record<Urgencia, number> = {
  critica: 4,
  alta: 3,
  media: 2,
  baixa: 1,
};

export const PRAZO_LABEL: Record<Prazo, string> = {
  imediato: "Imediato",
  semana: "Esta semana",
  mes: "Este mês",
};

/** Remove acentos e normaliza para comparar valores vindos da IA. */
export function slug(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
