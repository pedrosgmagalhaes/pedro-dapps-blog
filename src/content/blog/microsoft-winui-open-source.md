---
title: "Microsoft abre o desenvolvimento do WinUI: framework nativo do Windows 11 agora é construído em público no GitHub"
description: "A Microsoft confirmou que o desenvolvimento principal do WinUI, o framework de interface nativa do Windows 11, agora acontece abertamente no GitHub — com branches, pull requests, revisões e merges públicos. Contribuições da comunidade ainda vão demorar algumas semanas."
pubDate: 2026-08-29
tags: ["programação", "dev", "open-source", "ferramentas"]
cover: "/images/news/microsoft-winui-open-source.jpg"
---

A Microsoft cumpriu (pelo menos em parte) a promessa feita na Build 2026: o **desenvolvimento principal do WinUI — o framework de interface nativa do Windows 11** — agora acontece **em público, no GitHub**. Quem quiser pode acompanhar, em tempo real, branches, pull requests, revisões, validações e merges feitos pela engenharia da Microsoft.

O anúncio veio em uma discussão no repositório `microsoft/microsoft-ui-xaml`:

> "Mainline WinUI development is now taking place on GitHub. WinUI engineers and other Microsoft developers are creating branches, opening pull requests, reviewing, validating, and merging changes right here in this repository."

> "Our day-to-day engineering work now happens in the open, so you can follow progress as it happens instead of waiting for changes to land."

## O contexto: o fim da era "web app slop"

A decisão não é só cosmética. Nos últimos anos, a Microsoft (e boa parte do ecossistema) migrou apps para **WebView2 e Electron** — o que gerou o fenômeno que a comunidade apelidou de "web app slop": programas que consomem gigabytes de RAM e se comportam como sites empacotados. O **Discord**, por exemplo, admitiu que seu app Windows pode passar de **4 GB de RAM**.

A virada começou na **Build 2026**, quando a Microsoft reafirmou o WinUI como o **framework nativo** do Windows 11 — e Rudy Huyn, líder de engenharia do Windows, defendeu a construção de apps "100% nativos". Chris Anderson, veterano da stack gráfica do Windows, resumiu as prioridades na conferência:

> "The first and foremost is performance, fundamentals, quality, fixing a lot of bugs."

Ele acrescentou que a empresa "investiu pesado em melhorar de verdade o uso de memória" — inclusive movendo processos do WinUI para um **compositor do sistema**.

## Mas calma: contribuir ainda não dá

Por enquanto, os pull requests vêm **apenas de engenheiros da Microsoft**. A empresa diz que está usando este período para validar o fluxo de contribuição de ponta a ponta:

> "We're using this period to prove out the contribution workflows, validation, documentation, and release processes end to end. The goal is simple: when community pull requests open up, contributors should have a pipeline that's reliable and predictable. We'd rather earn that than rush it, and the team is working toward it."

Ou seja: **contribuições da comunidade devem abrir nas próximas semanas**, quando o pipeline estiver pronto. E a Microsoft tratou de matar o boato de que criaria mais um framework:

> "I will say that, no, we have no intention of building a new framework. In fact, we're dropping the number, and we're referring to WinUI as just WinUI because we have no intention of really making a massive shift, breaking change on it."

## O que observar

Para quem desenvolve para Windows, é uma mudança de transparência real: dá para acompanhar correções de performance, regressões e novos recursos **antes** de virarem release. Para o ecossistema, o movimento reforça a tese de que **a Microsoft quer apps nativos de novo** — integrando o WinUI até ao shell do Windows em ritmo acelerado. Acompanhar o repositório público agora é a melhor forma de saber se a promessa vai virar produto ou ficar no "words, not actions" — e o fato de o desenvolvimento ser aberto torna essa cobrança muito mais fácil.

> Fonte: [Windows Latest](https://www.windowslatest.com/2026/08/29/windows-11s-native-app-era-is-coming-back-after-years-of-web-app-slop-and-microsoft-is-finally-building-it-in-public/)
