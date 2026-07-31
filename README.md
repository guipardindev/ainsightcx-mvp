# AinsightCX — Do Problema ao Produto com IA, MVP e Roadmap

[![Banner AinsightCX](https://img.youtube.com/vi/[ID_DO_VIDEO]/maxresdefault.jpg)](https://youtu.be/[ID_DO_VIDEO])

## 📌 Descrição do Projeto

Este projeto foi desenvolvido para a disciplina **Fundamentos de Gestão de Projetos** — UniFECAF.
O objetivo foi **planejar estrategicamente um produto digital baseado em IA Generativa**, aplicando na prática os fundamentos de gestão de produtos e projetos: visão de produto, definição de MVP, roadmap evolutivo, ciclo de vida da aplicação e gerenciamento de riscos.

**O AinsightCX** é uma plataforma SaaS que utiliza IA Generativa para transformar volumes massivos de interações de atendimento ao cliente (tickets, chats e e-mails) em **insights priorizados** e **planos de ação executivos** — em minutos, não semanas.

> ⚠ Este não é um sistema implementado em código. É um **planejamento estratégico completo** de produto, entregue como um Product/Project Manager real entregaria a um startup studio incubando o produto.

## 🎯 Problema

Times de atendimento em empresas SaaS B2B enfrentam um paradoxo: quanto mais crescem em base de clientes, mais interações acumulam — e menos capacidade têm de extrair aprendizado estratégico desse volume.

- **Volume incompatível com análise manual** — gerentes recebem milhares de mensagens semanais
- **Ausência de priorização automática** — temas críticos ficam misturados a solicitações triviais
- **Decisões reativas, não preditivas** — problemas só são percebidos após escalarem
- **Desconexão entre suporte e produto/engenharia** — insights valiosos ficam retidos no atendimento

## 💡 Solução

Foi planejada uma plataforma SaaS com IA Generativa que:

**Fluxo:** Upload CSV → Classificação por IA → Sumarização Executiva → Plano de Ação → Dashboard Priorizado

O produto:

- **Ingere** dados de atendimento via upload de CSV (sem necessidade de integração no MVP)
- **Classifica** automaticamente cada interação por tema e urgência com IA Generativa
- **Sumariza** temas críticos com resumos executivos e evolução temporal
- **Sugere** planos de ação práticos priorizados por impacto
- **Prioriza** insights em um dashboard web com filtros e exportação

## 🎓 Contexto Acadêmico

**Público-alvo do produto:** empresas SaaS B2B de médio porte (100–500 funcionários), com volume mensal superior a 5.000 interações de atendimento.

**Personas:** Head de Customer Experience, Head de Operações (COO), Gerente de Suporte.

**Proposta de Valor:** _"Transforme milhares de interações de atendimento em insights priorizados e planos de ação executivos em minutos, não semanas — com IA generativa."_

## 🧠 Stack de IA em 3 Fases

| Fase                       | Stack                     | Custo                 | Justificativa                  |
| -------------------------- | ------------------------- | --------------------- | ------------------------------ |
| **MVP (Fase 1)**           | Groq API + Llama 3.3 70B  | Gratuito              | Validação sem risco financeiro |
| **Escala (Fase 2)**        | Claude Sonnet ou GPT-4o   | ~US$ 3–15 / 1M tokens | Qualidade superior + SLA       |
| **Diferenciação (Fase 3)** | Fine-tuning próprio + RAG | Variável              | Diferencial competitivo        |

## 📦 Artefatos do Projeto

Este projeto contém **6 artefatos obrigatórios** entregues em conformidade com o desafio da disciplina:

| Artefato                                             | Formato | Local                                                                            |
| ---------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| 📘 **Parte Teórica** (19 páginas)                    | PDF     | [Parte_Teorica_AinsightCX.pdf](./Parte_Teorica_AinsightCX.pdf)                   |
| 🎨 **Canvas de Visão de Produto** (Lean Canvas)      | Miro    | [Board público](📎[PLACEHOLDER_LINK_MIRO])                                       |
| 📋 **Documento de MVP**                              | Notion  | [Página pública](📎[PLACEHOLDER_LINK_NOTION])                                    |
| 🗺 **Roadmap Visual** (3 fases)                      | Miro    | [Mesmo board do Canvas](📎[PLACEHOLDER_LINK_MIRO])                               |
| ⚠ **Matriz de Riscos** (8 riscos)                    | Miro    | [Mesmo board do Canvas](📎[PLACEHOLDER_LINK_MIRO])                               |
| 📑 **Kit Consolidado** (todos os artefatos em 1 PDF) | PDF     | [Kit_Artefatos_Praticos_AinsightCX.pdf](./Kit_Artefatos_Praticos_AinsightCX.pdf) |

## 📖 Lógica do Planejamento

O trabalho foi estruturado seguindo o fluxo real que um Product Manager segue ao planejar um produto do zero:

1. **Descoberta do problema** — entender a dor concreta do cliente (volumes massivos ingeríveis)
2. **Definição da visão de produto** — quem é o cliente, qual a proposta de valor, quais os canais
3. **Escopo mínimo viável (MVP)** — priorização MoSCoW para validar a hipótese central
4. **Roadmap evolutivo** — 3 fases com critérios objetivos de avanço
5. **Ciclo de vida** — descoberta → validação → entrega → evolução
6. **Gerenciamento de riscos** — matriz probabilidade × impacto com planos de mitigação
7. **Gestão específica de IA** — alucinações, custos, LGPD, viés algorítmico

### Como interpretar cada artefato:

- **Lean Canvas** → visão executiva de UMA página do modelo de negócio
- **Documento de MVP** → detalhe técnico das funcionalidades priorizadas com critérios de aceitação
- **Roadmap** → evolução temporal em 3 fases (MVP → Escala → Diferenciação)
- **Matriz de Riscos** → 8 riscos avaliados por exposição, com plano de mitigação e responsável
- **Parte Teórica** → embasamento conceitual e aplicação dos frameworks de gestão

## 🗺 Roadmap Resumido

```
FASE 1 — MVP (Meses 1-2)          FASE 2 — ESCALA (Meses 3-5)      FASE 3 — DIFERENCIAÇÃO (Meses 6-9)
├─ Ingestão CSV                   ├─ Integrações nativas            ├─ Fine-tuning por cliente
├─ Classificação por IA           ├─ Migração p/ Claude/GPT-4o      ├─ RAG com base do cliente
├─ Sumarização executiva          ├─ Plano de ação automatizado     ├─ Análise de sentimento
├─ Dashboard básico               ├─ Alertas Slack/e-mail           ├─ Multi-idioma (EN/ES)
└─ 3+ clientes beta               └─ 15+ clientes pagantes          └─ 50+ clientes, 3+ enterprise
   MRR: R$ 0 (beta)                  MRR: R$ 30.000                    MRR: R$ 150.000
```

## ⚠ Principais Riscos

| #      | Risco                               | Exposição           | Mitigação                                          |
| ------ | ----------------------------------- | ------------------- | -------------------------------------------------- |
| **R1** | Alucinações da IA                   | 🔴 **20 — Crítico** | Validação humana + disclaimers + logs de auditoria |
| **R3** | Escalada de custos de API           | 🟠 **16 — Alto**    | Tier gratuito no MVP + cache + limites por plano   |
| **R5** | Concorrência de grandes plataformas | 🟠 **15 — Alto**    | Foco em nicho + diferenciação clara                |

> A matriz completa com os 8 riscos está no [Kit de Artefatos Práticos](./Kit_Artefatos_Praticos_AinsightCX.pdf), seção 5.

## 🛠 Ferramentas Utilizadas

| Ferramenta               | Função                                          |
| ------------------------ | ----------------------------------------------- |
| **Miro**                 | Lean Canvas + Roadmap Visual + Matriz de Riscos |
| **Notion**               | Documento de MVP detalhado                      |
| **Microsoft Word / PDF** | Parte Teórica e Kit Consolidado                 |
| **YouTube**              | Hospedagem do vídeo pitch (não listado)         |
| **GitHub**               | Versionamento e documentação central            |

## 📂 Estrutura do Repositório

```
ainsightcx/
├── README.md                                # Este arquivo
├── Parte_Teorica_AinsightCX.pdf             # Parte teórica (19 páginas)
├── Kit_Artefatos_Praticos_AinsightCX.pdf    # 4 artefatos consolidados
├── canvas.png                               # Print do Lean Canvas no Miro
├── roadmap.png                              # Print do Roadmap no Miro
├── matriz-riscos.png                        # Print da Matriz de Riscos no Miro
├── mvp-doc.png                              # Print do MVP Doc no Notion
└── thumb-video.jpg                          # Thumbnail do vídeo pitch
```

## 🎬 Vídeo Pitch

🔗 [Assistir no YouTube](https://youtu.be/[PLACEHOLDER_ID_VIDEO])

**Duração:** até 4 minutos
**Conteúdo:** contexto do problema, visão do produto, MVP proposto, roadmap, principais riscos e justificativa estratégica.

## 📄 Documentação Teórica

A análise teórica completa do projeto (visão de produto, MVP, roadmap, ciclo de vida, riscos e gestão específica de IA) está disponível abaixo:

🔗 [Parte Teórica — AinsightCX (PDF, 19 páginas)](./Parte_Teorica_AinsightCX.pdf)

## 🔐 Considerações Éticas e LGPD

O planejamento do AinsightCX incorpora desde o desenho:

- **LGPD** — anonimização automática de dados sensíveis, DPO designado, contratos de operador de dados
- **Human-in-the-loop** — a IA sugere; o humano decide. Nenhuma ação crítica é tomada sem validação
- **IA explicável** — cada saída da IA vem acompanhada das mensagens que a fundamentaram
- **Transparência** — usuário sabe sempre quando está consumindo conteúdo gerado por IA
- **Zero Data Retention** — dados de clientes não são usados para treinar modelos externos

## ⚠ Considerações

- Este projeto é um **planejamento estratégico acadêmico**, não uma implementação em código
- Todos os valores financeiros (MRR, custos, preços) são projeções baseadas em benchmarks de mercado SaaS B2B brasileiro
- O produto pode ser evoluído para MVP funcional em desenvolvimento posterior
- Segue os frameworks do **PMI (PMBOK 7ª ed.)** e **Scrum Guide (2020)**

## 👨‍🎓 Autor

**Guilherme Pardin de Almeida**
Disciplina: Fundamentos de Gestão de Projetos
UniFECAF — 2026

[![GitHub](https://img.shields.io/badge/GitHub-guipardindev-181717?style=flat&logo=github)](https://github.com/guipardindev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-eusouguipardin-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/eusouguipardin)
[![YouTube](https://img.shields.io/badge/YouTube-guipardindev-FF0000?style=flat&logo=youtube)](https://youtube.com/@guipardindev)
