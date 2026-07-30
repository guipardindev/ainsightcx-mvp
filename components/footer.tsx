import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { AUTOR, LINKS } from "@/lib/links";

const EXTERNOS = [
  { href: LINKS.notion, label: "Documento de MVP (Notion)" },
  { href: LINKS.miro, label: "Artefatos práticos (Miro)" },
  { href: LINKS.repositorio, label: "Código-fonte (GitHub)" },
];

const INTERNOS = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#precos", label: "Preços" },
  { href: "/upload", label: "Testar grátis" },
  { href: "/sobre", label: "Sobre o projeto" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-muted/30">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Insights priorizados e planos de ação a partir das interações de atendimento — em
            minutos, com IA generativa.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            MVP acadêmico · {AUTOR.instituicao} · {AUTOR.disciplina}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Produto</h3>
          <ul className="mt-3 space-y-2">
            {INTERNOS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium">Artefatos</h3>
          <ul className="mt-3 space-y-2">
            {EXTERNOS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <ExternalLink className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AInsightCX — projeto acadêmico, sem fins comerciais.</p>
          <p>
            Feito por{" "}
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {AUTOR.nome} ({AUTOR.usuario})
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
