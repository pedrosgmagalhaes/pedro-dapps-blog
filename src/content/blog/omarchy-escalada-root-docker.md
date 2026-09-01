---
title: "Distro Omarchy dava root a qualquer processo — sem senha e sem sudo: o grupo docker era o culpado"
description: "Pesquisador revelou que a configuração padrão do Omarchy colocava o usuário no grupo docker, permitindo escalada para root; correção saiu na versão 4.0.1."
pubDate: 2026-09-01
tags: ["programação", "dev", "segurança", "open-source"]
cover: "/images/news/omarchy-escalada-root-docker.jpg"
---

Um pesquisador de segurança revelou uma falha grave na distribuição Linux **Omarchy** — a distro "vibe coded" criada por DHH que virou febre entre desenvolvedores. Na configuração padrão, **praticamente qualquer processo rodando na sessão do usuário podia escalar para root** sem senha, sem `sudo` e sem nenhum prompt de privilégio.

O problema: o Omarchy colocava o usuário padrão como membro do grupo `docker` do Linux. Como o daemon do Docker roda como root e escuta em `/var/run/docker.sock`, qualquer processo com acesso a esse socket pode pedir ao daemon — que é root — para montar partes do filesystem do host e executar código como root. O próprio Docker documenta que o grupo `docker` equivale a privilégios de root.

## A prova de conceito

O pesquisador (0xCC) demonstrou o problema numa instalação limpa do Omarchy:

```
$ cat /etc/shadow
cat: /etc/shadow: Permission denied

$ id
uid=1000(tester) gid=1000(tester) groups=1000(tester),967(docker),992(input),998(wheel)

$ docker run --rm -v /:/hostroot alpine cat /hostroot/etc/shadow
root:$6$...
```

O comando é disparado por um processo comum do usuário, mas o acesso ao filesystem acontece através do daemon rodando como root. E o alcance é total: grupos suplementares do Linux são herdados por processos filhos, então **toda a sessão** fica vulnerável — navegadores, editores, IDEs, scripts npm, ferramentas de dev e, principalmente, **agentes de IA de codificação**, que rodam código não confiável o tempo todo.

> "A compromise of a normal user application could immediately become a full machine compromise."

## O problema dos defaults

Dois agravantes tornam o caso pior do que um simples erro de configuração:

1. **Era opt-out, não opt-in**: o usuário não precisava usar Docker. A decisão de segurança foi tomada por ele, aplicada à conta padrão — sem explicar o trade-off.
2. **Documentação enganosa**: o manual do Omarchy dizia que a distro instalava "as mudanças de grupo necessárias para você rodar o Docker como usuário normal e não como root". A implicação natural para quem lê é que o Docker rodava em modo rootless — não rodava.

A vulnerabilidade afeta versões anteriores à **4.0.1** (o pesquisador confirmou o problema na 3.8.4). O grupo `docker` entrou na configuração em junho de 2025 e foi removido em 24 de agosto de 2026, após o reporte privado via responsible disclosure. O próprio autor do Omarchy foi elogiado pela rapidez na correção.

## Por que isso importa agora

O contexto é o que torna a história maior do que uma distro: desenvolvedores são alvos de alto valor — máquinas de dev costumam ter guardrails de segurança desligados por conveniência, credenciais em dotfiles e acesso a sistemas de produção. Com a IA gerando cada vez mais CVEs de alta severidade contra infraestrutura core, uma configuração que entrega root para qualquer processo de uma sessão é uma bomba na cadeia de suprimentos de software.

O pesquisador recomenda o **Podman** como alternativa: daemonless, roda containers como processos filhos do usuário em namespaces próprios, sem exigir root.

## O que observar

Para mim, o caso Omarchy é um lembrete prático de algo que o [mercado de agentes de IA](/posts/chainlink-for-agents/) está amplificando: se o seu agente de código roda comandos como seu usuário, o isolamento do sistema operacional é a última linha de defesa. Defaults de segurança importam — e "funciona sem sudo" nem sempre significa "é seguro". Se você usa Docker no Linux e não quer dar root a qualquer processo, os grupos `docker` e `wheel` merecem uma olhada hoje.

> Fonte: [0xcc.io](https://0xcc.io/posts/omarchy-root-creds/) · via [Hacker News](https://news.ycombinator.com/item?id=49499854)
