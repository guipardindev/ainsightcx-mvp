import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Layers,
  Lock,
  NotebookPen,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AUTOR, LINKS } from "@/lib/links";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre o projeto",
  description:
    "Contexto acadêmico, artefatos de planejamento e informações do autor do MVP AInsightCX.",
};

const ARTEFATOS = [
  {
    href: LINKS.notion,
    icon: NotebookPen,
    titulo: "Documento de MVP",
    plataforma: "Notion",
    texto:
      "Escopo do MVP, hipóteses, critérios de sucesso e definição das funcionalidades F1 a F5.",
  },
  {
    href: LINKS.miro,
    icon: Layers,
    titulo: "Artefatos práticos",
    plataforma: "Miro",
    texto: "Lean Canvas, roadmap em três fases e matriz de riscos do projeto.",
  },
  {
    href: LINKS.repositorio,
    icon: GithubIcon,
    titulo: "Código-fonte",
    plataforma: "GitHub",
    texto: "Todo o código desta aplicação, aberto e documentado no README.",
  },
];

const STACK = [
  "Next.js 16 (App Router)",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Groq · llama-3.3-70b-versatile",
  "Vercel",
];

export default function SobrePage() {
  return (
    <div className="container-page max-w-4xl py-14 sm:py-20">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="h-7 gap-1.5 px-3">
          <GraduationCap />
          Trabalho acadêmico
        </Badge>
        <h1 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Sobre o AInsightCX
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          O AInsightCX é um MVP funcional construído para demonstrar, na prática, o produto planejado
          na disciplina de {AUTOR.disciplina} da {AUTOR.instituicao}. Toda a parte teórica — Lean
          Canvas, roadmap, matriz de riscos e documento de MVP — deu origem a esta aplicação real,
          com chamadas de verdade a um modelo de linguagem.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Contexto acadêmico</h2>
        <Card className="mt-4">
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Instituição</p>
              <p className="mt-1 font-medium">{AUTOR.instituicao}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Disciplina</p>
              <p className="mt-1 font-medium">{AUTOR.disciplina}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Entrega</p>
              <p className="mt-1 font-medium">Trabalho bônus — MVP funcional</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Aluno</p>
              <p className="mt-1 font-medium">{AUTOR.nome}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Artefatos do projeto</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O planejamento que originou este MVP está publicado nos links abaixo.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {ARTEFATOS.map((artefato) => (
            <a
              key={artefato.href}
              href={artefato.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card className="h-full transition-colors group-hover:ring-brand-accent/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand-text">
                      <artefato.icon className="size-4" />
                    </span>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </div>
                  <CardTitle className="mt-3">{artefato.titulo}</CardTitle>
                  <CardDescription>{artefato.plataforma}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{artefato.texto}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Privacidade e dados</h2>
        <Card className="mt-4">
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/12 text-success-text">
                <Lock className="size-4" />
              </span>
              <div>
                <p className="font-medium">Nada é armazenado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Este é um MVP acadêmico. Os dados enviados não são armazenados — tudo roda em
                  memória durante a sua sessão e some quando você fecha a aba. Não há banco de dados,
                  login nem histórico.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-text">
                <ShieldCheck className="size-4" />
              </span>
              <div>
                <p className="font-medium">Cuidado com dados pessoais (LGPD)</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  O conteúdo do CSV é enviado à API da Groq para processamento. Anonimize as
                  mensagens antes de subir qualquer base real: remova nomes, e-mails, telefones e
                  documentos. Para a demonstração, prefira o dataset de exemplo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Stack técnica</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {STACK.map((item) => (
            <Badge key={item} variant="outline" className="h-7 px-3 font-normal">
              {item}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Sobre o autor</h2>
        <Card className="mt-4">
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-lg font-medium">{AUTOR.nome}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Estudante da {AUTOR.instituicao} e desenvolvedor. Este projeto une o planejamento de
                produto da disciplina à execução técnica de um MVP real, do Lean Canvas ao deploy.
              </p>
            </div>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 shrink-0")}
            >
              <GithubIcon />
              {AUTOR.usuario}
            </a>
          </CardContent>
        </Card>
      </section>

      <div className="mt-14 rounded-2xl bg-muted/50 px-6 py-10 text-center">
        <h2 className="text-balance font-heading text-2xl font-semibold tracking-tight">
          Quer ver o produto funcionando?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
          Rode a análise com o dataset de exemplo em menos de um minuto.
        </p>
        <Link href="/upload" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 px-6")}>
          Testar o MVP
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
