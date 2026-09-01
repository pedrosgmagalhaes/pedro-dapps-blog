---
title: "FreeLLMAPI agrega 29 provedores de LLM gratuito num único endpoint compatível com OpenAI"
description: "Projeto em alta no GitHub soma os free tiers de dezenas de empresas em cerca de 4 bilhões de tokens por mês, com roteador que troca de provedor quando bate limite."
pubDate: 2026-09-01
tags: ["dev", "ia", "ferramentas", "open-source"]
cover: "/images/news/freellmapi-apis-llm-gratuitas.jpg"
---

Todo grande laboratório de IA oferece um tier gratuito: alguns milhões de tokens por mês, alguns milhares de requisições por dia. Sozinho, cada tier é quase um brinquedo. Empilhados, somam cerca de **4 bilhões de tokens por mês** de capacidade de inferência gratuita, distribuídos por **251 famílias de modelos e 358 endpoints** de provedores diferentes. O problema é empilhar isso na mão: vinte e nove SDKs diferentes, vinte e nove limites de taxa, vinte e nove lugares onde a requisição pode falhar.

O **FreeLLMAPI** resolve exatamente isso: agrega os free tiers de **29 provedores de LLM** atrás de **um único endpoint compatível com OpenAI** (`/v1`). O projeto está em alta no GitHub — são cerca de **22,2 mil estrelas**, com mais de 2.400 estrelas só na última semana.

## Como funciona

A proposta é simples na teoria e trabalhosa na prática: um roteador (router) recebe sua requisição, **escolhe o melhor modelo disponível** entre os provedores em que você tem chave cadastrada e, quando um bate o limite de taxa (rate limit), **cai automaticamente para o próximo provedor**. As chaves ficam armazenadas criptografadas, e o uso é contabilizado por chave para você nunca estourar o teto de nenhum free tier.

Do lado de fora, você aponta qualquer cliente OpenAI para o servidor local e funciona — com suporte a `/v1/chat/completions`, `/v1/responses` (o que o Codex CLI precisa), `/v1/completions`, `/v1/images/generations`, `/v1/audio/speech`, `/v1/embeddings` e `/v1/models`, em streaming ou não. Há também um endpoint `/v1/messages` que fala o formato da API Anthropic, e emulação de Ollama para clientes como Zed e JetBrains AI.

Os provedores cobertos incluem **Google, Groq, Cerebras, Mistral, OpenRouter, Cloudflare, Cohere, Z.ai (Zhipu), NVIDIA, Hugging Face, ModelScope** (com Qwen3, DeepSeek V4 e GLM-5) — e mais 17. Dá para adicionar ainda um provedor custom, apontando para qualquer endpoint compatível com OpenAI, como llama.cpp, LM Studio, vLLM ou um Ollama local.

## Compatível com os agentes de código

O melhor para quem vive de linha de comando: o FreeLLMAPI se integra com **Claude Code, Codex CLI, Gemini CLI, Aider, Cline, Roo Code, Continue, OpenCode, Goose, Qwen Code, Kilo Code, Cursor, Zed e JetBrains AI**. A maioria se configura com um comando só, tipo `npx freellmapi setup-claude` ou `setup-codex` — o gerador busca seu catálogo atual, faz backup da config existente e não sobrescreve nada. Claude Code e Codex ainda ganham launchers de zero persistência que injetam as credenciais só no processo filho.

## Manutenção automática

O cenário de free tiers muda toda semana: provedores lançam modelos, aposentam outros e alteram cotas sem aviso. O FreeLLMAPI resolve isso com um **catálogo assinado** que o roteador baixa do site oficial ([freellmapi.co](https://freellmapi.co/)) sozinho — novas modelos, mudanças de cota e correções de compatibilidade chegam sem `git pull`. O catálogo "live" é o recurso premium (US$ 19/ano, cancelável), mas o projeto é open source e pode ser auto-hospedado com Docker, com apps para macOS, Windows e Android (Google Play).

## O que observar

- **É uma ferramenta de desenvolvedor, não um provedor**: você ainda precisa criar contas e chaves nos provedores — o FreeLLMAPI só organiza tudo;
- **Cotas são cotas**: 4 bilhões de tokens por mês é a soma teórica dos tiers; na prática, cada provedor tem seus limites diários e de contexto;
- **Modelos de fronteira não são grátis**: o foco são modelos pequenos e medianos (e alguns bons de código) — para o que está no topo da linha, o preço público continua valendo.

Minha opinião: para quem está começando um projeto com agentes de código e não quer gastar logo de cara, o FreeLLMAPI é uma peça de infraestrutura muito útil — na mesma onda de [ferramentas que baixam a barreira de entrada](/posts/deepseek-harness-dsh/). A pegada de "stack the free tiers" é esperta e o fato de o catálogo se atualizar sozinho resolve o maior ponto de dor do modelo. Vale testar antes de assinar qualquer API paga.

> Fonte: [GitHub — tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) · [freellmapi.co](https://freellmapi.co/)
