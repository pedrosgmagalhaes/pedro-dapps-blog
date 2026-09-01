---
title: "DeepSeek abre os pesos do V4-Flash-Vision-Exp e encosta na Opus 4.8 em benchmarks visuais"
description: "Modelo multimodal experimental soma visão ao V4-Flash sem cobrar a mais por tokens de imagem — e supera a Opus 4.8 em testes de agente com screenshot."
pubDate: 2026-08-25
tags: ["ia", "modelos", "open-source"]
cover: "/images/news/deepseek-v4-flash-vision-exp.jpg"
---

A DeepSeek liberou o **V4-Flash-Vision-Exp**, um modelo multimodal experimental que adiciona compreensão de imagem e screenshots ao seu "cavalo de batalha" de texto, o V4-Flash — e a empresa afirma que ele fica praticamente no nível da **Opus 4.8, da Anthropic**, em benchmarks de agentes visuais.

O modelo entrou no ar em **21 de agosto** na API da DeepSeek (ID `deepseek-v4-flash-vision-exp`) e já vem de fábrica com o **DeepSeek Harness 0.1.1**. A versão experimental também teve os pesos abertos sob licença **MIT**, seguindo a estratégia da empresa de liberar modelos para a comunidade.

## O que mudou

A novidade é que o V4-Flash, que era só texto, agora enxerga. Segundo os dados de benchmark divulgados pela própria DeepSeek, o Vision-Exp **mantém o desempenho de texto do V4-Flash** — dentro de um ou dois pontos em seis das sete avaliações — o que indica que a empresa não sacrificou qualidade de texto para ganhar visão.

No lado multimodal, os resultados chamam mais atenção: o modelo **vence a Opus 4.8 em dois dos quatro benchmarks de agente multimodal**:

- **Agents' Last Exam**: 27,3 vs 25,7;
- **ZeroBench Pass@5**: 35,0 vs 34,0;
- **ApexBench**: 36,5 vs 39,4 (perde);
- **Chartography**: 64,3 vs 65,0 (perde por pouco).

O detalhe importante é que esses não são testes simples de legendar imagem — são tarefas de agente que exigem ler screenshots, gráficos e diagramas dentro de um loop mais longo de uso de ferramentas. Em outra avaliação de engenharia de software do mundo real (DeepSWE), o modelo chegou a marcar 59,3%, à frente da Opus 4.8.

## A história do preço

Para desenvolvedores, o ponto mais interessante talvez seja o preço. A DeepSeek **não cobra tarifa separada por tokens de imagem**: cada imagem consome até **384 tokens de entrada** e é faturada pela mesma taxa do V4-Flash — US$ 0,007 por milhão de tokens fora do horário de pico com cache, ou US$ 0,22 por milhão sem cache. Na prática, visão virou um upgrade "grátis" para quem já roda V4-Flash em tarefas de agente de texto, eliminando a necessidade de rotear leituras de screenshot para um modelo de visão separado.

O modelo aceita **JPEG, PNG, GIF e WebP**, suporta até **600 imagens por requisição** e funciona nas APIs Chat Completions, Messages (compatível com Anthropic) e Responses (compatível com OpenAI). O rótulo "experimental" indica que a DeepSeek está coletando feedback antes de um lançamento de produção.

## O contexto

O lançamento chega num momento de competição acirrada no espaço multimodal, em que visão está deixando de ser um diferencial de topo para virar requisito básico. O **Gemini 3.7 Flash, do Google, lançado em 13 de agosto**, já é nativamente multimodal com texto, imagem, vídeo e áudio. Anthropic e OpenAI também vêm lançando modelos com visão ao longo de 2025 e 2026.

O timing também é curioso dentro da trajetória da DeepSeek neste mês: a empresa **aumentou os preços da API em 50% a 1.100%** na série V4 em meados de agosto, e segue o rumor de um IPO avaliado em cerca de **US$ 86 bilhões**. A variante com visão transforma o V4-Flash de um modelo barato só de texto em uma plataforma de agentes multimodais pelo mesmo preço — o que pode ampliar o apelo entre desenvolvedores que constroem fluxos de leitura de screenshot e automação de interface.

Minha opinião: o movimento é esperto. Em vez de lançar um modelo "premium" de visão caro, a DeepSeek empacota a capacidade no mesmo preço do modelo de texto — e ainda abre os pesos. Para quem já usa o [harness dsh](/posts/deepseek-harness-dsh/) ou constrói agentes que precisam "ler a tela", é uma peça a mais no quebra-cabeça de rodar agentes sem depender de um único provedor.

> Fonte: [Pulse of Nations](https://pulseofnations.lol/deepseek-adds-vision-to/) · [Changelog oficial da DeepSeek](https://api-docs.deepseek.com/updates/)
