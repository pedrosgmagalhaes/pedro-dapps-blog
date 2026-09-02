---
title: "Meta lança Muse Voice Transcribe: IA que transcreve conversas ao vivo e separa mais de 20 vozes"
description: "A Meta Superintelligence Labs apresentou seu primeiro modelo de percepção de áudio em tempo real: transcrição por streaming com diarização de mais de 20 falantes, troca de idioma no meio da frase e adaptação automática de latência — liderando o ranking da Artificial Analysis."
pubDate: 2026-09-01
tags: ["ia", "meta", "audio", "dev"]
cover: "/images/news/meta-muse-voice-transcribe-tempo-real.jpg"
---

A Meta entrou de vez na corrida dos modelos de voz em tempo real. No dia 1º de setembro, a **Meta Superintelligence Labs (MSL)** apresentou o **Muse Voice Transcribe**, que a empresa descreve como seu primeiro modelo de **percepção de áudio em tempo real** — capaz de transcrever uma conversa enquanto ela acontece, identificar quem está falando e saber quando a pessoa terminou de falar, tudo em um único fluxo.

O destaque do anúncio: segundo a Meta, o modelo lidera o ranking de **streaming speech-to-text da Artificial Analysis** e os principais benchmarks públicos de diarização (a tarefa de separar os falantes), com rankings considerados em 1º de setembro de 2026.

## O que o Muse Voice Transcribe faz

- **Transcrição por streaming**: o texto sai enquanto a pessoa ainda está falando, sem esperar o áudio terminar;
- **Diarização com mais de 20 vozes**: o modelo acompanha uma conversa de várias pessoas ao mesmo tempo e sabe quem disse o quê;
- **Troca de idioma sem travamento**: o *code-switching* entre línguas funciona dentro da mesma frase — um bilíngue que alterna inglês e mandarim no meio do raciocínio é transcrito de forma contínua;
- **Mais de 70 idiomas treinados**, dos quais **25 foram extensivamente validados** no lançamento;
- **Biasing de contexto, idioma e palavras-chave**: ao saber o seu vocabulário (nomes, lugares, termos frequentes), a transcrição fica mais precisa.

A visão por trás do modelo é a mesma que Mark Zuckerberg descreveu quando falou em uma "superinteligência pessoal para cada pessoa": antes de ter um assistente que conversa naturalmente com você, ele precisa de "ouvidos" que funcionem em conversas reais — com sobreposições, interrupções e sotaques. É o degrau de baixo da escada.

## Por dentro: áudio em pedaços de 80 ms

O Muse Voice Transcribe é um **modelo autoregressivo multimodal da família Muse Spark**. O áudio chega em **pedaços de 80 ms** (12,5 Hz), e cada pedaço vira um único token. A cada novo pedaço, o modelo decide: continuar ouvindo (prevendo o token `<|next_audio|>`) ou emitir um token de texto. Quando o fluxo de áudio termina, um token `<|empty_audio|>` avisa que não há mais nada para ouvir — e o texto restante é emitido.

O detalhe interessante é o **"atraso adaptativo"**: em vez de usar uma latência fixa, o modelo decide, palavra por palavra, quanto áudio quer acumular antes de transcrever. Palavras difíceis ganham mais contexto; as fáceis saem na hora. Isso é treinado com *reinforcement learning*, combinando a taxa de erro de palavras (WER) com uma recompensa de atraso — e coloca o modelo na **fronteira de Pareto** entre velocidade e precisão.

A mesma base de ASR em streaming sustenta as outras tarefas: tokens especiais marcam troca de falante (`<|start_of_turn|>`, `<|speaker_A|>`) e o início/fim da fala (`<|speech_onset|>`, `<|speech_endpoint|>`), treinados em conjunto com o ASR.

## O que observar

A Meta vinha sendo cobrada por aparecer pouco na corrida dos modelos de voz e agentes — mas 2026 mudou o ritmo, com o lançamento dos agentes [Hatch](/posts/meta-hatch-agentes-ia-watermelon/) e agora o Muse. A jogada é clara: **áudio em tempo real é a porta de entrada dos óculos de IA** e dos assistentes pessoais, e quem dominar a camada de "ouvidos" define o padrão dos agentes que virão. O modelo já aparece na documentação para desenvolvedores (`dev.meta.ai/docs/speech-to-text`), com demo pública no ar — vale testar com uma conversa sua, de preferência em dois idiomas.

> Fonte: [Meta AI — Introducing Muse Voice Transcribe](https://research.meta.ai/blog/introducing-muse-voice-transcribe/)
