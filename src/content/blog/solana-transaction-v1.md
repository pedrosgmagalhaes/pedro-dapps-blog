---
title: "Solana agenda Transaction V1 para 9 de setembro: transações de 4 KB, aluguel mais barato e Alpenglow em outubro"
description: "O roadmap da Solana acelera: a Transaction V1 sobe o limite das transações de 1.232 para 4.096 bytes no dia 9 de setembro, o aluguel começa a cair em 5 etapas e o redesign de consenso Alpenglow mira outubro."
pubDate: 2026-08-30
tags: ["blockchain", "solana", "cripto", "dev"]
cover: "/images/news/solana-transaction-v1.jpg"
---

O vice-presidente de tecnologia da **Solana Foundation**, **Jacob Creech**, detalhou no sábado (30) uma sequência de atualizações da rede. O destaque: a **Transaction V1** está marcada para **9 de setembro**, e a primeira etapa da redução do aluguel (rent) começa já na semana do dia 31 de agosto.

No X, Creech resumiu o momento:

> "There are a lot of major changes happening soon – Next week: First step down in rent reduction – Sept 9: Transaction V1 goes live – Dropping slot time even further – October: Alpenglow. Then we all meetup at Scale or Die in November. Solana development will never be the same"

## Transaction V1: transações 3,3x maiores

A Transaction V1 eleva o tamanho máximo de uma transação serializada de **1.232 para 4.096 bytes** — cerca de 3,3 vezes o limite atual, segundo o roadmap oficial da rede.

O formato maior abre espaço para transações que carregam **provas de conhecimento zero**, instruções de **multisig complexas** e outras operações pesadas em dados. A proposta **SIMD-0296** também cita assinaturas **BLS** e **operações cross-chain** como usos possíveis.

Pontos importantes do rollout:

- Os desenvolvedores **precisam optar** pelo formato V1; transações legadas e versão-zero continuam válidas.
- A Transaction V1 **não suporta address lookup tables** — cada aplicação precisa decidir qual formato usar em cada transação.
- Carteiras, APIs e infraestrutura precisam lidar com payloads maiores; a proposta reconhece riscos de **banda e fragmentação de rede**, o que exige testes coordenados antes da adoção ampla.

## Aluguel: 5 etapas rumo a 90% de desconto

A primeira redução de rent não entrega os 90% de uma vez. A Solana planeja **cinco estágios** que reduzem o cálculo do aluguel de **6.960 para 696 lamports por byte**.

O modelo da rede usa saldos rent-exempt para limitar o crescimento descontrolado de estado: aplicações travam SOL ao criar contas que armazenam dados, e esse SOL costuma ser recuperável quando a conta é fechada — o aluguel funciona mais como **depósito reembolsável** do que taxa recorrente.

Com requisitos menores, os desenvolvedores travam menos SOL ao criar contas de tokens, contas de programas e outros estados onchain — o que **reduz o custo de entrada** para aplicações que gerenciam muitas contas de usuários. O código necessário já veio no **Agave 4.2**, mas a rede colocou as mudanças atrás de feature gates independentes: os validadores podem ativar aluguel, tamanho de transação e tempo de slot separadamente, após testar cada um.

## Slots mais rápidos e Alpenglow

A Solana já reduziu o tempo alvo de slot para **350 milissegundos** (eram 400ms) — o primeiro corte desde o lançamento da rede. As próximas etapas planejadas são **300, 250 e, eventualmente, 200ms**, mas Creech não deu datas: cada redução exige uma ativação separada, permitindo que a rede monitore o desempenho dos validadores antes de avançar.

Já o **Alpenglow**, o redesign de consenso proposto, continua mirando **outubro** — com o objetivo de reduzir a finalidade das transações para cerca de **150 milissegundos**. O roadmap oficial lista o Alpenglow como "em desenvolvimento", e o **Agave 4.3** é esperado para outubro. Nem o post de Creech nem o roadmap confirmam uma data garantida de ativação na mainnet.

## O que observar

Duas ressalvas importantes: primeiro, a Transaction V1 e os slots mais rápidos **não vêm juntos** — quem descrever 9 de setembro como a data das duas mudanças está exagerando o anúncio. Segundo, cada avanço depende de ativação separada pelos validadores. Para desenvolvedores, o recado prático é testar o formato V1 cedo: payloads maiores mudam a relação entre tamanho e taxa, e a ausência de lookup tables exige repensar transações complexas. É a rede da [primeira votação de governança onchain](/posts/solana-votacao-governanca-desinflacao/) entrando numa fase de aceleração técnica raramente vista.

> Fonte: [crypto.news](https://crypto.news/solana-sets-sept-9-date-for-transaction-v1/)
