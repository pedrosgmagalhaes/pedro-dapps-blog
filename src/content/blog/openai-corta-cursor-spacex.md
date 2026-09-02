---
title: "OpenAI vai cortar o Cursor após compra pela SpaceX: modelos GPT saem do editor em 12 de novembro"
description: "A OpenAI notificou a SpaceX que vai encerrar o contrato que leva modelos GPT ao editor Cursor a partir de 12 de novembro de 2026, citando quebra de confiança e o histórico de Musk de descumprir contratos. O Cursor diz que a OpenAI representa só 5% do seu tráfego de IA."
pubDate: 2026-08-29
tags: ["ia", "dev", "ferramentas"]
cover: "/images/news/openai-corta-cursor-spacex.jpg"
---

A briga entre Elon Musk e a OpenAI agora tem um impacto direto na vida de quem programa: a OpenAI **notificou a SpaceX que vai encerrar o contrato** que leva os modelos GPT ao **Cursor**, o editor de código com IA que virou queridinho dos devs. O desligamento está marcado para **12 de novembro de 2026** — o maior prazo de aviso permitido pelo contrato, que inclui uma cláusula de saída em caso de mudança de controle acionário.

A mudança de controle veio em agosto: a SpaceX fechou a compra da Anysphere (dona do Cursor) em uma transação **100% em ações avaliada em US$ 60 bilhões**. Para a OpenAI, isso mudou o jogo — a empresa diz que não consegue mais confiar que a SpaceX vai manter a tecnologia dentro dos termos de uso.

## "It boils down to trust"

Quem explica a decisão é Thibault Sottiaux, da OpenAI:

> "It boils down to trust."

A OpenAI aponta um histórico de quebras de contrato por parte de Musk: depois de comprar o Twitter, ele teria **cortado o acesso da OpenAI ao feed de dados** da plataforma (usado para treinar o ChatGPT por cerca de US$ 2 milhões por ano); e Musk já admitiu, durante a disputa judicial, ter usado saídas de outros laboratórios para treinar os modelos **Grok** — prática conhecida como "destilação" e que viola os termos de serviço.

Há ainda um enquadramento de segurança: com o próximo modelo **Astra**, que segundo relatos tem capacidades avançadas de cibersegurança, a OpenAI diz que existe "um novo nível de responsabilidade" para garantir que parceiros cumpram os termos.

## O lado do Cursor

Michael Truell, cofundador do Cursor, respondeu rápido: os modelos da OpenAI representam apenas **cerca de 5% do tráfego de IA** do editor, e a empresa está conversando com a OpenAI para achar uma solução.

> "Cursor was one of the very first users of OpenAI, we've worked closely with their team for years, and we've trusted their platform to be neutral infrastructure for our business."

Detalhe importante: quem usa o próprio **API key** da OpenAI dentro do Cursor continua podendo usar os modelos GPT normalmente, e as extensões da OpenAI para o editor seguem funcionando. O corte atinge o acesso "nativo" aos modelos dentro da assinatura do Cursor.

## A jogada da Anthropic

A Anthropic aproveitou o vácuo. Tom Brown, cofundador e Chief Compute Officer, escreveu no X que o Cursor é parceiro de confiança desde o Sonnet 3.5 e que a empresa **vai continuar expandindo a capacidade de computação para os modelos Claude no Cursor**. Há uma ironia aí: a própria Anthropic já bloqueou o Windsurf (quando a OpenAI quis comprá-lo, em 2025) e revogou o acesso da OpenAI aos modelos Claude. Ou seja: **cortar o fornecimento virou arma padrão na guerra das IAs** — e agora os desenvolvedores são quem fica no meio.

## O que observar

Se você usa Cursor, o recado prático é: até 12 de novembro, o editor continua com os GPT no plano nativo; depois, ou você migra para outros modelos (Claude, Gemini, Grok...) ou pluga sua própria chave da OpenAI. Para o mercado, o movimento reforça o que o blog já apontou sobre a busca por [agentes de código abertos e multi-provedor](/posts/openclaude-agente-codigo-open-source/): **dependência de um único laboratório virou risco de negócio** — e ferramentas que rodam "com qualquer IA" ganham ainda mais valor.

> Fonte: [The Decoder](https://the-decoder.com/openai-cuts-off-cursor-after-spacex-acquisition-citing-musks-history-of-breaking-contracts/)
