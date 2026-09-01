---
title: "App falso do Claude distribui malware que rouba senhas e carteiras de cripto"
description: "Pesquisadores da Morphisec flagraram o RevStealer escondido em um 'Claude Opus 5 Free Desktop' falso: o malware mira mais de 50 carteiras de cripto, senhas e dados de navegador, e ainda se autodestrói após roubar."
pubDate: 2026-09-01
tags: ["programação", "dev", "segurança", "ferramentas"]
cover: "/images/news/revstealer-claude-falso-roubo-carteiras.jpg"
---

A demanda por ferramentas de IA virou isca para golpistas. Pesquisadores da **Morphisec** divulgaram na segunda-feira (1º) uma campanha que distribui o malware **RevStealer** dentro de um aplicativo falso do Claude — mais especificamente, um projeto no GitHub chamado **"Claude Opus 5 Free Desktop"**, que promete acesso gratuito a um modelo pago.

O RevStealer é um malware para Windows feito para roubar senhas, dados de navegador e material de carteiras de criptomoedas — são mais de **50 carteiras** na mira, incluindo caminhos ligados ao Ledger Live.

## Como o golpe funciona

A vítima é atraída por uma promessa comum: uma versão gratuita de um produto pago. O arquivo baixado tem cerca de **101 MB** e é um aplicativo Electron trojanizado — mas que não abre nenhuma interface útil.

Antes de liberar o payload, o malware faz uma bateria de checagens para ver se está rodando em uma máquina real:

- verifica memória disponível, núcleos de processador, hostname, nome de usuário e placa de vídeo;
- monitora atrasos de depuração (debugging);
- se o ambiente parecer automatizado ou sob análise, **não libera o próximo estágio**.

Em uma máquina que passa nos testes, o programa descriptografa um payload **AES-256-CBC** embutido nos próprios recursos, grava o componente em uma pasta aleatória do AppData, executa sem janela visível e tenta apagar o arquivo de staging. Os pesquisadores também observaram uma tentativa de **adicionar a pasta AppData às exclusões do Microsoft Defender** — ou seja, o malware tenta desarmar o antivírus.

## O que ele rouba

O RevStealer coleta dados em registros curtos e criptografados, enviados sem montar um grande arquivo em disco:

- bancos de dados e cookies de navegadores;
- registros de gerenciadores de senhas;
- configurações de VPN e acesso remoto;
- dados de mensageiros (incluindo sessões do Telegram Desktop);
- capturas de tela e documentos selecionados;
- **mais de 50 carteiras de criptomoedas**.

O malware não usa chave de registro, tarefa agendada ou entrada de inicialização: ele opera em uma **janela curta de roubo e se autodestrói**. Se o servidor de comando e controle principal estiver fora do ar, ele consegue buscar um endereço substituto através de um **smart contract na Polygon**, dificultando a derrubada da infraestrutura.

## Como se proteger

A recomendação dos pesquisadores é direta: **baixe software apenas dos canais oficiais** — no caso do Claude Code, o comando legítimo é:

```
curl -fsSL https://claude.ai/install.sh | bash
```

Desconfie de qualquer comando de instalação que:

- esconda a URL com **Base64** ou substituição de comando (`$(...)`);
- use a opção **`-k`** (que desativa a validação do certificado TLS);
- use **HTTP puro** em vez de HTTPS;
- aponte para domínios não relacionados ao fabricante do software.

Para organizações: bloquear execução de locais graváveis, monitorar alterações nas exclusões do antivírus e exigir autenticação forte reduz bastante a superfície de ataque. Se suspeitar de infecção, revogue sessões expostas, troque senhas e **mova fundos de cripto** imediatamente.

O padrão é o mesmo que já apareceu em outras campanhas de [malware roubando carteiras](/posts/coldcard-ia-roubo-bitcoin/) e em [golpes de phishing com IA](/posts/operacao-asterix-phishing-cripto-ia/): o golpista não invade o sistema da empresa — ele usa a confiança do usuário em um produto popular.

> Fonte: [Cyber Security News](https://cybersecuritynews.com/revstealer-inside-fake-claude/) — relatório da Morphisec
