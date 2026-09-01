---
title: "Califórnia isenta Linux e outros sistemas open source da lei de verificação de idade"
description: "Em votação unânime, o estado americano aprovou uma emenda que tira distribuições Linux, BSD e apps de código aberto do alcance da lei de verificação de idade — com efeito a partir de 2027."
pubDate: 2026-08-31
tags: ["programação", "dev", "open-source", "segurança"]
cover: "/images/news/california-isenta-linux-verificacao-idade.jpg"
---

A legislatura da Califórnia aprovou uma emenda que isenta sistemas operacionais de código aberto da **Digital Age Assurance Act** — a lei de verificação de idade do estado. O Senado californiano votou 39 a 0 pela mudança, e a Assembleia aceitou o texto em votação de concordância logo em seguida. A emenda segue agora para o governador Gavin Newsom, que assinou a lei original em outubro do ano passado.

A lei, que entra em vigor em **1º de janeiro de 2027**, originalmente obrigava provedores de sistemas operacionais a coletar a idade do usuário durante a configuração de conta e compartilhar um "sinal de idade" com lojas de aplicativos — afetando Windows, macOS, iOS e Android. A aprovação da emenda encerra quase um ano de incerteza sobre se distribuições Linux e o SteamOS seriam forçadas a fazer o mesmo.

## Quem fica de fora

A emenda redefine o termo "provedor de sistema operacional" para excluir qualquer entidade que distribua um sistema ou aplicativo sob **licenças que permitam copiar, redistribuir e modificar o software** — o que atende às licenças GPL, MIT, BSD e Apache. Na prática, saem do escopo: Debian, Fedora, Ubuntu, Arch, a família BSD e o GrapheneOS.

Dois outros recortes importantes:

- **Gerenciadores de pacotes** (apt, pacman) e bibliotecas/dependências não são considerados "aplicativos" — não entram na definição da lei;
- **Lojas de extensões** de navegador ficam de fora, já que distribuem complementos que rodam dentro de um aplicativo hospedeiro.

## O detalhe absurdo que a emenda corrige

A definição original de "usuário" dizia: "uma criança que é o usuário principal do dispositivo" — o que, tecnicamente, classificava **todo adulto dono de um aparelho como criança**. Como o mecanismo da lei depende de adultos declararem a idade para que o dispositivo seja marcado como "18+", a redação quebrada tornava impossível qualquer pessoa ser marcada como adulta.

A emenda também acrescenta uma proteção nova: ninguém pode solicitar um sinal de idade de um provedor de SO ou loja de apps **a menos que seja exigido por lei** — fechando a porta para o uso da API de idade como canal genérico de coleta de dados. Plataformas e desenvolvedores ganham ainda um *safe harbour* contra sinais errôneos recebidos de boa-fé.

## O que permanece no escopo

Windows, macOS, iOS e Android continuam obrigados a coletar idade na configuração de conta a partir de janeiro de 2027 — com prazo estendido até 1º de julho de 2027 para dispositivos configurados antes disso. O caso do **SteamOS** segue ambíguo: os componentes baseados em Arch são open source, mas a Valve distribui a imagem junto com o cliente Steam proprietário, o que deixa seu status legal incerto.

A deputada Buffy Wicks, autora tanto da lei original quanto da emenda, apresentou a isenção em fevereiro, depois de críticas de desenvolvedores Linux e da Electronic Frontier Foundation (EFF).

## O que observar

Para quem desenvolve software, essa é uma daquelas decisões que definem o rumo do open source nos EUA. Se a Califórnia — o maior mercado de tecnologia do país — tivesse mantido a lei como estava, distribuições Linux e projetos de código aberto teriam que implementar coleta de idade e integração com uma API estatal, algo que vai contra o modelo descentralizado do ecossistema.

A emenda ainda precisa da assinatura de Newsom, mas a votação unânime no Senado e a aprovação na Assembleia indicam que o caminho está praticamente livre. É uma vitória rara e concreta da comunidade open source sobre uma regulamentação bem-intencionada, mas mal desenhada.

> Fonte: [Times of India (TOI Tech Desk)](https://timesofindia.indiatimes.com/technology/tech-news/california-passes-bill-that-wont-require-linux-and-other-open-source-systems-to-follow-the-states-age-verification-law/articleshow/133657420.cms)
