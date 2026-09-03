---
title: "K2 Horizon: universidade de IA de Abu Dhabi libera seis modelos totalmente abertos, de 0,9B a 375B"
description: "O MBZUAI apresentou a família K2 Horizon — seis modelos abertos de 0,9 a 375 bilhões de parâmetros com pesos, código, dados de treino e metodologia, do tamanho que roda num relógio ao flagship de raciocínio."
pubDate: 2026-09-03
tags: ["ia", "open-source", "ferramentas", "dev"]
cover: "/images/news/mbzuai-k2-horizon-modelos-abertos.jpg"
---

A **Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)**, a primeira universidade do mundo dedicada exclusivamente a IA, anunciou nesta quinta-feira (3) o **K2 Horizon** — na prática, seis modelos diferentes que a instituição descreve como um dos maiores lançamentos "totalmente abertos" da história da inteligência artificial.

A família cobre de **0,9 bilhão a 375 bilhões de parâmetros**. O menor deles, segundo a universidade, é pequeno o bastante para **rodar em um relógio**; o maior, o K2 Horizon 375B, foi construído para "competir com os principais modelos de pesos abertos em raciocínio e trabalho agêntico".

## O que significa "totalmente aberto" aqui

Diferente de lançamentos que liberam só os pesos ou uma API, o MBZUAI afirma que cada modelo da família sai com **pesos, código, dados de treino e metodologia** — permitindo que pesquisadores e empresas inspecionem e reproduzam todo o processo.

> "Acreditamos que o progresso significativo em IA depende da capacidade de examinar, construir em cima e melhorar a tecnologia — não apenas acessá-la por uma API." — Prof. Eric Xing, presidente do MBZUAI (tradução livre)

> "A tecnologia mais importante do nosso tempo deveria ser construída com o mundo, não escondida dele." — Prof. Eric Xing, presidente do MBZUAI (tradução livre)

Os modelos foram desenvolvidos no **Institute of Foundational Models (IFM)** da universidade. Hector Liu, diretor do laboratório do IFM no Vale do Silício, explicou a decisão de liberar seis tamanhos: a ideia é que cada versão dispute a liderança entre os melhores modelos abertos da sua faixa.

> "Todo modelo é construído para competir com os melhores modelos abertos do seu tamanho, e todos saem com os pesos, o código, os dados de treino e a metodologia. Desenvolvedores podem prototipar no modelo menor, escalar para o flagship e verificar cada afirmação que fazemos pelo caminho." — Hector Liu, diretor do laboratório do IFM no Vale do Silício (tradução livre)

## Recursos de engenharia

A família traz ainda dois diferenciais técnicos. O **roteamento dinâmico de modelos** (*dynamic model routing*) permite direcionar tarefas específicas para o modelo mais econômico da linha, cortando custo sem trocar de ecossistema. Já a chamada *mixture of value architecture* promete **refinar o raciocínio sem exigir mais poder computacional**.

O K2 Horizon está disponível para download no **Hugging Face, Ollama, Unsloth** e no repositório do próprio IFM.

## O que observar

O lançamento escancara uma tendência que o blog vem acompanhando de perto: a semana já teve [DeepSeek](/posts/deepseek-v4-flash-vision-exp/) e [Tencent Hy4](/posts/tencent-hy4-preview-open-source/) na briga dos pesos abertos, e agora entra um player estatal dos Emirados Árabes com uma aposta mais radical de transparência — dados de treino e metodologia inclusos, não só pesos. Para quem desenvolve, o mais interessante é o leque: dá para começar num modelo de 0,9B que roda em hardware modesto (ou num relógio) e subir de tamanho sem migrar de fornecedor. A Abu Dhabi, que quer virar polo global de IA, acaba de mostrar a sua cartada.

> Fonte: [The National — UAE's AI university introduces world's largest 'fully open' models](https://www.thenationalnews.com/future/technology/2026/09/03/mbzuai-k2-horizon-ai-open-model-uae/)
