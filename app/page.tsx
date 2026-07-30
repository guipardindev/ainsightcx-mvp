import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  Clock,
  FileUp,
  Inbox,
  Layers,
  ListChecks,
  Radar,
  Sparkles,
  Split,
  TrendingDown,
  Upload,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PROBLEMAS = [
  {
    icon: Inbox,
    titulo: "Volume que ninguém lê",
    texto:
      "Mais de 5.000 interações por mês entre tickets, chats e e-mails. Ninguém consegue ler tudo — e o que não é lido vira ponto cego.",
  },
  {
    icon: Split,
    titulo: "Priorização no achismo",
    texto:
      "Sem dado consolidado, a fila é priorizada pelo cliente que grita mais alto, não pelo problema que mais custa à operação.",
  },
  {
    icon: TrendingDown,
    titulo: "Decisão sempre reativa",
    texto:
      "O padrão só aparece quando o churn já aconteceu. A liderança descobre a causa depois de perder a conta.",
  },
  {
    icon: Radar,
    titulo: "Suporte desconectado do produto",
    texto:
      "O sinal do atendimento não chega ao roadmap. Produto constrói no escuro enquanto o suporte repete a mesma resposta.",
  },
];

const PASSOS = [
  {
    icon: FileUp,
    titulo: "Envie o CSV",
    texto: "Exporte as interações da sua ferramenta de atendimento e solte o arquivo na tela.",
  },
  {
    icon: Sparkles,
    titulo: "A IA analisa",
    texto: "Um modelo de linguagem lê cada interação, agrupa por tema e mede a criticidade.",
  },
  {
    icon: Layers,
    titulo: "Insights priorizados",
    texto: "Você recebe temas ordenados por urgência, com volume e resumo executivo de cada um.",
  },
  {
    icon: ListChecks,
    titulo: "Plano de ação",
    texto: "Em um clique, a IA sugere de 3 a 5 ações com prazo e área responsável.",
  },
];

const FEATURES = [
  {
    tag: "F1",
    icon: Upload,
    titulo: "Ingestão de interações",
    texto:
      "Upload de CSV com data, canal e mensagem. Validação de estrutura e pré-visualização antes de processar.",
  },
  {
    tag: "F2",
    icon: Layers,
    titulo: "Classificação temática por IA",
    texto:
      "Agrupamento automático das mensagens em temas de negócio, sem taxonomia manual nem regras fixas.",
  },
  {
    tag: "F3",
    icon: BarChart3,
    titulo: "Priorização por criticidade",
    texto:
      "Cada tema recebe urgência (baixa a crítica) e volume, para a fila refletir impacto real e não volume bruto.",
  },
  {
    tag: "F4",
    icon: ClipboardList,
    titulo: "Resumo executivo automático",
    texto:
      "Duas a três frases por tema, escritas para quem decide: o que está acontecendo, com que padrão e em qual canal.",
  },
  {
    tag: "F5",
    icon: ListChecks,
    titulo: "Plano de ação sugerido",
    texto:
      "De 3 a 5 ações priorizadas por impacto, cada uma com descrição, prazo sugerido e área responsável.",
  },
];

const PLANOS = [
  {
    nome: "Starter",
    preco: "R$ 497",
    resumo: "Para times que estão começando a estruturar a operação de CX.",
    itens: [
      "Até 5.000 interações/mês",
      "Classificação temática com IA",
      "Resumo executivo por tema",
      "1 usuário",
      "Suporte por e-mail",
    ],
    destaque: false,
  },
  {
    nome: "Pro",
    preco: "R$ 1.497",
    resumo: "Para operações de médio porte que precisam agir sobre o dado.",
    itens: [
      "Até 25.000 interações/mês",
      "Tudo do Starter",
      "Planos de ação gerados por IA",
      "Até 10 usuários",
      "Histórico e comparação por período",
    ],
    destaque: true,
  },
  {
    nome: "Business",
    preco: "R$ 3.997",
    resumo: "Para quem precisa de escala, integrações e governança.",
    itens: [
      "Interações ilimitadas",
      "Tudo do Pro",
      "Integrações via API",
      "Usuários ilimitados",
      "Onboarding assistido e SLA dedicado",
    ],
    destaque: false,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_10%,var(--background)_75%)]"
        />
        <div className="container-page relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="h-7 gap-1.5 bg-background/60 px-3">
              <Sparkles className="text-brand-accent" />
              IA generativa aplicada a Customer Experience
            </Badge>

            <h1 className="mt-6 text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Transforme milhares de interações em{" "}
              <span className="text-brand-accent">insights priorizados</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              O AInsightCX lê tickets, chats e e-mails do seu atendimento e devolve temas críticos,
              resumos executivos e planos de ação em minutos — não em semanas.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/upload"
                className={cn(buttonVariants({ size: "lg" }), "h-11 w-full px-6 text-sm sm:w-auto")}
              >
                Experimentar grátis
                <ArrowRight />
              </Link>
              <Link
                href="/#como-funciona"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full px-6 text-sm sm:w-auto"
                )}
              >
                Ver como funciona
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Sem cadastro. Sem cartão. Rode com os dados de exemplo em 30 segundos.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <PreviaProduto />
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="border-b border-border/70 py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-text">O problema</p>
            <h2 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              A voz do cliente já existe. Ela só não chega a quem decide.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Empresas SaaS B2B de médio porte acumulam milhares de interações por mês. O gargalo não
              é coletar — é transformar esse volume em prioridade.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMAS.map((item) => (
              <Card key={item.titulo} className="h-full">
                <CardHeader>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
                    <item.icon className="size-4" />
                  </span>
                  <CardTitle className="mt-3">{item.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.texto}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section
        id="como-funciona"
        className="scroll-mt-20 border-b border-border/70 bg-muted/30 py-20 sm:py-24"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-text">Como funciona</p>
            <h2 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Quatro passos entre o arquivo bruto e a decisão
            </h2>
          </div>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS.map((passo, indice) => (
              <li key={passo.titulo}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand-text">
                        <passo.icon className="size-4" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">0{indice + 1}</span>
                    </div>
                    <CardTitle className="mt-3">{passo.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{passo.texto}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0" />
            <span>
              Tempo médio do upload ao plano de ação nos dados de exemplo: menos de 1 minuto.
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/70 py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-brand-text">Funcionalidades</p>
            <h2 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              O escopo do MVP, ponta a ponta
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Cinco funcionalidades que cobrem o ciclo completo: da ingestão do dado bruto até a ação
              recomendada com prazo e responsável.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.tag} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand-text">
                      <feature.icon className="size-4" />
                    </span>
                    <Badge variant="secondary" className="font-mono">
                      {feature.tag}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">{feature.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.texto}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section
        id="precos"
        className="scroll-mt-20 border-b border-border/70 bg-muted/30 py-20 sm:py-24"
      >
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-brand-text">Planos</p>
            <h2 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Preço por operação, não por assento
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Modelo de assinatura mensal proposto no plano de negócio. Nesta demonstração acadêmica
              não há cobrança nem checkout.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANOS.map((plano) => (
              <Card
                key={plano.nome}
                className={cn("h-full", plano.destaque && "ring-2 ring-brand-accent lg:-translate-y-2")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plano.nome}</CardTitle>
                    {plano.destaque && <Badge>Mais indicado</Badge>}
                  </div>
                  <CardDescription>{plano.resumo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-baseline gap-1.5">
                    <span className="font-heading text-3xl font-semibold tracking-tight">
                      {plano.preco}
                    </span>
                    <span className="text-sm text-muted-foreground">/mês</span>
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {plano.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/upload"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: plano.destaque ? "default" : "outline",
                      }),
                      "mt-7 h-10 w-full"
                    )}
                  >
                    Testar o MVP grátis
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-14 text-center sm:px-12">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Veja funcionando com os seus dados — ou com os nossos
              </h2>
              <p className="mt-4 text-pretty text-blue-100">
                Suba um CSV de interações ou use o dataset de exemplo com 30 mensagens de uma
                operação de suporte fictícia.
              </p>
              <Link
                href="/upload"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 h-11 bg-white px-6 text-sm text-brand hover:bg-blue-50"
                )}
              >
                Começar análise
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Mock estático do dashboard exibido no hero. */
function PreviaProduto() {
  const linhas = [
    { tema: "Cobrança duplicada", cor: "bg-danger", volume: 6, largura: "w-full" },
    { tema: "Bug no relatório mensal", cor: "bg-warning", volume: 5, largura: "w-4/5" },
    { tema: "Integração com CRM", cor: "bg-warning", volume: 4, largura: "w-3/5" },
    { tema: "Dúvidas de configuração", cor: "bg-success", volume: 4, largura: "w-2/5" },
  ];

  const kpis = [
    { rotulo: "Mensagens", valor: "30" },
    { rotulo: "Temas", valor: "6" },
    { rotulo: "Urgência crítica", valor: "2" },
    { rotulo: "Com plano de ação", valor: "4" },
  ];

  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-xl ring-1 ring-foreground/10">
      <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-danger/60" />
        <span className="size-2.5 rounded-full bg-warning/60" />
        <span className="size-2.5 rounded-full bg-success/60" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">ainsightcx / dashboard</span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.rotulo} className="rounded-lg bg-muted/50 px-4 py-3">
            <p className="text-xs text-muted-foreground">{kpi.rotulo}</p>
            <p className="mt-1 font-heading text-2xl font-semibold tracking-tight">{kpi.valor}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 px-5 pb-6">
        {linhas.map((linha) => (
          <div key={linha.tema} className="flex items-center gap-3">
            <span className="h-2 w-28 shrink-0 overflow-hidden rounded-full bg-muted sm:w-44">
              <span className={cn("block h-full rounded-full", linha.cor, linha.largura)} />
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {linha.tema}
            </span>
            <span className="shrink-0 text-xs font-medium">{linha.volume}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
