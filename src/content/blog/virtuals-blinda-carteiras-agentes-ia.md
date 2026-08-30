---
title: "Virtuals Protocol cria 'freio' nas carteiras de agentes de IA contra injeção de prompt"
description: "Carteiras programáveis impõem limites de gasto e bloqueios de emergência direto na camada de assinatura, separando a decisão da IA do movimento real dos fundos."
pubDate: 2026-08-28
tags: ["ia", "blockchain", "web3", "seguranca"]
cover: "/images/news/virtuals-blinda-carteiras-agentes-ia.jpg"
---

O Virtuals Protocol apresentou carteiras programáveis para agentes de inteligência artificial que colocam limites de gasto e bloqueios de emergência diretamente na camada de assinatura. A proposta é conter o estrago de ataques de injeção de instruções e de envenenamento de memória — mesmo depois que o agente já foi manipulado.

Na prática, a arquitetura permite configurar tetos de gasto, exigir aprovação manual e acionar mecanismos de bloqueio sem depender de o agente interpretar corretamente as próprias ordens. Segundo o reporte original do Crypto Briefing, o Virtuals opera essas contas inteligentes não custodiais inicialmente na Base e prepara a expansão para Solana, com capacidade de funcionar entre várias redes.

## Uma barreira entre a IA e o dinheiro

O problema atacado pelo Virtuals aparece quando um agente recebe dados externos e usa essas informações para tomar decisões financeiras. Um atacante consegue inserir instruções desenhadas para substituir o comportamento esperado, levando o sistema a solicitar ou executar uma transferência que o dono nunca autorizou.

A vulnerabilidade não depende só de uma mensagem isolada. O chamado envenenamento de memória altera aos poucos o contexto usado pelo agente para raciocinar, acumulando informação manipulada até mudar suas decisões e empurrá-lo para ações prejudiciais a quem controla a carteira.

O Virtuals sustenta que as novas políticas funcionam como uma camada de proteção separada da lógica do agente. Mesmo que o atacante consiga contaminar a memória ou injetar um prompt malicioso, a carteira deve recusar qualquer transação que desrespeite as regras definidas pelo proprietário.

Essa separação desloca uma parte crítica da segurança: do modelo de IA para a infraestrutura que assina as operações. O agente pode sugerir uma ação, mas o mecanismo de controle decide se ela respeita os destinos permitidos, os limites e as condições de aprovação antes de mover os fundos.

## Políticas para níveis diferentes de risco

Entre as configurações apresentadas está o *DENY_ALL*, modo que exige autorização manual para cada transação. É voltado a quem prefere abrir mão de autonomia para revisar pessoalmente qualquer movimento — especialmente relevante quando o agente administra valores altos.

Outra opção, o *ACP_ONLY*, restringe os destinos possíveis dos fundos. A regra vincula o uso da carteira aos destinos permitidos dentro do Agent Commerce Protocol, reduzindo o espaço de ação de uma instrução adulterada mesmo que o agente tenha sido convencido a fazer outra operação.

As políticas rodam do lado do servidor e podem ser gerenciadas por painel de controle ou interface de linha de comando. O desenho também separa a identidade da carteira das chaves usadas para assinar transações — uma forma de administrar os controles sem confundir a identidade operacional do agente com o mecanismo que autoriza o movimento de ativos.

## Um risco que já gerou prejuízo

A necessidade dessas barreiras não é só teórica. Durante 2026, mais de US$ 150 mil foram drenados de um agente de IA por meio de técnicas de injeção de instruções, conforme os dados citados no reporte.

Agentes que consultam páginas, mensagens, bases de dados e outras fontes externas ampliam a superfície de ataque. Cada novo canal de informação pode ajudar a completar tarefas, mas também abre espaço para terceiros injetarem instruções que parecem parte do fluxo legítimo de trabalho.

Quando o agente tem acesso direto a uma carteira sem controles independentes, o atacante não precisa comprometer toda a infraestrutura financeira. Basta alterar a decisão do sistema para que uma operação não autorizada chegue à etapa de assinatura e seja executada com as credenciais disponíveis.

## A economia de agentes crescendo

O Virtuals afirma abrigar hoje mais de 18 mil agentes com carteiras on-chain. Nessa escala, a segurança das contas vira questão de infraestrutura, porque os agentes deixam de ser experimentos e passam a lidar com pagamentos, delegação e execução de trabalhos.

As atualizações da versão beta do Agent Commerce Protocol miram justamente ampliar execução e delegação. O objetivo descrito pelo protocolo é que os agentes façam mais do que transferir tokens — incluindo pagamentos diretos de suas carteiras por recursos computacionais necessários para completar tarefas.

É um movimento que conversa de perto com o que vimos na [camada da Chainlink para agentes](/posts/chainlink-for-agents/): aos poucos, a infraestrutura cripto deixa de pensar no agente como um experimento e passa a tratá-lo como ator econômico de verdade.

## O que isso resolve (e o que não resolve)

Os limites programáveis seguram uma transação que exceda um valor autorizado ou tente chegar a um destino não permitido. Também permitem pausar a atividade com um interruptor de emergência, decisivo se o dono detectar comportamento anômalo antes que mais operações se acumulem.

Mas uma política de assinatura não diz se a decisão comercial do agente é inteligente ou lucrativa. O controle impede que os fundos saiam para um endereço proibido, mas não transforma automaticamente em correta uma operação que cumpre as condições técnicas definidas pelo dono.

A supervisão humana continua central nos níveis mais altos de risco. O modo de aprovação manual responde bem a operações sensíveis, enquanto configurações mais autônomas ganham velocidade e reduzem fricção — ao custo de exigir mais confiança nos limites e destinos predefinidos.

> **Minha opinião:** é um avanço necessário. A defesa mais sólida não é pedir para a IA ser sempre prudente, e sim impedir tecnicamente que uma decisão manipulada tenha liberdade ilimitada sobre os fundos.

> Fonte: [Crypto Briefing](https://cryptobriefing.com/virtuals-protocol-addresses-evolving-prompt-injection-threats-to-agent-wallets/)
