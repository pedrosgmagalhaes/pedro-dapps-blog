---
title: "OpenClaude: o agente de código open-source que disparou no GitHub e roda com mais de 20 IAs"
description: "O OpenClaude (Gitlawb/openclaude) virou destaque no GitHub Trending: um CLI de agente de programação open-source que unifica prompts, ferramentas, agentes, MCP e slash commands para provedores como OpenAI, Gemini, Ollama e DeepSeek."
pubDate: 2026-09-02
tags: ["programação", "dev", "ferramentas", "open-source"]
cover: "/images/news/openclaude-agente-codigo-open-source.jpg"
---

Se você acompanha o GitHub Trending, provavelmente esbarrou nele nos últimos dias: o **OpenClaude** — repositório `Gitlawb/openclaude` — virou destaque na lista de repositórios em alta no início de setembro. A proposta, em uma linha, é "**runs anywhere, uses anything**" ("roda em qualquer lugar, usa qualquer coisa"): um **agente de programação open-source, rodando no terminal**, que funciona com provedores de IA na nuvem e modelos locais.

## Um terminal para todas as IAs

A dor que o OpenClaude resolve é a fragmentação: cada ferramenta de agente de código tem seu próprio terminal, suas próprias regras e seus próprios provedores suportados. O OpenClaude **desacopla o fluxo de trabalho do provedor** — você mantém um único ambiente com prompts, ferramentas de arquivo e shell, agentes, tarefas, servidores **MCP**, *slash commands* e saída em streaming, e troca o modelo por baixo quando quiser.

Os backends suportados incluem:

- APIs compatíveis com OpenAI (OpenAI, OpenRouter, DeepSeek, Groq, Mistral, LM Studio e outros servidores `/v1`);
- **Gemini**, **GitHub Models**, **Codex** (incluindo OAuth) e **Ollama** (modelos locais);
- Parceiros como **Xiaomi MiMo**, **Atomic Chat**, **Atlas Cloud**, **Novita AI** e **Z.AI GLM** — no total, mais de 20 provedores.

A instalação é direta: requer **Node.js 22+** e um `npm install -g @gitlawb/openclaude@latest` — há também pacote no AUR para Arch Linux e uma **extensão para VS Code** embutida no projeto. Na primeira execução, o comando `/provider` guia a configuração e salva os perfis de credenciais; sessões podem rodar em segundo plano com `openclaude --bg "corrigir testes"`, retomar conversas com `--resume` e criar ramificações com `--fork-session`.

## O que observar

O OpenClaude surge na esteira de dois movimentos que o blog já acompanhou: o [OpenClaw 2.0](/posts/openclaw-2-0/), outro agente open-source que explodiu, e a busca por [APIs de LLM gratuitas](/posts/freellmapi-apis-llm-gratuitas/) para rodar agentes sem pagar caro. O recado é o mesmo: **os desenvolvedores querem controle** — sobre os modelos, sobre os dados e sobre o próprio fluxo de trabalho — e estão migrando de ferramentas fechadas para CLIs de código aberto.

O projeto também aposta em uma tese ousada: que o **terminal-first** continua sendo o ambiente mais produtivo para agentes de código, mesmo com a chegada dos editores com IA embutida. A versão atual (0.29.x) segue em desenvolvimento acelerado, com mais de mil commits e uma comunidade já escrevendo guias em vários idiomas — sinal de que o "Claude Code de código aberto" achou seu público.

> Fonte: [GitHub — Gitlawb/openclaude](https://github.com/Gitlawb/openclaude)
