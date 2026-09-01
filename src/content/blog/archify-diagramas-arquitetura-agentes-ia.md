---
title: "Archify lidera o trending do GitHub: diagramas de arquitetura gerados por IA direto no chat"
description: "O projeto transforma descrições de sistemas em mapas de arquitetura interativos em HTML/SVG — direto no Cursor, Claude Code, Codex CLI e OpenCode. Foi o repo mais quente do GitHub no fim de agosto."
pubDate: 2026-08-31
tags: ["programação", "dev", "ferramentas", "open-source"]
cover: "/images/news/archify-diagramas-arquitetura-agentes-ia.jpg"
---

Se você trabalha com arquitetura de software, provavelmente já perdeu horas ajustando caixinhas no Mermaid ou no draw.io. O **Archify**, projeto que liderou o ranking de repositórios em alta do GitHub no fim de agosto, ataca exatamente essa dor: **transformar uma descrição do sistema em um diagrama de arquitetura interativo — direto no chat do seu agente de IA**.

## O que é

O Archify é um sistema de renderização e validação em Node.js feito para agentes de codificação — funciona com **Cursor, Claude Code, Codex CLI e OpenCode**. O fluxo é:

1. O agente produz um **JSON IR tipado** a partir da sua descrição (ou do código);
2. O Archify compila esse JSON, de forma determinística, em **HTML/SVG** autocontido;
3. Você abre o arquivo e apresenta — com tema claro/escuro, cinco tipos de diagrama e quatro presets.

A instalação é uma linha:

```
npx skills add tt-a1i/archify -g
```

Depois, é só pedir: *"Use archify to map this repository's runtime architecture"* — e iterar com comandos como "add Redis", "move auth to the left" ou "highlight the rollback path".

## Por que os devs estão gostando

O diferencial em relação a ferramentas de auto-layout genéricas é o controle:

- **Layout com julgamento** — o agente escolhe hierarquia, espaçamento e rotas, em vez de empilhar setas no mesmo ponto;
- **Comparação de mudanças** — dá para comparar dois snapshots validados como *Before / Delta / After*, com o que foi adicionado, removido, movido ou reroteado. Útil para revisar PRs de arquitetura antes do merge;
- **Validação atômica** — schema, layout, HTML/SVG, rotas e clareza das labels passam por checagens antes de o artefato substituir o último bom;
- **Exportação** — PNG, SVG, WebM e cards de compartilhamento 1200×630 para README e redes sociais;
- **Fonte verificável** — nós com evidência (marcados `SRC n`) abrem arquivos e linhas reais do repositório, sem inventar topologia.

O projeto é um fork/reescrita do architecture-diagram-generator da Cocoon AI, está sob licença MIT e está na versão de desenvolvimento `v2.16.0-dev.0`.

## O que observar

Para mim, o movimento interessante aqui é o padrão: em vez de um editor visual, o diagrama vira um **artefato de conversa** — você descreve, o agente desenha, você ajusta por texto. Isso é o mesmo caminho que já vimos em outras ferramentas para devs que passaram a liderar o trending: [o harness da DeepSeek](/posts/deepseek-harness-dsh/), o [kakehashi](/posts/kakehashi-binarios-macos-linux/) e o [fastpotify](/posts/fastpotify-spotify-rust/) são exemplos recentes.

A pergunta que fica é até onde o "diagrama como código" vai substituir as ferramentas visuais tradicionais — mas o trending do Archify sugere que os devs estão prontos para testar.

> Fonte: [GitHub — tt-a1i/archify](https://github.com/tt-a1i/archify)
