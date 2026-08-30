---
title: "Olas lança Pearl Connect: agentes de código ganham carteira cripto autocustodial"
description: "Ferramenta em beta para Claude Code e Claude Desktop embute uma carteira Safe nas sessões de programação, começando por mercados de previsão como Polymarket e Omen."
pubDate: 2026-08-25
tags: ["ia", "blockchain", "web3", "cripto"]
cover: "/images/news/olas-pearl-connect-claude-code.jpg"
---

A **Olas** lançou o **Pearl Connect**, um recurso em beta que dá a agentes de código — como o Claude Code e o Claude Desktop — uma carteira cripto **autocustodial** dentro da própria sessão de programação. A estreia é focada em mercados de previsão, com suporte inicial às redes **Polygon** e **Gnosis**.

A ideia central: eliminar a troca de ferramentas que, até agora, obrigava o desenvolvedor a sair do ambiente de código para abrir uma carteira ou o navegador na hora de executar uma ação onchain.

## Como funciona

O Pearl Connect faz parte da **Pearl**, a "loja de apps de agentes de IA" da Olas. Para cada usuário, o sistema cria uma **Safe smart account** (conta inteligente) e assina as transações **localmente, na máquina da pessoa** — mantendo a chave privada fora da sessão de IA.

Na prática, o agente consegue consultar saldos, pedir serviços no **Olas Marketplace** e preparar transações para plataformas como **Polymarket** e **Omen**, tudo sem sair do fluxo de trabalho. A carteira continua sob controle do usuário e pode ser restaurada com a senha da Pearl, uma frase de recuperação ou uma carteira de backup.

Cada Connect opera em uma única rede, com carteira e funding próprios — para atuar em outra cadeia, basta criar outro agente.

## Um agente pagando outro, por requisição

O modelo também muda a forma como agentes de software compram serviços entre si. Em vez de chaves de API ou assinaturas, um agente paga outro **diretamente da própria carteira, por requisição** — por exemplo, comprando uma estimativa de probabilidade de um agente especializado em mercados de previsão no Olas Marketplace.

"Agentes de código já conseguem pesquisar e raciocinar bem sobre tarefas complexas, mas, até agora, não tinham um jeito simples de executar ações onchain sem obrigar o usuário a trocar para uma carteira ou navegador separado", disse David Minarsch, CEO da Valory e membro fundador da Olas. (tradução livre)

"Em vez de chaves de API ou assinaturas, um agente pode pagar outro diretamente da própria carteira, por requisição, por serviços como agentes de previsão especializados no Olas Marketplace", completou. (tradução livre)

## Os riscos continuam no radar

A própria Olas reconhece que dar permissões financeiras a um agente de IA carrega risco. Ataques de **injeção de prompt** não podem ser totalmente eliminados e podem expor informações sensíveis ou levar a ações não intencionais.

O produto usa camadas de segurança para proteger as chaves, mas o risco de perda de fundos é "não zero". A empresa recomenda desativar o modo de execução automática de outros agentes da Pearl enquanto o Connect estiver ativo.

## O que observar

Este é mais um passo concreto na direção que já discutimos por aqui: a [Chainlink lançou uma camada para agentes](/posts/chainlink-for-agents/) e a [Binance abriu sua infraestrutura para agentes de IA](/posts/binance-agent-os/). O Pearl Connect ataca o mesmo problema por outro ângulo — não o acesso a uma exchange ou a dados, mas a **carteira do próprio agente**, no ambiente onde o desenvolvedor já trabalha.

Se a "economia agêntica" de fato decolar, a carteira autocustodial embutida no agente de código pode ser uma das peças que faltavam.

> Fonte: [IT Brief Asia](https://itbrief.asia/story/olas-launches-pearl-connect-for-claude-coding-agents)
