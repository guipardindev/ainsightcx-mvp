import "server-only";

/**
 * Client mínimo da Groq (API compatível com OpenAI).
 * Roda EXCLUSIVAMENTE no servidor — a GROQ_API_KEY nunca chega ao browser.
 */

export const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

/** Intervalo mínimo entre duas chamadas à Groq (rate limit auto-imposto). */
const MIN_INTERVALO_MS = 3000;
/** Timeout de rede por chamada. */
const TIMEOUT_MS = 60_000;

export class GroqError extends Error {
  readonly status: number;
  /** Mensagem segura para exibir ao usuário final. */
  readonly userMessage: string;

  constructor(userMessage: string, status = 502, detalhe?: string) {
    super(detalhe ?? userMessage);
    this.name = "GroqError";
    this.status = status;
    this.userMessage = userMessage;
  }
}

/**
 * Fila serial: garante no máximo 1 chamada a cada MIN_INTERVALO_MS.
 * Como o MVP não tem backend com estado, o controle vive na instância do server.
 */
let filaGroq: Promise<unknown> = Promise.resolve();
let ultimaChamada = 0;

function enfileirar<T>(tarefa: () => Promise<T>): Promise<T> {
  const resultado = filaGroq.then(async () => {
    const espera = MIN_INTERVALO_MS - (Date.now() - ultimaChamada);
    if (espera > 0) {
      await new Promise((r) => setTimeout(r, espera));
    }
    ultimaChamada = Date.now();
    return tarefa();
  });
  // A fila segue viva mesmo se a tarefa falhar.
  filaGroq = resultado.catch(() => undefined);
  return resultado;
}

interface GroqOptions {
  system: string;
  user: string;
  /** Quantidade máxima de tokens na resposta. */
  maxTokens?: number;
}

/**
 * Chama a Groq em modo JSON e devolve o objeto já parseado.
 * Lança GroqError com mensagem amigável em qualquer falha.
 */
export async function chamarGroqJSON<T>({
  system,
  user,
  maxTokens = 4096,
}: GroqOptions): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new GroqError(
      "A chave da API da Groq não está configurada no servidor. Defina GROQ_API_KEY em .env.local e reinicie a aplicação.",
      500
    );
  }

  const conteudo = await enfileirar(async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let resposta: Response;
    try {
      resposta = await fetch(GROQ_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          temperature: 0.3,
          max_tokens: maxTokens,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
        signal: controller.signal,
        cache: "no-store",
      });
    } catch (erro) {
      const abortado = erro instanceof Error && erro.name === "AbortError";
      throw new GroqError(
        abortado
          ? "A IA demorou demais para responder. Tente novamente com menos mensagens."
          : "Não foi possível falar com a IA. Verifique sua conexão e tente de novo.",
        504,
        erro instanceof Error ? erro.message : String(erro)
      );
    } finally {
      clearTimeout(timer);
    }

    if (!resposta.ok) {
      const corpo = await resposta.text().catch(() => "");
      throw new GroqError(mensagemPorStatus(resposta.status), resposta.status, corpo.slice(0, 500));
    }

    const json = (await resposta.json().catch(() => null)) as {
      choices?: { message?: { content?: string } }[];
    } | null;

    const texto = json?.choices?.[0]?.message?.content;
    if (!texto) {
      throw new GroqError("A IA devolveu uma resposta vazia. Tente novamente.", 502);
    }
    return texto;
  });

  const parseado = parseJSONDefensivo<T>(conteudo);
  if (parseado === null) {
    throw new GroqError(
      "A IA devolveu um formato inesperado. Tente rodar a análise novamente.",
      502,
      conteudo.slice(0, 500)
    );
  }
  return parseado;
}

function mensagemPorStatus(status: number): string {
  if (status === 401 || status === 403) {
    return "A chave da API da Groq foi recusada. Confira o valor de GROQ_API_KEY.";
  }
  if (status === 429) {
    return "Limite de requisições da Groq atingido. Aguarde alguns segundos e tente novamente.";
  }
  if (status === 413) {
    return "O volume enviado é grande demais para uma única análise. Reduza o número de mensagens.";
  }
  if (status >= 500) {
    return "A Groq está instável no momento. Tente novamente em instantes.";
  }
  return "Não foi possível concluir a análise com a IA. Tente novamente.";
}

/**
 * Parse tolerante: aceita JSON puro, cercado por ```json, ou com texto ao redor.
 * Devolve null quando nada aproveitável é encontrado.
 */
export function parseJSONDefensivo<T>(bruto: string): T | null {
  const tentativas: string[] = [];
  const limpo = bruto.trim();

  tentativas.push(limpo);

  const semCerca = limpo
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  tentativas.push(semCerca);

  for (const alvo of [semCerca, limpo]) {
    const inicio = alvo.indexOf("{");
    const fim = alvo.lastIndexOf("}");
    if (inicio !== -1 && fim > inicio) {
      tentativas.push(alvo.slice(inicio, fim + 1));
    }
  }

  for (const tentativa of tentativas) {
    if (!tentativa) continue;
    try {
      return JSON.parse(tentativa) as T;
    } catch {
      // tenta a próxima estratégia
    }
  }
  return null;
}
