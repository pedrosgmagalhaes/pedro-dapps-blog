---
title: "Cronos volta ao ar com rollback: rede reverte transações para antes do exploit de US$ 74 milhões"
description: "Validadores restauraram o estado da cadeia para o momento anterior ao ataque no Tectonic e retomaram a produção de blocos; só US$ 6 milhões em ETH escaparam."
pubDate: 2026-09-01
tags: ["blockchain", "cripto", "segurança", "defi"]
cover: "/images/news/cronos-rede-volta-ao-ar-rollback.jpg"
---

A rede Cronos voltou a produzir blocos — mas com uma decisão drástica: os validadores **reverteram o estado da blockchain** para o momento anterior ao exploit que drenou cerca de US$ 74 milhões do protocolo de empréstimos Tectonic. Em vez de apenas religar a cadeia, a rede apagou da história as transações do ataque.

Segundo a Cronos, a restauração foi uma ação de emergência coordenada entre validadores para proteger os usuários:

> "The chain state was restored to before the Tectonic exploit from this morning. Cronos is producing blocks again as of 2026-08-30 23:49:01 UTC, starting from block 90,896,189."

## O que aconteceu

No dia 30 de agosto, um invasor **inflou o preço do token TONIC em cerca de 100 vezes em 20 minutos** e usou o ativo artificialmente valorizado como garantia para tomar empréstimos de ativos reais — o mesmo mecanismo já detalhado aqui quando a rede [parou após o exploit de US$ 75 milhões](/posts/cronos-tectonic-exploit-75-milhoes/).

A novidade agora é o desfecho parcial: segundo a empresa de segurança on-chain **PeckShield**, apesar do tamanho do golpe, o atacante só conseguiu levar de fato cerca de **US$ 6 milhões em Ethereum** — o restante dos fundos ficou "preso" na rede no momento do congelamento.

## O custo do incidente

O Tectonic, maior protocolo de empréstimos da Cronos antes do ataque, viu seu valor total bloqueado (TVL) despencar de cerca de **US$ 122 milhões para menos de US$ 3 milhões**, segundo o DeFiLlama. O protocolo orientou usuários a não interagirem com a plataforma até que a segurança fosse confirmada.

A rede segue em monitoramento próximo — validadores avaliam estabilidade, compatibilidade de protocolos e o funcionamento de dApps, provedores de RPC e bridges, que podem levar mais tempo para voltar. Um relatório post-mortem detalhado deve ser publicado em breve.

## O que observar

O rollback é a parte mais interessante — e mais controversa — desta história. Reverter o estado da cadeia é uma decisão de governança pesada: ela sacrifica o princípio de imutabilidade do blockchain em nome da proteção dos usuários. Funcionou aqui porque a rede parou rápido e a maior parte dos fundos ficou retida; se o invasor tivesse conseguido pulverizar os ativos entre dezenas de endereços antes do congelamento, a reversão seria muito mais complicada.

Isso coloca na mesa uma pergunta que vai ecoar nas próximas semanas: até onde os validadores podem desfazer transações? É o mesmo dilema que aparece em outros [exploits recentes no DeFi](/posts/more-markets-exploit-flow-evm-9-milhoes/) — a diferença é que, desta vez, a resposta foi reescrever a história da rede. Para quem usa DeFi, o recado prático: protocolos com colaterais pouco líquidos continuam sendo o elo mais fraco, e a "imutabilidade" pode ter exceções quando o prejuízo é grande.

> Fonte: [BleepingComputer](https://www.bleepingcomputer.com/news/security/cronos-blockchain-restarts-after-74-million-tectonic-exploit/)
