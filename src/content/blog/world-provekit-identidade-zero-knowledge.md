---
title: "World libera ProveKit: toolkit open-source para provar idade e identidade sem revelar seus dados"
description: "Startup de identidade co-fundada por Sam Altman abriu o código do ProveKit, que gera provas de conhecimento-zero direto no celular ou navegador — sem enviar documentos ou dados pessoais para servidores."
pubDate: 2026-09-02
tags: ["blockchain", "dev", "privacidade", "open-source"]
cover: "/images/news/world-provekit-identidade-zero-knowledge.jpg"
---

A **World** (antiga Worldcoin), startup de identidade humana co-fundada por Sam Altman, abriu o código do **ProveKit** — um toolkit de **provas de conhecimento-zero (ZK) para identidade**. A ferramenta, que já rodava no World ID em acesso antecipado desde abril, agora pode ser usada por qualquer desenvolvedor fora da World, como a fundação confirmou ao The Block.

A proposta, em uma frase: **provar uma afirmação sobre você sem entregar os dados por trás dela**. Com o ProveKit, o usuário gera a prova criptográfica direto no próprio celular ou navegador para validar, por exemplo, idade, nacionalidade ou a posse de um documento de identidade válido — e o verificador recebe apenas a confirmação daquela afirmação específica, nada além disso.

> "Estamos lançando o ProveKit open source porque acreditamos que essa tecnologia é essencial para a autenticação que preserva a privacidade e deve ser neutra e sem permissão" — porta-voz da World Foundation, ao The Block.

## Por que isso importa agora

O contexto de segurança dá urgência ao tema. Nesta semana, o jornalista investigativo Brian Krebs noticiou que o FBI investiga o serviço **Nexus**, na dark web, que vende varreduras de **mais de 153 milhões de carteiras de motorista** dos EUA e do Canadá — dados que parecem ter sido extraídos da verificadora de identidade IDScan.net. O caso ilustra o risco de concentrar dados pessoais em servidores de terceiros.

"Documentos de identidade só deveriam ser autenticados com provas de conhecimento-zero", escreveu no X **Remco Bloemen**, head de blockchain da World Foundation. "Pare de revelar todos os seus dados pessoais só para provar que você tem uma carteira de motorista válida."

## Como funciona por dentro

- **Geração local de provas**: em vez de *delegated proving* (enviar os dados para provar em servidores externos), tudo roda no dispositivo do usuário — o que reduz a superfície de exposição e mantém a pessoa no controle das informações.
- **Documentos com NFC**: passaportes e identidades com chip NFC são lidos pelo celular; como esses documentos são **assinados criptograficamente pela autoridade emissora**, a assinatura pode ser verificada dentro de um circuito de conhecimento-zero, sem copiar o documento.
- **Suporte a Noir**: o toolkit usa a linguagem Noir (inspirada em Rust, criada pela Aztec para aplicações ZK) e permite criar novas afirmações prováveis sem precisar embutir cada uma no pacote do aplicativo.
- **Hardware comum**: as provas levam **segundos em um celular típico** e menos de 30 segundos em um aparelho básico usado nos testes.

O ProveKit mira **segurança pós-quântica de 128 bits** e dispensa *trusted setup*. A v1 é production-ready e otimizada para verificação *off-chain* (servidores, computadores e celulares); a v2, em desenvolvimento, deve reduzir tamanho da prova, tempo e memória — e adicionar verificação on-chain mais eficiente. Entre os caminhos estudados está o suporte a **Groth16**, esquema de prova zk-SNARK cujas provas são muito baratas de verificar em blockchains como World Chain, Ethereum, Base e Solana.

## O que observar

Para quem desenvolve, o ProveKit é uma amostra prática de um movimento maior: a **identidade verificável saindo dos servidores e indo para o dispositivo do usuário** — na mesma direção de iniciativas como a [identidade para agentes de IA em Hong Kong](/posts/hkt-identidade-agentes-ia/). O ponto didático é o conhecimento-zero aplicado a um problema cotidiano: você não precisa entregar o documento inteiro para provar que tem mais de 18 anos. Claro, a World enfrenta escrutínio regulatório em vários países (Espanha, Quênia, Brasil, Indonésia, Coreia do Sul, Hong Kong e Filipinas) por causa do projeto biométrico — mas o toolkit em si mostra como a prova criptográfica local pode ser neutra e reutilizável.

> Fonte: [The Block — World open-sources ProveKit, a zero-knowledge identity proving toolkit](https://www.tradingview.com/news/the_block:9169eff5e094b:0-world-open-sources-provekit-a-zero-knowledge-identity-proving-toolkit/)
