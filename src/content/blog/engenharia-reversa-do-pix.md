---
title: "Engenharia reversa do PIX: o sistema por dentro, com código — e o roteiro para integrar (ou criar) um Pix"
description: "O PIX não é um aplicativo: é um arranjo com DICT, SPI, ISO 20022 e BR Code. Neste guia você decodifica um pagamento real em Python, entende cada camada do sistema e sai com dois roteiros: operar o PIX como instituição no Brasil ou desenhar o sistema instantâneo de um país."
pubDate: 2026-09-03
tags: ["pix", "pagamentos", "programação", "segurança"]
cover: "/images/news/engenharia-reversa-do-pix.jpg"
---

Todo mundo usa PIX. Quase ninguém sabe como ele funciona por dentro. E a parte mais curiosa é esta: **o Banco Central do Brasil publica as especificações do sistema** — manuais, APIs com Swagger aberto, manual de segurança e até os comunicados operacionais do SPI. O "segredo" do PIX é que quase nada é segredo.

Neste guia eu faço com você o que chamo de **engenharia reversa no bom sentido**: juntar as especificações públicas, decodificar um pagamento real na mão (sim, com Python) e reconstruir os fluxos num ambiente controlado. No caminho, você entende a arquitetura completa e ainda leva **dois roteiros práticos**:

- o de uma **instituição de pagamento (IP)** que quer operar o PIX no Brasil;
- o de **quem quer criar o próprio sistema instantâneo** — o "Pix" da sua plataforma, do seu consórcio de bancos ou do seu país — inspirado no modelo brasileiro.

Se você é dev, founder de fintech, estudante de sistemas de pagamento ou só tem curiosidade técnica: senta que lá vem aula.

> **Resumo em 30 segundos:** o PIX é aberto no desenho (padrões, QR Code, APIs e segurança são públicos) e fechado na rede (só participantes autorizados liquidam no SPI e consultam o DICT). Dá para reconstruir todo o conhecimento e implementar clientes compatíveis — e não dá para se passar por participante. Este artigo mostra como ler um PIX como quem lê um JSON, e como esse conhecimento vira um produto regulado no Brasil ou um sistema nacional do zero.

***

## 0. O que é (e o que não é) "engenharia reversa" do PIX

Engenharia reversa, no sentido clássico, é pegar um sistema funcionando e descobrir como ele foi construído — sem documentação ou com documentação parcial. No caso do PIX existe uma peculiaridade rara: **o desenho é aberto, mas a rede é fechada**.

- **É aberto:** os padrões de mensageria, o formato do QR Code, as APIs, as regras de segurança e o modelo de governança são públicos. Qualquer pessoa pode ler e implementar um cliente compatível.
- **É fechado:** o SPI (liquidação) e o DICT (diretório de chaves) só aceitam participantes autorizados pelo Banco Central, com certificados digitais e conexão própria. Você não "loga" na rede do BCB como loga numa API pública.

Tradução prática: **dá para reconstruir todo o conhecimento** (arquitetura, formatos, fluxos, defesas) e **não dá para se passar por participante**. Isso é ótimo — inclusive para separar o estudo legítimo do golpe.

> ⚖️ **Linha vermelha (importante):** operar arranjo de pagamento sem autorização, interceptar ou forjar confirmações de pagamento e usar chaves/contas de terceiros são condutas ilegais no Brasil (Lei nº 12.865/2013, Regulamento do PIX anexo à Resolução BCB nº 1/2020 e legislação penal). Este conteúdo é educacional: ensina a *entender* e a *construir sistemas compatíveis e autorizados*, não a fraudar.

As duas jornadas que vamos percorrer:

| | **Jornada 1 — IP no Brasil** | **Jornada 2 — você cria o próprio "Pix"** |
|---|---|---|
| Quem | Instituição de pagamento brasileira que quer operar no arranjo PIX | Plataforma, consórcio de bancos ou banco central que quer um sistema instantâneo próprio |
| O que faz | Integra-se a uma infraestrutura que **já existe** (regras prontas) | Desenha a infraestrutura **do zero** (regras novas) |
| Esforço central | Autorização + homologação + adaptação de sistemas | Governança + blueprint técnico + adoção |
| Referência | Manuais do BCB e ambiente de testes | O PIX como case + padrões ISO/EMV + Project Nexus |

***

## 1. Anatomia do PIX: o "framework" por trás do arranjo

Antes de qualquer código, precisamos do mapa. O PIX não é um aplicativo nem um "sistema" único: é um **arranjo de pagamento** formado por peças complementares. A melhor forma de entender é por camadas.

### 1.1 Os componentes centrais

| Peça | Nome | Operado por | Papel |
|---|---|---|---|
| **SPI** | Sistema de Pagamentos Instantâneos | Banco Central | Liquidação **bruta em tempo real**: cada pagamento é liquidado individualmente, de forma definitiva, em segundos |
| **Conta PI** | Conta de Pagamentos Instantâneos | Banco Central | Conta de liquidação que cada participante direto tem no SPI — é nela que o dinheiro "entra e sai" de verdade |
| **DICT** | Diretório de Identificadores de Contas Transacionais | Banco Central | O "DNS do dinheiro": guarda a associação **chave PIX → conta** e resolve consultas em tempo real |
| **PSP** | Prestador de Serviço de Pagamento | Instituições autorizadas | Atende o usuário final (banco ou IP): mantém a conta, inicia e recebe PIX |
| **ITP** | Iniciador de Transação de Pagamento | Instituições autorizadas | Inicia o pagamento no ambiente do usuário sem acessar o saldo (via Open Finance) |

O fluxo básico de um PIX (transferência simples entre bancos diferentes), em um diagrama de sequência:

![Diagrama de sequência do PIX: pagador, PSP A (origem), DICT, SPI/BCB, PSP B (destino) e recebedor, com as mensagens do fluxo.](/images/news/engenharia-reversa-do-pix-fluxo.jpg)

*Figura 1 — O caminho de um PIX: o PSP consulta a chave no DICT, envia a ordem `pacs.008` assinada ao SPI e a liquidação acontece em segundos.*

### 1.2 O PIX em números (para dimensionar o problema)

Antes de mergulhar nos padrões, vale calibrar a escala do que estamos estudando:

- em 2025 foram **quase 80 bilhões de transações PIX** (+25,7% vs. 2024) e **mais de R$ 35 trilhões** movimentados (+33,6%), segundo o Relatório de Gestão do PIX do BCB;
- só em março de 2026 o sistema bateu **7,44 bilhões de transações no mês** (~240 milhões por dia); em abril, foram 7,37 bilhões (R$ 3,42 trilhões, ticket médio de R$ 464);
- **~148 milhões de pessoas físicas e 12,8 milhões de empresas** fizeram ou receberam ao menos um PIX em 2025 — e o diretório soma **mais de 920 milhões de chaves** cadastradas;
- no fim de 2025 eram **926 instituições participantes** (+5,6% em um ano).

Quando um sistema desse tamanho funciona 24/7/365, cada milissegundo e cada byte de especificação contam. É isso que torna o estudo da arquitetura tão rico.

### 1.3 Mensageria: o PIX "fala" ISO 20022, não JSON

Dentro do SPI, as mensagens seguem o **ISO 20022** — o padrão internacional de mensageria financeira — estruturadas em XML com schemas rígidos que definem cada campo, tipo, tamanho e obrigatoriedade. As mensagens centrais:

| Mensagem | Uso |
|---|---|
| `pacs.008` | Ordem de pagamento (o "PIX" em si) |
| `pacs.002` | Confirmação/status (liquidação, recusa) |
| `pacs.004` | Devolução (o "estorno" do PIX) |

Detalhe de segurança que vale ouro num artigo de engenharia reversa: **cada mensagem carrega assinatura digital no elemento `<Sgntr>` do Business Application Header (BAH)**. Ou seja, não basta "enviar um XML" — a mensagem precisa vir assinada por um certificado válido (padrão XMLDSig, na cadeia ICP-Brasil) e o receptor valida a assinatura. É isso que torna inviável, na prática, forjar um "PIX recebido" de dentro da rede.

### 1.4 Transporte e segurança

- **Canal:** a comunicação entre participante e BCB usa a **ICOM — a Interface de Comunicação do BCB** —, um canal de mensageria HTTP (polling: o participante envia por POST e recebe por GET) que trafega as mensagens ISO 20022 sobre a RSFN (Rede do Sistema Financeiro Nacional), protegido por **mTLS** (TLS com certificado nos dois lados).
- **Certificados:** padrão SPB para assinatura e canal, com certificados na cadeia **ICP-Brasil** — a mesma infraestrutura pública de chaves brasileira (AC Raiz: ITI). O BCB comunica ativação/renovação desses certificados por meio dos **Informes SPI** públicos.
- **Manual de Segurança:** o BCB publica o *Manual de Segurança do SFN — Vol. II: Segurança do PIX* (v6.00), com os requisitos completos. Quem quer "reversar" segurança de verdade começa por ele.

### 1.5 Captura: o BR Code (QR Code PIX) é TLV puro

O QR Code do PIX — e o "copia e cola" — seguem o padrão **EMVCo QRCPS (Merchant Presented Mode)**, adaptado pelo BCB no chamado **BR Code**. A estrutura é **TLV (Tag-Length-Value)**: cada campo tem um ID de 2 dígitos (Tag), um comprimento de 2 dígitos (Length) e o valor (Value). O GUI que identifica o PIX dentro do template de conta é a string `br.gov.bcb.pix`.

Os campos principais do payload:

| ID | Campo | Exemplo/observação |
|---|---|---|
| `00` | Payload Format Indicator | `01` |
| `01` | Point of Initiation Method | `11` estático, `12` dinâmico |
| `26` | Merchant Account Information | contém o GUI `br.gov.bcb.pix` + subcampos (chave, txid, URL) |
| `52` | Merchant Category Code | ex.: `0000` (genérico) |
| `53` | Moeda | `986` = BRL |
| `54` | Valor | opcional no estático (ex.: `25.00`) |
| `58` | País | `BR` |
| `59` | Nome do recebedor | limitado a 25 caracteres |
| `60` | Cidade do recebedor | limitada a 15 caracteres |
| `62` | Additional Data Field | subcampo `05` = **txid** (identificador da cobrança) |
| `63` | CRC16 | checksum que protege a string contra erro de digitação |

É por isso que dá para "ler" um PIX com um editor de texto: o *copia e cola* **é** a representação textual dessa árvore TLV. Vamos ver isso na prática na seção 2.

### 1.6 Iniciação: os canais e os novos modos

O PIX evoluiu de "transferência instantânea" para uma plataforma de pagamentos completa. Quem estuda o arranjo em 2026 precisa mapear:

- **PIX tradicional:** iniciado no app do PSP (dinâmico/estático via QR).
- **PIX Cobrança:** QR dinâmico com txid, com e sem vencimento, em lote — padronizado pela **API PIX** do PSP recebedor (Swagger público em `bacen.github.io/pix-api`).
- **PIX Automático:** lançado em junho de 2025 (Resolução BCB nº 482/2025) e obrigatório para as instituições desde outubro de 2025; permite cobranças recorrentes autorizadas — o "débito automático" moderno — para empresas com CNPJ ativo (e mais de seis meses de existência).
- **PIX por aproximação:** iniciação por NFC via carteira digital, que estreou em fevereiro de 2025 com teto fixo de R$ 500 por operação. Em junho de 2026 o BCB anunciou o **fim do teto fixo a partir de 01/10/2026** (IN BCB nº 746/2026): os limites passam a ser definidos pelo usuário, respeitados os tetos da instituição e as regras de segurança — o limite noturno de R$ 1.000 para pessoas físicas continua valendo.
- **Iniciação por terceiros (ITP):** via **Open Finance Brasil**, um iniciador autorizado dispara o PIX dentro do app do banco do usuário, sem nunca tocar no saldo.
- **PIX internacional:** interligações bilaterais (Banco do Brasil na Argentina desde março de 2026), hubs multilaterais, interoperabilidade de QR (piloto com a UnionPay/China desde julho de 2026) e negociações de conexão com o TIPS europeu. Detalho isso na Jornada 2.

### 1.7 A síntese em uma tabela

| Camada | Componente | Padrão | Quem opera |
|---|---|---|---|
| Endereçamento | DICT | REST/JSON (DICT API v2) | BCB |
| Liquidação | SPI + Conta PI | ISO 20022 (XML assinado) | BCB |
| Mensageria | pacs.008 / 002 / 004 | ISO 20022 + `<Sgntr>` no BAH | BCB + participantes |
| Transporte | ICOM sobre RSFN | mTLS | BCB |
| Identidade | Certificados | Padrão SPB + ICP-Brasil | ITI/ACs + BCB |
| Captura | BR Code | EMVCo QRCPS (TLV) | Qualquer um (padrão aberto) |
| Iniciação | Apps, NFC, Open Finance | REST/OAuth2/mTLS | PSPs e ITPs |

![Arquitetura do PIX em camadas — diagrama técnico com as seis camadas do arranjo, do usuário ao transporte seguro.](/images/news/engenharia-reversa-do-pix-arquitetura.jpg)

*Figura 2 — A arquitetura do PIX em camadas: usuário, serviço (PSP), endereçamento (DICT), mensageria ISO 20022, liquidação (SPI + Conta PI) e transporte/segurança.*

***

## 2. Mão na massa: decodificando um PIX real (copia e cola)

Agora a parte que parece mágica e não é: **ler o payload de um PIX como quem lê um JSON**, em Python puro, sem nenhuma biblioteca.

### 2.1 O parser TLV em ~20 linhas

```python
# brcode.py — parser didático de BR Code (PIX)
def parse_tlv(texto: str) -> list[tuple[str, int, str]]:
    """Decodifica uma string TLV em (tag, tamanho, valor).

    Formato Pix: cada campo = 2 dígitos de tag + 2 dígitos de tamanho + valor.
    """
    campos = []
    i = 0
    while i < len(texto):
        tag = texto[i:i+2]            # ex.: '26'
        tam = int(texto[i+2:i+4])     # ex.: '58' -> 58 bytes de valor
        valor = texto[i+4:i+4+tam]
        campos.append((tag, tam, valor))
        i += 4 + tam
    return campos


def mostra(campos, nivel=0):
    """Imprime a árvore TLV, descendo nos campos aninhados (26 e 62)."""
    for tag, tam, valor in campos:
        print("  " * nivel + f"{tag} (len={tam}): {valor}")
        if tag in ("26", "62"):          # campos que contêm sub-TLVs no Pix
            mostra(parse_tlv(valor), nivel + 1)
```

### 2.2 Aplicando num payload de exemplo

Este é um **payload estático** típico (chave aleatória + txid genérico). Repare que o valor do `26` começa com `br.gov.bcb.pix` — a assinatura do arranjo:

```python
payload = (
    "000201"                                    # 00: formato do payload = 01
    "26580014br.gov.bcb.pix"                    # 26: GUI do arranjo Pix
    "0136123e4567-e12b-12d1-a456-426655440000"  # 26.01: chave aleatória (UUID)
    "52040000"                                  # 52: MCC genérico
    "5303986"                                   # 53: moeda 986 = BRL
    "540525.00"                                 # 54: valor R$ 25,00
    "5802BR"                                    # 58: país BR
    "5913FULANO DE TAL"                         # 59: nome do recebedor
    "6008BRASILIA"                              # 60: cidade
    "62070503***"                               # 62.05: txid (*** = estático)
    # o campo 63 (CRC16) entra na validação, seção 2.3
)

mostra(parse_tlv(payload))
```

Saída esperada:

```
26 (len=58): 0014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000
  00 (len=14): br.gov.bcb.pix
  01 (len=36): 123e4567-e12b-12d1-a456-426655440000
52 (len=4): 0000
53 (len=3): 986
54 (len=5): 25.00
58 (len=2): BR
59 (len=13): FULANO DE TAL
60 (len=8): BRASILIA
62 (len=7): 0503***
  05 (len=3): ***
```

Ou seja: um QR Code PIX é uma **árvore TLV** — exatamente como um cartão de crédito EMV conversa com a maquininha. Não é coincidência: o BCB adotou o padrão EMVCo de QR Code e o "profileou" para o PIX no Manual de Padrões.

![Árvore TLV do BR Code — diagrama técnico mostrando os campos do payload do PIX e seus subcampos.](/images/news/engenharia-reversa-do-pix-decodificando.jpg)

*Figura 3 — A estrutura TLV do BR Code: o "copia e cola" é uma árvore de campos (tag + tamanho + valor) que o parser decodifica.*

### 2.3 Validando o CRC16 (o que impede erro de digitação)

O campo `63` guarda um **CRC16-CCITT** que protege o payload contra erro de digitação. Detalhe de spec: o CRC é calculado sobre toda a string **incluindo o "6304"** (a tag `63` + o tamanho `04`), excluindo apenas os 4 dígitos finais do próprio CRC:

```python
def crc16_ccitt(texto: str) -> str:
    crc = 0xFFFF
    for byte in texto.encode("ascii"):
        crc ^= byte << 8
        for _ in range(8):
            crc = ((crc << 1) ^ 0x1021) & 0xFFFF if crc & 0x8000 else (crc << 1) & 0xFFFF
    return f"{crc:04X}"

crc = crc16_ccitt(payload + "6304")  # CRC calculado até o "6304"
br_code = payload + "6304" + crc     # BR Code completo
print("CRC16:", crc)                 # varia conforme o payload
print("Payload final:", br_code)
```

Se você colar o `br_code` num app de banco, o leitor valida o CRC e mostra o pagamento. Para conferir: gere um QR no seu banco e rode o mesmo cálculo — o CRC vai bater.

> 💡 **Exercício que vale um vídeo:** gere um QR PIX no app do seu próprio banco, copie o "copia e cola", cole neste parser e veja sua chave, seu nome e sua cidade aparecerem campo a campo. É a "engenharia reversa" mais didática que existe — usando dados 100% seus.

### 2.4 Comparando com bibliotecas e ferramentas da comunidade

Para conferir seu parser (ou pular a implementação), existe um ecossistema aberto maduro:

- **Python:** `pybrcode` (gera payloads estáticos/dinâmicos com API clara);
- **Node.js:** `gpix` (br-codes estáticos e dinâmicos);
- **PHP:** `php_qrcode_pix` (muito usado em e-commerce);
- **Rust:** `pix-brcode-parser` (parser + validação);
- **Online:** decoders de BR Code e o endpoint de decode da Woovi, úteis para conferir campo a campo;
- **Repositórios de homologação:** projetos como `open-pix` documentam, na prática, o que um participante direto precisa implementar (conexão ICOM/mTLS e mensagens `pacs.008/002/004`) — o que transforma o processo do BCB em algo estudável fora do BCB.

### 2.5 O laboratório: um mini-DICT e um mini-SPI

Se o objetivo é **ensinar**, o passo final da mão na massa é simular o arranjo inteiro num ambiente controlado — sem tocar na rede real. Um esqueleto com FastAPI:

```python
# mini_pix.py — simulação didática (NÃO é o PIX real)
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# "DICT" local: chave -> conta
DICT = {"fulano@email.com": {"ispb": "12345678", "conta": "0001-1"}}

class Consulta(BaseModel):
    chave: str

@app.post("/dict/consulta")
def consulta_chave(req: Consulta):
    """Espelha o papel do DICT: resolve chave em conta."""
    return DICT.get(req.chave, {"erro": "chave nao encontrada"})

# "SPI" local: recebe uma 'pacs.008' simplificada (JSON) e 'liquida'
class Pagamento(BaseModel):
    end_to_end: str
    pagador: str
    recebedor: str
    valor: float

@app.post("/spi/pacs008")
def liquida(pag: Pagamento):
    print(f"LIQUIDANDO {pag.end_to_end}: R$ {pag.valor:.2f} "
          f"{pag.pagador} -> {pag.recebedor}")
    return {"status": "settled", "horario": "2026-09-03T12:00:00-03:00"}
```

Com esse esqueleto você demonstra o fluxo inteiro (consultar chave → emitir pagamento → "liquidação" → confirmação). Num segundo artigo, dá para evoluir para um simulador com XML ISO 20022 de verdade e assinatura digital. É também a ponte perfeita para as duas jornadas abaixo: o que aqui é simulado, lá embaixo é homologação de verdade.

***

## 3. Jornada 1 — A IP brasileira que quer operar PIX

### 3.1 Primeiro, o enquadramento regulatório

Uma **instituição de pagamento (IP)** no Brasil é uma instituição autorizada a funcionar pelo Banco Central, nos termos da **Lei nº 12.865/2013** (que também exige autorização para arranjos de pagamento). Ela pode emitir moeda eletrônica, gerir contas de pagamento e, sendo **participante do PIX**, oferecer o arranjo aos seus clientes.

O PIX em si é um **arranjo do BCB**, regido pelo **Regulamento do PIX**, anexo à **Resolução BCB nº 1, de 12/08/2020**, e detalhado em manuais técnicos que o BCB atualiza por **Instruções Normativas** — por exemplo, a IN BCB nº 658/2025 divulgou a versão 2.9.0 do *Manual de Padrões para Iniciação do PIX*. Antes de escrever uma linha de código, a equipe precisa ler três documentos:

1. **Manual de Padrões para Iniciação do PIX** — onde estão o BR Code, a API PIX e os fluxos de cobrança (a "bíblia" da ponta de recebimento);
2. **Manuais do SPI e do DICT** (se participação direta) — mensageria ISO 20022, XSDs e APIs do diretório;
3. **Manual de Segurança do SFN — Vol. II (Segurança do PIX)** — requisitos obrigatórios de segurança.

### 3.2 Direto ou indireto? (a decisão de arquitetura)

| | **Participante direto** | **Participante indireto** |
|---|---|---|
| Conexão com o BCB | Direta (SPI + Conta PI + DICT) | Via um participante direto contratado |
| Liquidação | Conta PI própria no BCB | Na conta do participante direto (acordo entre as partes) |
| Complexidade | Alta: mensageria ISO 20022, certificados, XSDs, homologação completa | Média: integração com o "hub" do participante direto |
| Tempo típico | Meses (etapa homologatória de ~5 meses após a cadastral) | Menor, mas depende do provedor |
| Indicação | Bancos e IPs grandes, com volume e ambição de controle | IPs médias que querem ir a mercado rápido |

Há ainda um terceiro caminho, **sem ser participante**: usar a **API PIX de um PSP recebedor** (um "gateway") para gerar cobranças e receber — muito comum para quem só quer *receber* PIX (e-commerce, SaaS) sem operar conta. A diferença prática: quem **inicia** PIX (o banco do pagador) precisa ser participante; quem apenas **recebe via QR de terceiro** pode não ser.

> Detalhe de regra que muita gente não sabe: a participação é **obrigatória** para instituições com mais de 500 mil contas ativas — o BCB desenhou o arranjo para que ninguém relevante fique de fora. E os participantes indiretos precisam de um participante direto "responsável": em 2026, 31 deles perderam o prazo de migração para esse modelo.

### 3.3 O caminho de uma IP que quer participar (checklist real)

Com base nos documentos públicos do BCB (formulário de adesão, roteiro de participação direta no SPI e guias de homologação):

1. **Autorização:** ser IP autorizada (ou estar no processo) junto ao BCB.
2. **Adesão ao PIX:** preencher o formulário de adesão do arranjo, indicando interesse na participação direta no SPI e na abertura de **Conta PI**.
3. **Acessos:** providenciar acesso ao **Sisbacen** e ao **BC Correio** (necessários para mensagens institucionais).
4. **Identificação:** obter/cadastrar seu **ISPB** — o identificador de 8 dígitos que aparece em praticamente toda mensagem e identificador do protocolo (end-to-end IDs, business message IDs, cabeçalhos de roteamento).
5. **Etapa cadastral → homologatória:** concluir a fase cadastral e, dentro do prazo (cerca de 5 meses após a comunicação da conclusão), passar pelos **testes formais de homologação** — conectividade (ICOM via mTLS), funcionalidade SPI (enviar/receber `pacs.008`, `pacs.002`, `pacs.004`) e os casos de DICT (chaves, portabilidade, reclamação de posse).
6. **Certificados:** emitir/instalar os certificados digitais (padrão SPB, cadeia ICP-Brasil) para assinatura e canal; acompanhar os **Informes SPI**.
7. **Segurança:** implementar os controles do Manual de Segurança do PIX (autenticação forte, gerenciamento de limites, prevenção a fraude, monitoramento e resposta).
8. **Produção:** após aprovação, operar no ambiente produtivo com os mesmos padrões da homologação.

### 3.4 O que precisa ser construído (visão de engenharia)

| Módulo | Entrega | Referência |
|---|---|---|
| **Núcleo de contas** | Conta de pagamento, saldo, extrato, conciliação | Regras do arranjo + normas da IP |
| **Gestão de chaves** | Cadastro, consulta, portabilidade e reclamação de chaves | DICT API |
| **Geração de QR** | BR Code estático/dinâmico + copia e cola + CRC16 | Manual de Padrões (BR Code/EMV) |
| **Cobranças** | Criar/consultar/gerenciar cobranças com e sem vencimento, em lote | API PIX do PSP recebedor (OpenAPI) |
| **Mensageria SPI** (se direto) | Enviar/receber `pacs.008/002/004` em XML, assinar no `<Sgntr>` do BAH | Manuais do SPI + ISO 20022 |
| **Open Finance** (se ITP) | Consentimento OAuth2 + iniciação no app do usuário | APIs Open Finance Brasil |
| **Segurança** | mTLS, certificados, MFA, limites por dispositivo, antifraude | Manual de Segurança do PIX |

**Onde entra a "engenharia reversa" da seção 2:** todo esse checklist é *implementável* contra documentação pública. Uma equipe que domina o BR Code e entende o fluxo DICT→SPI chega à homologação muito mais preparada — e é exatamente esse conhecimento que diferencia uma integração frágil de uma robusta.

### 3.5 Exemplo concreto: uma plataforma de pagamentos chegando ao PIX

Imagine uma plataforma de pagamentos que já opera cartão (Visa) e ativos digitais (BTC, USDC, USDT), com app para o usuário final. Para ela oferecer PIX de verdade (não só "receber via gateway"), o plano é:

1. **Fase 0 (semanas):** receber PIX via API PIX de um PSP parceiro — QR dinâmico no checkout, conciliação automática. Zero participação.
2. **Fase 1 (meses):** virar **participante indireto** — a plataforma emite contas com chaves PIX, o parceiro direto liquida. Ela cuida do app, das chaves e da experiência; o parceiro cuida do SPI.
3. **Fase 2 (ano+):** avaliar **participação direta** — Conta PI própria, mensageria ISO 20022 e controle total da liquidação, quando o volume justificar o custo operacional.

Essa gradação (gateway → indireto → direto) é o caminho que a maioria das fintechs brasileiras percorreu — e um excelente "mapa do tesouro" para ensinar.

***

## 4. Jornada 2 — Criar o seu próprio "Pix": o roteiro completo

Se você tem interesse em criar o seu próprio Pix — como fundador de uma plataforma de pagamentos, executivo de um banco ou tomador de decisão em um banco central — esta jornada é para você. A premissa aqui não é replicar o arranjo oficial do Banco Central do Brasil (isso só o BCB opera): é desenhar um sistema de pagamentos instantâneos inspirado no mesmo modelo — o "Pix" da sua empresa, do seu consórcio de bancos ou do seu país. E o momento nunca foi tão bom: o PIX deixou de ser um case brasileiro e virou **modelo exportável**.

O Banco Central assinou acordos de compartilhamento de informação sobre o PIX com **65 bancos centrais e órgãos equivalentes** (da Alemanha ao Canadá, da Turquia à África do Sul). Bancos brasileiros levam o PIX para fora (Banco do Brasil na Argentina, desde março de 2026). E o BCB negocia interligações com o **TIPS europeu** e interoperabilidade de QR com a China. Quem quiser criar o próprio Pix tem um blueprint vivo para estudar.

![Conexões globais de pagamentos instantâneos — Terra escura com continentes dourados ligados por arcos de luz.](/images/news/engenharia-reversa-do-pix-global.jpg)

*Figura 4 — O horizonte do PIX internacional: links bilaterais e hubs multilaterais conectando sistemas nacionais.*

### 4.1 As seis decisões que vêm antes do código

Antes de escolher tecnologia, o dono do projeto — banco central, consórcio ou plataforma — decide:

1. **Propósito:** pagamentos de varejo universais? Inclusão financeira? Reduzir dinheiro e custos de TED/DOC?
2. **Operação:** banco central opera diretamente (modelo PIX/UPI indiano) vs. operador privado regulado/supervisionado (modelo de schemes como o SEPA Instant na Europa).
3. **Regulação:** base legal para autorizar participantes e impor regras de conduta (o equivalente da Lei 12.865/2013 + Regulamento do PIX).
4. **Participação:** aberta e proporcional (todo PSP relevante entra, com regime direto/indireto) — foi o que garantiu escala ao PIX.
5. **Precificação:** o PIX é gratuito para pessoas físicas; essa decisão política foi decisiva para a adoção massiva.
6. **Atributos do serviço:** disponibilidade 24/7/365, liquidação em segundos, crédito ao recebedor em tempo real.

### 4.2 O blueprint técnico: os 5 componentes de um sistema instantâneo nacional

Comparando o PIX com o **Project Nexus** (o blueprint do BIS para conectar sistemas instantâneos nacionais) e com os padrões internacionais (ISO 20022, EMVCo), um sistema nacional moderno se reduz a cinco peças:

| # | Componente | O que faz | Padrão sugerido |
|---|---|---|---|
| 1 | **Diretório de chaves** (o "DICT local") | Resolve identificadores amigáveis (telefone, e-mail, documento, aleatório) para contas; gerencia portabilidade e disputas | REST/JSON + modelo de chaves do PIX |
| 2 | **Sistema de liquidação** (o "SPI local") | Liquidação **bruta em tempo real** em contas de liquidação no banco central (moeda de banco central = confiança) | RTGS + mensageria instantânea |
| 3 | **Mensageria padronizada** | Transporta ordem, confirmação e devolução com rastreabilidade ponta a ponta | **ISO 20022** (`pacs.008/002/004`) |
| 4 | **QR interoperável** | Uma única "cara" para o varejo: qualquer app lê o QR de qualquer PSP | **EMVCo QRCPS** (perfil local, como o BR Code) |
| 5 | **Segurança e identidade** | Autentica participantes (PKI) e usuários (MFA), assina mensagens e protege o canal | PKI nacional + mTLS + assinatura no cabeçalho |

Dois detalhes de design do PIX que parecem burocracia e são, na verdade, **vantagem competitiva**:

- **Escolher ISO 20022 desde o dia 1** deixa o sistema "pronto para o Nexus": quando você (ou o seu país) quiser se conectar a outros sistemas instantâneos (hub multilateral ou link bilateral), a mensageria já é a língua franca internacional.
- **Publicar os manuais** (como o BCB faz) transforma a "engenharia reversa" em recurso de adoção: integradores não dependem de NDAs para construir, o que reduz a barreira de entrada e acelera o ecossistema.

### 4.3 O playbook de adoção (o que o PIX fez e você deve copiar)

1. **Acesso universal com proporcionalidade:** todos os PSPs relevantes participam; pequenos entram como indiretos.
2. **Gratuidade para pessoas físicas** (com tetos de tarifa para empresas) — o "preço zero" derrubou a inércia do usuário.
3. **Casos de uso em ondas:** o PIX não nasceu completo. Lançou transferências (2020) e foi adicionando cobrança com QR dinâmico, saque/troco, PIX Automático (2025) e aproximação (2025/2026). Cada onda é uma campanha de adoção.
4. **Integração com o governo e o setor público** (contas, tributos, benefícios) para ancorar volume.
5. **Sandbox/homologação forte:** ambiente de testes onde qualquer participante valida antes de ir a produção — exatamente o que vimos na Jornada 1.
6. **Métricas públicas:** o BCB publica estatísticas de uso; transparência gera confiança e alimenta o ciclo virtuoso de adoção.

### 4.4 Um roadmap de implantação (visão de 12 a 24 meses)

| Fase | Duração típica | Entregas |
|---|---|---|
| **0. Decisão política** | 2–4 meses | Propósito, operador, modelo de participação, precificação, base legal |
| **1. Desenho** | 3–6 meses | Manuais de padrões (mensageria, QR, APIs, segurança), XSDs/schemas, modelo de chaves, regras de disputa |
| **2. Núcleo central** | 4–8 meses | Diretório + liquidação + mensageria no banco central; ambiente de homologação aberto aos PSPs |
| **3. Piloto** | 2–4 meses | Banco central + 2–3 bancos grandes; transferências reais em ambiente controlado; testes de carga e segurança |
| **4. Go-live escalado** | contínuo | Participação ampliada, campanhas de adoção, estatísticas públicas |
| **5. Serviços + internacional** | 12+ meses | Cobrança/QR dinâmico, débito automático, aproximação; link bilateral ou adesão a hub multilateral (Nexus) |

### 4.5 Onde o PIX ainda está indo (e o que observar se você for criar o seu)

- **Interconexão bilateral vs. hubs multilaterais:** o próprio BCB avalia os dois caminhos no Relatório de Gestão do PIX. Em agosto de 2026 ele divulgou a agenda do PIX Internacional, com acordos bilaterais país-a-país e/ou hubs multilaterais.
- **O Project Nexus saiu do papel:** em 2025, os bancos centrais de Índia, Indonésia, Malásia, Filipinas, Singapura e Tailândia incorporaram a entidade **Nexus Global Payments (NGP)** para levar o projeto à operação — conectando UPI, PayNow, PromptPay, DuitNow/MEPS e InstaPay por uma conexão única, com desenvolvimento técnico iniciado em 2026. O Brasil não está entre os fundadores — mas o desenho do PIX já nasceu "pronto para conversar" com esse tipo de hub.
- **Interoperabilidade de QR:** o piloto com a UnionPay (julho de 2026) permite que apps chineses paguem QR PIX em ~15 milhões de comerciantes brasileiros — mostrando que o *código* do varejo pode atravessar fronteiras antes da liquidação.
- **Conversão cambial embutida:** as conexões Brasil–China (Real–Yuan, sem intermediação do dólar) e Brasil–Argentina estão resolvendo o câmbio *dentro* da experiência de pagamento — uma lição de design para qualquer sistema novo.
- **A interligação com a Europa:** BCB e BCE negociam a conexão PIX–TIPS; o cenário preliminar prevê um corredor operacional em novembro de 2027 e um piloto em junho de 2028. Para efeito de comparação: o TIPS liquidou, em média, ~2,7 milhões de transações por dia em 2025 — o PIX faz isso em menos de um minuto no horário de pico.

Aqui vale um parêntese de contexto: enquanto bancos centrais constroem trilhos instantâneos, o mundo cripto tenta a mesma coisa sem banco central — com stablecoins e [apps de pagamento que rendem juros](/posts/ethena-pay-app-pagamentos-usde/), e com [bancos centrais estudando dinheiro on-chain](/posts/ecb-schnabel-dinheiro-onchain/). É a mesma disputa de arquitetura: quem liquida, em qual moeda e com qual confiança.

***

## 5. O que a "engenharia reversa" ensina sobre segurança (análise defensiva)

Quem estuda o PIX por dentro descobre uma verdade desconfortável e libertadora: **os ataques que vemos nos jornais quase nunca são ataques ao protocolo PIX** — são ataques ao elo mais fraco da cadeia, que é o ser humano e o dispositivo dele.

### 5.1 O modelo de defesa em camadas (do protocolo ao usuário)

| Camada | Mecanismo | O que impede |
|---|---|---|
| Protocolo | Mensagens ISO 20022 **assinadas** no BAH (`<Sgntr>`) | Forjar/alterar mensagens dentro da rede |
| Transporte | mTLS + certificados (padrão SPB/ICP-Brasil) | Se passar por participante |
| Participante | Homologação, certificados, segregação de funções | Entrar na rede sem autorização |
| Conta/App | MFA, biometria, **limites por dispositivo**, registro de novos aparelhos | Uso da conta por terceiros |
| Arranjo | Monitoramento, regras antifraude, devolução (**MED**) | Mitigar o dano quando o golpe ocorre |
| Usuário | Educação | Cair em engenharia social |

![Defesa em camadas do PIX — diagrama técnico do protocolo (assinatura ISO 20022) até o usuário (educação).](/images/news/engenharia-reversa-do-pix-seguranca.jpg)

*Figura 5 — A defesa do PIX funciona em camadas: do protocolo assinado até a educação do usuário — o elo mais fraco é sempre o humano.*

A conclusão técnica é direta: **ninguém "hackeia o PIX" para roubar o seu dinheiro** — seria preciso quebrar assinatura digital e certificados da cadeia ICP-Brasil. O que acontece na prática:

- **Golpes são engenharia social:** falso motoboy, central falsa, "PIX errado", deepfake de voz/vídeo pedindo transferência, phishing com QR adulterado. No mundo cripto o padrão é o mesmo — como mostram [operações de phishing com IA](/posts/operacao-asterix-phishing-cripto-ia/).
- **O vetor é o dispositivo:** celular roubado/clonado é o grande pesadelo — por isso o BCB passou a exigir limites mais rígidos e cadastro de novos dispositivos para iniciações.
- **O MED é o sistema de defesa do arranjo:** o Mecanismo Especial de Devolução (art. 41-B do Regulamento do PIX) ganhou uma versão 2.0 (Resolução BCB nº 493/2025 e IN BCB nº 653/2025), obrigatória desde fevereiro de 2026: rastreio além da primeira conta recebedora, bloqueio cautelar em múltiplas contas e devolução em até 11 dias. Em 2025, o mecanismo recuperou, em média, 9,3% do valor contestado.
- **A cadeia de fornecedores também é alvo:** incidentes recentes envolveram fornecedores de software do setor financeiro, reacendendo o debate sobre segurança de terceiros — "estar fora do protocolo" não protege ninguém.

### 5.2 O "comprovante falso" não é uma falha do PIX

Uma das dúvidas mais comuns: *por que golpistas usam comprovantes falsos se o PIX é seguro?* Porque o **comprovante impresso/print não faz parte do arranjo**. O que vale é o crédito efetivo na conta, confirmado pelo `pacs.002` dentro da rede. Quem vende algo olhando só um print está confiando em algo que o PIX nunca prometeu validar. A defesa é **conferir o extrato/saldo** — não o papel. (É por isso que o PIX Cobrança com txid e consulta de status pela API PIX é tão importante para o varejo: ele dá confirmação *verificável*.)

### 5.3 Lições para quem constrói um sistema instantâneo (nacional ou corporativo)

1. **Segurança by design:** assinatura de mensagens, PKI, HSM para chaves e mTLS não são opcionais — são o que torna a rede confiável.
2. **Autenticação forte do usuário:** MFA + biometria + limites dinâmicos + cadastro de dispositivo são o padrão mínimo pós-2025.
3. **Monitoramento e resposta:** fraude em pagamento instantâneo acontece em minutos; detecção em lote não serve. Invista em regras em tempo real, análise de rede e resposta a incidentes.
4. **Proteção de dados:** chaves, contas e biometria são dados sensíveis — no Brasil, LGPD; num sistema internacional, GDPR e equivalentes.
5. **Mecanismo de devolução:** todo arranjo instantâneo precisa de um rito de contestação/devolução (o PIX tem o MED) e de regras claras de responsabilidade entre PSPs.
6. **Eduque o usuário:** a camada mais atacada também é a mais barata de proteger — e é onde conteúdo de qualidade faz a diferença.

***

## 6. FAQ rápido (para fechar o entendimento)

**PIX é hackeável?** O protocolo, na prática, não: mensagens assinadas com certificados ICP-Brasil dentro de um canal mTLS. O que acontece é golpe contra a pessoa (engenharia social) ou contra o aparelho dela. A defesa é autenticação forte + conferir extrato, nunca print.

**Preciso ser banco para receber PIX?** Não. Para *receber* via QR de terceiros, basta contratar a API PIX de um PSP recebedor (gateway). Para *oferecer conta com PIX* aos seus clientes, você precisa ser participante (direto ou indireto). Para *iniciar* PIX, precisa ser participante.

**Posso ser processado por implementar um parser de BR Code?** Não — desde que o uso seja legítimo. O formato é público, e bibliotecas open-source fazem isso há anos. O que é crime é operar arranjo sem autorização, forjar confirmações ou usar dados de terceiros.

**Qual a diferença entre PIX e Open Finance?** O PIX é o trilho de pagamento; o Open Finance é o protocolo de compartilhamento de dados e de iniciação de pagamento por terceiros (ITP). Eles se encontram: um ITP usa o Open Finance para iniciar um PIX dentro do app do banco.

**O que vem depois?** PIX internacional (bilateral e via hubs), PIX Automático maduro, aproximação sem teto fixo (out/2026) e, no horizonte, a conversa com sistemas como o TIPS e o Project Nexus — além da eterna corrida contra stablecoins e moedas digitais de banco central.

***

## 7. Conclusão: a "engenharia reversa" que ensina (e constrói)

Respondendo à pergunta do título: **sim, é totalmente possível "reversar" o PIX** — porque o Banco Central desenhou o arranjo com as especificações abertas, e a parte fechada (a rede) é justamente a que não se deve nem se consegue invadir.

A sequência que funciona para ensinar — e que serve tanto para uma IP brasileira quanto para um país inteiro — é sempre a mesma:

1. **Mapear** a arquitetura (DICT, SPI, Conta PI, mensageria, QR).
2. **Decodificar** algo real (o BR Code do seu próprio banco) e reconstruir o fluxo.
3. **Simular** o arranjo num laboratório (mini-DICT/mini-SPI).
4. **Regularizar** (no Brasil: autorização, adesão, homologação; no exterior: as seis decisões políticas + blueprint de 5 componentes).
5. **Proteger** (segurança em camadas + educação do usuário).

É dessa mesma anatomia que nasce um sistema instantâneo nacional — o "Pix" de qualquer país, ou o núcleo de pagamentos de qualquer plataforma que você queira construir: um diretório que resolve identidades, uma liquidação que zera risco em moeda de banco central, uma mensageria padrão que conversa com o mundo (ISO 20022), um QR que qualquer app lê e uma camada de segurança que transforma a confiança em um *problema de engenharia* — não uma promessa.

> **Minha opinião:** o PIX é a melhor aula de arquitetura de sistemas de pagamento que existe em produção. Ele prova que padronização aberta + operação centralizada + participação proporcional é uma combinação que escala — e que "engenharia reversa" de verdade é sobre *entender para construir*, não sobre *quebrar*. Se você saiu deste texto conseguindo explicar a diferença entre DICT e SPI ou lendo um copia-e-cola de PIX, a aula funcionou. Se quiser ir além, os documentos oficiais listados abaixo são o melhor "código-fonte" que existe: nenhuma engenharia reversa é necessária — é só ler, implementar e homologar.

***

## Fontes e leitura recomendada

**Documentos oficiais do Banco Central (confira sempre a versão vigente):**

- [Página oficial do PIX e regulamentação (bcb.gov.br)](https://www.bcb.gov.br/estabilidadefinanceira/pix)
- [Relatório de Gestão do PIX 2023–2025 (PDF, bcb.gov.br)](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/relatorio_de_gestao_pix/relatorio_gestao_pix_2026.pdf)
- [Manual de Padrões para Iniciação do PIX (PDF)](https://aprendervalor.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf) — e a IN BCB nº 658/2025 (versão 2.9.0) no [DOU](https://dou.gov.br/web/dou/-/instrucao-normativa-bcb-n-658-de-5-de-setembro-de-2025-654006146)
- [API PIX — Swagger/OpenAPI oficial (bacen.github.io/pix-api)](https://bacen.github.io/pix-api/)
- [DICT API (bcb.gov.br)](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/API-DICT.html)
- [Manual de Segurança do SFN — Vol. II: Segurança do PIX (v6.00)](https://www.bcb.gov.br/content/estabilidadefinanceira/cedsfn/Manual%20de%20Seguran%C3%A7a%20do%20SFN%20-%20Vol.II%20-%20v6_00.pdf)
- [BCB: PIX por aproximação sem teto fixo de R$ 500 — IN BCB nº 746/2026 (vigência 01/10/2026)](https://www.bcb.gov.br/detalhenoticia/21169/noticia)
- [Roteiro para participação direta no SPI e abertura de Conta PI (PDF)](https://liftchallenge.bcb.gov.br/content/estabilidadefinanceira/sistemapagamentosinstantaneos_docs/Roteiro_para_Participacao_Direta_no_SPI_e_abertura_de_Conta_PI.pdf)
- [Estatísticas e dados abertos do PIX (dadosabertos.bcb.gov.br)](https://dadosabertos.bcb.gov.br/nl/dataset/pix)

**Contexto e ecossistema:**

- [PIX consolida liderança nos pagamentos digitais — números de 2025 (Agência Brasil / CRSFN)](https://www.gov.br/fazenda/pt-br/composicao/orgaos/orgaos-colegiados/crsfn/acesso-a-informacao/noticias/2026/pix-consolida-lideranca-nos-pagamentos-digitais-e-projeta-novas-evolucoes-ate-2030)
- [SPI, DICT e Conta PI — a infraestrutura do PIX (Azify)](https://azify.com/blog/spi-dict-conta-pi-infraestrutura-pix)
- [open-pix — documentação prática de homologação de participante (GitHub)](https://github.com/cleitonsilvadev/open-pix)
- [Bibliotecas BR Code: pybrcode (Python), gpix (Node.js), php_qrcode_pix (PHP)](https://github.com/topics/pix?l=python)

**Internacionalização e blueprint global:**

- [Project Nexus — blueprint do BIS (bis.org)](https://www.bis.org/publ/othp86.htm) e [site oficial do BIS sobre o Nexus](http://bis.org/project/nexus)
- [PIX internacional: Banco do Brasil na Argentina (mar/2026)](https://agenciabrasil.ebc.com.br/en/node/1680928)
- [BCB negocia interligação do PIX com o TIPS europeu (set/2026)](https://www.publico.pt/2026/09/03/publico-brasil/noticia/banco-central-brasil-negocia-interligar-pix-sistema-pagamentos-europeu-2186929)
- [Piloto UnionPay × PIX: turistas chineses pagam QR PIX no Brasil (jul/2026)](https://cn.unionpay.com/upowhtml/cn/templates/newInfo/7885004da382485e8bde5a0ba000fdd3/20260730123131.html)
- [BCB assina acordos sobre o PIX com 65 bancos centrais (Reuters, jul/2026)](https://sa.marketscreener.com/news/brazil-central-bank-eyes-expansion-for-pix-payment-system-as-us-trade-scrutiny-intensifies-ce7859dad88ef722)

---

*Artigo educativo — informações consolidadas em setembro de 2026. Versões de manuais e APIs mudam com frequência; confirme sempre o documento vigente na página oficial do Banco Central antes de implementar. As ilustrações foram geradas por IA no padrão editorial do blog e têm finalidade conceitual.*
