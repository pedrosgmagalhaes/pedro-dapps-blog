---
title: "Tencent libera Hy4 preview: open-source com 770 bilhões de parâmetros e 1 milhão de tokens de contexto"
description: "Modelo MoE com 49 bilhões de parâmetros ativos por token, licença Apache 2.0 e foco em produtividade real: código, escritório, jogos e ciência."
pubDate: 2026-08-28
tags: ["ia", "open-source", "tencent", "modelos"]
cover: "/images/news/tencent-hy4-preview-open-source.jpg"
---

A Tencent abriu o código do **Hy4 preview**, seu novo modelo de linguagem de grande porte, com números de peso: **770 bilhões de parâmetros no total**, dos quais apenas **49 bilhões são ativos por token**, e uma janela de contexto que passa de **1 milhão de tokens**. O modelo é distribuído sob licença **Apache 2.0** — sem limite de usuários — e entra direto no topo da lista de modelos abertos.

O anúncio oficial da Tencent, de 28 de agosto, posiciona o Hy4 preview como um modelo "de próxima geração" construído para tarefas reais de produtividade, cobrindo programação, trabalho de escritório e pesquisa científica.

## Por que o Hy4 importa

A arquitetura é de **Mixture of Experts (MoE)** com roteamento de especialistas: dos 770 bilhões de parâmetros, só uma fração é ativada a cada token processado — o que permite alta capacidade com custo de inferência mais enxuto. Em uma avaliação cega interna da Tencent, com **163 especialistas e 203 tarefas de engenharia**, o Hy4 preview marcou **2,99 de 4,00**, ficando à frente do **GLM-5.3 (2,92)** e do **Kimi K3 (2,94)**.

O modelo está disponível gratuitamente por duas semanas no **WorkBuddy** e no **CodeBuddy** (o acesso gratuito ao Hy3 foi estendido até 30 de setembro). Também dá para testá-lo pelo Yuanbao e pelo ima, além da API via Tencent Cloud TokenHub e OpenRouter.

## Foco em produtividade real

A Tencent destaca quatro frentes de uso:

- **Engenharia de software**: compreensão, planejamento, depuração e validação melhores em tarefas de desenvolvimento de contexto longo, com ganho também na qualidade visual e na interação do front-end;
- **Escritório e análise**: compreensão mais forte de ambientes de trabalho complexos e análise financeira aprimorada, com suporte ao fluxo completo de documentos, planilhas e apresentações;
- **Jogos**: o modelo consegue gerar um **protótipo jogável a partir de um único pedido em linguagem natural** e trabalha junto com engines de jogo;
- **Ciência**: melhor desempenho em áreas como simulação de dinâmica molecular, física da matéria condensada e matemática fundamental.

## O modelo que melhora a si mesmo

Um detalhe chama atenção no comunicado: o Hy4 preview participou do próprio desenvolvimento. Pela primeira vez, o modelo entrou no **loop de otimização automatizada** de métodos de treinamento, estratégias de dados, frameworks de avaliação e operadores de baixo nível — propondo abordagens, rodando experimentos e iterando com os resultados.

Ele também analisou sozinho os gargalos do próprio sistema de inferência e fez múltiplas rodadas de otimização (fusão de operadores e otimização de comunicação), elevando o **throughput de ponta a ponta em 31,8%** em relação à linha de base.

## Preço da API

A Tencent mantém a estratégia de custo agressivo: **US$ 0,834 por milhão de tokens de entrada**, **US$ 2,501 por milhão de tokens de saída** e **US$ 0,042 por milhão de tokens** para cache hits. Na prática, um modelo com contexto de 1 milhão de tokens e preço de entrada abaixo de US$ 1 por milhão coloca pressão direta nos modelos abertos concorrentes — inclusive os da [família DeepSeek](/posts/deepseek-v4-flash-vision-exp/).

Minha opinião: o que mais me impressiona aqui não é o tamanho, é o **loop de auto-melhoria** — o modelo otimizando o próprio treinamento e a própria infraestrutura é um passo concreto em direção a modelos que evoluem sem depender só de equipes humanas. Fica o aviso: quem trabalha com IA precisa acompanhar de perto a fila de modelos abertos da Tencent.

> Fonte: [Tencent](https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/)
