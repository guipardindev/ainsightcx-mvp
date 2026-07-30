"use client";

import { FileSpreadsheet, FolderOpen, Sparkles, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CsvError, lerArquivo, parseCsv } from "@/lib/csv-parser";
import { SAMPLE_CSV, SAMPLE_FILENAME } from "@/lib/sample-data";
import type { Mensagem } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ArquivoCarregado {
  nome: string;
  mensagens: Mensagem[];
  avisos: string[];
  exemplo: boolean;
}

interface Props {
  onCarregado: (arquivo: ArquivoCarregado) => void;
  onErro: (mensagem: string) => void;
  desabilitado?: boolean;
}

export function CsvUploader({ onCarregado, onErro, desabilitado = false }: Props) {
  const [arrastando, setArrastando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function processar(texto: string, nome: string, exemplo: boolean) {
    try {
      const { mensagens, avisos } = parseCsv(texto);
      onCarregado({ nome, mensagens, avisos, exemplo });
    } catch (erro) {
      onErro(
        erro instanceof CsvError
          ? erro.message
          : "Não foi possível interpretar este arquivo. Verifique se é um CSV válido."
      );
    }
  }

  async function receberArquivo(arquivo: File | undefined) {
    if (!arquivo) return;

    const nomeValido = /\.(csv|txt)$/i.test(arquivo.name);
    const tipoValido = ["text/csv", "text/plain", "application/vnd.ms-excel", ""].includes(
      arquivo.type
    );
    if (!nomeValido && !tipoValido) {
      onErro("Formato não suportado. Envie um arquivo .csv exportado da sua ferramenta.");
      return;
    }
    if (arquivo.size > 2_000_000) {
      onErro("O arquivo passa de 2 MB. Envie um recorte menor de interações.");
      return;
    }

    try {
      const texto = await lerArquivo(arquivo);
      processar(texto, arquivo.name, false);
    } catch {
      onErro("Não foi possível ler o arquivo selecionado.");
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!desabilitado) setArrastando(true);
        }}
        onDragLeave={() => setArrastando(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastando(false);
          if (desabilitado) return;
          void receberArquivo(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "rounded-xl border-2 border-dashed border-border bg-card px-6 py-12 text-center transition-colors",
          arrastando && "border-brand-accent bg-accent/60",
          desabilitado && "pointer-events-none opacity-60"
        )}
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
          <UploadCloud className="size-6" />
        </span>

        <p className="mt-4 font-heading text-base font-medium">
          Arraste seu arquivo CSV até aqui
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
          Precisa conter as colunas <code className="font-mono text-xs">data</code>,{" "}
          <code className="font-mono text-xs">canal</code> e{" "}
          <code className="font-mono text-xs">mensagem</code>. A coluna{" "}
          <code className="font-mono text-xs">cliente_id</code> é opcional.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            className="h-10 w-full sm:w-auto"
            onClick={() => inputRef.current?.click()}
          >
            <FolderOpen />
            Selecionar arquivo
          </Button>
          <Button
            size="lg"
            className="h-10 w-full sm:w-auto"
            onClick={() => processar(SAMPLE_CSV, SAMPLE_FILENAME, true)}
          >
            <Sparkles />
            Usar dados de exemplo
          </Button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => {
            void receberArquivo(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <FileSpreadsheet className="size-3.5" />
        Nada é armazenado: o arquivo é processado em memória durante a sua sessão.
      </p>
    </div>
  );
}
