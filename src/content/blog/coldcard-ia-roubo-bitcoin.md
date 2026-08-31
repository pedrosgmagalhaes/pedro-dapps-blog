---
title: "Falha em carteira Coldcard permite roubo de US$ 112 milhões em Bitcoin — com suspeita de uso de IA"
description: "Pesquisadores apontam que atacantes podem ter usado modelos de IA sem restrições para explorar uma vulnerabilidade no firmware da Coldcard, no maior roubo já documentado de carteiras de hardware."
pubDate: 2026-08-17
tags: ["ia", "blockchain", "segurança", "bitcoin"]
cover: "/images/news/coldcard-ia-roubo-bitcoin.jpg"
---

Uma falha de segurança que ficou embutida no firmware da carteira de hardware **Coldcard** desde março de 2021 permitiu que invasores extraíssem mais de **1.778 Bitcoin** de mais de **8.600 endereços** — um prejuízo verificado de cerca de **US$ 112,7 milhões**. É o maior comprometimento de carteiras de hardware já documentado.

O ataque coordenado começou em 30 de julho de 2026. Em uma janela de apenas 41 minutos, os invasores drenaram mais de 1.000 BTC de mais de 1.000 endereços. Desde 6 de agosto, nenhuma transação maliciosa adicional foi detectada.

## A origem do problema

O defeito entrou no código na versão **4.0.1** do firmware, distribuída pela Coinkite. Essa atualização redirecionou, por engano, a geração das frases-semente de um gerador de números aleatórios baseado em hardware para um gerador pseudoaleatório baseado em software.

A aleatoriedade gerada por software é bem mais previsível — o que deixa as chaves criptográficas resultantes mais expostas a replicação ou ataques de força bruta. Relatos indicam que um desenvolvedor alertou a Coinkite sobre o problema ainda em maio de 2025, mas a brecha ficou aberta tempo suficiente para que os atacantes desenvolvessem estruturas de exploração em escala, mirando os modelos Mk2, Mk3, Mk4, Q e Mk5.

## IA no ataque — e a defesa de mãos atadas

A **Galaxy Research** concluiu, com "certeza substancial", que os invasores usaram sistemas de IA sem as salvaguardas de segurança cibernética para localizar e transformar a vulnerabilidade em arma. O modelo open source **Kimi K3** foi citado como exemplo da tecnologia provavelmente usada na violação.

O detalhe que mais chamou atenção: segundo **Rob Hamilton**, CEO da Anchorwatch, os protocolos de segurança restritivos dos principais laboratórios de IA dos Estados Unidos impediram que profissionais de cibersegurança usassem ferramentas defensivas equivalentes — forçando as equipes de proteção a depender dos mesmos modelos open source chineses usados pelos atacantes.

Hamilton reuniu cerca de 25 especialistas, incluindo o desenvolvedor James O'Beirne e Calle, da Cashu, para criar o **Bitcoin Red Team**, grupo que vem revisando repositórios de código do ecossistema cripto em busca de fraquezas.

"O ataque à Coldcard ainda está em andamento", alertou Alex Thorn, head de pesquisa da Galaxy. (tradução livre) A Coinkite publicou um boletim de segurança em 30 de julho e distribuiu o firmware corrigido no dia 31; o CEO Rodolfo Novak divulgou um pedido formal de desculpas.

## O que os afetados precisam fazer

Instalar o firmware atualizado **não resolve** o problema de quem já gerou a semente na versão vulnerável: essas frases continuam permanentemente comprometidas. Os usuários precisam criar uma semente totalmente nova em firmware corrigido e mover os fundos para as novas carteiras.

Do total roubado, cerca de **1.531 BTC** seguem parados em endereços controlados pelos atacantes. Outros **246 BTC** foram movimentados — 65% para serviços de mistura como o Coinjoin e 35% por métodos desenhados para apagar o rastro.

Um alívio: nenhum roubo ocorreu em carteiras **multisig**, que exigem múltiplas chaves para autorizar uma transação. A Galaxy distribuiu os endereços dos atacantes a exchanges, órgãos reguladores e autoridades para tentar congelar os ativos caso cheguem a serviços centralizados.

O caso ocupa a 20ª posição entre os maiores roubos de criptomoedas já registrados — abaixo dos US$ 130 milhões da Multichain (2023) e acima dos US$ 100 milhões da ponte Horizon da Harmony (2022).

> Fonte: [Blockonomi](https://blockonomi.com/ai-powered-attack-drains-112m-in-bitcoin-from-coldcard-hardware-wallets/)
