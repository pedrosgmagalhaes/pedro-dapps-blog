---
title: "Etherscan abre os dados on-chain para agentes de IA em mais de 60 redes EVM"
description: "A suíte 'Build with AI' conecta agentes e assistentes de código como Claude e ChatGPT a dados verificados de balanços, transações e contratos — um ataque direto à alucinação de dados, um dos maiores gargalos de confiança do casamento entre IA e cripto."
pubDate: 2026-08-31
tags: ["ia", "blockchain", "ethereum", "web3"]
cover: "/images/news/etherscan-ia-agentes-dados-onchain.jpg"
---

A Etherscan, o explorador de blocos mais usado do ecossistema Ethereum, deu um passo silencioso mas pesado para dentro da economia dos agentes de inteligência artificial. No fim de agosto, a plataforma liberou a suíte "Build with AI", que conecta agentes e assistentes de programação — como Claude e ChatGPT — diretamente a dados de blockchain em mais de 60 redes compatíveis com EVM.

O coração da novidade é um servidor de Model Context Protocol (MCP). Na prática, é uma interface padronizada que deixa modelos de linguagem consultarem dados on-chain do mesmo jeito que um desenvolvedor faria, sem o trabalho de "fita adesiva" de integrar APIs na mão.

## O que o servidor faz

O endpoint oficial fica em mcp.etherscan.io/mcp e expõe cerca de 20 ferramentas que cobrem os blocos fundamentais da interação com blockchain: consulta de saldos, busca de transações, histórico de transferências de tokens, detalhes de contratos, preços de gás e logs de eventos. Tudo por uma única API, autenticada com a chave padrão da Etherscan.

Um dos destaques é o "Etherscan Flow", ferramenta para rastrear o movimento de dinheiro entre endereços. O pacote ainda inclui utilitários de depuração de transações e documentação legível por máquina, que ajuda o modelo a entender o que cada endpoint devolve e como usá-lo corretamente. O conjunto opera em modo somente leitura e respeita as cotas e limites de taxa da API.

## Por que isso importa

O alvo declarado é a alucinação de dados. Quando uma IA inventa o saldo de uma carteira ou cria uma transação que nunca existiu, as consequências vão de constrangedoras a financeiramente catastróficas. Ao ancorar agentes em dados on-chain verificados, a Etherscan ataca o que talvez seja a maior lacuna de confiança nas aplicações que misturam cripto e IA.

A cobertura de mais de 60 redes EVM atravessa um ecossistema espalhado de redes de camada 2, sidechains e blockchains alternativas compatíveis com EVM. Para quem constrói ferramentas de IA multi-chain, ter uma única camada de autenticação e consulta para todas elas elimina uma quantidade relevante de trabalho de engenharia.

> Fonte: [Crypto Briefing](https://cryptobriefing.com/etherscan-ai-tools-mcp-api-features/)
