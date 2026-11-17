---
title: "Um clique em qualquer site: o XSS universal que morava no seletor de elementos do uBlock Origin"
description: "Um site malicioso conseguia fazer o uBlock Origin adicionar um filtro confiável de mentira e executar JavaScript em qualquer página que você abrisse. Falha de severidade alta, corrigida na versão 1.75.4 — e encontrada com a ajuda de um modelo de IA."
pubDate: 2026-11-16
tags: ["segurança", "dev", "ciberataques", "ferramentas", "open-source"]
cover: "/images/news/ublock-origin-xss-universal-element-picker.jpg"
---

O **uBlock Origin** é o bloqueador de anúncios que muita gente instala e esquece. Ele tem uma função pouco usada, o **seletor de elementos**: você clica com o botão direito na página, aponta para o que quer esconder e o complemento cria uma regra de bloqueio ali mesmo, sem sair do site. Foi essa conveniência que abriu, até a versão **1.75.2**, uma falha de **severidade alta**: um site malicioso conseguia controlar o seletor por conta própria e convencer o complemento a instalar um filtro arbitrário — e filtros do uBlock podem injetar JavaScript na página.

O relato é de **Smitty van Bodegom**, no blog pessoal [iter.ca](https://iter.ca/post/ubo-uxss/), publicado em **15 de novembro de 2026**. O problema já está corrigido: o aviso de segurança da própria extensão ([GHSA-cmqw-9r2w-6wv2](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2)) classifica a falha como **High**, lista como afetadas as versões **1.75.2 e anteriores** e a corrige na **1.75.4**. Não há CVE registrado até a publicação do aviso. A discussão no [Hacker News](https://news.ycombinator.com/item?id=50513160) estava em **399 pontos e 113 comentários** no fechamento desta edição.

Vale entender o mecanismo, porque ele é um exemplo limpo de como a fronteira de confiança de uma extensão pode ser atravessada de fora para dentro.

## O que exatamente acontecia

O seletor de elementos do uBlock Origin não é uma janela do sistema operacional: é um **iframe** que a extensão injeta na página aberta, apontando para um endereço interno do complemento, algo como `moz-extension://<uuid>/web_accessible_resources/epicker-ui.html`. Esse iframe conversa com o *background* da extensão por mensagens e é assim que ele manda a regra nova.

O atacante não precisa de nada além de uma página web e de um clique. A sequência descrita por Van Bodegom:

1. Descobrir o **UUID interno** da extensão — um valor aleatório por instalação, que deveria ser segredo.
2. Criar um iframe invisível (`opacity: 0`) apontando para o seletor de elementos e dirigir a interface dele por mensagens.
3. Posicionar esse iframe invisível sobre um ponto qualquer da página, para que o clique do usuário caia no botão **"Criar"** do seletor verdadeiro.
4. Injetar um filtro escolhido pelo atacante. Filtros criados pelo seletor são tratados como **confiáveis** — e um filtro confiável pode rodar script.

O passo 3 é o único que o autor não chegou a implementar: no post, ele escreve que não se deu ao trabalho de montar a sobreposição real do iframe.

O passo 1 é a parte mais elegante do ataque, e usa uma função legítima do complemento. O uBlock vem com a regra padrão `lootdest.*##+js(no-fetch-if, adsbygoogle, war:googlesyndication_adsbygoogle.js)`, que intercepta chamadas `fetch` para anúncios e devolve um script falso no lugar. Para montar essa resposta, o próprio gancho faz uma requisição interna para `moz-extension://<uuid>/web_accessible_resources/googlesyndication_adsbygoogle.js`. Como o gancho roda no contexto da página, a página pode interceptar essa requisição e ler o UUID.

> "But the attacker website can itself hook the XHR made from inside the no-fetch-if hook to extract the random extension UUID."
>
> *(Em tradução nossa: "Mas o site atacante pode ele mesmo interceptar o XHR feito de dentro do gancho do no-fetch-if para extrair o UUID aleatório da extensão".)*

Com o UUID na mão, o iframe do seletor passa a ser alcançável, e o resto é conversa entre janelas. O bloqueio que o seletor impõe — não aceitar filtros de script — cai por um detalhe de implementação: o campo `opt`, que deveria dizer apenas o tipo de requisição (como `image`), é concatenado à regra com um `$` na frente. Colocando uma quebra de linha nesse campo, o atacante fecha a regra no meio e emenda um filtro novo: `image\ngoogle.com##+js(trusted-rpnt, script, ...)`.

O resultado é o que dá nome ao problema: um **XSS universal**. Não é preciso comprometer o site alvo, nem achar uma falha nele. A falha mora na extensão: só existe em navegador com o uBlock Origin instalado, não dá para um site explorá-la em quem não tem o complemento — e não há nada a corrigir no lado do site. O script roda na origem de qualquer domínio que a vítima abrir depois — banco, e-mail, rede social — porque quem o injeta é a extensão, que tem permissão para todas as abas.

## A correção

O resumo reproduzido no aviso oficial — escrito pelo repórter, sob o rótulo "As reported" — abre assim:

> "For the Firefox MV2 extension, it's possible for a webpage to iframe the element picker and control it to add arbitrary trusted filters when a user clicks on the webpage, if there's a filter rule with a prevent-xhr or prevent-fetch scriptlet that fulfills the response with a WAR."
>
> *(Em tradução nossa: "Na extensão MV2 do Firefox, é possível que uma página web coloque o seletor de elementos num iframe e o controle para adicionar filtros confiáveis arbitrários quando o usuário clica na página, se houver uma regra de filtro com um scriptlet prevent-xhr ou prevent-fetch que preencha a resposta com um WAR".)*

A versão **1.75.4** passou a exigir uma **senha secreta**: o seletor de elementos de verdade recebe essa senha do *content script* da extensão e a envia na primeira mensagem. Um iframe criado pelo site não tem como saber o valor, então a conversa não começa.

Vale a ressalva de que o aviso aponta a **1.75.4** como a versão corrigida, mas dois commits de endurecimento — "Validate about to be created filter" e "Prevent war:-related filters" — só entraram na **1.76.0**.

Duas ressalvas importantes, do próprio autor: o caso descrito é o da versão **MV2 no Firefox**, mas uma variação "menos problemática" também afetava a versão MV3, o **uBO Lite**; e o ataque depende de o usuário clicar na página — o que, na prática, todo visitante faz.

## A falha foi encontrada por um modelo de IA

Este é o detalhe que faz a história sair do comum. Van Bodegom conta que não garimpou o código sozinho:

> "GPT-5.6 Sol did most of the hard work of finding the issue. I figured there might be some kind of UXSS from filter injection, so I asked it to take a look, and it found the issue. I then checked and verified the issue it proposed. I wrote all of the prose in this post myself; Claude wrote most of the code for the PoC."
>
> *(Em tradução nossa: "O GPT-5.6 Sol fez a maior parte do trabalho duro de encontrar o problema. Eu imaginei que poderia haver algum tipo de UXSS a partir de injeção de filtro, então pedi que ele desse uma olhada, e ele encontrou. Depois eu conferi e verifiquei o problema que ele propôs. Escrevi toda a prosa deste post eu mesmo; o Claude escreveu a maior parte do código da prova de conceito".)*

A hipótese foi humana — "injeção de filtro deve dar XSS" — e a execução, em boa parte, da máquina. Não é o primeiro caso desse tipo a passar por aqui: o [agente que deixou senhas em 1.122 arquivos públicos, espalhados por 1.994 repositórios](/posts/claude-code-dont-ask-again-vaza-segredos/) mostrou o mesmo padrão pela via do dano, e não da descoberta.

A moeda tem o outro lado: o [Mantis, do Google, usa agentes para achar e corrigir falhas em open source](/posts/google-mantis-ia-vulnerabilidades-open-source/), e o [Astra, da OpenAI, já explora falhas sozinho em teste](/posts/openai-astra-limiar-ciberseguranca/).

## O que fica de lição

- **Extensão confiável não é superfície confiável.** O uBlock Origin é um dos complementos mais auditados do ecossistema e ainda assim tinha uma porta de entrada: o canal de mensagens entre uma página interna acessível pela web e o *background* com poderes de injeção.
- **`web_accessible_resources` é uma porta.** Qualquer arquivo listado ali pode ser embutido por um site. Se esse arquivo conversa com o núcleo da extensão, a autenticação da conversa precisa ser explícita — senha, token, `event.source` conferido — e não presumida.
- **Tratar entrada como confiável é o bug.** O campo `opt` vinha da interface do seletor e era concatenado numa regra sem validação de formato. Uma quebra de linha bastou.
- **O modelo MV2 e o MV3 erram de formas diferentes.** O [Chrome já enterrou o Manifest V2](/posts/chrome-remove-manifest-v2-extensoes/); no Firefox ele segue vivo, e é ali que o caso completo apareceu.
- **Atualize o complemento.** A falha está fechada a partir da 1.75.4, e o ideal é a 1.76.0 ou mais nova. Se você usa uBlock Origin no Firefox, confira a versão em `about:addons`.

*Conteúdo educativo — o detalhe técnico serve para entender a classe de falha, não como receita. A versão corrigida é a 1.75.4 ou superior; confira a sua em about:addons.*

---

**Fonte primária:** Smitty van Bodegom, *[Universal XSS in uBlock Origin from website-driven element picker](https://iter.ca/post/ubo-uxss/)*, iter.ca, 15 de novembro de 2026. Aviso oficial do projeto: [GHSA-cmqw-9r2w-6wv2](https://github.com/gorhill/uBlock/security/advisories/GHSA-cmqw-9r2w-6wv2), GitHub Security Advisories (severidade alta; afetadas até 1.75.2; corrigida em 1.75.4; crédito a syvb). Discussão: [Hacker News](https://news.ycombinator.com/item?id=50513160), 16 de novembro de 2026.
