<div align="center">

# 🧠 AInsightCX

### Transforme milhares de interações de atendimento em insights priorizados e planos de ação executivos em minutos — não em semanas.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-llama--3.3--70b-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**[🚀 Ver MVP no ar](https://ainsightcx-mvp.vercel.app)** · **[📹 Vídeo pitch](https://www.youtube.com/watch?v=[VIDEO_ID])** · **[📄 Documento de MVP](https://ainsightcx.notion.site/AInsightCX-Documento-de-MVP-3ad5551d52218044a6aff971395115af)** · **[🎨 Artefatos no Miro](https://miro.com/app/board/uXjVH2CNn1E=/?share_link_id=226858806009)**

<a href="https://www.youtube.com/watch?v=[VIDEO_ID]">
  <img src="https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg" alt="Vídeo pitch do AInsightCX" width="720">
</a>

</div>

---

## 📌 O que é

O **AInsightCX** é uma plataforma SaaS que usa IA generativa para ler o volume bruto de interações de atendimento — tickets, chats e e-mails — e devolver **temas priorizados, resumos executivos e planos de ação**.

O problema não é coletar a voz do cliente. É que ela nunca chega, organizada e a tempo, a quem toma decisão.

| | |
|---|---|
| 🎯 **Público-alvo** | Empresas SaaS B2B de médio porte (100–500 funcionários) com mais de 5.000 interações/mês |
| 👥 **Personas** | Head de Customer Experience · Head de Operações · Gerente de Suporte |
| 💡 **Proposta de valor** | Transformar milhares de interações em insights priorizados e planos de ação em minutos, não semanas |
| 🧩 **Escopo do MVP** | Funcionalidades F1 a F5 — da ingestão do CSV ao plano de ação sugerido |

### Funcionalidades

| | Funcionalidade | O que faz |
|---|---|---|
| **F1** | Ingestão de interações | Upload de CSV com validação de estrutura e pré-visualização |
| **F2** | Classificação temática por IA | Agrupa as mensagens em temas de negócio, sem taxonomia manual |
| **F3** | Priorização por criticidade | Classifica cada tema em urgência baixa, média, alta ou crítica |
| **F4** | Resumo executivo automático | 2–3 frases por tema, escritas para quem decide |
| **F5** | Plano de ação sugerido | 3 a 5 ações priorizadas, com prazo e área responsável |

---

## 🎓 Contexto acadêmico

Este MVP é o **trabalho bônus** da disciplina **Fundamentos de Gestão de Projetos** da **UniFECAF**.

Ele complementa a entrega teórica (Lean Canvas, roadmap em três fases, matriz de riscos e documento de MVP), transformando o planejamento em uma aplicação **real, funcional e no ar** — com chamadas de verdade a um modelo de linguagem, sem mocks.

---

## 🖼️ Screenshots

| Landing page | Upload de interações |
|---|---|
| _[adicionar screenshot]_ | _[adicionar screenshot]_ |

| Dashboard de insights | Plano de ação gerado por IA |
|---|---|
| _[adicionar screenshot]_ | _[adicionar screenshot]_ |

---

## 🛠️ Stack tecnológica

| Camada | Tecnologia | Por quê |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Route Handlers mantêm a chave da IA fora do browser |
| Linguagem | **TypeScript** | Contratos tipados entre client, API e resposta da IA |
| Estilização | **Tailwind CSS v4** | Tema da marca em CSS variables, com dark mode |
| Componentes | **shadcn/ui** | Base acessível e sem lock-in de biblioteca |
| Ícones | **lucide-react** | Conjunto consistente e leve |
| Tipografia | **Inter** (Google Fonts) | Legibilidade em interfaces densas |
| IA | **Groq** · `llama-3.3-70b-versatile` | Inferência rápida o suficiente para uso interativo |
| Parsing CSV | **papaparse** | Lida com aspas, quebras de linha e cabeçalhos sujos |
| Tema | **next-themes** | Dark mode sem flash na hidratação |
| Deploy | **Vercel** | Deploy contínuo direto do GitHub |

> Sem banco de dados, sem autenticação, sem ORM e sem gerenciador de estado global: o MVP é **stateless e roda em memória** durante a sessão.

---

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js 20+ e uma chave da API da Groq ([criar gratuitamente](https://console.groq.com/keys)).

```bash
# 1. Clone o repositório
git clone https://github.com/guipardindev/ainsightcx-mvp.git
cd ainsightcx-mvp

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# edite .env.local e cole sua GROQ_API_KEY

# 4. Suba o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**, vá em **Testar grátis** e clique em **Usar dados de exemplo** para ver o fluxo completo sem precisar de arquivo próprio.

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `GROQ_API_KEY` | ✅ Sim | Chave da API da Groq. Usada **apenas no servidor**, nos Route Handlers. |
| `NEXT_PUBLIC_SITE_URL` | ⬜ Não | URL pública do deploy, usada nas metatags Open Graph. Detectada automaticamente na Vercel. |

> ⚠️ O arquivo `.env.local` está no `.gitignore` e **nunca** deve ser commitado.

### Formato do CSV

| Coluna | Obrigatória | Exemplo |
|---|---|---|
| `data` | ✅ | `2026-07-02` ou `02/07/2026` |
| `canal` | ✅ | `email`, `chat`, `ticket` |
| `mensagem` | ✅ | `A fatura veio com cobrança em duplicidade...` |
| `cliente_id` | ⬜ | `ACME-104` |

---

## 📁 Estrutura de pastas

```
ainsightcx-mvp/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Layout raiz, fonte e provider de tema
│   ├── globals.css                 # Tema da marca (light/dark) em CSS variables
│   ├── upload/                     # Envio e validação do CSV
│   ├── dashboard/                  # Insights, filtros e planos de ação
│   ├── sobre/                      # Contexto acadêmico e LGPD
│   └── api/
│       ├── analyze/route.ts        # Classificação + sumarização em lote
│       └── action-plan/route.ts    # Geração do plano de ação por tema
├── components/
│   ├── ui/                         # Componentes shadcn/ui
│   ├── csv-uploader.tsx            # Drag-and-drop e dataset de exemplo
│   ├── theme-card.tsx              # Card de tema com plano de ação
│   ├── kpi-card.tsx                # Cartões de indicadores
│   ├── urgency-badge.tsx           # Selo de urgência
│   ├── header.tsx · footer.tsx     # Layout compartilhado
│   └── theme-toggle.tsx            # Alternância de dark mode
├── lib/
│   ├── groq.ts                     # Client server-only da Groq
│   ├── prompts.ts                  # Prompts centralizados
│   ├── csv-parser.ts               # Wrapper do papaparse e validações
│   ├── sample-data.ts              # 30 interações fictícias de demonstração
│   ├── session.ts                  # Estado da análise em sessionStorage
│   └── types.ts                    # Tipos compartilhados
└── .env.example                    # Template das variáveis de ambiente
```

---

## 🧠 Como a IA é usada

Duas chamadas, ambas com `temperature: 0.3` e resposta em JSON estruturado:

**`POST /api/analyze`** — recebe até 30 mensagens e faz **classificação + sumarização em um único prompt** (mais rápido e mais barato que uma chamada por mensagem). Retorna temas com urgência, volume, resumo executivo, principais queixas e os ids das mensagens de cada grupo.

**`POST /api/action-plan`** — recebe um tema com suas mensagens e retorna de 3 a 5 ações priorizadas por impacto, cada uma com título, descrição, prazo (imediato/semana/mês) e área responsável.

**Decisões de robustez:**

- 🔒 A `GROQ_API_KEY` só existe no servidor — o módulo do client é marcado com `server-only`.
- 🧯 Parse defensivo: aceita JSON puro, cercado por \`\`\`json ou com texto ao redor.
- ✅ Normalização da resposta: urgências e prazos fora do enum são corrigidos; ids inventados pela IA são descartados; mensagens que a IA esqueceu de agrupar viram um tema residual, para nada sumir do relatório.
- ⏱️ Rate limit próprio de 1 chamada a cada 3 segundos, com fila serial e timeout de 60s.
- 💬 Todo erro da Groq (401, 429, 5xx, timeout) vira uma mensagem em português explicando o que fazer.

---

## ☁️ Deploy na Vercel

```bash
npm i -g vercel
vercel --prod
```

Ou conecte o repositório em [vercel.com/new](https://vercel.com/new). Em **Settings → Environment Variables**, adicione:

| Nome | Valor |
|---|---|
| `GROQ_API_KEY` | sua chave da Groq |

🔗 **MVP no ar:** https://ainsightcx-mvp.vercel.app

---

## 🔗 Artefatos do projeto

| Artefato | Link |
|---|---|
| 📄 Documento de MVP | [Notion](https://ainsightcx.notion.site/AInsightCX-Documento-de-MVP-3ad5551d52218044a6aff971395115af) |
| 🎨 Lean Canvas, roadmap e matriz de riscos | [Miro](https://miro.com/app/board/uXjVH2CNn1E=/?share_link_id=226858806009) |
| 📚 Parte teórica (PDF) | _[adicionar link]_ |
| 📹 Vídeo pitch | _[adicionar link]_ |
| 💻 Código-fonte | [GitHub](https://github.com/guipardindev/ainsightcx-mvp) |

---

## ⚖️ Considerações éticas e LGPD

- **Nada é armazenado.** Não há banco de dados nem autenticação. O CSV é processado em memória e o resultado vive apenas no `sessionStorage` do seu navegador, sumindo quando a aba fecha.
- **Os dados trafegam para a Groq.** O conteúdo das mensagens é enviado à API da Groq para processamento. Por isso, **anonimize antes de subir qualquer base real**: remova nomes, e-mails, telefones e documentos.
- **Minimização de dados.** O MVP só pede o essencial — data, canal e mensagem. O `cliente_id` é opcional e deve ser um identificador pseudonimizado, nunca um dado pessoal direto.
- **IA não decide sozinha.** Os resultados são sugestões e podem conter imprecisões. O dashboard exibe esse aviso, e o desenho do produto mantém o humano no comando da decisão.
- **Transparência.** As mensagens originais de cada tema ficam sempre a um clique de distância, para que qualquer conclusão da IA possa ser auditada na fonte.

---

## 🗺️ Roadmap

| Fase | Foco | Entregas |
|---|---|---|
| **1 · MVP** | Validar a hipótese central | Upload de CSV, classificação temática, resumo executivo e plano de ação (F1–F5) |
| **2 · Escala** | Tirar o processo do manual | Integrações via API com Zendesk/Intercom, histórico e comparação entre períodos, múltiplos usuários |
| **3 · Diferenciação** | Sair do reativo | Alertas proativos de tendência, previsão de risco de churn por tema e conexão direta com o roadmap de produto |

---

## 👤 Autor

**Guilherme Pardin de Almeida**
Estudante da UniFECAF · Desenvolvedor

[![GitHub](https://img.shields.io/badge/GitHub-@guipardindev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/guipardindev)

---

<div align="center">

**MVP acadêmico · UniFECAF · Fundamentos de Gestão de Projetos**

Sem fins comerciais.

</div>
