---
title: "Google libera Mantis: framework open-source que usa agentes de IA para achar, reproduzir e corrigir vulnerabilidades"
description: "O Mantis, anunciado no Google Cloud Blog, combina múltiplos agentes de IA para caçar bugs em código aberto com menos falsos positivos e promete cortar em mais de 85% o custo de tokens da análise."
pubDate: 2026-09-02
tags: ["programação", "dev", "segurança", "open-source"]
cover: "/images/news/google-mantis-ia-vulnerabilidades-open-source.jpg"
---

No dia 2 de setembro, o Google publicou um artigo detalhando o **Mantis**, um framework open-source que usa IA para **descobrir vulnerabilidades de software e levar o processo até o fim**: estreitar candidatos, reproduzir o problema e até gerar o código da correção. A ideia nasce de uma observação simples — modelos de IA já são bons em *escrever* código e estão ficando bons em *quebrar* código: segundo o Google, eles já conseguem descobrir e explorar falhas com pouca ou nenhuma ajuda humana. O Mantis é a tentativa de usar essa mesma capacidade no **lado da defesa**.

## O problema dos falsos positivos

Deixar uma IA ler o código e listar possíveis problemas parece fácil — mas não é confiável. O Google aponta que, em varreduras sem critério, a **taxa de verdadeiros positivos pode ficar abaixo de 7%**: a maioria dos apontamentos é "alucinação" da IA, problemas que não existem de verdade. Se o modelo devolve milhares de candidatos e um humano precisa checar cada um, o tiro sai pela culatra e sobrecarrega o time de segurança.

A solução do Mantis é um **pipeline com múltiplos agentes que se verificam entre si**:

1. um agente **descobre** possíveis vulnerabilidades no código;
2. agentes de **revisão e crítica** confirmam em quais condições o problema realmente ocorre;
3. a falha é **reproduzida em um sandbox isolado**;
4. só depois da confirmação prática, o fluxo parte para a **geração do código corretivo**.

## Contexto que a IA constrói sozinha

Antes de analisar, o Mantis examina o **histórico de mudanças do repositório** para aprender com vulnerabilidades já corrigidas e problemas de segurança anteriores. Ele também lê a estrutura do código e **monta automaticamente documentos como um threat model** (modelo de ameaças), que resume os possíveis pontos de ataque e o que precisa ser protegido — útil até em projetos onde os devs nunca escreveram esse tipo de documentação.

Há ainda uma sacada de engenharia para lidar com repositórios grandes. Em vez de despejar o código inteiro no contexto do modelo, o Mantis cria um **resumo hierárquico de segurança**: agrega as informações arquivo a arquivo no nível de diretório e depois combina tudo em um resumo do repositório. A IA enxerga o panorama geral pelo resumo e só abre o código detalhado onde é necessário — segundo o Google, isso **reduziu o custo de tokens em mais de 85%** sem perder informação estrutural importante.

## Como usar e o que o Google alerta

O Mantis funciona com ferramentas como o **Gemini CLI** e o **Antigravity CLI**: você aponta onde está o framework (no GitHub) e qual código quer investigar. Também existe o **mantis-advise**, que usa falhas e correções anteriores para dar conselhos durante o desenvolvimento — prevenção em vez de remediação.

O próprio Google faz questão de avisar: relatórios e patches gerados por IA **nem sempre são precisos** e precisam de verificação manual de especialistas; o código gerado deve rodar **isolado de sistemas de produção e redes internas**. E, para extrair o melhor da detecção automática, a recomendação é dupla: dar à IA **informação de contexto boa** (como o conhecimento que os devs têm do projeto) e montar um **sandbox seguro com critérios claros** para identificar vulnerabilidades.

## O que observar

O Mantis entra na mesma corrida que o blog vem acompanhando do outro lado do balcão: modelos que [atingem limiares críticos de cibersegurança](/posts/openai-astra-limiar-ciberseguranca/) e [famílias de IAs ofensivas e defensivas](/posts/crowdstrike-safemind-ia-seguranca/). A novidade aqui é a direção: em vez de só achar falhas, o framework **automatiza o ciclo completo — achar, provar e corrigir** — com um desenho de múltiplos agentes que ataca o maior problema prático da área, o excesso de falsos positivos. Para um dev, é também um ótimo estudo de caso de como orquestrar agentes com papéis distintos (descoberta, revisão, reprodução) em vez de um único modelo "faz-tudo".

> Fonte: [Google Cloud Blog — Getting started with the Mantis harness to find and fix bugs](https://cloud.google.com/blog/products/identity-security/getting-started-with-the-mantis-harness-to-find-and-fix-bugs)
