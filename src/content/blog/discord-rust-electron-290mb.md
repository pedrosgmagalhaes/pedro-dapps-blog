---
title: "Discord joga o Electron no lixo: cliente reescrito em Rust abre na hora e usa 290 MB"
description: "O CTO do Discord confirmou que o app inteiro passa para Rust, sem Electron e sem React Native. Um print do build novo mostra 290 MB de RAM no Windows 11 — contra 500 MB a 4 GB do cliente atual. Ainda não há data de lançamento."
pubDate: 2026-11-07
tags: ["dev", "rust", "discord", "desenvolvimento"]
cover: "/images/news/discord-rust-290mb.jpg"
---

O Discord é o exemplo mais citado de um problema que quase todo mundo sente e pouca gente sabe nomear: o app consome memória como se estivesse rodando um navegador inteiro — porque, tecnicamente, está. Na quarta-feira (4), o cofundador e CTO da empresa, Stanislav Vishnevskiy, confirmou no X o que os usuários pediam havia anos: o cliente está sendo reescrito do zero em **Rust**, e o **Electron vai embora**.

A confirmação veio acompanhada do tipo de imagem que viraliza sozinha: uma captura do Gerenciador de Tarefas do Windows 11 mostrando um build chamado **"Discord Phoenix"** ocupando **290,2 MB** de RAM — com **duas contas abertas ao mesmo tempo**, como o próprio CTO esclareceu depois. Na mesma tela, o Chrome marcava cerca de 1,57 GB e o Spotify, 653 MB.

## O que o CTO confirmou

Vishnevskiy não publicou um comunicado formal nem um changelog. Publicou uma sequência de posts, e o trecho central é direto:

> "We've been early adopters of Rust since 2018 and a lot of our infra, voice tech, and even some of the current client is already Rust, the holy grail was getting the whole client there. That means Electron goes away, and so does React Native, mobile keeps native UI but shares app code with desktop via Rust. We hope to get it into testing with users soon™."

*(Corte nosso: o post termina em "soon™." e continua — a frase seguinte é "And it's not Tauri, it's GPUI…", que trato no parágrafo abaixo.)*

Em português: Rust não é novidade na casa desde 2018 — está na infraestrutura, na tecnologia de voz e em partes do cliente atual. A novidade é levar **o cliente inteiro** para lá. Com isso, o Electron sai do desktop e o React Native sai do celular; o app móvel mantém a interface nativa, mas passa a compartilhar código com o desktop via Rust. A empresa espera colocar a versão em testes "em breve".

Um detalhe técnico do mesmo post rendeu piada: **não é Tauri**, o invólucro em Rust que virou a resposta padrão para "como saio do Electron sem reescrever tudo". É **GPUI**, o framework de interface criado pela equipe do editor de código Zed.

## Por que o Electron pesa tanto

Todo app Electron carrega a própria cópia do Chromium. Não é um navegador compartilhado com o sistema: é um motor de renderização completo, com processo principal, processos de renderização, GPU e tudo o mais, embutido em cada aplicação. Por isso um cliente de chat — que deveria ser uma lista de mensagens e um campo de texto — consegue chegar a gigabytes de memória.

A comparação que circulou junto com o anúncio: o cliente Electron atual passa de **500 MB** em uso típico no Windows, segundo o ghacks, e chega a **600 MB ou mais em repouso**, na leitura do wccftech. O Windows Latest registra **1 a 2 GB** de consumo mesmo parado — e lembra que, em dezembro de 2025, a própria Discord passou a testar reinício automático quando o app ultrapassava **4 GB** de RAM: um paliativo, nas palavras do veículo, que trata o sintoma e admite o problema. O número de **1.200 MB** que circulou junto não é do Discord: é de uma instância do WhatsApp em WebView2. Não são condições controladas, são leituras de Gerenciador de Tarefas — mas a ordem de grandeza é consistente.

## O que os 290 MB são — e o que não são

Aqui vale ser explícito, porque a imprensa tratou o número de formas diferentes: **290,2 MB é o que aparece em uma única captura de tela**, de um build de desenvolvimento, sem que a empresa tenha declarado em que condições a medição foi feita. Não é benchmark, não é média, e não há garantia de que o app final se comporte assim.

O que sustenta a expectativa não é o print, e sim a arquitetura. Vishnevskiy também publicou uma demonstração lado a lado em dois ThinkPads — modelos recentes, do tipo que já vem com tecla Copilot, ou seja, de 2024 em diante; ele brincou que eram velhos, e o Windows Latest discorda: o cliente novo abre a lista de amigos quase instantaneamente, enquanto o Electron fica na tela preta de carregamento. Um cliente nativo, **sem a árvore de processos do Chromium**, tem menos superfície para gastar memória e tempo de inicialização — é engenharia previsível, não promessa de marketing.

## O que muda na prática

Para quem só usa o app, a promessa é simples: menos RAM ocupada e abertura mais rápida, sem mudar o que já está na tela — a empresa não está propondo um redesenho, e sim uma troca de fundação. Para quem desenvolve, o recado é mais interessante: o mesmo código Rust passa a servir desktop e mobile, o que reduz a duplicação entre duas bases de código que hoje evoluem em ritmos diferentes.

E há um contexto de mercado que empurra essa decisão. Num ciclo de alta no preço da memória, com PCs de entrada ainda saindo de fábrica com 8 GB, gastar 1 GB em um app de chat deixou de ser detalhe de conforto e virou problema de produto. Não é coincidência que o mesmo movimento apareça em outros lugares: um [cliente nativo do Spotify escrito em Rust](/posts/fastpotify-spotify-rust/) mostrou que dá para usar 100 a 250 MB sem motor de navegador embutido, e o [Audacity 4.0](/posts/audacity-40-reescrita-qt/) reconstruiu toda a interface sobre Qt pelo mesmo motivo de fundo — trocar uma camada web genérica por algo feito para o trabalho.

## Quando chega

Não há data. A empresa fala em testes com usuários "em breve", sem dizer quais plataformas vêm primeiro, se os builds serão opt-in ou se haverá beta público. Quem quiser medir a linha de base pode abrir o Gerenciador de Tarefas agora, expandir a entrada do Discord e anotar o total — é a única comparação honesta possível quando o cliente novo chegar.

## Por que isso importa aqui

O caso do Discord é a melhor aula curta de arquitetura de software que apareceu nesta semana: uma escolha de conveniência feita lá atrás — empacotar a web dentro de um app — virou um custo permanente, pago em memória, bateria e tempo de abertura por milhões de pessoas. Sair dela exige reescrever o cliente, o que é caro; e é justamente por isso que a decisão é notícia.

Para quem constrói produto no Brasil, a lição não é "use Rust". É que a pilha que economiza semanas no começo pode custar anos depois, e que o momento de pagar essa conta é uma decisão de negócio, não só de engenharia.

> Fonte: [Stanislav Vishnevskiy (@svishnevskiy) no X](https://x.com/svishnevskiy/status/2118081920194203799) (04/11/2026) · [Windows Latest](https://www.windowslatest.com/2026/11/05/discord-is-killing-its-electron-app-that-can-eat-4gb-of-ram-on-windows-11-and-the-rust-rebuild-uses-just-290mb) (05/11/2026) · [ghacks](https://www.ghacks.net/2026/11/06/discord-is-rebuilding-its-desktop-app-in-rust-with-the-new-client-using-290-mb-of-ram/) e [wccftech](https://wccftech.com/discord-is-ditching-electron-for-rust-with-early-windows-build-using-just-290mb-of-ram/) (05–06/11/2026) · [TechSpot](https://www.techspot.com/news/114462-discord-rebuilding-desktop-app-rust-fix-memory-problem.html)
