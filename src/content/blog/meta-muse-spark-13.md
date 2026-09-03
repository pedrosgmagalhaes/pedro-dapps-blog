---
title: "Meta lança Muse Spark 1.3: codar com 25% menos tokens e agentes que pedem ajuda quando travam"
description: "O novo modelo flagship da Meta chega ao Muse Code e à Meta Model API com foco em tarefas agentivas de longo prazo: 20% menos chamadas de ferramentas, 25% menos tokens e melhor calibração antes de ações irreversíveis."
pubDate: 2026-09-02
tags: ["ia", "programação", "dev", "ferramentas"]
cover: "/images/news/meta-muse-spark-13.jpg"
---

A Meta liberou nesta terça-feira (2) o **Muse Spark 1.3**, a nova versão do seu modelo principal, já disponível no **Muse Code** e na **Meta Model API**. O lançamento é uma resposta direta ao que a empresa aprendeu com meses de adoção das ferramentas: em vez de apenas empilhar benchmarks, a atualização ataca a **usabilidade em tarefas reais** — especialmente fluxos de programação e trabalhos longos conduzidos por agentes.

## O que mudou na prática

Nos testes internos da Meta, o Muse Spark 1.3 usa **cerca de 20% menos chamadas de ferramentas** e **25% menos tokens** que o Muse Spark 1.2 para concluir as mesmas tarefas de codificação. Ele também é menos verboso e escreve em um estilo de código mais limpo, dispensando turnos desnecessários.

No lado agentivo, o modelo foi treinado para sustentar trabalhos de horizonte mais longo: quando recebe um objetivo aberto, ele usa ferramentas para gerar o próprio contexto a partir de fontes confusas e conflitantes, corrige lacunas no plano e registra o que aprendeu até entregar o resultado final. Entre as mudanças mais notáveis:

- **Pergunta quando o pedido é ambíguo** e invoca a ajuda do usuário quando trava, em vez de alucinar uma saída;
- **Confirma antes de ações consequentes** — e tem melhor calibração sobre o que conta como ação irreversível em tarefas agentivas complexas;
- **Gerencia múltiplas tarefas em uma única thread longa**, mapeando prompts novos para a tarefa certa mesmo quando o usuário interrompe ou muda de assunto;
- Segue instruções longas e detalhadas com mais fidelidade, sem largar restrições no meio do caminho.

## Os modos de raciocínio

Os modos de raciocínio já disponíveis nos modelos anteriores continuam valendo no Spark 1.3. O modo **max reasoning** — o mais profundo — chega "em breve", segundo a Meta, depois que a empresa terminar testes adicionais de segurança.

## Segurança e o que vem depois

A Meta diz que reforçou a segurança nas frentes mais relevantes para uso agentivo: o modelo tem **resistência adversarial mais forte**, incluindo maior proteção contra *prompt injection*, e demonstra mais critério antes de executar ações de alto impacto.

No roadmap, a empresa adianta duas novidades: **modelos maiores** e a versão de **pesos abertos do Muse Spark**.

## Por que isso importa para devs

O recado do lançamento é claro: a briga agora é por **custo por tarefa concluída**, não só por acerto em benchmark. Gastar 25% menos tokens e errar menos o caminho (menos chamadas de ferramentas, menos idas e vindas) muda a conta de quem roda agentes de codificação em escala — e a Meta já deixou o preço da API inalterado. Para quem programa com IA, a métrica que vale acompanhar não é "qual modelo gabarita a prova", e sim **quantos tokens (e quanta supervisão) cada modelo consome para entregar a mesma feature**.

> Fonte: [Meta AI — Introducing Muse Spark 1.3](https://research.meta.ai/blog/introducing-muse-spark-1-3)
