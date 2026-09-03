---
title: "Superpowers: o método open-source que ensina agentes de código a desenvolver software — e virou o repositório que mais cresce no GitHub"
description: "Criado por Jesse Vincent, o Superpowers é uma metodologia completa para agentes de código: fluxo de brainstorming, plano, TDD e subagentes que funcionam em Claude Code, Codex, Cursor, OpenCode e outros. Foi o repositório que mais ganhou estrelas no GitHub em agosto de 2026."
pubDate: 2026-09-03
tags: ["dev", "programação", "open-source", "ferramentas"]
cover: "/images/news/superpowers-metodologia-para-agentes-de-codigo.jpg"
---

Na primeira semana de setembro, o ranking mensal de repositórios em alta do GitHub trouxe um nome no topo que diz muito sobre o momento do desenvolvimento de software: o **Superpowers**, do criador Jesse Vincent (Prime Radiant), ganhou cerca de **25,7 mil estrelas em agosto** e ultrapassou a marca de 66 mil — à frente de projetos gigantes de IA. O motivo do crescimento não é um recurso novo chamativo, e sim uma tese: **agentes de código só entregam valor real quando seguem um método**.

## O que é o Superpowers

O Superpowers é uma **metodologia completa de desenvolvimento para agentes de código**, construída sobre um conjunto de *skills* (habilidades) compostáveis e instruções iniciais que garantem que o agente as use. A tradução prática: em vez de o agente sair escrevendo código assim que recebe o comando, ele segue um fluxo disciplinado — o mesmo que um desenvolvedor sênior ensinaria a um time.

O fluxo básico documentado no projeto tem sete etapas:

1. **Brainstorming** — antes de codar, o agente faz perguntas para refinar a ideia, explora alternativas e apresenta o design em seções para você validar;
2. **Git worktrees** — depois do design aprovado, cria um workspace isolado num branch novo e verifica a baseline de testes;
3. **Plano de escrita** — divide o trabalho em tarefas pequenas (de 2 a 5 minutos), cada uma com caminhos de arquivo exatos e passos de verificação;
4. **Desenvolvimento dirigido por subagentes** — cada tarefa é executada por um subagente novo, com revisão em dois estágios (conformidade com a especificação e qualidade do código);
5. **TDD** — o ciclo red-green-refactor é obrigatório: escrever o teste que falha, ver falhar, escrever o código mínimo, ver passar e commitar;
6. **Revisão de código** — entre tarefas, o trabalho é revisado contra o plano, com problemas classificados por severidade;
7. **Finalização do branch** — testes verificados e decisão consciente entre merge, pull request ou descarte.

> "It's not uncommon for your agent to work autonomously for a couple hours at a time without deviating from the plan you put together."

## Por que virou o queridinho dos agentes

Dois fatores explicam a adoção. O primeiro é o **efeito de rede dos harnesses**: o Superpowers deixou de ser um plugin só do Claude Code e hoje instala em **Claude Code, Codex App e CLI, Cursor, Gemini CLI, GitHub Copilot CLI, Grok Build CLI, Kimi Code, OpenCode, Devin CLI, Antigravity, Pi e Hermes Agent**. Existe até marketplace oficial no catálogo de plugins da Anthropic.

O segundo é a **filosofia por trás das skills**, que funciona como um currículo de boas práticas:

- *Test-Driven Development* — testes primeiro, sempre;
- *Systematic over ad-hoc* — processo em vez de adivinhação;
- *Complexity reduction* — simplicidade como objetivo primário;
- *Evidence over claims* — verificar antes de declarar sucesso.

As skills do projeto incluem depuração sistemática em quatro fases, verificação antes de considerar corrigido, revisão de código e até uma skill que ensina **como escrever novas skills** seguindo boas práticas — o ecossistema se retroalimenta.

## Como instalar (na prática)

No Claude Code, o caminho mais simples é pelo marketplace oficial:

```
/plugin install superpowers@claude-plugins-official
```

No Cursor, basta `/add-plugin superpowers`; no Codex, procurar por Superpowers no seletor de plugins. Como as skills disparam sozinhas quando o contexto pede (o agente checa as skills relevantes antes de qualquer tarefa), não é preciso configurar nada depois da instalação.

## O que observar

O Superpowers é o exemplo mais visível de uma mudança que este blog vem acompanhando: o debate sobre agentes de código saiu de "qual modelo usar" e foi para **"qual processo o agente segue"**. Na esteira do [OpenCode](/posts/opencode-agente-codigo-recorde-hacker-news/) e do [OpenClaude](/posts/openclaude-agente-codigo-open-source/), a mensagem do ranking do GitHub é clara — os desenvolvedores estão premiando projetos que transformam agentes de "autocomplete glorificado" em engenheiros disciplinados. Para quem quer aprender, o código aberto (MIT) é um material raro: dá para ler exatamente como se ensina um agente a fazer brainstorming, planejar e testar antes de codar.

> Fonte: [obra/superpowers (GitHub)](https://github.com/obra/superpowers)
