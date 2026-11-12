---
title: "AWS lança emulador da nuvem escrito 100% por agentes de IA — sem uma linha revisada por humano"
description: "O AWS Emulator roda mais de 200 serviços da AWS na sua máquina, de graça, para testar código sem gastar com nuvem. O detalhe que chama atenção: três times de agentes autônomos escreveram e mantêm todo o código, e a equipe da AWS diz que não revisou nenhuma linha."
pubDate: 2026-11-12
tags: ["dev", "ia", "aws", "cloud", "agentes"]
cover: "/images/news/aws-emulator-escrito-por-agentes-ia.jpg"
---

A AWS lançou em **11 de novembro** o **AWS Emulator**: um programa que roda na sua máquina e responde às mesmas chamadas de API da nuvem da Amazon. Você aponta o SDK ou a CLI para ele e testa sua aplicação sem provisionar recurso, sem esperar deploy e sem pagar pelo uso enquanto testa.

Até aí, seria mais um emulador. O que fez o anúncio viralizar — 858 pontos no Hacker News, quase 3,5 mil estrelas no GitHub — é outra parte: **todo o código foi escrito por agentes de IA autônomos**.

> "The emulator was written entirely by autonomous agents. Our team hasn't written or reviewed any of the code. We could do this because the guardrails we've put in place gave the agents space to work independently and us the trust that they don't color outside these lines."

A frase é de **Matthew Goldberg**, engenheiro principal sênior da AWS, no [post de lançamento](https://www.aboutamazon.com/news/aws/how-autonomous-ai-agents-built-aws-emulator). Não é marketing de "copiloto": é uma ferramenta de infraestrutura, publicada com código aberto, que milhares de desenvolvedores já podem baixar — e que nenhum engenheiro humano revisou antes de sair.

## O que o emulador faz, na prática

O AWS Emulator é um servidor local. Ao iniciar, ele gera as próprias credenciais, um arquivo de configuração e um certificado em `~/.aws/emulator/9297/`. Você exporta variáveis de ambiente, e o SDK passa a conversar com a sua máquina em vez da nuvem. **Seu código não muda.**

Com isso, um teste que cria uma tabela no DynamoDB, grava um item e lê de volta roda igual, só que sem deployment e sem conta na AWS. Um agente de código pode criar recurso, conferir a resposta e iterar em milissegundos, em vez de esperar cada chamada à nuvem. Cada instância do emulador tem porta, chaves e estado em memória próprios — então agentes, suítes de teste e jobs de CI não enxergam os recursos uns dos outros.

O pacote é gratuito e não tem taxa de serviço. Instala-se por RPM ou pacote Debian no Linux; no macOS e no Windows, roda em contêiner Docker. Segundo o [GeekWire](https://www.geekwire.com/2026/aws-gives-developers-a-free-local-stand-in-for-its-cloud-built-from-scratch-by-ai-agents/), são **mais de 400 modelos de API cobrindo mais de 200 serviços da AWS** — o post da AWS cita 438 modelos de API como ponto de partida do projeto.

## O experimento de fim de semana

A história começa com uma demonstração da Anthropic, que mostrou agentes construindo um compilador de C sozinhos. Goldberg tirou a conclusão que interessa: se existe uma **especificação bem definida** e uma **implementação de referência**, um agente consegue construir algo que cumpre a especificação.

A AWS tem as duas coisas. Os [modelos públicos de API](https://github.com/aws/api-models-aws) são a especificação. A nuvem real é a referência. Então ele deu ao **Kiro**, agente de código da própria AWS, o prompt mais simples que conseguiu imaginar:

1. escreva testes baseados na CLI da AWS;
2. itere nesses testes até passarem contra a AWS de verdade;
3. construa uma implementação em memória que passe nos mesmos testes.

Quinze minutos depois, o Kiro entregou uma primeira versão utilizável do **Amazon SQS**, o serviço de filas. Com o prompt refinado, construiu o resto da AWS durante o fim de semana. Tinha buracos, mas era bom o suficiente para o time começar a testar o próprio software na segunda-feira.

## Três times de agentes e um portão de merge

Transformar aquilo em produto exigiu o que Goldberg chama de "livro de colorir": dar aos agentes uma área bem delimitada para preencher. Hoje o emulador é construído por **três times de agentes**, rodando em instâncias do Amazon Bedrock AgentCore:

- **Time de testes:** escreve cenários reais de uso da AWS a partir dos modelos de API e verifica cada um contra a nuvem de verdade antes de aceitar. São dezenas de milhares de *testes de fidelidade* acumulados — a régua que diz o quanto o emulador se parece com a AWS.
- **Time de problemas:** reproduz esses testes no emulador, encontra divergências e abre uma issue para cada falha, agrupando as que parecem ter a mesma causa raiz.
- **Time de correções:** cada agente pega **uma** issue, investiga a causa, altera o código e submete a mudança.

Nada entra na linha principal sem passar por um **portão de merge** que bloqueia código que não compila e inclui agentes revisores de padrão de código, de segurança e de regressão de fidelidade. Se algum reprova, a mudança volta para o agente refazer.

> "Without this merge gate, we wouldn't trust what our agents are building."

O volume dá a dimensão: segundo Goldberg, **milhares de issues são corrigidas por dia**, com centenas de agentes trabalhando ao mesmo tempo no mesmo repositório. O código sai no GitHub sob licença **CC0**, dedicado ao domínio público. O repositório já passa de 29 mil commits, e as pendências conhecidas ficam expostas em duas pastas: `issues/things-that-now-work` e `issues/things-that-do-not-work`.

Há um detalhe que explica por que o resultado precisou de engenharia, e não só de um bom prompt: em uma versão anterior, os agentes decidiram **escrever o próprio interpretador Python** para suportar funções do Lambda. Funcionou, mas era um desvio gigante. A equipe passou a orientá-los a reutilizar bibliotecas existentes — algo óbvio para quem não precisa de livro de colorir.

## O que o emulador não faz

A AWS é explícita sobre os limites, e vale ler antes de trocar o ambiente de teste:

- **Não avalia políticas de IAM** como a nuvem. Uma requisição que a AWS negaria pode passar no emulador. A recomendação oficial é não usar a ferramenta para testar segurança.
- Cada instância se comporta como **uma única conta**, sem cross-account e sem comportamento entre regiões.
- Operações ainda não implementadas devolvem **501 Not Implemented**, e a fidelidade varia por serviço. A AWS publica uma nota de fidelidade a cada release.
- Segundo o analista Devin Pratt, da IDC — ouvido pelo InfoWorld, segundo o GeekWire —, ainda não há simulação de *throttling*, de indisponibilidade nem das diferenças de serviço por região.
- A ferramenta **não faz sandbox do código que roda**: ela emula os serviços, não isola o processo que você executa.
- A **telemetria vem ligada por padrão** e coleta dados de uso, sem conteúdo de requisições nem credenciais. Dá para desligar por opção de linha de comando, variável de ambiente ou arquivo `config.toml`.

## Por que isso importa para quem desenvolve no Brasil

Duas consequências práticas.

A primeira é econômica. Testar aplicação na nuvem custa em dólar, e cada iteração de um agente de código multiplica esse custo: ele roda, lê o erro, corrige, roda de novo. Rodar esse ciclo localmente tira a conta do cartão e tira o deploy do caminho. Quem já teve uma fatura surpresa por deixar recurso ligado entende o tamanho do alívio.

A segunda é sobre o que está sendo automatizado. O AWS Emulator não é um gerador de código que acerta uma função. É um produto com milhares de comportamentos verificáveis, mantido por agentes, cuja qualidade depende de três coisas que humanos construíram: **especificação, testes e portão de merge**. O trabalho do engenheiro mudou de lugar — saiu da escrita e foi para o desenho das regras que decidem se o trabalho do agente está correto.

Isso conversa com o que já apareceu aqui no blog em outros casos: quando falamos de [ferramentas de código aberto para agentes](/posts/openclaude-agente-codigo-open-source/) e de [metodologias para agentes de código](/posts/superpowers-metodologia-para-agentes-de-codigo/), a pergunta era como dar contexto e verificação a quem escreve código. Aqui a resposta vem em escala industrial. E o alerta também já foi dado: agentes com acesso amplo erram de formas caras, como no caso do [Claude Code que gravou segredos no repositório](/posts/claude-code-dont-ask-again-vaza-segredos/) e na discussão sobre [IA escapando do controle](/posts/ia-escapando-do-controle/).

## O que acompanhar

A AWS promete uma série de posts técnicos sobre a arquitetura multiagente, a medição de fidelidade e o critério de qualidade e segurança. Vale acompanhar por dois motivos: é um dos primeiros casos públicos de código de infraestrutura mantido sem revisão humana linha a linha, e a própria AWS diz que a ferramenta **não serve para validar segurança** — ou seja, a confiança no que os agentes produzem ainda depende de testes contra a nuvem real.

Para quem quiser testar, o código está em [github.com/aws/aws-emulator](https://github.com/aws/aws-emulator), a suíte de fidelidade em [aws-emulator-evaluation-suite](https://github.com/aws/aws-emulator-evaluation-suite) e o guia em [docs.aws.amazon.com/emulator](https://docs.aws.amazon.com/emulator/latest/userguide/what-is-service.html).

**Fonte primária:** [How we built the agents that built AWS Emulator](https://www.aboutamazon.com/news/aws/how-autonomous-ai-agents-built-aws-emulator), de Matthew Goldberg (AWS, 11/11/2026); [anúncio no AWS News Blog](https://aws.amazon.com/blogs/aws/test-your-applications-against-aws-locally-with-aws-emulator/), de Daniel Abib (11/11/2026); [repositório oficial](https://github.com/aws/aws-emulator). Cobertura secundária: [GeekWire](https://www.geekwire.com/2026/aws-gives-developers-a-free-local-stand-in-for-its-cloud-built-from-scratch-by-ai-agents/).
