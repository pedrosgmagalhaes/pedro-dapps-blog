---
title: "Agentes de IA passam a pagar por dados de blockchain com USDC, sem chave de API"
description: "Zerion conecta sua API ao AgentCash para que agentes consultem dados de mais de 8 mil protocolos pagando cerca de US$ 0,01 por chamada, via x402 e Machine Payment Protocol."
pubDate: 2026-08-28
tags: ["ia", "blockchain", "web3", "stablecoin"]
cover: "/images/news/zerion-agentcash-agentes-ia-usdc.jpg"
---

A Zerion conectou sua API ao AgentCash, uma ferramenta de middleware pensada para que agentes de inteligência artificial paguem pelo acesso a serviços digitais usando stablecoins. O esquema substitui as chaves de API tradicionais e os planos de assinatura por pagamentos automatizados em USDC, com custo aproximado de US$ 0,01 por solicitação de dados.

A parceria permite que um agente consulte saldos de carteiras, históricos de transações e posições em protocolos DeFi espalhados por mais de 38 blockchains. Segundo o reporte original do Crypto Briefing, a API da Zerion cobre mais de 8 mil protocolos — uma consulta pode varrer uma fatia ampla do ecossistema cripto sem que o desenvolvedor precise criar uma integração separada para cada rede.

## Pagamento automático, sem cadastro

O modelo ataca uma limitação prática dos agentes autônomos: eles consomem dados e serviços o tempo todo, mas os sistemas de acesso convencionais foram desenhados para humanos ou equipes de desenvolvimento. Em vez de registrar, gerar chave, escolher plano e administrar limites, o agente pede a informação e liquida o custo da chamada com os fundos disponíveis na própria carteira.

A infraestrutura usa duas vias de pagamento. A primeira é o **x402**, protocolo que roda na Base e aproveita o código de status HTTP 402 — o "Payment Required" (pagamento exigido) — para sinalizar que o servidor pede uma liquidação antes de entregar a resposta.

Quando o agente solicita dados à API da Zerion, o servidor devolve o sinal de pagamento exigido e a carteira do agente envia USDC para concluir a operação. Confirmada a transação, os dados voltam ao solicitante, enquanto o AgentCash coordena carteira, autenticação e execução do pagamento num fluxo único.

A segunda alternativa é o **Machine Payment Protocol (MPP)**, que usa o Tempo para processar a liquidação. As duas vias juntas oferecem uma rota extra de pagamento por chamada, cada uma com papel distinto na arquitetura descrita pelas empresas.

## O papel do AgentCash

O AgentCash funciona como uma camada intermediária que simplifica operações que, de outro jeito, exigiriam várias ferramentas e decisões manuais. O kit administra os fundos do agente, autentica o acesso a serviços premium e decide quando vale a pena pagar pela informação necessária.

A ferramenta foi lançada no começo de julho de 2026 como um kit de linha de comando focado em comércio entre máquinas. No lançamento, admitia cerca de 250 APIs premium. Depois, o número subiu para mais de 3,2 mil APIs compatíveis, com integração em mais de 500 aplicações — entre elas a Coinbase Wallet.

Esse crescimento indica que o pagamento automatizado não fica restrito a uma única plataforma de dados. O AgentCash tenta se posicionar como uma camada de pagamentos aplicável a diferentes serviços de API, permitindo que um agente interaja com fornecedores variados sem repetir cadastros, cobranças e gestão de credenciais.

A proposta também muda o ponto de controle do acesso. No modelo tradicional, uma empresa contrata um plano e distribui credenciais para suas aplicações. Aqui, o próprio agente administra uma carteira e cobre cada consumo de forma granular — desde que tenha USDC e permissão para operar.

## Uma pilha construída ao longo de 2026

As peças da integração entraram aos poucos. A Zerion adicionou suporte ao x402 em meados de março, criando a base para pagamentos por chamada na Base; no fim de abril veio a integração com o MPP, para a liquidação via Tempo. O AgentCash apareceu no início de julho e reuniu essas capacidades num kit que os agentes conseguem usar de forma autônoma.

Cada componente resolve um problema diferente: o x402 conecta a solicitação ao pagamento, o MPP oferece uma alternativa de liquidação e o AgentCash integra a gestão operacional. Juntas, as peças deixam o agente decidir quando precisa de informação, calcular o custo e enviar USDC sem intervenção humana em cada etapa.

## Micropagamentos por chamada

O custo de cerca de US$ 0,01 por chamada muda a economia de certos serviços automatizados. Um agente que revisa posições de uma carteira a cada poucos minutos pode acumular alguns dólares por dia — estrutura bem diferente dos terminais tradicionais de dados financeiros, cujos planos passam de milhares de dólares mensais.

A diferença não torna os micropagamentos ideais para todo caso de uso. Uma aplicação com milhões de consultas precisa avaliar custo acumulado, velocidade de confirmação e disponibilidade da rede. Ainda assim, o pagamento granular atrai agentes com consultas esporádicas ou que só precisam de dados durante uma tarefa específica.

O salto do AgentCash — de 250 para mais de 3,2 mil APIs — sugere que fornecedores diferentes estão explorando esse mecanismo para monetizar serviços. E conversa direto com a [camada da Chainlink para agentes](/posts/chainlink-for-agents/), que também já sinalizava pagamentos pay-per-call x402 entre agentes: a infraestrutura de pagamento máquina-a-máquina está saindo do papel.

> **Minha opinião:** é um exemplo concreto de como stablecoins podem funcionar como unidade de pagamento para operações pequenas, frequentes e executadas direto por máquinas — sem hype, mas com base técnica sólida.

> Fonte: [Crypto Briefing](https://cryptobriefing.com/zerion-api-integrates-with-agentcash-for-stablecoin-payments-letting-ai-agents-pay-per-call/)
