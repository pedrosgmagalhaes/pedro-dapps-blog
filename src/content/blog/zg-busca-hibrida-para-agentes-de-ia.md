---
title: "zg: a ferramenta open-source que une ripgrep, BM25 e busca vetorial para agentes de IA"
description: "O time Qwen da Alibaba liberou o zg (zvec-grep): camada de busca local-first que combina busca exata, lexical e semântica num único índice, com servidor MCP para Claude Code, Codex, Cursor e OpenCode. Em testes dos criadores, cortou mais da metade das chamadas de ferramenta dos agentes."
pubDate: 2026-09-02
tags: ["dev", "ferramentas", "open-source", "ia"]
cover: "/images/news/zg-busca-hibrida-para-agentes-de-ia.jpg"
---

Agentes de programação gastam boa parte do "orçamento" deles procurando coisas. Quando o alvo é um símbolo conhecido, o ripgrep resolve com precisão cirúrgica. Mas quando a tarefa é descrita em linguagem natural — "onde fica a lógica que restaura o tema do app?" — a busca por palavra-chave falha, e o agente começa a chutar termos, ler arquivos inteiros e montar contexto na mão. Cada um desses desvios custa chamadas de ferramenta, tokens e tempo.

Foi para resolver exatamente esse problema que o time **Qwen Developer** (Alibaba) anunciou o **zg** (zvec-grep): uma camada de busca **local-first** e open-source (licença Apache 2.0) que coloca busca semântica, BM25 e ripgrep atrás de **uma única interface** — para humanos e para agentes. O código está no GitHub sob a organização zvec-ai, e o anúncio saiu no perfil oficial @QwenDevs em 2 de setembro.

## Um índice, quatro rotas de busca

O zg indexa o workspace uma vez e depois oferece quatro formas de consultar:

- **Rota híbrida (padrão)**: combina a intenção semântica com âncoras lexicais — o agente descreve o que quer e ancora num termo real;
- **`--fts`**: busca lexical com ranking BM25 para termos exatos;
- **`--vector`**: similaridade conceitual, sem ranking lexical;
- **`--rg`**: correspondência literal ou regex exaustiva — essa não precisa nem de índice, o que importa quando o repositório ainda não foi indexado.

O índice fica em `<root>/.zvec-grep/`, sempre ignorando `.git`, dependências, build e cache. Reindexar é incremental, e cada resultado informa se está `fresh` ou `possibly_stale` — assim o agente pode agir com um resultado "bom o suficiente" sem rodar uma checagem antes.

## A superfície MCP que os agentes enxergam

O comando `zg install` detecta **Codex, Claude Code, Cursor e OpenCode** na máquina e configura sozinho a integração MCP local (servidor Streamable HTTP em `127.0.0.1:7999`, com autenticação bearer opcional).

O detalhe de design mais interessante é a **restrição proposital**: o conjunto padrão de ferramentas expõe apenas **duas** — `zvec_grep_search` (quando a intenção é conhecida mas a string exata não) e `zvec_grep_rg` (quando o símbolo, caminho ou regex é conhecido). O ciclo de vida do índice fica com o CLI, e a documentação é explícita: um agente nunca deve criar, reconstruir ou apagar um índice persistente silenciosamente. Um conjunto completo de seis ferramentas existe, mas é opt-in.

Os resultados voltam agrupados por arquivo, com intervalos de linha, e os previews do código-fonte indexado ficam de fora por padrão — contexto só entra quando pedido.

## Embeddings on-device, sem GPU

Por padrão, tudo roda localmente: o catálogo documenta dez modelos de embedding locais, e o padrão do quickstart (`potion-code-16m-v2`) é um modelo estático Model2Vec de 256 dimensões que **não precisa de GPU**. Opções mais pesadas incluem `jina-embeddings-v2-base-code` e `qwen3-embedding-0.6b`; endpoints remotos da Qwen também existem, mas exigem autorização explícita (`--allow-remote` ou uma concessão assinada via `zg auth grant`).

Os requisitos são modestos: instalação via npm (`@zvec/zvec-grep`), **Node.js 22 ou mais novo**, e funciona em macOS, Linux e Windows.

## Os números que os criadores divulgaram

Os benchmarks vieram no post de lançamento (testes A/B com o mesmo agente, modelo e tarefa, mudando só a adição do zg):

- No **SWE-QA-Bench** (20 questões de repositórios reais): chamadas de ferramenta caíram **mais da metade**, tokens de entrada quase pela metade, e a nota do Judge subiu 1,50 ponto;
- No **BrowseComp-Plus** (80 questões): acurácia foi de 98,67% para 99,00%, com tokens de entrada **-37,56%**, chamadas de ferramenta **-43,52%** e tempo de agente **-38,58%**;
- Indexar o repositório do Django (3.457 arquivos) levou **menos de 30 segundos** num Apple M4 Pro.

Vale o mesmo cuidado de sempre: amostras pequenas e números vindos do próprio time do produto pedem replicação independente — mas a direção é consistente e faz sentido técnico.

## Por que isso importa para quem desenvolve

O zg é didático em dois níveis. No nível do usuário, mostra como **busca híbrida** (exata + lexical + semântica) resolve o problema clássico do agente que não sabe o nome da função que procura. No nível de arquitetura, é um exemplo raro de design contido: ferramentas MCP mínimas, ciclo de vida de índice protegido e contexto entregue sob demanda — exatamente o oposto do "despejar tudo na janela do modelo". Para quem trabalha com agentes de código, vale instalar num repositório real e observar a diferença no comportamento das ferramentas.

> Fonte: [zvec-ai/zvec-grep (GitHub)](https://github.com/zvec-ai/zvec-grep)
