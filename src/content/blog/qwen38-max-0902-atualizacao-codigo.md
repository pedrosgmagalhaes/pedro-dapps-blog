---
title: "Alibaba atualiza Qwen3.8-Max com foco em código e agentes — cache a US$ 0,17 por milhão de tokens"
description: "O Qwen3.8-Max-0902 mantém a arquitetura MoE de 2,4 trilhões de parâmetros e a janela de 1 milhão de tokens, mas ganha pós-treinamento extra para coding em escala de engenharia, coordenação de agentes e tarefas multimodais. Preços seguem agressivos para agentes."
pubDate: 2026-09-02
tags: ["ia", "dev", "programação", "ferramentas"]
cover: "/images/news/qwen38-max-0902-atualizacao-codigo.jpg"
---

A Alibaba liberou nesta quarta-feira (2) uma nova versão do seu modelo carro-chefe hospedado. O **Qwen3.8-Max-0902** é um *snapshot* atualizado do Qwen3.8-Max — o modelo MoE de **2,4 trilhões de parâmetros** (com cerca de 95 bilhões ativados por token) — que recebeu pós-treinamento adicional focado em **coding, trabalho colaborativo de agentes e tarefas de longo horizonte**.

O rótulo escolhido pela equipe Qwen para essa direção é **"Coding & Cowork"**: em vez de mexer na arquitetura, a atualização tenta extrair mais desempenho do modelo existente em situações que exigem várias etapas — como desenvolver projetos de engenharia inteiros, coordenar múltiplas ferramentas e levar uma tarefa até a entrega final.

## O que muda na prática

A Alibaba destaca três frentes principais:

- **Coding em escala de engenharia**: trabalho em projetos maiores, geração de aplicações completas e manutenção de progresso em tarefas longas de desenvolvimento.
- **Trabalho colaborativo de agentes**: coordenação de várias ferramentas, gestão de etapas intermediárias e execução até o entregável final.
- **Compreensão multimodal**: leitura de gráficos, parsing de documentos e raciocínio sobre imagens e vídeo junto com texto.

A janela de contexto de **1 milhão de tokens** permanece no serviço hospedado — espaço suficiente para múltiplos repositórios de código, documentos de arquitetura e longos históricos de agentes numa única requisição. (A versão de pesos abertos suporta 262.144 tokens nativamente, extensível a ~1,01 milhão com YaRN.)

Há um sinal externo inicial de que o coding melhorou: no leaderboard **Code Arena WebDev**, o Qwen3.8-Max-0902 marca **1691 ±19**, contra **1669 ±16** da versão anterior — resultado preliminar que o coloca perto do topo da lista geral.

## Preços pensados para agentes

O QwenCloud mantém uma tabela agressiva para um modelo dessa escala:

| Categoria de token | Preço por 1M de tokens |
|---|---|
| Entrada padrão | US$ 2,00 |
| Saída | US$ 6,00 |
| Criação de cache explícito | US$ 2,50 |
| **Cache explícito (hit)** | **US$ 0,17** |
| Cache implícito (hit) | US$ 0,25 |

O preço baixo de leitura de cache é especialmente relevante para sistemas de agentes: um agente de programação pode reutilizar documentação do repositório, instruções de arquitetura e fontes compartilhadas enquanto só muda a tarefa corrente — o que derruba o custo de rodadas repetidas de contexto pesado. Vale o aviso: cache exige prefixos de prompt estáveis e, no cache explícito, expira em cerca de cinco minutos sem um novo hit.

A API é compatível com o padrão OpenAI (Chat Completions), aceita texto, imagem e vídeo como entrada e oferece modos com e sem *thinking*. Para quem quer reprodutibilidade, o modelo pode ser fixado como `qwen3.8-max-0902` (ou `qwen3.8-max-2026-09-02`); o alias `qwen3.8-max` agora aponta para esse snapshot.

## Pesos abertos? Depende

Detalhe importante: os pesos abertos do **Qwen3.8-2.4T-A95B** (a base do modelo) já estão disponíveis no Hugging Face e no GitHub. Mas o **Qwen3.8-Max-0902 em si é um snapshot hospedado** — a Alibaba não listou um checkpoint separado para download. Ou seja: dá para rodar localmente a base aberta, mas sem garantia de comportamento idêntico ao serviço.

> Minha opinião: o 0902 é mais interessante como atualização de comportamento do que de especificação — não cresceu em parâmetros nem em contexto, mas tentou ensinar o modelo a trabalhar melhor em fluxos longos de agentes. O ponto de atenção é que as evidências públicas mais fortes (Code Arena) são preliminares e concentradas em desenvolvimento web; para uso corporativo e científico, ainda falta avaliação específica da Alibaba.

Fonte: [Zeniteq](https://www.zeniteq.com/qwen3-8-max-got-upgraded-with-1m-token-ai-coding-mkwepw)
