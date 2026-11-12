---
title: "Asahi Linux abandona a licença MIT: código em desenvolvimento era reescrito com IA para esconder a origem"
description: "O projeto que fez o Linux rodar em Mac com Apple Silicon vai migrar todos os repositórios de MIT para GPLv2 ou posterior. Motivo declarado: cópias de código ainda em desenvolvimento saíam dos forks pessoais dos mantenedores e eram publicadas sem crédito ou reescritas com LLM para apagar o rastro."
pubDate: 2026-11-09
tags: ["dev", "open-source", "ia", "programação"]
cover: "/images/news/asahi-linux-mit-para-gpl-ia-lavagem-codigo.jpg"
---

O **Asahi Linux**, projeto que colocou o Linux para rodar nos Macs com Apple Silicon, vai trocar a licença de todo o seu código. Sai a **MIT**, entra a **GPL versão 2 ou posterior**. O anúncio está no relatório de progresso do Linux 7.3, publicado em **7 de novembro** e assinado por James Calligeros — não numa nota de imprensa, mas no documento em que o projeto presta contas a usuários e patrocinadores.

O motivo é direto e não tem nada de técnico: gente estava pegando código do projeto e usando de um jeito que a licença permissiva permitia. Em alguns casos, código de funcionalidades **ainda em desenvolvimento**, copiado dos forks pessoais dos mantenedores, aparecia publicado sem atribuição ou reescrito com ajuda de um modelo de linguagem para esconder de onde veio.

> "In some extreme cases, in-development feature code was being lifted straight out of our personal forks and published without attribution or lazily rewritten with LLM assistance to obfuscate its origin. The MIT licence explicitly allows this, and has no carveouts to protect against bad faith actors."

O relatório não cita nomes de pessoas nem de empresas. Também não explica como as contribuições antigas serão relicenciadas, nem se todos os contribuidores concordaram com a mudança — um ponto em aberto que vale acompanhar.

## Por que a MIT, e por que deixou de servir

Quando o Asahi começou, a escolha da MIT foi deliberada. A ideia era construir um **ecossistema** de software livre para Apple Silicon, e a licença permissiva facilitava a participação dos BSDs e de outros projetos que têm restrições a copyleft. O projeto queria ser reutilizado.

O problema é o que a MIT não exige. Ela pede apenas que você preserve o aviso de copyright original. Não obriga ninguém a abrir as alterações, não impede um fork totalmente proprietário e não tem cláusula para punir má-fé. Na prática, isso significa que um fork pode pegar o trabalho, fechar o código, vender por cima e não devolver nada.

Segundo o relatório, houve **múltiplas tentativas** de explorar essa brecha, com o objetivo declarado de substituir o projeto e monetizar agressivamente o Linux em Apple Silicon. A decisão, nas palavras da equipe:

> "As such, we made the difficult decision to begin the process of transitioning all of our repositories to the GNU General Public License version 2 or later. Going forward all Asahi Linux code will be licenced under strong copyleft licences only. Those who do not learn from history are doomed to repeat it."

Traduzindo o essencial: a transição começa agora, e daqui para frente o projeto só usa **licença de copyleft forte** — aquela que obriga quem distribui uma versão modificada a liberar o código também.

## O que é "lavagem de licença" — e o que a IA muda nisso

A prática tem nome: **lavagem de licença** (ou lavagem de código). É pegar código de outra pessoa e passá-lo por um processo que apaga a origem, para usá-lo sem cumprir a licença nem creditar o autor. Antes de existir assistente de código, isso era trabalho manual: renomear variáveis, reordenar funções, reescrever trechos até o resultado não parecer mais o original.

O que mudou não foi a intenção. Foi o custo. Reescrever milhares de linhas com um LLM leva minutos e custa centavos, e o resultado já sai com nomes e estrutura diferentes o suficiente para enganar uma leitura rápida. A licença continua a mesma, o código por baixo também — mas a linhagem fica borrada.

O relatório do Asahi liga o fenômeno a duas forças:

> "The malicious practices of the 90s and 2000s have reared their ugly heads once again, this time driven in large part by both the insatiable appetite of frontier AI labs for high-quality training data, and militant animosity toward the Free Software community."

É um parágrafo duro, e é a posição do projeto, não um fato jurídico estabelecido. Vale ler como argumento de quem se sentiu lesado, não como sentença.

## O detalhe irônico: o Asahi também recusa código feito com IA

O mesmo projeto mantém uma **política de IA generativa** que proíbe o uso de LLM em contribuições relevantes. O motivo não é estético: o Asahi depende de **engenharia reversa em sala limpa** para garantir que o trabalho seja legal. Se o código vier de um modelo treinado em material que o projeto não pode acessar — inclusive vazamentos do sistema da Apple —, a procedência fica contaminada.

> "LLMs pose unique legal risks to reverse engineering projects, as these systems are likely to violate the clean room requirements and taint the resulting code."

A política tem gradação: uma issue escrita por LLM pode ser fechada só com a referência ao documento; quem usa modelo para interpretar um trace do hipervisor m1n1 recebe um aviso único e final; quem esconde uso extenso de IA é banido, especialmente se teve acesso a material não publicado da Apple.

Ou seja, o Asahi está nos dois lados da mesma história: **recusa** código gerado por IA por risco jurídico e, ao mesmo tempo, **sofre** com gente usando IA para apagar a origem de código alheio.

## O precedente do WINE

O relatório não trata o caso como inédito — e essa é a parte mais útil para quem trabalha com open-source.

O **WINE**, a camada que permite rodar programas de Windows no Linux, também nasceu sob licença MIT. Nos anos 1990 e 2000, empresas pegaram o código, criaram forks proprietários e venderam por cima. Em **2002**, o time do WINE relicenciou o projeto para **LGPL**, tanto para desestimular novos forks fechados quanto para empurrar as empresas a contribuir de volta.

O Asahi cita a frase clássica sobre aprender com a história — em tradução nossa, "aqueles que não aprendem com a história estão condenados a repeti-la". É o mesmo movimento, 24 anos depois, com uma diferença de escala: agora a reescrita que disfarça a origem é automatizada.

## O que muda na prática

Para quem só usa o Fedora Asahi Remix no Mac, nada muda no dia a dia. A licença é do código, não do sistema que roda na sua máquina.

Para quem **distribui** software construído sobre o Asahi, muda bastante:

- fork aberto continua permitido, mas passa a ter obrigação de manter o código aberto e sob a mesma licença;
- produto fechado em cima do código do projeto deixa de ser possível;
- código já publicado sob MIT continua sob MIT — a mudança não é retroativa para quem pegou a versão antiga, e é justamente por isso que a transição de contribuições antigas precisa de resposta.

Se você mantém um fork ou um produto que reutiliza drivers do Asahi, esse é o momento de revisar a licença antes que a migração chegue ao arquivo que você usa.

## O resto do relatório (que também importa)

O documento não é só sobre licença. Os destaques técnicos do ciclo:

- **M3 saiu do modo experimental.** O suporte à série M3 agora é geral, sem a flag EXPERT, com DCP habilitado — o que trouxe suspensão e o uso da área do notch nos MacBooks.
- **Thunderbolt foi enviado ao kernel upstream**, depois de dois anos de silêncio. Hoje funcionam USB3, XDomain e Thunderbolt Networking; túnel de PCIe e DisplayPort, que a maioria das docks usa, ainda não.
- **M5 começou a ser mapeado**, com Devicetrees iniciais (só o suficiente para bootar até um terminal) e virtualização de macOS com Exclaves no m1n1.
- **A GPU do M3 ligou**: o m1n1 já inicializa o hardware e a equipe conseguiu desenhar um triângulo, primeiro passo para o driver no Mesa.
- **Fedora Asahi Remix 45 saiu no mesmo dia do Fedora 45**, em 3 de novembro — a primeira vez que o remix acompanha o upstream no dia do lançamento.

## O que observar

A pergunta que fica não é se o Asahi tem razão, e sim o que esse caso ensina para qualquer projeto permissivo:

1. **Licença permissiva é uma aposta.** Você ganha adoção e perde controle sobre o que fazem com o código.
2. **Reescrever com IA não muda a origem.** Se o código veio de outro lugar, a obrigação de licença continua valendo — só ficou mais difícil de provar.
3. **Copyleft é ferramenta de sobrevivência, não ideologia.** O WINE usou em 2002, o Asahi usa em 2026, pelo mesmo motivo: garantir que quem constrói em cima devolva algo.

**Minha opinião:** esse é o tipo de notícia que parece burocrática e é o contrário. Todo mundo que usa um agente de código para "reescrever" um trecho encontrado na internet está a um passo de fazer, sem querer, o que esses atores fizeram de propósito. A diferença entre inspiração e lavagem é uma linha simples: de onde veio o código e o que a licença dele exige.

> Fonte: [Asahi Linux — Progress Report: Linux 7.3](https://asahilinux.org/2026/11/progress-report-7-3/) (07/11/2026) · [Política de IA generativa do Asahi Linux](https://asahilinux.org/llm-policy/)

Leia também: [Kakehashi roda binários do macOS no Linux ARM](/posts/kakehashi-binarios-macos-linux/) e [OpenClaude, o agente de código open-source](/posts/openclaude-agente-codigo-open-source/).
