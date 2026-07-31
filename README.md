# AInsightCX — Do Problema ao Produto com IA, MVP e Roadmap

[![Assistir Pitch no YouTube](https://img.youtube.com/vi/wRPq_umx1lQ/maxresdefault.jpg)](https://youtu.be/wRPq_umx1lQ)

> 🌐 **MVP funcional no ar:** [ainsightcx-mvp.vercel.app](https://ainsightcx-mvp.vercel.app/)
> 🎬 **Vídeo pitch (4 min):** [Assistir no YouTube](https://youtu.be/wRPq_umx1lQ)

## 📌 Descrição do Projeto

Este repositório reúne o trabalho completo da disciplina **Fundamentos de Gestão de Projetos** — UniFECAF 2026. O desafio foi planejar estrategicamente um produto digital baseado em IA Generativa, aplicando na prática os fundamentos de gestão de produtos e projetos.

Além do planejamento obrigatório, o projeto vai além e entrega um **MVP funcional em produção** — com IA real rodando, deploy público na Vercel e código-fonte aberto.

**AInsightCX** é uma plataforma SaaS que utiliza IA Generativa para transformar volumes massivos de interações de atendimento ao cliente (tickets, chats e e-mails) em **insights priorizados** e **planos de ação executivos** — em minutos, não semanas.

## 🎯 O Problema

Times de atendimento em empresas SaaS B2B enfrentam um paradoxo: quanto mais crescem em base de clientes, mais interações acumulam — e menos capacidade têm de extrair aprendizado estratégico desse volume.

- **Volume incompatível com análise manual** — gerentes recebem milhares de mensagens semanais
- **Ausência de priorização automática** — temas críticos ficam misturados a solicitações triviais
- **Decisões reativas, não preditivas** — problemas só são percebidos após escalarem
- **Desconexão entre suporte e produto/engenharia** — insights valiosos ficam retidos no atendimento

## 💡 A Solução

**Fluxo:** Upload CSV → IA classifica → Sumarização → Plano de ação → Dashboard priorizado

O produto:

- **Ingere** dados de atendimento via CSV (sem integração no MVP)
- **Classifica** cada interação por tema e urgência com IA Generativa
- **Sumariza** temas críticos com resumos executivos e métricas quantitativas
- **Sugere** planos de ação práticos priorizados por impacto
- **Prioriza** insights em um dashboard web com filtros e exportação

## 🎬 Vídeo Pitch

[![Assistir no YouTube](https://img.shields.io/badge/YouTube-Assistir_pitch_de_4_minutos-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/wRPq_umx1lQ)

Apresentação de 4 minutos com contexto do problema, visão do produto, MVP proposto, roadmap em 3 fases, principais riscos e justificativa estratégica.

## 🌐 MVP Funcional em Produção

O MVP está no ar, gratuito e público:

🔗 **[ainsightcx-mvp.vercel.app](https://ainsightcx-mvp.vercel.app/)**

### Como testar em 30 segundos:

1. Acesse o MVP no link acima
2. Clique em **"Testar grátis"**
3. Clique em **"Usar dados de exemplo"** (30 interações fake)
4. Clique em **"Analisar com IA"**
5. Veja os insights gerados em tempo real
6. Clique em **"Gerar plano de ação"** em qualquer tema crítico

**Nenhum dado é armazenado** — tudo roda em memória durante sua sessão.

## 📚 Artefatos do Projeto

Este trabalho é composto por 6 artefatos obrigatórios do desafio, mais o MVP funcional como bônus estratégico:

| #   | Artefato                                     | Formato      | Link                                                                                                          |
| --- | -------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| 1   | **Parte Teórica** (19 páginas)               | PDF          | [Parte_Teorica_AinsightCX.pdf](./public/Parte_Teorica_AinsightCX.pdf)                                         |
| 2   | **Canvas de Visão de Produto** (Lean Canvas) | Miro         | [Board público](https://miro.com/app/board/uXjVH2CNn1E=/?share_link_id=226858806009)                          |
| 3   | **Documento de MVP**                         | Notion       | [Página pública](https://ainsightcx.notion.site/AInsightCX-Documento-de-MVP-3ad5551d52218044a6aff971395115af) |
| 4   | **Roadmap Visual** (3 fases)                 | Miro         | [Mesmo board](https://miro.com/app/board/uXjVH2CNn1E=/?share_link_id=226858806009)                            |
| 5   | **Matriz de Riscos** (8 riscos)              | Miro         | [Mesmo board](https://miro.com/app/board/uXjVH2CNn1E=/?share_link_id=226858806009)                            |
| 6   | **Kit Consolidado** (PDF backup)             | PDF          | [Kit_Artefatos_Praticos_AinsightCX.pdf](./public/Kit_Artefatos_Praticos_AinsightCX.pdf)                       |
| ⭐  | **MVP Funcional** (bônus)                    | Web (Vercel) | [Acessar MVP](https://ainsightcx-mvp.vercel.app/)                                                             |
| 🎬  | **Vídeo Pitch** (4 min)                      | YouTube      | [Assistir](https://youtu.be/wRPq_umx1lQ)                                                                      |

## 🧠 Stack de IA em 3 Fases

| Fase                       | Stack                     | Custo                 |
| -------------------------- | ------------------------- | --------------------- |
| **MVP (Fase 1)**           | Groq API + Llama 3.3 70B  | Gratuito              |
| **Escala (Fase 2)**        | Claude Sonnet ou GPT-4    | ~US$ 3–15 / 1M tokens |
| **Diferenciação (Fase 3)** | Fine-tuning próprio + RAG | Variável              |

## 🗺 Roadmap Resumido

```
FASE 1 — MVP (Meses 1-2)          FASE 2 — ESCALA (Meses 3-5)      FASE 3 — DIFERENCIAÇÃO (Meses 6-9)
├─ Ingestão CSV                   ├─ Integrações nativas            ├─ Fine-tuning por cliente
├─ Classificação por IA           ├─ Migração para Claude/GPT-4     ├─ RAG com base do cliente
├─ Sumarização executiva          ├─ Plano de ação automatizado     ├─ Análise de sentimento
├─ Dashboard básico               ├─ Alertas Slack/e-mail           ├─ Multi-idioma (EN/ES)
└─ 3+ clientes beta               └─ 15+ clientes pagantes          └─ 50+ clientes, 3+ enterprise
   MRR: R$ 0 (beta)                  MRR: R$ 30.000                    MRR: R$ 150.000
```

## ⚠ Principais Riscos

| #      | Risco                               | Exposição           | Mitigação                                                       |
| ------ | ----------------------------------- | ------------------- | --------------------------------------------------------------- |
| **R1** | Alucinações da IA                   | 🔴 **20 — Crítico** | Validação humana + disclaimers + logs de auditoria              |
| **R3** | Escalada de custos de API           | 🟠 **16 — Alto**    | Tier gratuito no MVP + cache + limites por plano                |
| **R5** | Concorrência de grandes plataformas | 🟠 **15 — Alto**    | Foco em nicho + diferenciação clara + onboarding sem integração |

> A matriz completa com os 8 riscos está no [Kit de Artefatos Práticos](./public/Kit_Artefatos_Praticos_AinsightCX.pdf).

## 🛠 Stack Tecnológica (MVP)

| Camada        | Tecnologia                         |
| ------------- | ---------------------------------- |
| Framework     | Next.js 16 (App Router) + React 19 |
| Linguagem     | TypeScript                         |
| Estilização   | Tailwind CSS 4 + shadcn/ui         |
| IA            | Groq API + Llama 3.3 70B           |
| Deploy        | Vercel                             |
| Versionamento | GitHub                             |

## 🚀 Como Rodar Localmente

Pré-requisitos: **Node.js 20+** e uma **API key gratuita da Groq** ([console.groq.com/keys](https://console.groq.com/keys)).

```bash
# Clonar o repositório
git clone https://github.com/guipardindev/ainsightcx-mvp.git
cd ainsightcx-mvp

# Instalar dependências
npm install

# Configurar variável de ambiente
cp .env.example .env.local
# Edite .env.local e coloque sua GROQ_API_KEY

# Rodar em desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**.

## 📂 Estrutura do Repositório

```
ainsightcx-mvp/
├── README.md                                # Este arquivo
├── Parte_Teorica_AinsightCX.pdf             # Parte teórica (19 páginas)
├── Kit_Artefatos_Praticos_AinsightCX.pdf    # 4 artefatos consolidados
├── app/                                     # Rotas Next.js
│   ├── page.tsx                             # Landing page
│   ├── upload/                              # Upload de CSV
│   ├── dashboard/                           # Insights de IA
│   ├── sobre/                               # Página institucional
│   └── api/                                 # Route handlers (IA)
├── components/                              # Componentes React
├── lib/                                     # Utilidades e prompts
└── public/                                  # Assets estáticos
```

## 🔐 Considerações Éticas e LGPD

O projeto incorpora desde o desenho:

- **LGPD** — anonimização automática de dados sensíveis, DPO designado, contratos de operador
- **Human-in-the-loop** — a IA sugere; o humano decide. Nenhuma ação crítica é tomada sem validação
- **IA explicável** — cada saída da IA vem acompanhada das mensagens que a fundamentaram
- **Transparência** — usuário sabe sempre quando está consumindo conteúdo gerado por IA
- **Zero Data Retention** — MVP não persiste dados. Tudo em memória durante a sessão

## 📖 Sobre a Metodologia

O trabalho segue os frameworks:

- **PMI (PMBOK 7ª edição)** — gestão de projetos, riscos e ciclo de vida
- **Scrum Guide (2020)** — entrega incremental de valor
- **Lean Startup (Eric Ries)** — MVP e validação de hipóteses
- **MoSCoW** — priorização de funcionalidades
- **Business Model Canvas / Lean Canvas (Ash Maurya)** — modelagem de negócio

## ⚠ Considerações Finais

- Este projeto é **acadêmico**. Todos os valores financeiros (MRR, custos, preços) são projeções baseadas em benchmarks de mercado SaaS B2B brasileiro
- O MVP funcional é um **bônus estratégico** — não obrigatório no desafio original
- O código está aberto para revisão, aprendizado e evolução

## 👨‍🎓 Autor

**Guilherme Pardin de Almeida**
Disciplina: Fundamentos de Gestão de Projetos
UniFECAF — 2026

[![GitHub](https://img.shields.io/badge/GitHub-guipardindev-181717?style=flat&logo=github)](https://github.com/guipardindev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/eusouguipardin)
[![YouTube](https://img.shields.io/badge/YouTube-Assistir_pitch-FF0000?style=flat&logo=youtube)](https://youtu.be/wRPq_umx1lQ)

---

<div align="center">

_Do problema ao produto, do planejamento à IA real rodando em produção._

</div>
