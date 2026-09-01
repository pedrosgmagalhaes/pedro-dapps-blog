---
title: "Kakehashi: projeto open-source roda binários do macOS no Linux ARM — sem emular o Mac"
description: "Camada de tradução em userspace executa código ARM64 do macOS direto no processador Linux; já roda 7-Zip, curl, Apple Git e clang — e bombou no Hacker News."
pubDate: 2026-09-01
tags: ["programação", "dev", "ferramentas", "open-source"]
cover: "/images/news/kakehashi-binarios-macos-linux.jpg"
---

Um projeto open-source chamado **Kakehashi** está agitando a comunidade dev: ele consegue rodar binários ARM64 compilados para macOS diretamente em servidores Linux ARM64 — sem máquina virtual do macOS, sem emulador de CPU e sem tradução JIT. O código ARM64 do programa executa de forma nativa no processador; o Kakehashi só intervém quando o aplicativo precisa conversar com o sistema operacional.

O projeto bombou no Hacker News nesta semana e está disponível no GitHub em [wie-project/kakehashi](https://github.com/wie-project/kakehashi), sob licença Apache 2.0, escrito em Rust.

## Como funciona

Linux normalmente usa binários ELF; macOS usa **Mach-O**. O Kakehashi constrói a ponte entre os dois mundos:

- `kh run <programa>` prepara um ambiente chamado *bottle* (com a raiz do filesystem visível ao app e uma implementação própria de `libSystem.B.dylib`);
- carrega o executável Mach-O e suas bibliotecas dinâmicas, resolve símbolos e liga as chamadas de sistema BSD ao seu runtime;
- **pula direto para o entry point** — as instruções ARM64 rodam nativas;
- o runtime assume o controle apenas nas operações que cruzam a fronteira Darwin ↔ Linux (syscalls, threads, faults).

A arquitetura é dividida em componentes: `kh-loader` (parse do Mach-O), `kh-runtime` (memória, traps, syscalls, threads), `kh-libsystem` (biblioteca freestanding) e `kh-xcrun` (helper de xcrun). Segundo os desenvolvedores, o projeto **não deriva do Darling** — outro projeto de compatibilidade com macOS — e não contém blobs proprietários da Apple no repositório, com processo de desenvolvimento clean-room documentado.

## O que já roda

O projeto passou de prova de conceito para ferramentas reais:

- **7-Zip (7zz)**: cria e verifica arquivos, incluindo workloads multi-thread;
- **curl**: conexões HTTP e HTTPS funcionando;
- **Apple Git**: repositórios locais, clone/push via HTTPS e SSH;
- **Apple clang**: compilação, linkagem multi-arquivo, LTO e execução do binário Mach-O gerado — sob o próprio Kakehashi.

Requisitos: Rust 1.88+ e Linux aarch64 (suporta páginas de 4 KiB e 16 KiB, como no Asahi Linux).

## O caso de uso que mais empolga: CI no Linux ARM

Os autores são explícitos sobre a prioridade: **correção em infraestrutura Linux ARM64 barata, não paridade de performance com macOS**. Isso aponta direto para pipelines de CI/CD que dependem de ferramentas Apple — hoje presas a Macs ou a runners macOS pagos. O Kakehashi ainda não substitui um runner macOS completo: faltam GUI, `codesign`, a Security.framework inteira, Git LFS/SVN e o stack completo do Xcode.

Mas há um meio-termo realista: ferramentas de linha de comando, jobs automatizados, parte dos processos de compilação e testes que precisam de binários Darwin — sem exigir o ambiente macOS inteiro — podem se tornar candidatos se a compatibilidade continuar evoluindo.

O benchmark divulgado pelo próprio projeto: `7zz` multi-arquivo processando ~14.500 arquivos e 309 MiB de dados em aarch64 bare-metal levou cerca de **1,24x o tempo do 7zz nativo Linux** — sem custo permanente de interpretação ou recompilação de instruções.

## O que observar

O detalhe mais elegante do Kakehashi é o diagnóstico implícito: o problema de compatibilidade não é mais x86 vs ARM — é a **fronteira entre o aplicativo e o sistema operacional**. Um binário pode ter instruções que a CPU entende perfeitamente e, ainda assim, não rodar porque espera Mach-O, convenções Darwin ou bibliotecas que o Linux não oferece.

É o mesmo espírito do WINE/Proton para jogos de Windows, agora aplicado a ferramentas de desenvolvimento Apple. Se o projeto continuar nesse ritmo, "rodar no Linux" pode passar a incluir uma boa fatia do toolchain da Apple sem precisar de um Mac — algo que economizaria tempo e dinheiro em muita esteira de build. Experimental, sim — mas o experimento já roda clang da Apple em hardware comum.

> Fonte: [System Administration](https://systemadministration.net/kakehashi-runs-macos-binaries-on-linux-arm-without-emulating-a-mac/) · via [Hacker News](https://news.ycombinator.com/item?id=49145937)
