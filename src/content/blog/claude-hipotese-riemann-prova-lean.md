---
title: "Um matemático diz que o Claude provou a hipótese de Riemann: 17,4 milhões de linhas de Lean e nenhuma verificação independente"
description: "Levent Alpöge publicou uma nota de quatro páginas afirmando que ele e o Claude resolveram a hipótese de Riemann e a versão generalizada, com o argumento inteiro formalizado em Lean. O anúncio saiu um dia depois do IPO da Anthropic, ninguém checou por fora ainda — e o próprio autor diz que ainda não domina o que foi escrito."
pubDate: 2026-11-21
tags: ["ia", "matemática", "pesquisa", "anthropic"]
cover: "/images/news/claude-hipotese-riemann-prova-lean.jpg"
---

Na sexta-feira (20), o matemático **Levent Alpöge** publicou uma nota de quatro páginas com uma frase que, se estiver certa, muda a matemática do século: **"I believe I have, working with Claude, discovered a proof of the Riemann Hypothesis."** Segundo ele, o método vai além e resolve também a **hipótese de Riemann generalizada** (GRH), com o argumento inteiro formalizado no assistente de provas **Lean**, sem suposições extras. Na prática, a versão generalizada faz a mesma pergunta da zeta para uma família inteira de funções — as **funções L** — e afirma que a hipótese vale para todas elas.

A nota não é um paper, não passou por revisão e não foi checada por ninguém de fora até agora. Ela é o começo de uma conversa, não o fim — e a conversa é tão interessante quanto a afirmação.

## O que a hipótese diz

A hipótese de Riemann, formulada em **1859**, trata de onde ficam os zeros da **função zeta**. Traduzindo para o que importa: ela descreve o quão regularmente os **números primos** aparecem. Desde 1896 sabemos que a quantidade de primos até um número *n* se aproxima de *n*/ln(*n*) — o Teorema dos Números Primos. O que a hipótese controla é o **tamanho do erro** dessa aproximação: ela afirma que os zeros não triviais da zeta ficam todos sobre a reta crítica, e disso decorre que o desvio em relação a *n*/ln(*n*) nunca passa de uma certa ordem.

É o problema clássico da teoria dos números. David Hilbert teria dito que, se acordasse depois de mil anos, sua primeira pergunta seria se a hipótese já tinha sido provada. Ela é um dos **Problemas do Milênio** do Clay Mathematics Institute, com prêmio de **US$ 1 milhão** — e 167 anos de tentativas humanas.

## O que foi publicado

O documento é curto e, em vários trechos, assume um tom que não é o de um paper. Alpöge descreve meses de trabalho com o Claude e diz que o modelo avançou muito mais rápido do que ele perto do fim:

> "I had us on the line of combining two quite different ideas present in a toy setting (...) I guided us to the right situation analogous to that toy setting, and then Claude began to leave me in awe."
>
> *(Em tradução nossa: "Eu nos coloquei na linha de combinar duas ideias bem diferentes presentes num cenário de brinquedo (...) Eu guiei até a situação certa, análoga àquele cenário, e então o Claude começou a me deixar em estado de choque".)*

> "Claude flew, and danced, and sparkled near that finish line."
>
> *(Em tradução nossa: "O Claude voou, dançou e brilhou perto daquela linha de chegada".)*

A linha do tempo que ele atribui ao Claude começa em **6 de outubro**, com o determinante de Stepanov, e termina em **16 de novembro**, com a GRH. O argumento, diz ele, está pronto mas é gigantesco, e ele optou por não publicar um texto legível: **"It being obviously inappropriate to attempt to post some massive unreadable travesty of 'slop', I decided to only present Lean."** A nota traz links para **14 partes** de um arquivo `.tar.gz` com a formalização.

O tamanho real da coisa foi medido por quem abriu o arquivo: o cientista da computação **Scott Aaronson**, da Universidade do Texas em Austin, escreveu no blog no mesmo dia que são **17,4 milhões de linhas de código Lean**.

## O que o Lean garante — e o que não garante

Lean é um **assistente de provas**: você escreve a demonstração num formato que um programa pequeno, o *kernel*, confere passo a passo. Se o arquivo compila com os axiomas padrão, a afirmação formal segue daqueles axiomas. Não é opinião de revisor, é execução de regra.

Isso resolve um problema e deixa outros três de pé.

O que ele resolve é o mais famoso: a prova "no quadro" que ninguém consegue checar inteira. Com o certificado, um erro de conta em qualquer ponto de milhões de linhas de argumento derruba a compilação.

O que ele não resolve começa pelo **enunciado**. O Lean verifica que aquele teorema segue daquele enunciado — não que aquele enunciado é a hipótese de Riemann como os matemáticos a entendem. Depois vem a **confiança na ferramenta**: o kernel do Lean já teve bugs que permitiram provar `0 = 1`, e a solidez da teoria de tipos por baixo é discutida. E, por último, o que nenhuma máquina entrega: **entender** o argumento. Um certificado de 17 milhões de linhas não ensina a ninguém por que a prova funciona.

Aaronson foi explícito sobre os dois lados:

> "In my view, these issues can and should urgently be fixed! Until they are, a sufficiently motivated AI could almost certainly exploit them to prove a false statement! All the same, I see zero indications that that's happening right now."
>
> *(Em tradução nossa: "Na minha visão, esses problemas podem e devem ser corrigidos com urgência! Até que sejam, uma IA suficientemente motivada quase certamente conseguiria explorá-los para provar uma afirmação falsa! Ainda assim, não vejo nenhum indício de que isso esteja acontecendo agora".)*

> "So I'm not 100% sure, but my bet is that the proof will stand."
>
> *(Em tradução nossa: "Então não estou 100% certo, mas minha aposta é que a prova vai se sustentar".)*

Ele também registra um dado que pesa a favor: até hoje, **nenhum resultado de IA com certificado Lean precisou ser retirado**, enquanto vários sem certificado precisaram.

## O timing, que o próprio autor chamou de horrível

Alpöge diz que o resultado saiu no domingo à noite, **15 de novembro**, e que escreveu para o CEO da Anthropic, **Dario Amodei**, perguntando sobre a possibilidade de anunciar. Diz que consultou a liderança da empresa e que **"there was a constraint to respect"** — em tradução nossa, "havia uma restrição a respeitar" —, sem explicar qual. A nota saiu na **sexta, 20 de novembro** — um dia depois de a Anthropic estrear na Nasdaq, em 19/11, captando **US$ 81,34 bilhões** (o blog acompanhou a expectativa do IPO [em agosto](/posts/anthropic-ipo-2-trilhoes/)).

O autor antecipou a leitura cínica:

> "The precise timing is horrible. If I could have, I'd have finished this all much earlier."
>
> *(Em tradução nossa: "O momento exato é horrível. Se eu pudesse, teria terminado tudo isso muito antes".)*

Ele nega que o atraso tenha sido para favorecer a empresa, mas não diz explicitamente o que causou a espera — e essa lacuna, num dia de IPO, virou parte da história.

## O ano em que a matemática virou disputa de prioridade

O episódio não acontece no vácuo. Em setembro, a OpenAI afirmou ter resolvido **Navier-Stokes**, outro Problema do Milênio, enquanto Alpöge e o matemático **Tristan Buckmaster** trabalhavam em equações relacionadas — o que gerou disputa sobre quem chegou primeiro. Em outubro, a OpenAI publicou **722 manuscritos** gerados por um modelo não lançado, agrupados em **372 famílias** de resultados; só **162** tinham resultado principal checado em Lean, e matemáticos pediram evidência melhor em vez de aceitar o volume.

Também em outubro, a **Quanta** publicou o resultado da OpenAI que ficou conhecido como "quase-hipótese de Riemann": os zeros não triviais ficam na faixa entre **1/8 e 7/8**, ou seja, a no máximo **3/8** da reta crítica — perto, mas não em cima dela. É esse resultado que dá contexto ao salto agora anunciado.

No mesmo dia, apareceu uma segunda alegação de prova da GRH: a de **Alessandro Maria Masullo**, toda humana, sem IA, publicada pelo matemático **Ravi Vakil** no blog do curso dele — com a ressalva de que **Brian Conrad** vinha acompanhando o trabalho havia meses — e, oito horas depois, atualizada por Vakil para registrar que colegas já apontavam problemas no texto, encontrados com ajuda de modelos de IA. O item estava com **2.155 pontos** no Hacker News.

O medo que circula nos departamentos tem nome: alguns falam em **"mathocalypse"**, a ideia de que as IAs resolvem os problemas cobiçados antes que os humanos aprendam algo no caminho. O matemático **Daniel Litt**, de Toronto, disse à Decrypt que, sem adaptação, **"there's just no more math in 50 years"** — em tradução nossa, "simplesmente não existe mais matemática em 50 anos". Buckmaster, num painel no MIT nesta semana, argumentou que a matemática continua exigindo compreensão humana.

## O que ainda não se sabe

- **Nenhuma das duas alegações tem verificação independente até agora.** O arquivo Lean existe; ser baixável não é o mesmo que ser aceito.
- **O prêmio do Clay não está em jogo no curto prazo.** Pelas regras do instituto, a solução precisa ser publicada num veículo qualificado, sobreviver a **pelo menos dois anos de escrutínio** e obter aceitação geral.
- **O próprio autor diz que ainda não domina o argumento.** Ele afirma que fez escolhas "estranhas e subótimas" e espera simplificações rápidas — mas não teve tempo de procurá-las.
- **Não se sabe** se o arquivo compila num Lean conhecido, com apenas axiomas padrão, nem se o enunciado formal corresponde exatamente à hipótese como ela é formulada pelos matemáticos. Essa é a checagem que a comunidade deve fazer primeiro.
- Não há comunicado da Anthropic sobre o resultado na página de notícias da empresa até a publicação desta nota.

Se a prova se sustentar, o marco não é "uma IA resolveu um problema difícil". É que, pela primeira vez, o resultado de um problema aberto de 167 anos chega na forma de **um artefato que uma máquina pode conferir** — e que nenhum humano consegue ler inteiro. A matemática ganhou um jeito novo de estar certa, e ainda não sabe o que fazer com ele.

---

**Fonte primária:** [Levent Alpöge — nota sobre a prova da hipótese de Riemann](https://alpo.ge/remark.pdf) (20/11/2026), com os 14 volumes da formalização em Lean. Reações: [Scott Aaronson — "The stochastic parrots have apparently proved the Riemann Hypothesis"](https://scottaaronson.blog/?p=10344) (20/11/2026) e [Terence Tao — nota sobre os resultados de 20/11](https://terrytao.wordpress.com/2026/11/20/unforced-euler-singularity-unforced-navier-stokes-singularity-and-the-generalized-riemann-hypothesis/) (20/11/2026). Outra alegação do mesmo dia: [Ravi Vakil — "Hurried Announcement: Alessandro Masullo GRH"](https://math216.wordpress.com/2026/11/20/hurried-announcement-alessandro-masullo-grh/) (20/11/2026, atualizado). Contexto: [Quanta — "AI proved the quasi-Riemann hypothesis. What happens now?"](https://www.quantamagazine.org/ai-proved-the-quasi-riemann-hypothesis-what-happens-now-20261019/) (19/10/2026) e [Decrypt — "Claude Claims Historic Math Breakthrough One Day After Anthropic IPO"](https://decrypt.co/383747/claude-historic-math-breakthrough-anthropic-ipo) (20/11/2026).
