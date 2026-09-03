---
title: "Perplexity abre o código do Lily: motor de IA local em Rust e Metal que roda o Qwen direto no Mac"
description: "O Lily, motor que roda a parte local do Hybrid Compute do Perplexity Computer, virou open-source: runtime em Rust com kernels Metal escritos à mão, sem PyTorch nem MLX, para rodar o Qwen3.6-35B-A3B em Apple Silicon — 4.156 tokens/s de prefill e 170 de decode num M5 Max."
pubDate: 2026-09-01
tags: ["ia", "open-source", "ferramentas", "dev"]
cover: "/images/news/perplexity-lily-ia-local-apple-silicon.jpg"
---

Se você usa um Mac com chip da Apple e já tentou rodar um modelo de linguagem localmente, conhece o caminho padrão: instalar o MLX, baixar o modelo e torcer para a velocidade ser aceitável. A **Perplexity** acabou de mostrar que dá para ir muito além — e abriu o código de como faz isso. No dia 1º de setembro, a empresa publicou os detalhes de engenharia do **Lily**, o motor de inferência local que roda por trás do recurso Hybrid Compute do Perplexity Computer, e liberou o projeto no repositório **pplx-garden**.

## O que é o Lily

O Lily é um runtime de processo único desenhado para fazer **uma coisa só, muito bem feita**: rodar o modelo **Qwen3.6-35B-A3B** (da Alibaba) em **Apple Silicon**. A arquitetura é enxuta:

- uma camada em **Rust** carrega o checkpoint e dirige o loop de geração;
- uma API compatível com *chat completions* da OpenAI faz o streaming dos tokens;
- **kernels de Metal escritos à mão** executam o modelo.

O detalhe que mais ensina está na frase seguinte: **nem PyTorch nem MLX participam do caminho de execução**. Enquanto o MLX precisa manter operações reutilizáveis entre arquiteturas, o Lily abre mão dessa generalidade de propósito — e é exatamente essa especialização que gera a vantagem de desempenho.

## Por que especializar vale a pena

Para entender o ganho, vale um resumo rápido de como o modelo funciona. O Qwen3.6-35B-A3B guarda **35 bilhões de parâmetros**, mas ativa cerca de **3 bilhões por token**: um roteador escolhe 8 entre 256 "especialistas" (técnica Mixture of Experts), além de um especialista compartilhado que processa todos os tokens. A arquitetura mistura 10 camadas de atenção completa com 30 camadas recorrentes (Gated DeltaNet) — três padrões de trabalho bem diferentes.

O checkpoint usa quantização de 4 bits por grupos de 64 pesos: cerca de **70 GB em bfloat16 comprimidos para 19,4 GB**. Por isso o requisito realista é um Mac com **32 GB ou mais de memória unificada** (o produto da Perplexity lista macOS 15+, 24 GB no mínimo).

## Os números

Em um **M5 Max** de 40 núcleos de GPU e 128 GB, comparando o Lily com o caminho mais rápido do MLX-LM usando os mesmos bytes de checkpoint 4-bit:

| Métrica | Lily | MLX-LM |
|---|---|---|
| Prefill (média, 256 a 128K tokens) | **4.156 tok/s** | 3.388 tok/s |
| Decode (média) | **170,0 tok/s** | 126,4 tok/s |
| Prefill (prompt 4K / ctx 4K) | **5.749,9 tok/s** | 4.737,5 tok/s |
| Decode (prompt 4K / ctx 4K) | **186,6 tok/s** | 140,9 tok/s |

O Lily foi mais rápido em todos os pontos medidos (1,12× a 1,42× no prefill e 1,31× a 1,37× no decode), com qualidade praticamente idêntica: a perplexidade ficou 0,04% maior e o token principal escolhido coincide 96,35% das vezes.

## O que cada otimização ensina

A Perplexity publicou as ablações — ou seja, mediu o ganho de cada técnica desligando-a uma a uma:

- **Roteamento de especialistas residente na GPU (+89%)**: o histograma, a varredura de prefixo e o espalhamento dos tokens ficam num único *command buffer*; nenhuma camada MoE espera a CPU;
- **Desquantização fundida no GEMM (+77,4%)**: os pesos de 4 bits são reconstruídos um bloco por vez dentro da multiplicação de matrizes, sem expandir o array inteiro na memória unificada;
- **Empacotamento GQA (+23,8% em contexto 32K)**: quatro cabeças de consulta compartilham um threadgroup, então cada linha de KV é carregada uma vez;
- **Atenção de blocos fixos (+40,2% em 128K)**: acima de 32K de contexto, o cache é dividido em partes paralelas.

E o que *não* funcionou também ensina: a **decodificação especulativa** deixou o decode 18% mais lento nesse cenário de batch 1 — o formato de verificação de duas a cinco linhas é desajeitado para esse hardware. A Perplexity mantém a técnica no deployment em lote com GPUs Blackwell, mas deixou-a de fora do Lily.

## Por que isso importa para quem desenvolve

A lição didática do Lily é a especialização como estratégia. Em vez de uma solução genérica que roda qualquer modelo em qualquer chip, a Perplexity construiu um runtime sob medida para **um modelo e uma família de hardware** — e o código aberto permite estudar cada decisão: como funciona prefill vs. decode, por que MoE muda o gargalo, como quantização de 4 bits conversa com o Metal. Para quem quer rodar IA local de verdade ou aprender os fundamentos de inferência eficiente, é um dos melhores materiais de estudo que surgiram no ano.

> Fonte: [Perplexity — repositório pplx-garden (Lily)](https://github.com/perplexityai/pplx-garden)
