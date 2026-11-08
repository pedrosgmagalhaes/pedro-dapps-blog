---
title: "Claude Code grava sua senha no repositório: 1.122 arquivos públicos no GitHub com segredo real"
description: "A Apiiro varreu o GitHub e achou 1.122 cópias públicas do .claude/settings.local.json com senha, token ou chave de verdade — 2.539 segredos no total, em 1.994 repositórios e 63 organizações. O gatilho é o botão \"Yes, and don't ask again\"."
pubDate: 2026-11-08
tags: ["segurança", "dev", "ia", "ferramentas"]
cover: "/images/news/claude-code-dont-ask-again-vaza-segredos.jpg"
---

Existe um botão no **Claude Code** que todo mundo já clicou. Ele aparece quando o agente pede para rodar um comando de terminal, e a opção é **"Yes, and don't ask again"** — sim, e não pergunte de novo. O que a maioria não sabe é o que ele salva: muitas vezes, o comando inteiro, incluindo a senha que estava dentro dele.

A **Apiiro**, empresa de segurança de aplicações, publicou em 5 de novembro o levantamento que colocou o assunto entre os mais votados do Hacker News no fim de semana. O número que abre o relatório: dos **104.185** arquivos `.claude/settings.local.json` públicos no GitHub, em **103.617** repositórios, **1.122 (1,1%) guardam pelo menos um segredo real**. Juntos, eles somam **1.379 segredos distintos** — 636 chaves de provedor e 743 senhas ou tokens de servidores públicos.

E "segredo real" tem definição precisa no estudo: é a credencial que **bate com o formato de um provedor** ou que **aparece ao lado de um host público** — não é o mesmo que credencial válida. Os pesquisadores não testaram se cada uma ainda funcionava, como eu explico mais adiante.

> "Nothing in the repo marks that file as private, so it gets committed with the rest of the code."
> — Apiiro, no resumo da pesquisa

## O que exatamente vaza

Não é um bug de modelo, nem uma alucinação. É o comportamento documentado do produto: por padrão, o Claude Code pergunta antes de rodar a maioria dos comandos de shell. Se você responde "não perguntar de novo", ele grava uma regra de permissão em `.claude/settings.local.json`, dentro da pasta do projeto, para que aquele comando rode sem confirmação nas próximas sessões.

O problema é que a regra é a string do comando. Quando o comando é um padrão amplo, como `npm test *`, não há nada sensível ali. Quando é um comando exato — um `psql` com `PGPASSWORD=`, um `sshpass -p`, um `curl` com header de autorização —, o segredo vai junto, em texto puro, para um arquivo JSON dentro da pasta `.claude` do projeto.

A Apiiro foi explícita sobre a origem: **é comportamento do Claude Code, não do modelo**. Os pesquisadores reproduziram com **Opus 5.5** e **Fable 5.1**, as versões mais recentes.

E o arquivo costuma ser commitado. Em **539 dos 1.105 repositórios** rastreados com segredo real, um commit com o Claude como coautor alterou o arquivo. O produto tenta proteger o caso comum — na primeira vez que escreve o arquivo dentro de um repositório git, ele entra no *exclude global* daquele usuário. Isso não cobre uma pasta que só virou repositório depois, um clone em outra máquina ou um arquivo que já foi commitado antes. E a regra nunca é adicionada ao `.gitignore` do projeto, então a proteção não viaja com o código.

## O retrato do vazamento

Os números da pesquisa, todos de busca em código e histórico público do GitHub entre 1º e 3 de novembro:

- **379 senhas de banco de dados** e **122 chaves service-role do Supabase** — mais de um terço dos segredos abre um banco direto;
- **103 tokens de conta Supabase**, que controlam todos os projetos da conta;
- **43 credenciais SSH** de servidores públicos, algumas com senha de root dentro de um comando `sshpass`;
- **42 tokens** de GitHub, GitLab e npm;
- **23 chaves AWS** e **6 chaves privadas**.

São **63 organizações** afetadas, a maioria empresas de software de todos os tamanhos. Os casos mais graves, segundo o relatório: a própria chave de nuvem de nível administrativo de um fornecedor de banco de dados, a senha de produção de um Postgres no Azure de uma startup B2B, o token de produção do Square em uma agência e a senha de dono do banco de um sistema de prontuário médico.

Nenhum arquivo com segredo tinha sido removido: em 2 de novembro, todos ainda estavam no branch padrão do repositório. Na mediana, o arquivo estava lá havia **217 dias**; em 118 repositórios, havia mais de um ano. E fork espalha: **211 forks de 74 repositórios** carregavam os mesmos segredos.

Apagar o arquivo também não resolve. Versões antigas guardam **734 segredos** em 509 repositórios que não aparecem em nenhuma cópia atual — justamente porque o arquivo foi deletado, mas o histórico ficou.

## O que o scanner de segredo não vê

Este é o ponto mais útil para quem trabalha com segurança. A Apiiro rodou **gitleaks** e **TruffleHog** sobre as 104.185 cópias. Dos 1.122 arquivos com segredo real, o gitleaks marcou 564 e o TruffleHog, 643. **215 arquivos não foram marcados por nenhum dos dois.**

O motivo é o formato. Scanner de segredo procura assinatura de chave — prefixo de provedor, string longa e aleatória. Já uma senha depois de `PGPASSWORD=`, `sshpass -p` ou `mysql -p` é uma palavra comum no meio de uma linha de comando comum. O mesmo padrão aparece em qualquer lugar onde o agente registra o que executou: transcrições, arquivos de memória, notas de handoff.

E não é só esse arquivo:

- **298** dos 76.011 `.claude/settings.json` compartilhados (aquele que o time commita de propósito) têm segredo real;
- **120** de 2.523 transcrições de conversa com agente (`.specstory`, aider, exportações do Cursor), em 87 repositórios;
- **33** de 2.095 notas de handoff e deploy — um terço delas escritas pelo próprio agente;
- **9** repositórios com segredo em arquivo de memória de agente (`MEMORY.md` e similares);
- **9** repositórios com segredo em configuração de auto-aprovação do VS Code Copilot.

Somando o histórico do git, o arquivo compartilhado, as transcrições, as notas de handoff, os arquivos de memória de agente e a configuração de auto-aprovação do Copilot, o total chega a **2.539 segredos em 1.994 repositórios**. Fora do GitHub, a Apiiro achou o arquivo em 126 dos 31.053 Spaces do Hugging Face e em 2 dos 69 repositórios públicos do GitLab que verificou.

## O limite do dado

Duas ressalvas que o relatório deixa claras e que valem para qualquer manchete sobre o tema:

1. **Os pesquisadores não testaram se os segredos ainda funcionam.** Eles notificaram cada organização entre 2 e 3 de novembro; uma empresa confirmou que a chave estava ativa.
2. **A contagem é um piso.** A busca cobre branches padrão do GitHub em três dias, não todo o histórico de todos os repositórios nem os arquivos que nunca foram commitados.

Também vale registrar o histórico do problema: usuários do Claude Code relataram o mecanismo em issues no GitHub desde agosto de 2025. Segundo a Apiiro, nenhuma recebeu resposta da Anthropic, e três foram fechadas automaticamente como inativas ou duplicadas.

## O que fazer agora

A ordem importa, e a Apiiro é direta: **rotacione primeiro, limpe depois**. Remover o arquivo não desfaz o vazamento, porque o histórico, os forks e os clones continuam com ele.

Para quem desenvolve:

1. Se o arquivo está versionado, pare de rastreá-lo com `git rm --cached .claude/settings.local.json` e adicione-o ao `.gitignore` **do projeto**;
2. Rotacione toda credencial que o arquivo já guardou — senha, token, chave;
3. Mesmo que nunca tenha sido commitado, abra o arquivo na sua máquina e apague toda regra que contenha segredo;
4. Pare de digitar segredo em comando. Referencie como variável (`$DB_URL`) vinda do seu gerenciador de segredos, para a regra gravar o nome da variável, e não o valor;
5. Aprove padrões (`Bash(npm run:*)`) em vez de comandos literais.

Para quem cuida de segurança do time: trate `.claude/`, `.cursor/`, `.gemini/`, `.specstory/` e arquivos de memória de agente como pastas que contêm segredo — igual a um `.env`, no notebook e no repositório. Coloque-as no scanner de pré-commit e no CI, incluindo o histórico, e confira se o scanner pega senha dentro de comando, não só formato de chave. E priorize o que está pareado com host público: é o que dá acesso de verdade.

O padrão geral vale além do Claude Code: **agente que registra o que executou registra também o que você digitou**. Isso já apareceu antes por aqui, de outro ângulo — no [GitSpawn, em que a configuração Git do repositório entrega o comando que o agente roda](/posts/gitspawn-git-config-agentes-ia/) — e no [app falso do Claude que distribuía malware atrás de senhas e carteiras](/posts/revstealer-claude-falso-roubo-carteiras/). A diferença é que, desta vez, não é preciso um atacante: basta um clique em "não perguntar de novo" e um `git push`.

---

**Fontes:** [Apiiro — Coding Agents Are Leaking Your Secrets to GitHub](https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again) (5/11/2026) · [The Hacker News — Claude Code's "Don't Ask Again" File Exposes Passwords and Keys in 1,122 Public Copies on GitHub](https://thehackernews.com/2026/11/claude-codes-dont-ask-again-file.html) (7/11/2026) · [Documentação de permissões do Claude Code](https://code.claude.com/docs/en/permissions)
