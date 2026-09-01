---
title: "'Batemos o GTA 6': OpenClaw 2.0 chega com a maior atualização do agente de IA open source"
description: "O OpenClaw 2.0 traz instalação simplificada, app de navegação reconstruído, sessões compartilhadas entre times e mais de 16 mil pull requests — o maior update do projeto que popularizou agentes locais de IA."
pubDate: 2026-08-31
tags: ["dev", "open-source", "ia", "ferramentas"]
cover: "/images/news/openclaw-2-0.jpg"
---

O **OpenClaw** lançou a atualização que chama de a maior da história do projeto: o **OpenClaw 2.0**. A plataforma — um agente de IA gratuito e open source que roda localmente no seu dispositivo — nasceu em novembro do ano passado e ficou famosa por estar por trás dos agentes do **Moltbook**, a rede social só de IAs onde os bots chegaram a pedir uma "revolução da IA".

No anúncio no X, o projeto não economizou na provocação ao jogo mais esperado do ano:

> "HA! We beat GTA6!"

O GTA 6 está previsto para novembro — e o OpenClaw entregou antes.

## Números do maior update da história

O OpenClaw 2.0 foi construído por **933 contribuidores** — incluindo **569 estreantes** no projeto — e soma mais de **16 mil pull requests**, o maior volume já registrado. A atualização levou quase **sete semanas** para sair, contra os patches usuais de um ou dois dias. Para efeito de comparação, o projeto já havia lançado **106 atualizações em apenas 230 dias**.

## Instalação mais simples e app de navegação reconstruído

O foco declarado da versão foi **facilitar a vida do usuário**. Na instalação, o OpenClaw agora começa pelo que já existe no computador: logins atuais de **ChatGPT, Claude ou Codex**, chaves de API e modelos locais como **Ollama ou LM Studio**.

Boa parte da configuração saiu do processo inicial — a ideia é chegar à primeira conversa mais rápido e terminar de configurar o assistente **conversando com ele como num chat**. Instalações novas em Mac, Linux e Windows miram uma primeira conversa mais rápida; no onboarding mobile (iOS e Android), começa com pareamento e permissões.

O **app de navegação**, por onde a maioria dos usuários interage com o OpenClaw, foi reconstruído. Ele agora abre direto numa conversa com o seu Claw (o agente), com chat, arquivos, aprovações e configurações mais próximos. A interface ganhou: chats fixados, sessões agrupadas, busca, streaming de Markdown ao vivo e um comando de conversa paralela, o **/btw**, para perguntas tangenciais.

## Workflows e sessões compartilhadas

O OpenClaw mostra o potencial com exemplos práticos. Um Claw pode começar com um workflow simples — como **vigiar a caixa de entrada** de e-mails escolares das crianças e mandar uma mensagem no Telegram quando algo importante aparecer, como dever de casa ou atividades futuras.

Os workflows podem crescer entre apps sem ficarem mais difíceis de usar. Num exemplo citado pela equipe: o usuário conta que o irmão mandou um iMessage perguntando qual iPad foi comprado para o pai — e o Claw **encontra a resposta no recibo do e-mail e responde** sozinho.

A mesma progressão levou às **sessões compartilhadas em nuvem**. Antes, o contexto de um Claw não podia ser transferido para outra pessoa sem perder o que já sabia. Agora, membros do time podem **entrar ao vivo, colaborar ou assumir tarefas com o contexto intacto**.

## Mudanças técnicas importantes

- **Migração de armazenamento**: sessões e transcrições saem de arquivos individuais para o formato **SQLite**. Quem quiser fazer downgrade depois deve **fazer backup dos dados legados** antes — sessões criadas após a migração não aparecem nas versões antigas.
- **Migrações seguras**: imports do Claude, Codex ou Hermes rodam numa área de staging, com verificação antes de substituir a configuração antiga.
- **Configurações** reorganizadas numa workspace de página inteira.
- Conversas agora suportam **identidade, permissões, indicadores de presença** e um modo anônimo opcional (incognito).

## Contexto do projeto

O criador do OpenClaw, **Peter Steinberger**, entrou para a **OpenAI** em fevereiro deste ano. O projeto segue apoiado pela fundação independente OpenClaw, junto com contribuidores da comunidade.

## O que observar

O OpenClaw 2.0 é um bom termômetro de onde o open source de agentes está indo: **instalação sem fricção** (aproveitando logins e modelos que o usuário já tem), **interface conversacional como centro** e **contexto portátil entre pessoas e dispositivos**. A migração para SQLite, com alerta de backup, é o tipo de detalhe que separa ferramenta de brinquedo. Para quem usa agentes locais — vale comparar com o modelo "tudo é plugin" do [DeepSeek Harness](/posts/deepseek-harness-dsh/) —, o recado é que a concorrência está cada vez mais na experiência de configuração e colaboração, não só no modelo por trás.

> Fonte: [India Today](https://www.indiatoday.in/technology/news/story/we-beat-gta-6-openclaw-launches-version-20-calls-it-biggest-update-since-launch-2983415-2026-08-31)
