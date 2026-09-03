---
title: "Audacity 4.0 chega com interface reescrita em Qt, edição por clipes e novo formato .aup4"
description: "O clássico editor de áudio open source lançou sua maior atualização em anos: interface reconstruída sobre Qt, seleção e edição de múltiplos clipes, Workspaces, temas e um novo formato de projeto."
pubDate: 2026-09-03
tags: ["programação", "dev", "open-source", "ferramentas"]
cover: "/images/news/audacity-40-reescrita-qt.jpg"
---

O **Audacity 4.0** foi lançado nesta quinta-feira (3) e já estreou no topo do Hacker News. É a maior atualização em anos do clássico editor de áudio open source: o aplicativo **reescreveu a interface sobre Qt**, com renderização nativa em high-DPI, e trocou boa parte dos fluxos de edição por um **novo modelo baseado em clipes**.

O projeto nasceu em 2000 na Carnegie Mellon e está sob a guarda da Muse Group desde 2021 — são décadas de um dos softwares de áudio gratuitos mais usados do mundo, então qualquer mudança grande mexe com uma base enorme de usuários.

## O que muda na edição

O coração do Audacity 4 é o novo modelo de clipes. Agora é possível **selecionar um clipe direto pelo cabeçalho**, editar **vários clipes ao mesmo tempo** (mover, cortar e esticar o tempo se aplicam a todos os selecionados) e **agrupar clipes** para que eles andem juntos. Clipes também ganharam mais liberdade de posição — podem circular entre trilhas mono e estéreo, e arrastar um por cima de outro substitui só a parte sobreposta, em vez de bloquear o movimento.

A ferramenta de divisão ganhou um atalho dedicado: segure (ou pressione) **S** e clique na forma de onda ou no cabeçalho do clipe para dividir. O *paste* também ficou mais inteligente, criando trilha quando necessário e adaptando layouts de canais automaticamente.

## Interface e fluxos de trabalho

A interface antiga de modos separados (Select, Envelope, Draw e Multi-tool) foi aposentada. As funções viraram **sensíveis ao contexto**: envelopes de volume aparecem no modo *Clip gain*, desenho de amostra fica disponível quando você dá zoom até o nível de amostras individuais, e a divisão sai pelo S. O Sync-Lock saiu de cena, com variantes explícitas de delete/cut/paste que preservam ou não o timing.

Para organizar o espaço, o Audacity 4 traz **Workspaces** salváveis — já vêm três prontos: *Modern*, *Classic* e *Music* — além de temas claro, escuro e de alto contraste, cores de destaque e uma nova **Home screen** com os projetos recentes e miniaturas de pré-visualização.

## Reprodução, gravação e formato de projeto

Na base técnica, a versão nova inclui *playhead* visível e arrastável, busca sem parar a reprodução e gravação que pode começar em qualquer ponto da linha do tempo. As builds oficiais para Windows ganharam suporte a **ASIO**, e os cabeçalhos de trilha agora exibem medidores ao vivo de reprodução e gravação.

O Audacity 4 usa o novo formato de projeto **`.aup4`**. Projetos `.aup3` abrem e são convertidos sem alterar o original — mas **não dá para salvar de volta** para `.aup3`. Projetos antigos `.aup` também podem ser importados.

## O que ficou de fora (por enquanto)

A versão 4.0 ainda não inclui alguns recursos do Audacity 3, que devem voltar em releases futuros: **Time Tracks, trilhas Note/MIDI, Mixer, Macro Manager e o scripting pipe, plugins VAMP e LADSPA e play-at-speed**. E, no clima do release, a equipe fez uma piada à altura do nome do software: "e, por último, tivemos a audácia de mudar o logo do Audacity".

## O que observar

Atualizações grandes em software livre amado têm um padrão conhecido: um grupo reclama de tudo que mudou, enquanto a maioria celebra a modernização. Para quem edita áudio com frequência (podcasters, músicos, editores de vídeo), o ganho prático do 4.0 está em **editar vários clipes de uma vez e não perder o ritmo entre ferramentas** — sem pagar nada por isso. Projetos de reescrita como esse também valem como estudo de caso de migração de UI, no mesmo espírito de outros projetos que o blog já acompanhou, como o [FastPotify em Rust](/posts/fastpotify-spotify-rust/).

> Fonte: [GitHub — Audacity 4.0.0 release](https://github.com/audacity/audacity/releases/tag/Audacity-4.0.0)
