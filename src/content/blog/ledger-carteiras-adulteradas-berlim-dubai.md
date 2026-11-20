---
title: "Carteira física também pode chegar adulterada: Ledger confirma aparelhos mexidos em Berlim e investiga dois em Dubai"
description: "A investigação da Ledger sobre implantes físicos em carteiras de hardware chegou à Europa: aparelhos comprados em Berlim estão no mesmo caso do Sudeste Asiático, e dois suspeitos em Dubai ainda são verificados. O grupo criminoso capturava a frase-semente durante a configuração — a falha não está no chip, está no caminho até a sua mão."
pubDate: 2026-11-20
tags: ["blockchain", "segurança", "cripto", "autocustódia", "ledger"]
cover: "/images/news/ledger-carteiras-adulteradas-berlim-dubai.jpg"
---

Uma carteira de hardware existe para resolver um problema específico: manter a chave privada fora do computador e do celular, onde malware pode lê-la. O que a investigação da Ledger está mostrando desde outubro é que **o aparelho pode ser adulterado antes de chegar na mão do dono** — e, nesse caso, a chave sai pelo caminho mais curto possível, a própria tela do aparelho.

Na atualização da investigação de 18 de novembro — revista em 19/11 —, a empresa confirmou **aparelhos fisicamente modificados em Berlim, na Alemanha**, e informou que investiga **dois aparelhos suspeitos em Dubai**, nos Emirados Árabes Unidos; a imprensa noticiou nesta sexta-feira (20). É a primeira confirmação da fabricante fora do Sudeste Asiático — a região onde o caso começou, em outubro.

## O que aconteceu

O modus operandi descrito pela própria Ledger é de operação longa e cara. Segundo a empresa, um **grupo criminoso organizado** comprou aparelhos genuínos ao longo de vários meses, abriu cada um, instalou **componentes escondidos projetados para capturar a frase-semente durante a configuração** e devolveu os produtos à cadeia de distribuição, por meio de revendedores no Sudeste Asiático. O grupo montou servidores próprios para coletar as seeds e uma estrutura de drenagem e lavagem dos fundos.

A investigação começou em outubro, depois que clientes que compraram de um revendedor regional — o **CryptoBilis** — relataram saques não autorizados. Em **28 de outubro**, a **polícia de Singapura** publicou um aviso próprio: desde **10 de setembro**, pelo menos **dois casos** foram registrados no país, com perdas somando cerca de **3,5 milhões de dólares de Singapura**, e os aparelhos vinham de **lojas de varejo locais**.

## Não é uma falha de software

A diferença entre este caso e o de uma carteira com firmware quebrado é o ponto central — e a Ledger faz questão de separar os dois:

> "There was no flaw in Ledger's chip, operating system or servers. Ledger's systems were not compromised. This was an attack on the distribution channel after the devices left our control."
>
> *(Em tradução nossa: "Não havia falha no chip, no sistema operacional ou nos servidores da Ledger. Os sistemas da Ledger não foram comprometidos. Foi um ataque ao canal de distribuição, depois que os aparelhos saíram do nosso controle".)*

A empresa repete a mesma formulação na atualização desta semana, agora referindo-se aos aparelhos da Europa e de Dubai:

> "There is no flaw in Ledger's secure chip or operating system, and no confirmed case involving a device bought on ledger.com."
>
> *(Em tradução nossa: "Não há falha no chip seguro nem no sistema operacional da Ledger, e nenhum caso confirmado envolvendo aparelho comprado no ledger.com".)*

Vale tratar essa segunda frase pelo que ela é: **declaração da fabricante**, não resultado de auditoria independente. Ainda assim, o contraste com o caso Coldcard, de agosto, ajuda a entender o que está em jogo aqui — [lá era o firmware que gerava a seed de forma previsível](/posts/coldcard-ia-roubo-bitcoin/), e o conserto veio por atualização. Aqui, **não há o que atualizar**: o componente malicioso é físico e fica **fora** do elemento seguro.

## Os números que já dá para fechar

| O que | Quanto | Fonte |
|---|---|---|
| Caso de outubro (Sudeste Asiático) | **US$ 102 milhões** em **335 carteiras** | Bitquery |
| Saques entre 14 e 16 de novembro | **US$ 1,68 milhão** em **16 carteiras** | Bitquery |
| Carteiras drenadas cujos donos não denunciaram | **11 carteiras, US$ 759 mil** | Bitquery |
| Enviado ao Tornado Cash em 16 de novembro | **922 ETH** | Bitquery |
| Dubai: dois compradores | **US$ 604 mil** (1.300 SOL + 507.672 USDT) | Bitquery |
| Berlim: um comprador | **US$ 320 mil** (4,72 BTC + 11 mil USDT) | Bitquery |
| Singapura | **S$ 3,5 milhões** desde 10/09 | Polícia de Singapura |

Os dois compradores de Dubai dizem ter comprado os aparelhos na **Virgin Megastore** do Dubai Mall — um **Ledger Flex** e um **Ledger Stax**, este adquirido em **11 de outubro**, dois dias depois do roubo atribuído ao CryptoBilis. O comprador de Berlim diz que o **Ledger Flex** saiu de uma loja **MediaMarkt**.

## Por que o teste de autenticidade não pega

O **Genuine Check**, recurso que confirma se o aparelho é original, **não resolve este ataque**. A documentação de segurança da própria Ledger, citada pela reportagem da crypto.news, explica o motivo: o teste autentica o **elemento seguro** original, mas **não identifica necessariamente modificações físicas não autorizadas** quando esse componente continua intacto. Em outras palavras, o aparelho pode passar no teste e continuar adulterado.

O elo que falta — e a Bitquery é explícita sobre isso — é técnico:

> "We cannot see inside the devices, so we cannot say how the thief got the seed phrases."
>
> *(Em tradução nossa: "Não conseguimos ver dentro dos aparelhos, então não podemos dizer como o ladrão obteve as frases-semente".)*

O que os investigadores têm é a ligação on-chain: **um endereço TRON** usado no caso de outubro pagou as taxas de rede de duas das carteiras drenadas em novembro, no mesmo instante do saque.

## O que fazer se o aparelho veio de loja, marketplace ou revendedor

As orientações da Ledger e da polícia de Singapura convergem em cinco pontos:

- **Não abra o aparelho** nem tente "verificar por dentro".
- **Não use um aparelho suspeito** para criar carteira nova ou restaurar uma existente.
- Se você já usou, **mova o que sobrou para uma carteira nova**, com **frase-semente nova gerada em um aparelho comprado direto da fabricante**.
- **Nunca reaproveite** a seed ou a passphrase antiga — elas já circulam fora do seu controle.
- Desconfie de qualquer contato que peça as **24 palavras**. A Ledger afirma que **nunca** pede a frase de recuperação, e o suporte oficial é o único canal legítimo.

Quem comprou em **Berlim a partir de janeiro de 2026** foi orientado a procurar o suporte por precaução. Para Dubai, a empresa ainda levantava com os distribuidores locais como as unidades suspeitas entraram em circulação. Por tempo limitado, a Ledger também está oferecendo **inspeção física com raio-X** na fábrica de **Vierzon, na França**, mediante abertura de ticket no suporte oficial.

## O que mudou na venda

A empresa endureceu as regras da rede autorizada, com efeito imediato:

- aparelhos **não ficam mais em prateleira ou expositor** — o estoque fica no fundo da loja e é entregue no momento da compra;
- **aparelho devolvido nunca é revendido**, mesmo que pareça novo e lacrado;
- revendedores precisam avisar a Ledger rapidamente sobre qualquer relato de produto estranho.

O movimento não é isolado. A concorrente **Trezor** reduziu sua rede de revendedores em cerca de **80%** depois de identificar componentes não autorizados em **três Trezor Safe 5** comprados pelo mesmo CryptoBilis entre agosto e setembro.

## O que ainda não se sabe

A Ledger prometeu uma **divulgação técnica mais completa** — e ainda não publicou. Até lá, não se sabe como o implante se comporta, se é possível detectá-lo sem raio-X nem se uma atualização de firmware teria algum efeito sobre ele. O laboratório de segurança da empresa, o **Ledger Donjon**, segue examinando os aparelhos suspeitos. Nenhuma auditoria independente foi divulgada até agora.

Nem todo roubo de cripto passa por uma falha de código. Às vezes, o ataque começa na prateleira da loja — e o alvo é a única coisa que nenhum patch recupera: as palavras que você leu na tela.

*Conteúdo educativo — o mecanismo aqui serve para reconhecer a fraude, não como receita. Se o aparelho veio de loja ou revendedor e você tem dúvida, não o use: gere uma seed nova em aparelho comprado direto da fabricante.*

---

**Fonte primária:** [Ledger — resposta ao ataque de implante de hardware](https://www.ledger.com/blog-response-hardware-implant-attack) (15/10/2026), [atualização da investigação no suporte da Ledger](https://support.ledger.com/article/Update-on-the-Hardware-Implant-Incident-Investigation) (18/11/2026, atualizada em 19/11), [Singapore Police Force — aviso sobre carteiras adulteradas](https://www.police.gov.sg/Media-Hub/News/2026/10/20261028_police_advisory_on_tampered_cryptocurrency_hardware_wallets) (28/10/2026) e [Bitquery — investigação on-chain](https://www.bitquery.io/investigations/ledger-hack-dubai-berlin) (com correção publicada em 19/11/2026). Reportagem: [crypto.news](https://crypto.news/ledger-confirms-tampered-hardware-wallets-berlin-dubai/) (20/11/2026).
