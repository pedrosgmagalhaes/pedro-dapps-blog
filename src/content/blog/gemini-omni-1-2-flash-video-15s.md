---
title: "Gemini Omni 1.2 Flash: clipes de 15 segundos, edição por conversa e 30% mais barato"
description: "O Google liberou o Gemini Omni 1.2 Flash para uso geral: vídeos nativos de até 15 segundos, edição multi-turno no mesmo clipe, referências mais fiéis e preço de US$ 0,07 por segundo em 720p — 30% abaixo do Omni 1.1."
pubDate: 2026-11-06
tags: ["ia", "google", "dev", "ferramentas"]
cover: "/images/news/gemini-omni-1-2-flash.jpg"
---

Gerar vídeo com IA deixou de ser demonstração de laboratório e virou linha de produção — e o gargalo agora é outro: preço por segundo, consistência do personagem entre tomadas e o custo de refazer tudo quando um detalhe sai errado. O **Gemini Omni 1.2 Flash**, anunciado pelo **Google** em 5 de novembro, ataca exatamente esses três pontos. E, pela primeira vez, o modelo Omni chega a **disponibilidade geral** (GA), na Gemini API e no Gemini for business.

## O que mudou

- **Clipes nativos de até 15 segundos** (antes eram 10 no Omni 1.1), com duração definida de **3 a 15 segundos em incrementos de 1 segundo**;
- **edição multi-turno**: dá para corrigir o mesmo clipe conversando, em vez de regerar do zero;
- **referências mais fiéis**: combinação de imagens de personagem, produto ou estilo, trechos de movimento de até 3 segundos e pistas de áudio;
- **preço 30% menor** que o Omni 1.1: **US$ 0,07 por segundo** de vídeo em 720p;
- **rascunho barato e upscale depois**: gerar em 360p ou 720p, ajustar, e só então subir para 1080p ou 4K.

## 15 segundos mudam o roteiro

O salto de 10 para 15 segundos não é só "mais tempo". O Google posiciona o modelo para fechar **histórias completas, explicadores de produto e peças de anúncio inteiras em uma única geração**. Com duração em incrementos de um segundo, o corte deixa de ser consequência do modelo e passa a ser decisão de edição — e aí entra uma recomendação editorial nossa, não uma regra do Google: 6 segundos costumam bastar para um gancho e 15 para uma cena contínua.

O material de divulgação mostra exemplos concretos: um explicador de ciência de quatro planos e 15 segundos com legendas escritas corretamente e presas ao movimento; uma transferência de movimento em dois turnos (um polvo ondulando vira uma dançarina com o vestido repetindo o mesmo fluido); e um *crash zoom-out* contínuo da costa até uma vista aérea da ilha, em 10 segundos e sem cortes.

## Editar conversando em vez de regerar

O recurso mais econômico é o **multi-turno**. Em vez de descrever tudo de novo e aceitar a roleta de uma nova geração, você pede a troca: o produto, o fundo, a iluminação, o clima, a proporção. O Google demonstra isso trocando o cenário de um clipe — tenda listrada, floresta de carvalhos, estábulo com um cavalo branco, feira, castelo de pedra — mantendo a atuação dos personagens, os reflexos da armadura e o enquadramento.

Para quem produz volume, isso é a diferença entre pagar uma geração inteira a cada ajuste e pagar só pela edição. E é o que viabiliza variantes de anúncio para públicos e formatos diferentes sem reescrever o briefing.

## Referências que sobrevivem ao corte

O ponto mais técnico — e o mais útil de entender — é a **aderência de referência**. O modelo aceita imagens de personagem, produto e estilo, clipes curtos de movimento e pistas de áudio, e mantém esses detalhes do primeiro ao último quadro. Rostos, roupas, tipografia de embalagem e cores de marca permanecem estáveis entre ângulos de câmera.

No exemplo oficial, uma foto de modelo mais fotos de frente e costas de três looks geram uma sequência de *virtual try-on* de 15 segundos, com giros de 360 graus e *match cuts*, preservando a identidade da modelo e o caimento de cada peça. É o tipo de consistência que separa um catálogo de um mosaico de tentativas.

Vale lembrar que o Google já vinha empurrando o Gemini para o lado da leitura de vídeo — o modelo que [assiste ao vídeo sob demanda e corta até 88% dos tokens](/posts/gemini-agentic-video-understanding/) —, e agora fecha o ciclo do lado da produção.

## O preço e o fluxo de trabalho

A frase oficial é direta:

> "We have dropped the price 30% from Gemini Omni 1.1 making it available at $0.07 per second for 720p video."

O desenho de custo é o que importa na prática. Rascunhar em 360p ou 720p, corrigir um detalhe com uma edição de acompanhamento e só então levar o melhor material para 1080p ou 4K reduz o gasto justamente na etapa em que se erra mais: a descoberta do enquadramento e do ritmo.

## Onde já dá para usar

- **Desenvolvedores:** Gemini API (protótipos no Google AI Studio, com documentação e tabela de preços próprias);
- **Empresas:** Google Cloud console e Vertex AI, com **Provisioned Throughput** disponível;
- **Criação:** Flow, Google Vids (clipes de 15 segundos sem custo adicional com conta Google), app Gemini (em rollout para assinantes do Google AI Ultra) e Google Ads.

Toda saída carrega **SynthID**, a marca d'água imperceptível do Google — o que importa para quem publica conteúdo gerado e precisa declarar a origem.

## O que o Google admite que ainda falta

A própria publicação lista os pontos em desenvolvimento: **ação esportiva rápida, mudanças rápidas de roteiro e física complexa**. Também não há promessa de clipes acima de 15 segundos. Para quem planeja produção, é um lembrete: o modelo cobre bem cena curta e contínua, não substitui decupagem de peça longa.

## Por que isso importa aqui

Para o público brasileiro que vive de conteúdo, a leitura é prática. O custo de vídeo gerado por IA sempre teve três componentes — tempo, tentativa e resolução. Um modelo que cobra por segundo, permite editar sem regerar e mantém a referência estável ataca os três ao mesmo tempo, e muda a conta de quem produz catálogo, anúncio e explicador em escala.

O que ele **não** resolve é a parte editorial: roteiro, escolha de gancho e critério do que vale publicar continuam humanos. Ferramenta mais barata só aumenta o volume de decisões ruins se ninguém estiver no comando.

> Fonte: [Google — "Gemini Omni 1.2 Flash: Fast and cost-effective with longer clips"](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) (05/11/2026) · [documentação da Gemini API](https://aistudio.google.com/docs/omni)
