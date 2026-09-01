---
title: "Runway apresenta Solaris, o modelo de IA que gera interfaces de apps em tempo real"
description: "Solaris é o primeiro 'Interface World Model' da Runway: em vez de código, cada frame da interface é gerado por um modelo de mundo em tempo real, reagindo a cliques, arrastos e texto digitado."
pubDate: 2026-08-31
tags: ["ia", "ferramentas", "dev"]
cover: "/images/news/runway-solaris-interface-world-model.jpg"
---

A Runway apresentou na segunda-feira (31) o **Solaris**, o primeiro modelo de uma nova família de sistemas de IA que ela chama de **Interface World Models**. A proposta muda a pergunta de partida do software: em vez de "como o desenvolvedor constrói o app", a pergunta vira **o que acontece quando um sistema operacional gera apps e sites enquanto você os usa**.

## Sem camada de código por baixo dos pixels

Hoje, uma interface só funciona depois de passar por uma tradução: o design visual é convertido em código (HTML, JavaScript, etc.) antes de poder fazer qualquer coisa. A Runway argumenta que essa "representação intermediária" limita o que uma interface pode ser — todo comportamento precisa ser definido e implementado antes, e o software sai como uma "compressão com perda" do espaço de interações possíveis.

O Solaris elimina esse passo:

> "It's a real-time interactive model that generates the interface itself, frame by frame. Every frame is synthesized as you interact, allowing the interface to respond continuously to your actions."

Traduzindo: um único modelo de mundo gera cada frame e cada resposta à entrada do usuário. Não há código embaixo da imagem — o frame inteiro **é** a interface.

## Como ele foi construído

O Solaris parte do modelo de vídeo **Gen-4.5** da própria Runway, adaptado para (1) entender interação e (2) responder em tempo real. A empresa o converteu em um motor de tempo real em três estágios:

- **Geração autoregressiva**: cada frame depende apenas dos anteriores;
- **Destilação**: o processo de denoising de muitas etapas foi reduzido a poucas;
- **Modelo rápido treinado nas próprias saídas**: a qualidade visual se mantém estável em interações longas.

Na prática, o sistema divide o trabalho em duas camadas: um **modelo de linguagem** decide o que deve acontecer (interpreta o pedido, define transições de cena) e o **modelo de mundo** renderiza como isso aparece e responde em tempo real. A qualidade visual segura é de **720p**.

## Três capacidades novas

A Runway destaca três características do Solaris:

- **Totalmente visual** — a imagem é o próprio aplicativo. Num exemplo da empresa, você navega numa loja de roupas virtual, pega uma camisa do cabide, arrasta sobre você para provar e reorganiza a vitrine como faria numa loja física.
- **Vivo** — o app é renderizado continuamente e evolui sozinho. Reflexos mudam com a iluminação, objetos reagem ao serem manipulados, e dá para pedir algo simples como *"mova a mesa para eu ver como fica"* ou *"troque a cor do sofá"*.
- **Aberto** — as interações não ficam limitadas ao que o desenvolvedor previu. O mesmo frame inicial pode responder ao mesmo arrasto de maneiras completamente diferentes.

O detalhe mais curioso é o que a Runway chama de **"reinventar o mouse"**: como as interações são descritas em linguagem natural em vez de programadas, qualquer objeto da cena pode virar uma ferramenta. Clique num gato e seus próximos cliques aplicam a cor e a textura do pelo dele no que você tocar.

## Além das interfaces: treinar agentes

O Solaris também abre um caminho novo para **treinar agentes de IA** em ambientes muito mais dinâmicos. A empresa lembra que os melhores LLMs de hoje ainda tropeçam em tarefas básicas de uso de computador — como reservar um hotel ou fazer compras de mercado — porque aprendem o layout específico em que foram treinados e não se adaptam a uma interface levemente diferente. Com interfaces geradas continuamente, os agentes poderiam treinar contra layouts que nunca existiram antes.

## Status atual

O Solaris é um **research preview** (prévia de pesquisa), não um sistema operacional público. A Runway está aceitando pedidos de acesso antecipado e diz que trabalha com parceiros rumo a um lançamento público — mas não anunciou data, API, preço nem requisitos de hardware.

## O que observar

Se a promessa se confirmar, o impacto é grande para quem desenvolve: a interface deixa de ser um artefato programado e vira um **resultado de prompt**. O custo por frame ainda é o ponto de atenção — embora a Runway afirme que o modelo é "ordens de magnitude" mais barato que um modelo de difusão de vídeo padrão, e que a curva de custo continua caindo. Coerência em sessões longas e custo de produção são os dois desafios que vão separar a demo da adoção real.

> Fonte: [Runway — Introducing Solaris](https://runway.com/news/research/introducing-solaris) · [Indian Express](https://indianexpress.com/article/technology/artificial-intelligence/runway-solaris-ai-interactive-apps-10858038/)
