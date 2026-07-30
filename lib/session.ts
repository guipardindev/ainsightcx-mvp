import type { SessaoAnalise } from "./types";

/**
 * O MVP não usa banco: o resultado da análise vive no sessionStorage
 * e desaparece quando a aba é fechada.
 *
 * Exposto como um store externo para ser lido com `useSyncExternalStore`,
 * evitando setState dentro de efeito só para acessar o storage.
 */
const CHAVE = "ainsightcx:sessao";

/** Marcador devolvido no snapshot de servidor/hidratação. */
export const HIDRATANDO = "hidratando" as const;

const ouvintes = new Set<() => void>();

let brutoEmCache: string | null = null;
let valorEmCache: SessaoAnalise | null = null;

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function assinarSessao(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  window.addEventListener("storage", ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener("storage", ouvinte);
  };
}

/** Snapshot estável: só cria objeto novo quando o conteúdo do storage muda. */
export function lerSessao(): SessaoAnalise | null {
  if (typeof window === "undefined") return null;

  let bruto: string | null = null;
  try {
    bruto = window.sessionStorage.getItem(CHAVE);
  } catch {
    bruto = null;
  }

  if (bruto !== brutoEmCache) {
    brutoEmCache = bruto;
    valorEmCache = bruto ? validar(bruto) : null;
  }
  return valorEmCache;
}

export function snapshotServidor(): typeof HIDRATANDO {
  return HIDRATANDO;
}

export function salvarSessao(sessao: SessaoAnalise): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(CHAVE, JSON.stringify(sessao));
  } catch {
    // Sem espaço ou storage bloqueado: o dashboard cai no estado vazio.
  }
  notificar();
}

export function limparSessao(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(CHAVE);
  } catch {
    // ignora
  }
  notificar();
}

function validar(bruto: string): SessaoAnalise | null {
  try {
    const sessao = JSON.parse(bruto) as SessaoAnalise;
    if (!Array.isArray(sessao?.resultado?.temas) || !Array.isArray(sessao?.mensagens)) return null;
    return sessao;
  } catch {
    return null;
  }
}
