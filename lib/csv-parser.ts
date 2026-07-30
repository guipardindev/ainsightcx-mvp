import Papa from "papaparse";

import { slug, type Mensagem } from "./types";

export const COLUNAS_OBRIGATORIAS = ["data", "canal", "mensagem"] as const;
export const COLUNA_OPCIONAL = "cliente_id";

/** Teto de mensagens enviadas à IA em uma única análise. */
export const LIMITE_ANALISE = 30;

export interface ResultadoParse {
  mensagens: Mensagem[];
  /** Total de linhas válidas encontradas no arquivo (pode ser > mensagens.length). */
  totalLinhas: number;
  avisos: string[];
}

export class CsvError extends Error {}

/** Normaliza cabeçalhos: "Cliente ID" -> "cliente_id". */
function normalizarHeader(header: string): string {
  return slug(header).replace(/[\s-]+/g, "_");
}

/**
 * Lê um CSV (texto) e devolve mensagens normalizadas.
 * Lança CsvError com mensagem pronta para exibir ao usuário.
 */
export function parseCsv(texto: string): ResultadoParse {
  const resultado = Papa.parse<Record<string, string>>(texto, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: normalizarHeader,
  });

  const campos = resultado.meta.fields ?? [];
  if (campos.length === 0) {
    throw new CsvError(
      "Não foi possível ler o cabeçalho do arquivo. Confira se ele é um CSV com a primeira linha de títulos."
    );
  }

  const faltando = COLUNAS_OBRIGATORIAS.filter((c) => !campos.includes(c));
  if (faltando.length > 0) {
    throw new CsvError(
      `O arquivo precisa das colunas ${COLUNAS_OBRIGATORIAS.join(", ")}. Faltou: ${faltando.join(", ")}.`
    );
  }

  const avisos: string[] = [];
  const mensagens: Mensagem[] = [];
  let descartadas = 0;

  for (const linha of resultado.data) {
    const mensagem = (linha.mensagem ?? "").trim();
    if (!mensagem) {
      descartadas += 1;
      continue;
    }
    mensagens.push({
      id: mensagens.length + 1,
      data: (linha.data ?? "").trim(),
      canal: (linha.canal ?? "").trim() || "não informado",
      mensagem,
      cliente_id: (linha[COLUNA_OPCIONAL] ?? "").trim() || undefined,
    });
  }

  if (mensagens.length === 0) {
    throw new CsvError("Nenhuma linha com mensagem preenchida foi encontrada no arquivo.");
  }

  if (descartadas > 0) {
    avisos.push(
      `${descartadas} ${descartadas === 1 ? "linha foi ignorada" : "linhas foram ignoradas"} por estar sem texto na coluna "mensagem".`
    );
  }

  if (!campos.includes(COLUNA_OPCIONAL)) {
    avisos.push('A coluna opcional "cliente_id" não foi encontrada — a análise segue sem ela.');
  }

  if (resultado.errors.length > 0) {
    avisos.push(
      `${resultado.errors.length} ${
        resultado.errors.length === 1 ? "inconsistência foi encontrada" : "inconsistências foram encontradas"
      } na formatação e ${resultado.errors.length === 1 ? "foi ignorada" : "foram ignoradas"}.`
    );
  }

  return { mensagens, totalLinhas: mensagens.length, avisos };
}

/** Lê um File do input/drag-and-drop como texto UTF-8. */
export function lerArquivo(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => resolve(String(leitor.result ?? ""));
    leitor.onerror = () => reject(new CsvError("Não foi possível ler o arquivo selecionado."));
    leitor.readAsText(arquivo, "utf-8");
  });
}

/** Aceita AAAA-MM-DD, DD/MM/AAAA e variações com hora. Devolve null se não entender. */
export function parseData(valor: string): Date | null {
  if (!valor) return null;

  const iso = valor.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  }

  const br = valor.match(/^(\d{1,2})[/](\d{1,2})[/](\d{2,4})/);
  if (br) {
    const ano = Number(br[3]);
    return new Date(ano < 100 ? 2000 + ano : ano, Number(br[2]) - 1, Number(br[1]));
  }

  const fallback = new Date(valor);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

/** Exibe a data no formato brasileiro, ou devolve o valor original se não parsear. */
export function formatarData(valor: string): string {
  const data = parseData(valor);
  if (!data) return valor || "—";
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
