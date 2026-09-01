---
title: "Fastpotify: cliente nativo do Spotify em Rust promete abrir em menos de 1 segundo — e virou hit no Hacker News"
description: "Sem motor de navegador embutido, o player open source (egui + librespot) usa 100 a 250 MB de RAM e ainda tem mini player no estilo Winamp."
pubDate: 2026-09-01
tags: ["dev", "open-source", "rust", "ferramentas"]
cover: "/images/news/fastpotify-spotify-rust.jpg"
---

Quem usa o cliente de desktop oficial do Spotify sabe do problema: ele é construído sobre Electron, ou seja, roda um navegador inteiro dentro do app — e come uma boa parte da memória da máquina. O **Fastpotify** ataca exatamente esse ponto: é um **cliente leve e nativo do Spotify escrito em Rust**, que **inicia em menos de um segundo** e usa entre **100 e 250 MB de RAM** enquanto roda. Sem nenhum motor de navegador no processo.

O projeto foi parar no topo do Hacker News com o "Show HN" acumulando **609 pontos** — e virou um dos assuntos mais comentados do dia na comunidade de desenvolvedores.

## O que ele faz

O Fastpotify usa o framework GUI **egui** (também em Rust) para a interface e o **librespot** para tocar música. Ele roda em **Linux, macOS e Windows**, e traz praticamente tudo que o cliente oficial oferece:

- **Tocar música no computador**: funciona como dispositivo Spotify Connect — dá para escolher no celular ou apertar o play aqui, com playback sem gap, até **320 kbps**, normalização de volume opcional e cache de áudio em disco;
- **Controlar outros dispositivos**: mover a reprodução para uma caixa de som, celular ou outro computador pelo seletor de dispositivos, mantendo controle de play, pause, pular, buscar, embaralhar, repetir e volume;
- **Descobrir speakers na rede**: um receptor librespot, spotifyd ou de hardware esperando na LAN é invisível para a API do Spotify até ter uma conta — o Fastpotify descobre esses dispositivos via mDNS e conecta automaticamente;
- **Biblioteca completa**: playlists, músicas curtidas, álbuns salvos, artistas seguidos, podcasts e episódios salvos, com filtros na barra lateral;
- **Busca** em músicas, artistas, álbuns, playlists, podcasts e episódios, com resultado principal e visões por tipo;
- **Páginas de artista, álbum, playlist e podcast** com reprodução a partir de qualquer linha;
- **Edição de playlists** próprias: criar, renomear, descrever, reordenar e editar;
- **Fila** como painel lateral ou página;
- **Cor do álbum**: as páginas e a barra do player ganham um tom da capa do que está sendo ouvido (dá para desligar);
- **Tema claro e escuro**, ou seguir o sistema.

## O toque Winamp

O detalhe que mais chamou atenção: **Ctrl+M** transforma a janela num mini player que usa **skins clássicas `.wsz` do Winamp**, desenhadas pixel a pixel em até 4x, com o analisador de espectro, a playlist e o equalizador — do jeito que eram. Dá até para arrastar uma skin do Winamp Skin Museum para a janela. O equalizador tem as dez bandas e os presets clássicos do Winamp.

## Outros destaques

- **Keyboard-first**: todo comando comum tem atalho (`Ctrl+/` ou `?` lista todos);
- **Continua tocando ao fechar a janela**: a música e o processo seguem na bandeja do sistema (Linux usa status notifier);
- **Integração com o desktop**: MPRIS no Linux (media keys e `playerctl` funcionam); no macOS e Windows, comandos tipo `fastpotify next` ou `fastpotify volume 40` controlam a instância em execução pelo terminal;
- **Instância única**: abrir de novo traz a janela existente para frente;
- **Instalação fácil**: `yay -S fastpotify` no Arch, `brew install --cask crmne/tap/fastpotify` no macOS, ou `cargo install --path .` em qualquer lugar com Rust 1.95+.

## O detalhe do Premium

Um ponto honesto: **tocar música exige conta Premium do Spotify**. O Spotify só permite que contas Premium toquem música em outro app — no computador ou em outro dispositivo. Com conta gratuita, o Fastpotify permite navegar pela biblioteca, mas não tocar (e avisa isso no login). Sobre segurança de conta, o README afirma que não há conhecimento de conta suspensa por usar o Fastpotify ou outro player librespot com Premium: o login acontece nas páginas oficiais do Spotify, o áudio usa a qualidade incluída no Premium, o DRM permanece intacto e o app não rip tracks nem bloqueia anúncios.

## Por que importa para devs

O Fastpotify é um ótimo exemplo de que dá para construir cliente desktop moderno sem Electron: Rust + egui + librespot entregam um app completo, rápido e leve — com testes cobrindo modelos de API, roteamento de sessão dupla, PKCE, a máquina de estados do player e renderização headless de todas as páginas. É o tipo de projeto que prova que o ecossistema Rust de GUI amadureceu o suficiente para apps "de verdade", na mesma linha de outros [projetos open source que viraram notícia](/posts/kakehashi-binarios-macos-linux/).

Minha opinião: o Fastpotify não é só "Spotify mais leve" — é um laboratório vivo de UI com Rust. O mini player Winamp é o tipo de feature que gera engajamento porque apela à nostalgia com um toque técnico. E para quem trabalha com música e automação, os comandos de linha de comando e o MPRIS são um presente.

> Fonte: [GitHub — crmne/fastpotify](https://github.com/crmne/fastpotify) · [Show HN no Hacker News](https://news.ycombinator.com/item?id=49479389)
