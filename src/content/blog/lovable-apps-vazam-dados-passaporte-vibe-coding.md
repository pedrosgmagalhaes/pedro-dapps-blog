---
title: "Lovable: 24.664 apps feitos com IA entregavam dados do banco sem pedir login — e havia número de passaporte"
description: "Pesquisadores analisaram 159.041 projetos criados no Lovable e acharam dados pessoais acessíveis sem senha: perfis completos, mensagens de chat, contratos e mais de mil registros com número de passaporte. O erro não é da IA — é de permissão de banco de dados."
pubDate: 2026-11-15
tags: ["ia", "segurança", "dev", "programação"]
cover: "/images/news/lovable-apps-vazam-dados-passaporte-vibe-coding.jpg"
---

A promessa do *vibe coding* é simples: descreva o app em português, a IA escreve o código, você publica. Um estudo dos pesquisadores da **Crissyfield**, em parceria com o jornal alemão **Handelsblatt** — que publicou a reportagem primeiro, em **2 de novembro** —, mostra o que essa promessa deixa de fora: dos **159.041 projetos** criados no **Lovable** que eles analisaram, **24.664** entregavam registros do banco de dados para qualquer visitante, sem login.

Em parte desses apps havia coisa séria. O caso mais grave que o relatório descreve: um prestador de serviço expôs **mais de 1.000 registros com dados de documento de identidade** — número de passaporte, data de validade e nacionalidade. É material pronto para fraude de identidade.

O resumo dos próprios autores abre assim:

> "AI makes it easier to build your own web applications, but handling sensitive data still requires special care."

*(Em tradução nossa: "A IA facilita construir seus próprios aplicativos web, mas lidar com dados sensíveis continua exigindo cuidado especial".)*

O estudo viralizou só agora: o envio no **Hacker News** é de **14 de novembro** e passou de **1.000 pontos** e **377 comentários**. O relatório em inglês, segundo a própria nota no fim da página, traz "análise mais recente e números atualizados" em relação à reportagem alemã, publicada em 2 de novembro.

## Como o estudo foi feito

Os pesquisadores usaram o **Common Crawl**, arquivo público da web, para localizar projetos Lovable criados entre **dezembro de 2025 e setembro de 2026**. Depois, separaram os que usavam o **Supabase** como banco de dados — **34.545** do total —, porque essa integração é a mais fácil de analisar e, segundo eles, a mais usada nos projetos da plataforma.

A análise teve duas etapas:

1. **O que o site entrega sozinho.** Observaram quais registros saíam do banco já no carregamento da página, sem login e sem nenhuma interação. Foram **24.664 sites** nessa situação — e os autores fazem questão de dizer que isso, por si só, **não é falha**: o dado pode estar ali de propósito, para exibição pública.
2. **O que sai se alguém pedir mais.** Com a mesma chave de API que o site já expunha, fizeram novas requisições **somente de leitura** e viram quanto mais vinha. Encontraram endereços de e-mail em **10.560 tabelas** espalhadas por **7.403** desses 24.664 sites — **30%**.

O estudo não examinou o recurso de banco nativo da Lovable, lançado no fim de 2025, e avisa que "similar misconfigurations may occur there too" (em tradução nossa: "misconfigurações parecidas podem ocorrer lá também"). O foco foi a integração com o Supabase.

## O que estava aberto

Além do caso dos passaportes, o relatório lista:

- um fórum alemão de estilo de vida com **mais de 80 mil perfis** (nome completo, e-mail, data de nascimento e gênero) e **mais de 200 mil mensagens de chat** acessíveis;
- organizadores de eventos e restaurantes com **dezenas de milhares de registros** de venda de ingresso e de comida — e-mail, telefone, endereço, dados de pagamento e código de ingresso;
- uma empresa de gestão de imóveis que expunha **resumos de e-mails internos gerados por IA**, com informação sensível sobre inquilinos, proprietários e parceiros;
- dezenas de milhares de **contratos**, **faturas**, **álbuns de fotos pessoais** e **conversas internas de WhatsApp**;
- um fornecedor com **280 mil e-mails** enviados aos próprios clientes, legíveis.

Segundo o relatório, dados assim podem alimentar phishing, fraude de ingresso e roubo de identidade. Os autores afirmam que **não conseguiram determinar se algo foi de fato usado indevidamente** — e que baixaram apenas parte dos conjuntos de dados, em vez de tudo, então os números são um piso. Também não publicaram o caminho para chegar aos registros.

## Por que isso acontece (e não é culpa da IA)

Vale entender o mecanismo, porque ele aparece em app feito à mão também.

Quando um projeto usa **Supabase**, o front-end precisa de uma chave pública para conversar com o banco — ela vai embutida no JavaScript que o navegador baixa, e isso é esperado. Quem decide o que essa chave alcança é outra camada: no Postgres, as **políticas de acesso por linha** (Row Level Security, RLS), que dizem, linha por linha, quem pode ler e escrever o quê. Com RLS configurado, a chave pública só enxerga o que a política libera. Sem RLS, ou com uma política permissiva demais, a chave pública vira a chave de tudo — e o banco responde a qualquer um que saiba pedir.

É exatamente o tipo de ajuste que uma ferramenta que gera código por descrição não faz sozinha, porque a instrução do usuário raramente inclui "só o dono do registro pode ler este registro". O app funciona, o dado aparece na tela — e o dado também aparece para quem não devia.

Os autores evitam culpar a ferramenta:

> "Access control mistakes can happen in any application, whether written by people or built with AI."

*(Em tradução nossa: "Erros de controle de acesso podem acontecer em qualquer aplicativo, tenha ele sido escrito por pessoas ou construído com IA".)*

O que eles destacam como específico da plataforma é o **padrão repetido**: como as integrações seguem receitas parecidas, uma abordagem que funciona contra um app tende a funcionar contra vários com pouco esforço extra. E quem constrói sem background técnico tem mais dificuldade de perceber o problema antes de o app ir ao ar.

## O que os 30% não significam

Essa é a parte que costuma sumir na viralização, e os pesquisadores a escrevem com clareza: achar e-mail em 10.560 tabelas **não prova vazamento em 30% dos apps**. Um endereço de e-mail pode ser contato público ou dado de teste; ao mesmo tempo, uma tabela com dado pessoal e sem e-mail nenhum escapa da contagem. Os dois efeitos se compensam em parte, e eles dizem não saber em que medida. A amostra vem do Common Crawl e **não é representativa** de todos os aplicativos feitos no Lovable.

O que sobra de sólido é o que eles viram com os próprios olhos nos registros que baixaram: passaporte, perfil, contrato, conversa.

## A lacuna entre o marketing e o contrato

O relatório também aponta uma distância que interessa a quem contrata a ferramenta. A Lovable é uma startup sueca fundada em **Estocolmo, em 2023**, por **Anton Osika e Fabian Hedin**, que cresceu a partir do projeto open-source **GPT Engineer** e foi rebatizada no fim de **2024** e aberta ao público em **novembro**.

No material de divulgação, a empresa repete que **não é preciso conhecimento técnico** para construir. Nos Termos de Uso, a responsabilidade pelo aplicativo e pelo tratamento dos dados fica com **o cliente**. Para os pesquisadores, aí está o problema: um serviço fácil e tudo-em-um pode dar a impressão de que a segurança também está resolvida.

A Handelsblatt procurou a Lovable com os achados. Este texto não localizou comunicado público da empresa sobre o caso.

## Se você tem um app assim no ar

As recomendações do relatório são diretas:

> "An easy-to-use development platform does not remove the need for an expert review of access permissions before an application handles confidential data."

*(Em tradução nossa: "Uma plataforma de desenvolvimento fácil de usar não dispensa a revisão, por um especialista, das permissões de acesso, antes de o aplicativo lidar com dados confidenciais".)*

Na prática: revisar as políticas de acesso, as interfaces e a separação entre contas de usuário **antes** de o app receber dado real de cliente; repetir a revisão depois de qualquer mudança relevante; e não confiar que uma verificação automática resolve — os autores são explícitos de que ela "is no substitute for a professional security assessment" (em tradução nossa: "não substitui uma avaliação de segurança profissional"). Se não houver essa competência dentro de casa, o caminho é contratar quem tenha.

O mesmo raciocínio vale para o resto da pilha de quem usa agente de IA no dia a dia. Já apareceu aqui no blog em duas versões: a [configuração padrão que dava root a qualquer processo](/posts/omarchy-escalada-root-docker/) e o [agente que grava sua senha no repositório](/posts/claude-code-dont-ask-again-vaza-segredos/). Nos três casos, o código funcionou — e o padrão inseguro passou junto.

Gerar app com IA não é o problema. Publicar sem revisar quem pode ler o quê é.

*Conteúdo educativo — o mecanismo aqui serve para entender a classe de falha, não como receita. Se você publica app com Supabase, revise as políticas de RLS e a separação entre contas antes de o banco receber dado real de cliente.*

---

**Fonte primária:** Crissyfield, *[Lovable: Many Apps Built on the Platform Expose Sensitive Data](https://www.crissyfield.de/research/lovable-en/)* (2026; versão em inglês com números atualizados), em parceria com o Handelsblatt. Reportagem original: Lina Knees, *[Lovable: Experten finden Datenlücke bei beliebter KI-Coding-Plattform](https://www.handelsblatt.com/technik/ki/lovable-experten-finden-datenluecke-bei-beliebter-ki-coding-plattform/100264923.html)*, Handelsblatt, 2 de novembro de 2026. Discussão: [Hacker News](https://news.ycombinator.com/item?id=50499017), 14 de novembro de 2026.
