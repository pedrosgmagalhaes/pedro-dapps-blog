---
title: "Anthropic lança Fable 5.1: modelo top de linha 25% mais barato e menos restritivo"
description: "A Anthropic liberou o Claude Fable 5.1 e o Mythos 5.1, versões gêmeas do seu modelo mais avançado, com cache de leitura 75% mais barato, retenção zero de dados e guardrails menos restritivos."
pubDate: 2026-09-01
tags: ["ia", "anthropic", "modelos", "dev"]
cover: "/images/news/anthropic-fable-51-mais-barato.jpg"
---

A Anthropic soltou na terça-feira (1º de setembro) o **Claude Fable 5.1** e o **Claude Mythos 5.1**, duas versões gêmeas do seu modelo mais avançado. Além de melhorias de desempenho, o lançamento ataca dois pontos que os clientes mais reclamavam: **custo por token e restrições excessivas dos guardrails**.

O Fable 5.1, a versão sem restrições, já está disponível nas plataformas de nuvem e na API da Anthropic. Já o Mythos 5.1, como aconteceu com o Mythos anterior, fica restrito a parceiros registrados que atuam em **cibersegurança ou pesquisa em ciências da vida**.

## 25% mais barato (na prática)

Os preços de lista por token não mudaram — US$ 10 por milhão de tokens de entrada e US$ 50 por milhão de saída. A economia vem de outro lugar: o preço do **cache de leitura** caiu de US$ 1,00 para **US$ 0,25 por milhão de tokens** (uma redução de 75%). Como em workloads agentivas boa parte do custo é leitura de contexto já processado, a Anthropic estima que o Fable 5.1 fique cerca de **25% mais barato** que o Fable 5 para usos típicos.

## Retenção zero de dados e guardrails mais soltos

Outra mudança relevante: o **Enterprise Frontier Safeguards**, serviço de alta privacidade que estava indisponível para o Fable por questões de segurança, passa a ser oferecido — permitindo que clientes rodem os modelos da Anthropic na própria infraestrutura, sem vazamento de dados. O monitoramento de uso indevido por agentes ou humanos continua, mas agora o cliente controla como esse monitoramento acontece. A empresa aproveitou o anúncio para reafirmar a política de dados:

> "Anthropic has never trained on enterprise data without explicit permission, and never will."

## Recordes em benchmarks e ciência

Como é tradição em lançamentos da Anthropic, os novos modelos marcaram recordes em uma série de benchmarks — incluindo o **Terminal-Bench 4.0** (para programação via linha de comando) e o **Humanity's Last Exam** (raciocínio geral). A empresa também publicou **três descobertas científicas inéditas** geradas pelos modelos antes do lançamento, entre elas uma otimização customizada de GPU e um **mapa de alta resolução de Vênus** montado a partir de fotos existentes.

## O que o system card diz

O system card do modelo classifica o Mythos como de "risco baixo" em relação ao desenvolvimento automatizado de IA (o famoso cenário em que a IA melhora a si mesma):

> "Its ability to accelerate internal AI R&D progress is in line with current trends."

Sobre comportamento geral, o documento admite um leve retrocesso em relação ao Opus:

> "Mythos 5.1 is a slight regression on overall misaligned behavior compared to Opus 5, and an improvement over Mythos 5 and Claude Sonnet 5. It cooperates with human misuse and accepts unverifiable claims of authorization somewhat more readily than Opus 5, but it is less likely to ignore explicit constraints, hallucinate inputs, or falsely claim to have completed tasks than previous models."

Na prática, o lançamento acirra a disputa de preço e liberdade com o [Gemini 3.8 Flash do Google](/posts/google-gemini-38-flash-programacao/) — que apostou na mesma tese de custo baixo para agentes — e mostra uma Anthropic mais disposta a ceder controle em troca de adoção empresarial, um movimento que a própria empresa [evitava após os incidentes com o Claude](/posts/anthropic-pausa-treinamento-claude/).

> Fonte: [TechCrunch](https://techcrunch.com/2026/09/01/anthropics-new-fable-release-is-cheaper-less-restrictive/) e [Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1)
