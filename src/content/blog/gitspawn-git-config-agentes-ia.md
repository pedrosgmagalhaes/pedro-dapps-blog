---
title: "GitSpawn: repositório malicioso roda código dentro do Claude Code, Codex, Cursor e Grok"
description: "A Manifold Security revelou oito falhas em sete agentes de IA de linha de comando: a configuração Git do próprio repositório faz o agente executar código arbitrário na sua máquina — quatro delas seguem sem correção."
pubDate: 2026-09-02
tags: ["segurança", "dev", "ferramentas", "ia"]
cover: "/images/news/gitspawn-git-config-agentes-ia.jpg"
---

Se você recebeu uma pasta zipada com um projeto e abriu dentro do Claude Code, do Codex ou do Cursor, este texto é para você. A **Manifold Security** revelou **oito falhas de segurança em sete agentes de IA de linha de comando** — e o vetor de ataque é tão simples quanto assustador: a configuração Git do próprio repositório entrega o comando que o agente vai rodar na sua máquina.

O grupo batizou a pesquisa de **GitSpawn**. Em resumo: um repositório adulterado pode carregar, no `.git/config`, a instrução de um comando que o agente executa **como o usuário, fora da sandbox e sem pedir aprovação**. A exploração exige que o repositório chegue **como arquivos com a pasta `.git` intacta** — um ZIP compartilhado, um drive, uma pasta de sincronização ou um pen drive preservam isso, enquanto um `git clone` comum não.

> "The vulnerability is not in the model, or in anything new. It is in the ordinary plumbing underneath, the subprocess an agent spawns at session startup to work out where it is."

A peça central é o `core.fsmonitor`, uma configuração de desempenho do Git cujo valor é um comando que o próprio Git executa para listar arquivos alterados — e que é lida do `.git/config` do repositório. Qualquer operação que atualize o índice, como `git status` ou `git diff`, dispara esse comando. Os agentes chamam essas operações em segundo plano para descobrir em qual branch estão e o que mudou, sem tocar na configuração do repositório.

## Quem está vulnerável

Correções já saíram para **goose**, **Claude Code** e **Cursor**. Seguiam executando comandos fornecidos pelo repositório no reteste de 1º de setembro: **Hermes Agent** (Nous Research), **Qwen Code** (Alibaba), **Grok Build** (xAI) e um **segundo caminho no Claude Code**, acionado via `claude ultrareview`. A OpenAI também publicou no mesmo dia **três CVEs próprias** para a mesma classe de falha no Codex.

Versões afetadas e corrigidas, segundo a Manifold:

- **goose** — anteriores à 1.44.0, corrigido na 1.44.0;
- **Codex CLI** — 0.102.0 até 0.130.0, corrigido na 0.131.0 (a atual é a 0.152.1 — quem está abaixo da 0.131.0 segue exposto);
- **Claude Code** — caminho `core.fsmonitor` confirmado na 2.1.193 e corrigido na 2.1.196; o caminho via `claude ultrareview` seguia ativo na 2.1.252 testada pelos pesquisadores;
- **Hermes Agent**, **Qwen Code** e **Grok Build** — confirmados, **correção pendente**.

O **CVE-2026-72718** (GitHub, nota 7.0 na escala CVSS) foi o único com pontuação, creditado a Francisco Rosales no advisory do goose:

> "So running goose review inside a malicious repo runs attacker code — no submitted prompt, no model call, no tool approval, no trust prompt. The command executes before goose ever contacts the model."

## Quando o código dispara

O momento do disparo varia por ferramenta: no **Claude Code** e no **Hermes Agent**, o payload roda **antes** de o aviso de confiança do workspace ser aceito; no **Qwen Code**, antes de o usuário autenticar; no **Grok Build**, no **primeiro toque de tecla**. No caso do Codex, a OpenAI descreveu assim no registro do **CVE-2026-19592**:

> "The helper runs outside Codex's command sandbox and without a user-approval prompt, allowing attacker-controlled code to run with the user's privileges. The code can read, change, or delete the user's files and access other resources available to the user's account."

A Sonar já havia reportado o mesmo tipo de falha em abril e notou que a Anthropic tinha mitigado parte do problema na versão 2.0.34 (novembro de 2025) — mas o comportamento voltou na 2.1.193. Nenhum caso de exploração real foi confirmado até a publicação, e nenhum dos CVEs estava no catálogo de vulnerabilidades exploradas da CISA.

## Como se proteger

- Inspecione o `.git/config` antes de abrir uma pasta recebida com um agente — procure por `core.fsmonitor`, `core.hooksPath` e `attr.tree`;
- Rode `git config --get core.fsmonitor` dentro de qualquer repositório que chegou como arquivo;
- Audite a configuração global com `git config --global --list` e, se quiser, desative por padrão com `git config --global core.fsmonitor false`;
- Atualize Claude Code (≥ 2.1.196), Codex CLI (≥ 0.131.0) e goose (≥ 1.44.0).

## O que observar

A falha não está no modelo — está no "encanamento" que os agentes usam para se orientar, e isso é um lembrete de que a segurança de agentes de código ainda é um alvo móvel. O mesmo raciocínio de ataques assistidos por IA que [OpenAI, Anthropic e mais de 100 empresas alertaram](/posts/openai-alerta-ciberataques-ia/) vale aqui: a superfície de ataque cresce mais rápido do que as correções. Regra prática: desconfie de todo repositório que chega como arquivo, não como clone.

> Fonte: [The Hacker News](https://thehackernews.com/2026/09/malicious-git-configs-can-make-claude.html)
