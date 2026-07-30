/**
 * Dataset de demonstração: 30 interações fictícias de uma SaaS B2B,
 * cobrindo cobrança, bugs, dúvidas, elogios, cancelamento e performance.
 * É o fluxo principal do pitch — precisa gerar insights bons de verdade.
 */
export const SAMPLE_CSV = `data,canal,mensagem,cliente_id
2026-07-02,email,"A fatura de junho veio com cobrança em duplicidade. Paguei R$ 2.400 e o boleto de novo caiu hoje. Preciso do estorno com urgência.",ACME-104
2026-07-02,chat,"Boa tarde! Alguém consegue me explicar por que fomos cobrados por 42 licenças se temos 35 usuários ativos?",BRAVO-221
2026-07-03,ticket,"O relatório mensal de vendas não carrega desde a atualização de terça. Fica girando e depois dá erro 500.",ACME-104
2026-07-03,chat,"O gráfico de conversão do dashboard mostra número diferente do que aparece na exportação em CSV. Qual dos dois está certo?",DELTA-310
2026-07-04,email,"Estamos há 3 dias sem conseguir emitir a nota fiscal pelo painel. O financeiro já escalou internamente e isso trava nosso fechamento.",ECHO-118
2026-07-04,chat,"Só passando para dizer que o novo onboarding guiado ficou excelente. Meu time de suporte aprendeu a usar em uma tarde.",FOX-405
2026-07-05,ticket,"A integração com o nosso CRM parou de sincronizar contatos. O último registro que chegou foi às 03h de ontem.",DELTA-310
2026-07-06,email,"Gostaria de entender como funciona o downgrade de plano. Se eu reduzir para o Starter, perco o histórico de relatórios?",GOLF-512
2026-07-06,chat,"O relatório mensal demora mais de 30 segundos para abrir. Antes era instantâneo. Aconteceu alguma mudança?",ACME-104
2026-07-07,ticket,"Webhook de status de pedido está devolvendo 401 mesmo com a chave nova. Já regeramos duas vezes.",HOTEL-090
2026-07-07,email,"Depois de 6 meses usando a plataforma, decidimos não renovar. O custo por usuário ficou acima do que conseguimos justificar internamente.",INDIA-777
2026-07-08,chat,"Como faço para adicionar um usuário somente leitura? Não achei essa opção nas permissões.",GOLF-512
2026-07-08,ticket,"Fomos cobrados pelo plano Pro mas o contrato assinado foi do Business. A diferença é de R$ 2.500 no mês.",JULIET-333
2026-07-09,email,"O suporte de vocês respondeu em 8 minutos num sábado e resolveu o problema. Precisava registrar o elogio, foi acima do esperado.",FOX-405
2026-07-09,chat,"Alguém sabe se existe app mobile? Meus gerentes de loja precisam consultar o painel fora do escritório.",KILO-201
2026-07-10,ticket,"A exportação de relatórios em PDF está vindo com as colunas cortadas na margem direita. Ficou inutilizável para enviar ao board.",DELTA-310
2026-07-10,email,"Estamos avaliando migrar para um concorrente. A instabilidade das últimas semanas comprometeu duas apresentações internas nossas.",INDIA-777
2026-07-11,chat,"O login com SSO caiu para todo mundo aqui às 9h. Voltou sozinho às 9h20, mas ninguém nos avisou nada.",ECHO-118
2026-07-11,ticket,"Não recebi o boleto deste mês por e-mail e o link do portal expirou. Como faço para pagar antes do vencimento?",BRAVO-221
2026-07-12,email,"A API de listagem de pedidos está retornando timeout em consultas com mais de 5 mil registros.",HOTEL-090
2026-07-13,chat,"Parabéns pela última release! O filtro salvo por equipe economiza uns 20 minutos por dia do meu time.",LIMA-660
2026-07-14,ticket,"O relatório mensal continua com números divergentes do dashboard. Já são 4 dias e não tivemos retorno do chamado #8842.",ACME-104
2026-07-14,email,"Preciso cancelar a renovação automática. Nosso orçamento de ferramentas foi cortado para o próximo trimestre.",MIKE-880
2026-07-15,chat,"Existe alguma documentação sobre limites de requisição da API? Estamos apanhando com o erro 429.",HOTEL-090
2026-07-15,ticket,"Cobrança de setup de R$ 1.200 apareceu na fatura sem nenhum aviso prévio. Não consta na nossa proposta comercial.",JULIET-333
2026-07-16,email,"O tempo de carregamento do painel piorou muito nas últimas duas semanas, principalmente no começo da manhã.",DELTA-310
2026-07-16,chat,"Consigo agendar o envio automático do relatório semanal por e-mail para a diretoria?",LIMA-660
2026-07-17,ticket,"A sincronização com o CRM voltou, mas duplicou 1.200 contatos. Preciso de ajuda para limpar a base.",DELTA-310
2026-07-17,email,"Estamos muito satisfeitos com o resultado. Reduzimos o tempo médio de resposta em 34% no primeiro trimestre de uso.",FOX-405
2026-07-18,chat,"Se não resolverem a duplicidade de cobrança até sexta, vamos abrir contestação no cartão e suspender o contrato.",ACME-104
`;

export const SAMPLE_FILENAME = "exemplo-interacoes-30.csv";
