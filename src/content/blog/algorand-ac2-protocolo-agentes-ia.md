---
title: "Algorand lança AC2, o protocolo que tira as chaves privadas dos seus agentes de IA"
description: "A Algorand Foundation apresentou o AC2, padrão aberto e agnóstico de blockchain que transforma a aprovação de agentes de IA em assinatura criptográfica via passkey — sem nunca expor suas chaves privadas."
pubDate: 2026-08-25
tags: ["ia", "blockchain", "web3", "segurança"]
cover: "/images/news/algorand-ac2-protocolo-agentes-ia.jpg"
---

A Algorand Foundation anunciou em 25 de agosto o lançamento público do **AC2** (Agentic Communication & Control Protocol, ou Protocolo de Comunicação e Controle Agêntico), um padrão open-source e agnóstico de blockchain para comunicação segura entre usuários e agentes de inteligência artificial. A especificação e a implementação de referência já estão disponíveis no GitHub.

## O problema que ninguém queria encarar

À medida que os agentes de IA passam a executar pagamentos, assinar código e gerenciar operações digitais em nome das pessoas, os canais usados para isso hoje — e-mail, Telegram, WhatsApp — não oferecem verificação criptográfica de identidade, nem delegação padronizada, nem uma forma de aprovar ações individuais sem entregar as chaves privadas por completo. O AC2 nasce para fechar essa lacuna.

O protocolo ataca duas brechas que existem na maioria dos sistemas de agentes atuais. A primeira: não há prova criptográfica de que um humano realmente autorizou aquela ação. A segunda: as credenciais ficam expostas no ambiente de execução do agente — API keys injetadas na inicialização, tokens de sessão e acessos que não deveriam sair dali em primeiro lugar.

## Assinatura que prova, e credencial que não sai do seu bolso

No AC2, a aprovação deixa de ser uma mensagem de chat e vira uma **assinatura FIDO2 via passkey**: vinculada ao hardware, resistente a phishing e falsificação. Em vez de um "sim" solto numa conversa, você tem uma trilha de auditoria verificável.

A mudança de onde moram as credenciais é igualmente central. Em vez de injetar chaves de API no runtime do agente e torcer para que ele não seja comprometido, o AC2 mantém esses segredos no seu dispositivo. O agente recebe uma autorização assinada — nunca a credencial em si. Se o runtime for invadido, não há chaves para roubar.

Na prática, o AC2 estabelece uma conexão WebRTC direta, criptografada de ponta a ponta, entre a carteira ou o app do usuário e o agente. Quando o agente precisa executar uma operação que exige assinatura — um pagamento, um commit de código, uma autorização de API — ele envia o pedido pelo AC2. O usuário revisa e aprova na própria interface da carteira, e a assinatura é delegada de volta ao agente. A chave privada nunca sai do controle do dono.

> "AC2 is Algorand's answer to a fundamental question the industry has been sidestepping: how do you give AI agents the authority they need to be useful, without the authority to act against your interests?" — afirmou Marc Vanlerberghe, Chief Strategy and Marketing Officer da Algorand Foundation.

Ele completa: "The answer is you don't hand them the keys, you approve each use of them."

## Leve, aberto e sem blockchain obrigatória

O AC2 combina três padrões abertos escolhidos de propósito: **DIDComm v2.0** para o formato das mensagens, **WebAuthn/FIDO2** para autenticação e **WebRTC DataChannel** para o transporte ponto a ponto, sem servidores de retransmissão. Um fluxo básico exige cerca de cinquenta linhas de código — sem contêineres, sem SDK de mensageria, sem proxy de credenciais — e funciona ao lado da infraestrutura que você já usa.

Entre os casos de uso previstos estão deploys de código com assinatura prévia, aprovação de comunicações com clientes, autorização de acesso a APIs, pagamentos x402 e ações baseadas em intenção, com o agente definindo em um mandato AP2 exatamente o que pode fazer e dentro de quais limites.

## O que observar

A primeira versão pede assinatura a cada operação — o padrão seguro, ainda que pouco autônomo. A próxima iteração, já anunciada, adiciona delegação: você define os limites uma vez, e o agente age livremente dentro deles, voltando a você quando sair da régua. O modelo de segurança não muda; só a frequência com que você é consultado.

O tema dos agentes com autonomia controlada é recorrente por aqui — já falamos de como o setor tenta [blindar carteiras de agentes de IA](/posts/virtuals-blinda-carteiras-agentes-ia/) e de agentes que [pagam por serviços sozinhos](/posts/xdc-ai-agentes-pagam-servicos/). O AC2 entra justamente nessa conversa, com uma aposta clara: o futuro não é entregar as chaves, é aprovar cada uso delas.

> Fonte: [Algorand Foundation](https://algorand.co/blog/introducing-ac2-protocol-the-missing-security-layer-for-ai-agents)
