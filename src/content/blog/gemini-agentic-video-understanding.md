---
title: "Gemini 'assiste' o vídeo sob demanda e corta em até 88% os tokens de vídeos longos"
description: "O Google DeepMind lançou o Agentic Video Understanding: o Gemini navega sozinho pela linha do tempo do vídeo, busca frames, transcrições e áudio só nos trechos que importam — com até 88% menos tokens e 66% menos custo."
pubDate: 2026-09-01
tags: ["ia", "google", "dev", "ferramentas"]
cover: "/images/news/gemini-agentic-video-understanding.jpg"
---

Entender vídeo sempre foi caro para modelos de IA. A abordagem clássica — o chamado *static processing* — extrai um frame por segundo e joga o vídeo inteiro, junto com o áudio, para dentro do modelo. Funciona para clipes curtos; para uma aula de 90 minutos ou uma gravação de horas, o custo de tokens explode. E se você reduzir os frames para economizar, perde justamente os detalhes que passam em frações de segundo.

No dia 1º de setembro, o **Google DeepMind** anunciou o **Agentic Video Understanding**, um novo modo de processamento que ataca esse problema pelo outro lado: em vez de ler o vídeo inteiro na mesma densidade, o **Gemini decide sozinho quais partes precisa examinar**.

## O modelo busca o que precisa

A partir da pergunta feita pelo usuário, o Gemini **procura as cenas necessárias** na linha do tempo e monta a resposta revisando frames, áudio e transcrições. Se ainda faltar informação, ele **ajusta a taxa de frames e a resolução do trecho** e relê aquela parte com mais cuidado — como um analista que dá *zoom* no momento exato do lance.

O exemplo que o Google usa é delicioso: contar **palmas** em um vídeo. Com processamento estático a 1 FPS, um palma rápida é facilmente perdida ou confundida com um estalar de dedos. No modo agentic, o modelo aumenta a taxa de frames só no trecho do movimento e conta certo.

Os resultados divulgados, medidos com o Gemini 3.7 Flash:

- **Até 88% menos tokens** consumidos em comparação com o processamento estático;
- **Precisão até ~7% maior**;
- **Custo de análise até 66% menor** — no benchmark 1H-VideoQA (vídeos de 1 hora), o modelo com o modo agentic fica na "linha de frente de Pareto" entre custo e precisão.

Os ganhos são maiores justamente em **vídeos longos**: explicações de ~10 minutos, palestras de 90 minutos e gravações de várias horas.

## Onde usar e o que vem por aí

O modo está disponível para **Gemini 3.7 Flash, 3.6 Flash e 3.5 Flash-Lite**, tanto na API `GenerateContent` quanto na API `Interactions` — basta configurar `"processing": "agentic"`. Está liberado no **Google AI Studio** e na **Gemini Enterprise Agent Platform**, aceitando vídeos enviados e vídeos públicos do YouTube. **Não há taxa extra pelo recurso**: vale a precificação normal de tokens da API. O processamento estático continua disponível para vídeos curtos (menos de 5 minutos), quando a velocidade de resposta importa mais.

Os casos de uso citados pelo Google são bem práticos: detectar mudanças de estado que duram menos de um segundo, achar pontos de corte para edição, procurar eventos específicos em horas de gravação, detectar anomalias (aumentando a taxa de frames só onde algo estranho aparece) e contar ações ou objetos.

Para o futuro, o DeepMind promete levar o Agentic Video Understanding **para os apps Gemini** (versões Flash e Flash-Lite) e, dentro de alguns meses, para o **"Ask YouTube"**, melhorando as respostas baseadas no conteúdo de vídeos.

## O que observar

É mais um passo da estratégia do Google de transformar modelo em produto de plataforma — e este é especificamente um **presente para desenvolvedores**: quem constrói pipelines de análise de vídeo com a API do Gemini ganha uma redução brutal de custo sem trocar de modelo. Vale lembrar que o Google também prepara o [Gemini 3.8 Flash](/posts/google-gemini-38-flash-programacao/), focado em programação — a mensagem é consistente: **processamento mais barato e mais inteligente por token**, não apenas modelos maiores.

> Fonte: [Google — Introducing agentic video understanding with Gemini](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/)
